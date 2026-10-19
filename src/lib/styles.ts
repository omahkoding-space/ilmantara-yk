// Shared style recipes for element-level Tailwind class strings that need to be
// reused verbatim across components (kept here so no component duplicates them).
//
// LINK_UNDERLINE — an accent "blue line" that grows from the left on hover and
// on keyboard focus. Attach it to a title that lives inside an anchor marked
// `group` (e.g. a Journal or portfolio card), so hovering or tab-focusing the
// whole card reveals the line under its title without any layout shift.
export const LINK_UNDERLINE =
  "relative inline-block after:pointer-events-none after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none";
