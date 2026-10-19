// Preview-local editor. Geometry is in the parent SVG space; pointer/hit sizes
// are in CSS pixels. The hero renderer remains the only writer of glyph shapes.
const HANDLES = [[0, 0], [.5, 0], [1, 0], [1, .5], [1, 1], [.5, 1], [0, 1], [0, .5]];
const MODES = ['nwse-resize', 'ns-resize', 'nesw-resize', 'ew-resize', 'nwse-resize', 'ns-resize', 'nesw-resize', 'ew-resize'];
const NAMES = ['top left', 'top', 'top right', 'right', 'bottom right', 'bottom', 'bottom left', 'left'];
const identity = () => ({ dx: 0, dy: 0, sx: 1, sy: 1 });
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const mix = (a, b, t) => a + (b - a) * t;
const ease = (t) => { t = clamp(t, 0, 1); return t < .5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2; };

// Same identity language for real You input and Naya's simulated repair.
const cursorPaint = new WeakMap();
export function paintActionCursor(node, mode = 'default', color = '#4B3BFF') {
  const previous = cursorPaint.get(node);
  if (previous?.mode === mode && previous.color === color) return;
  const svg = node.querySelector('svg'), path = svg.querySelector('path');
  const arrow = previous?.arrow || path.getAttribute('d');
  const resize = mode.includes('resize'), hand = mode === 'grab' || mode === 'grabbing';
  const d = resize ? 'M1 10L6 5V8H14V5L19 10L14 15V12H6V15Z'
    : hand ? (mode === 'grabbing' ? 'M4 10V7Q4 5 6 6L7 7V5Q8 3 9 5V7Q10 4 12 6V8Q14 5 15 8V13Q15 18 10 18H8Q5 18 4 15L2 12Q2 10 4 10Z' : 'M5 11V5Q5 3 7 4V10V3Q8 1 9 3V10V4Q10 2 11 4V10V6Q12 4 13 6V12L15 10Q17 10 16 13L13 18H8L3 13Q1 10 3 9Z') : arrow;
  path.setAttribute('d', d);
  path.setAttribute('fill', color);
  path.setAttribute('stroke', '#fff');
  path.setAttribute('stroke-width', '1.4');
  path.setAttribute('transform', resize ? `rotate(${mode === 'ns-resize' ? 90 : mode === 'nwse-resize' ? 45 : mode === 'nesw-resize' ? -45 : 0} 10 10)` : '');
  svg.classList.toggle('[translate:-8px_-8px]', resize);
  svg.classList.toggle('[translate:-6px_-6px]', hand);
  node.dataset.cursorMode = mode;
  cursorPaint.set(node, { mode, color, arrow });
}

