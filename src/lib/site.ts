export const SITE_URL =
  "https://ilmantara-yk.danamifkhakunnurkhasan.workers.dev";
export const SITE_NAME = "Ilmantara";
export const EMAIL = "hello@ilmantara.com";

export const WHATSAPP_NUMBER = "628995577609";
export const PHONE_DISPLAY = "+62 899-5577-609";

const WA_TEXT_ID =
  "Halo Ilmantara, saya butuh website untuk bisnis saya. Boleh konsultasi gratis?";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_TEXT_ID)}`;

export const ADDRESS = {
  streetAddress: "Jalan Nangka, Wedomartani, Ngemplak",
  locality: "Sleman",
  region: "DI Yogyakarta",
  postalCode: "55584",
  country: "Indonesia",
  geo: { latitude: -7.7329469, longitude: 110.4233715 },
} as const;

export const OPENING_HOURS_DISPLAY = "Senin–Sabtu, 09.00–17.00";
export const OPENING_HOURS = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  opens: "09:00",
  closes: "17:00",
} as const;

// Kisaran harga layanan (Rp2,9 jt – Rp15 jt) — dipakai di schema.org priceRange.
export const PRICE_RANGE = "Rp2,9 juta–Rp15 juta";

export const MAPS_LINK =
  "https://www.google.com/maps/place/Lokaraya/@-7.7329471,110.422891,19z/data=!4m6!3m5!1s0x2e708b4123b57637:0x7617bf822aff38b0!8m2!3d-7.7329469!4d110.4233715!16s%2Fg%2F11ypctc1ny?entry=ttu";

export const DEFAULT_TITLE =
  "Software House Jogja – Jasa Pembuatan Website & Shopify | Ilmantara";
export const DEFAULT_DESCRIPTION =
  "Software house di Yogyakarta. Jasa pembuatan website, landing page, toko online Shopify & aplikasi web Laravel. Konsultasi gratis via WhatsApp sekarang.";
export const DEFAULT_KEYWORDS = [
  "software house jogja",
  "jasa pembuatan website jogja",
  "jasa website shopify",
  "jasa aplikasi web laravel",
  "landing page jogja",
  "toko online shopify",
] as const;
export const AUTHOR = SITE_NAME;
export const PUBLISHER = SITE_NAME;

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "/" : clean}`;
}
