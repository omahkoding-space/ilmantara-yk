// FAQ beranda — dipakai FAQ.astro (render) dan index.astro (FAQPage JSON-LD).
// Aturan: jawaban 40–60 kata, ulangi keyword pertanyaan sekali,
// sertakan link ke halaman layanan yang cocok.
export type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

export const FAQS: FaqItem[] = [
  {
    question: "Berapa biaya pembuatan website di Jogja?",
    answer:
      "Biaya pembuatan website di Jogja tergantung jumlah halaman, fitur, dan integrasinya. Landing page satu halaman tentu lebih hemat daripada website company profile multi-halaman dengan reservasi atau katalog. Kami selalu memberi estimasi harga tetap sebelum pengerjaan dimulai, jadi tidak ada biaya siluman di tengah jalan.",
    link: {
      label: "Lihat layanan website",
      href: "/jasa-pembuatan-website-jogja/",
    },
  },
  {
    question: "Berapa lama proses pembuatan website atau landing page?",
    answer:
      "Landing page biasanya selesai dalam 1–2 minggu, sedangkan website atau company profile membutuhkan 3–6 minggu tergantung kesiapan materi seperti logo, foto, dan teks. Proses pembuatan website kami bagi per minggu: konsultasi, perencanaan, desain dan pengembangan, lalu peluncuran, sehingga Anda selalu tahu progresnya.",
    link: { label: "Lihat layanan landing page", href: "/jasa-landing-page/" },
  },
  {
    question: "Apakah Ilmantara bisa membuat toko online Shopify?",
    answer:
      "Bisa. Kami menangani setup toko Shopify, custom theme, dan aplikasi Shopify khusus berbasis Laravel untuk kebutuhan yang tidak bisa dipenuhi aplikasi bawaan, misalnya aturan langganan atau integrasi sistem internal. Toko yang kami serahkan cepat, mudah dikelola sendiri, dan siap menerima pembayaran.",
    link: { label: "Lihat jasa Shopify", href: "/jasa-shopify/" },
  },
  {
    question: "Apakah melayani klien di luar Jogja?",
    answer:
      "Ya. Walaupun berbasis di Yogyakarta, kami melayani klien di seluruh Indonesia dan luar negeri, dari Jakarta hingga Berlin. Komunikasi berjalan lewat WhatsApp dan panggilan video terjadwal, dengan demo progres sebelum setiap tahap penting.",
    link: { label: "Hubungi kami", href: "/contact/" },
  },
  {
    question: "Jasa IT Jogja apa saja yang dikerjakan Ilmantara?",
    answer:
      "Ilmantara mengerjakan website company profile, landing page, toko online Shopify, aplikasi web Laravel, dan automasi AI, semua dari studio kami di Yogyakarta. Satu tim dari desain sampai backend, jadi Anda tidak perlu koordinasi banyak vendor.",
    link: { label: "Lihat layanan kami", href: "/#services" },
  },
  {
    question: "Apakah website sudah termasuk SEO dasar dan bisa saya edit sendiri?",
    answer:
      "Setiap website yang kami buat sudah termasuk SEO dasar: judul halaman yang benar, meta description, sitemap, kecepatan loading yang dioptimasi, dan struktur heading yang rapi. Anda juga bisa mengedit teks dan gambar sendiri tanpa menyentuh kode. Saat serah terima kami sertakan panduan singkat perubahannya.",
    link: {
      label: "Lihat layanan website",
      href: "/jasa-pembuatan-website-jogja/",
    },
  },
];