export function createWordmarkEditor({ container, svg, surface, hitGroup, youCursor, onChange, signal }) {
  let scene = null, baseline = null, rect = null, intent = identity();
  let poseMatrix = null, hitKey = '', lastPointer = null;
  let drag = null, repair = null, idleMs = 0, lastTick = performance.now(), eligibleBefore = false;
  let lastActivity = performance.now();
  let restoreCount = 0, completedRestores = 0, dirty = false, phase = 'intro';
  let pointerType = 'mouse', cursorMode = 'default', disposed = false;
  const held = new Set();
  const coarse = matchMedia('(any-pointer: coarse)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hits = HANDLES.map((_, index) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    node.setAttribute('fill', 'transparent');
    node.setAttribute('data-editor-handle', index);
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', `Resize Ilmantara ${NAMES[index]}. Use arrow keys.`);
    node.setAttribute('class', 'pointer-events-none touch-none focus-visible:stroke-accent focus-visible:stroke-[2px]');
    hitGroup.append(node);
    return node;
  });
  surface.setAttribute('role', 'button');
  surface.setAttribute('aria-label', 'Move Ilmantara. Use arrow keys.');

  function readMatrix() { const m = svg.getScreenCTM(); return m && Number.isFinite(m.a) && Math.abs(m.a * m.d - m.b * m.c) > 1e-9 ? m : null; }
  function matrix() { return poseMatrix || readMatrix(); }
  function toLocal(x, y) { const m = matrix(); return m ? new DOMPoint(x, y).matrixTransform(m.inverse()) : null; }
  function project(x, y) { const m = matrix(); return m ? new DOMPoint(x, y).matrixTransform(m) : null; }
  function scale() { const m = matrix(); return m ? { x: Math.hypot(m.a, m.b), y: Math.hypot(m.c, m.d) } : { x: 1, y: 1 }; }
  function ready() { return scene && scene.time >= scene.duration && !repair; }
  function fromIntent(u) { return { x: baseline.x + u.dx * scene.width, y: baseline.y + u.dy * scene.height, w: baseline.w * u.sx, h: baseline.h * u.sy }; }
  function toIntent(r) { return { dx: (r.x - baseline.x) / scene.width, dy: (r.y - baseline.y) / scene.height, sx: r.w / baseline.w, sy: r.h / baseline.h }; }
  function limits() {
    const s = scale();
    return { left: 12, right: scene.width - 12, top: 84, bottom: scene.height - 24,
      minW: Math.min(scene.width - 24, Math.max(baseline.w * .25, 120 / s.x)),
      minH: Math.min(scene.height - 108, Math.max(baseline.h * .35, 64 / s.y)) };
  }
  function contain(r) {
    const l = limits();
    const w = clamp(r.w, l.minW, l.right - l.left), h = clamp(r.h, l.minH, l.bottom - l.top);
    return { x: clamp(r.x, l.left, l.right - w), y: clamp(r.y, l.top, l.bottom - h), w, h };
  }
  function differs(r) { const s = scale(); return Math.max(Math.abs(r.x - baseline.x) * s.x, Math.abs(r.y - baseline.y) * s.y, Math.abs(r.w - baseline.w) * s.x, Math.abs(r.h - baseline.h) * s.y) > .5; }
  function activity() { idleMs = 0; lastActivity = performance.now(); }
  function notify() { if (!disposed) onChange(); }
  function stopDrag() {
    if (!drag) return;
    const current = drag; drag = null;
    if (current.target.hasPointerCapture?.(current.id)) current.target.releasePointerCapture(current.id);
    activity(); setCursor('default');
  }
  function resize(r, handle, dx, dy) {
    const [hx, hy] = HANDLES[handle], l = limits();
    let left = r.x, right = r.x + r.w, top = r.y, bottom = r.y + r.h;
    if (hx === 0) left = clamp(left + dx, l.left, right - l.minW);
    if (hx === 1) right = clamp(right + dx, left + l.minW, l.right);
    if (hy === 0) top = clamp(top + dy, l.top, bottom - l.minH);
    if (hy === 1) bottom = clamp(bottom + dy, top + l.minH, l.bottom);
    return { x: left, y: top, w: right - left, h: bottom - top };
  }
  function targetAt(x, y, target) {
    if (!ready() || target?.closest?.('a, button, [data-copy-email]')) return null;
    if (target !== surface && !hitGroup.contains(target)) return null;
    const point = toLocal(x, y); if (!point || !rect) return null;
    const half = (pointerType === 'touch' || coarse.matches ? 44 : 24) / 2;
    let nearest = null, distance = Infinity;
    HANDLES.forEach(([hx, hy], index) => {
      const p = project(rect.x + rect.w * hx, rect.y + rect.h * hy);
      if (p && Math.abs(p.x - x) <= half && Math.abs(p.y - y) <= half) {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < distance) { nearest = index; distance = d; }
      }
    });
    if (nearest !== null) return { mode: MODES[nearest], handle: nearest };
    return point.x >= rect.x && point.x <= rect.x + rect.w && point.y >= rect.y && point.y <= rect.y + rect.h ? { mode: 'grab', handle: null } : null;
  }
  function setCursor(mode) {
    if (mode === cursorMode) return;
    cursorMode = mode;
    paintActionCursor(youCursor, mode);
    container.dataset.wordmarkCursor = mode;
  }
  function move(e) {
    poseMatrix = readMatrix();
    lastPointer = { x: e.clientX, y: e.clientY };
    pointerType = e.pointerType;
    activity();
    if (drag && drag.id === e.pointerId) {
      const p = toLocal(e.clientX, e.clientY);
      if (!p) { stopDrag(); notify(); return; }
      const dx = p.x - drag.point.x, dy = p.y - drag.point.y;
      const next = drag.handle === null ? contain({ ...drag.rect, x: drag.rect.x + dx, y: drag.rect.y + dy }) : resize(drag.rect, drag.handle, dx, dy);
      intent = toIntent(next);
      setCursor(drag.handle === null ? 'grabbing' : MODES[drag.handle]);
      e.preventDefault(); notify();
    } else { setCursor(targetAt(e.clientX, e.clientY, e.target)?.mode || 'default'); }
  }
  container.addEventListener('pointermove', move, { signal });
  container.addEventListener('pointerdown', e => {
    poseMatrix = readMatrix();
    lastPointer = { x: e.clientX, y: e.clientY };
    activity(); held.add(e.pointerId); pointerType = e.pointerType;
    if (!e.isPrimary || e.button !== 0 || drag) return;
    const hit = targetAt(e.clientX, e.clientY, e.target), p = toLocal(e.clientX, e.clientY);
    if (!hit || !p) return;
    const target = hit.handle === null ? surface : hits[hit.handle];
    try { target.setPointerCapture(e.pointerId); } catch { return; }
    drag = { id: e.pointerId, target, point: p, rect: { ...rect }, handle: hit.handle };
    setCursor(hit.handle === null ? 'grabbing' : hit.mode);
    e.preventDefault(); notify();
  }, { signal });
  function end(e) {
    const wasHeld = held.delete(e.pointerId);
    if (drag?.id === e.pointerId) {
      stopDrag();
      if (e.type === 'pointerup') setCursor(targetAt(e.clientX, e.clientY, e.target)?.mode || 'default');
      notify();
    }
    if (wasHeld) activity();
  }
  window.addEventListener('pointerup', end, { signal });
  window.addEventListener('pointercancel', end, { signal });
  hitGroup.addEventListener('lostpointercapture', end, { signal });
  surface.addEventListener('lostpointercapture', end, { signal });
  container.addEventListener('pointerleave', () => { if (!drag) setCursor('default'); }, { signal });
  for (const event of ['click', 'wheel', 'focusin', 'keydown']) container.addEventListener(event, activity, { passive: true, signal });
  container.addEventListener('keydown', e => {
    if (!ready() || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    const handle = e.target.getAttribute?.('data-editor-handle');
    if (e.target !== surface && handle === null) return;
    const s = scale(), step = e.shiftKey ? 10 : 1;
    const dx = (e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0) / s.x;
    const dy = (e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0) / s.y;
    intent = toIntent(handle === null ? contain({ ...rect, x: rect.x + dx, y: rect.y + dy }) : resize(rect, Number(handle), dx, dy));
    e.preventDefault(); activity(); notify();
  }, { signal });
  function suspend() { held.clear(); stopDrag(); eligibleBefore = false; lastTick = performance.now(); notify(); }
  window.addEventListener('blur', suspend, { signal });
  document.addEventListener('visibilitychange', suspend, { signal });
  reduced.addEventListener('change', notify, { signal });

  function beginRepair() {
    const s = scale();
    const moved = Math.max(Math.abs(rect.x - baseline.x) * s.x, Math.abs(rect.y - baseline.y) * s.y) > .5;
    const sized = Math.max(Math.abs(rect.w - baseline.w) * s.x, Math.abs(rect.h - baseline.h) * s.y) > .5;
    const moveDuration = moved ? (sized ? .55 : .65) : 0;
    const transferDuration = moved && sized ? .2 : 0;
    const sizeDuration = sized ? (moved ? .55 : .65) : 0;
    repair = { from: { ...intent }, elapsed: 0, moved, sized, moveDuration, transferDuration, sizeDuration, duration: .8 + moveDuration + transferDuration + sizeDuration };
    restoreCount++; setCursor('default');
  }
  function repairIntent() {
    const u = { ...repair.from };
    let time = repair.elapsed - .4;
    if (repair.moved) {
      const t = ease(time / repair.moveDuration); u.dx = mix(u.dx, 0, t); u.dy = mix(u.dy, 0, t); time -= repair.moveDuration + repair.transferDuration;
    }
    if (repair.sized) {
      const t = ease(time / repair.sizeDuration); u.sx = mix(u.sx, 1, t); u.sy = mix(u.sy, 1, t);
    }
    return u;
  }
  function finishRepair() { intent = identity(); repair = null; dirty = false; completedRestores++; idleMs = 0; }

  return {
    resolve(b, nextScene) {
      const now = performance.now();
      const layoutChanged = scene && (scene.width !== nextScene.width || scene.height !== nextScene.height || scene.screenWidth !== nextScene.screenWidth || scene.screenHeight !== nextScene.screenHeight);
      if (layoutChanged) stopDrag();
      scene = nextScene; baseline = { ...b }; poseMatrix = scene.matrix || readMatrix();
      const eligible = scene.visible && !document.hidden && scene.time >= scene.duration;
      const dt = eligible && eligibleBefore ? Math.max(0, now - lastTick) : 0;
      const idleDt = eligible && eligibleBefore ? Math.max(0, now - Math.max(lastTick, lastActivity)) : 0;
      lastTick = now; eligibleBefore = eligible;
      if (scene.time < scene.duration) { intent = identity(); idleMs = 0; repair = null; }
      rect = ready() ? contain(fromIntent(intent)) : fromIntent(repair ? repairIntent() : intent);
      if (layoutChanged && ready()) intent = toIntent(rect);
      dirty = scene.time >= scene.duration && differs(rect);
      if (!dirty && !drag && !repair) { intent = identity(); rect = { ...baseline }; idleMs = 0; }
      if (!repair && ready() && dirty && !drag && held.size === 0) {
        idleMs += idleDt;
        if (idleMs >= 5000) beginRepair();
      }
      if (repair) {
        repair.elapsed += dt / 1000;
        if (reduced.matches || repair.elapsed >= repair.duration) finishRepair();
        rect = repair ? fromIntent(repairIntent()) : { ...baseline };
      }
      phase = scene.time < scene.duration ? 'intro' : repair ? 'restoring' : drag ? (drag.handle === null ? 'moving' : 'resizing') : 'ready';
      container.dataset.wordmarkState = phase;
      container.dataset.wordmarkDirty = String(dirty);
      return { ...rect };
    },
    syncHitAreas() {
      if (!rect) return;
      const unlocked = ready(), s = scale();
      const target = pointerType === 'touch' || coarse.matches ? 44 : 24;
      const nextKey = [rect.x, rect.y, rect.w, rect.h, unlocked, s.x, s.y, target, scene.canvasScale].join('|');
      if (nextKey === hitKey) return;
      hitKey = nextKey;
      for (const [key, value] of Object.entries({ x: rect.x, y: rect.y, width: rect.w, height: rect.h })) surface.setAttribute(key, value);
      surface.classList.toggle('touch-none', unlocked);
      surface.classList.toggle('pointer-events-none', !unlocked);
      surface.classList.toggle('[pointer-events:all]', unlocked);
      surface.setAttribute('tabindex', unlocked ? '0' : '-1');
      surface.setAttribute('aria-disabled', String(!unlocked));
      hits.forEach((node, index) => {
        const [hx, hy] = HANDLES[index];
        const w = target / s.x, h = target / s.y;
        for (const [key, value] of Object.entries({ x: rect.x + rect.w * hx - w / 2, y: rect.y + rect.h * hy - h / 2, width: w, height: h })) node.setAttribute(key, value);
        node.classList.toggle('pointer-events-none', !unlocked);
        node.classList.toggle('[pointer-events:all]', unlocked);
        node.setAttribute('tabindex', unlocked ? '0' : '-1');
        node.setAttribute('aria-disabled', String(!unlocked));
      });
      // Scale only the custom pointer artwork back to CSS pixels, not the text.
      youCursor.style.scale = String(1 / scene.canvasScale);
      // Intro/repair/layout can change the hit beneath a stationary pointer.
      if (unlocked && !drag && lastPointer) setCursor(targetAt(lastPointer.x, lastPointer.y, document.elementFromPoint(lastPointer.x, lastPointer.y))?.mode || 'default');
    },
    repairCursor(restScreen) {
      if (!repair || !rect) return null;
      const transfer = repair.moved && repair.sized ? ease((repair.elapsed - .4 - repair.moveDuration) / repair.transferDuration) : repair.sized && !repair.moved ? 1 : 0;
      const point = { x: rect.x + rect.w * mix(.5, 1, transfer), y: rect.y + rect.h * mix(.5, 1, transfer) };
      const target = project(point.x, point.y);
      if (!target) return null;
      const arrival = ease(repair.elapsed / .4), departure = ease((repair.elapsed - repair.duration + .4) / .4);
      const moveEnd = .4 + repair.moveDuration;
      const sizeStart = moveEnd + repair.transferDuration;
      const mode = repair.moved && repair.elapsed >= .4 && repair.elapsed < moveEnd ? 'grabbing'
        : repair.sized && repair.elapsed >= sizeStart && repair.elapsed < sizeStart + repair.sizeDuration ? 'nwse-resize' : 'default';
      return { x: mix(mix(restScreen.x, target.x, arrival), restScreen.x, departure), y: mix(mix(restScreen.y, target.y, arrival), restScreen.y, departure), mode };
    },
    isLocked: () => phase === 'intro' || phase === 'restoring',
    isDragging: () => !!drag,
    isTouch: () => pointerType === 'touch',
    cursorMode: () => cursorMode,
    snapshot: () => ({ phase, locked: phase === 'intro' || phase === 'restoring', dirty, baseline: baseline && { ...baseline }, rect: rect && { ...rect }, intent: { ...intent }, idleMs, restoreCount, completedRestores, repairElapsed: repair?.elapsed ?? null, repairDuration: repair?.duration ?? null, pointerHeld: held.size, cursorMode }),
    dispose() { disposed = true; held.clear(); stopDrag(); repair = null; },
  };
}
