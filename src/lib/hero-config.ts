// Shared hero constants.
//
// These are used by Hero.astro's markup *and* by its client script. They live
// in a module (instead of being passed through Astro's `define:vars`) so the
// script is bundled and minified by Vite. `define:vars` forces the script to
// be emitted as inline, unminified JS, which Lighthouse flags under
// "Minify JavaScript".
import glyphData from "../data/hero-glyphs.json";

export const CANVAS_W = 1440;
export const CANVAS_H = 900;
export const MOBILE_CANVAS_W = 420;
export const MOBILE_CANVAS_H = 860;
export const ORIGINAL_DURATION = 12.4;
export const TOTAL_DURATION = 25;
export const TEAM = [
  { id: "tegar", name: "Tegar", role: "Creative Director", shortRole: "CD", color: "#E5484D", labelColor: "#0C0C0E", message: "Buat Hitam, jangan abu-abu." },
  { id: "nafis", name: "Nafis", role: "UI Designer", shortRole: "UI", color: "#F5C542", labelColor: "#0C0C0E", message: "" },
  { id: "natan", name: "Natan", role: "Developer", shortRole: "Dev", color: "#8B5E3C", labelColor: "#fff", message: "Jarak dan responsif aman." },
];
export const ACCENT = "#4B3BFF";
export const GUIDE_COLOR = "#FF3D6E";
export const COMMENT_TEXT = "Tulisannya bisa lebih besar? Ini yang pertama dibaca klien.";

export { glyphData };
