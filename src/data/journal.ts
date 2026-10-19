// Static journal content — CMS integration removed, edit directly here.
//
// Body lines support a lightweight heading convention:
//   "##  Judul bagian"  → <h2>
//   "### Sub-judul"     → <h3>
//   anything else       → paragraph
// Inline links use Markdown syntax: [teks](/tujuan/).
export type JournalPost = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  /** Short intro used on the card and as the visible lead paragraph. */
  excerpt: string;
  /** Unique <title> (falls back to `title` when omitted). */
  seoTitle?: string;
  /** Unique meta description (falls back to `excerpt` when omitted). */
  metaDescription?: string;
  cover: string;
  coverAlt: string;
  body: string[];
};

export const POSTS: JournalPost[] = [
  {
    slug: "biaya-pembuatan-website-jogja-2026",
    title: "Biaya Pembuatan Website di Jogja 2026: Panduan Jujur",
    seoTitle: "Biaya Pembuatan Website di Jogja 2026: Panduan Jujur | Ilmantara",
    tag: "Biaya",
    date: "13 Okt 2026",
    readTime: "7 mnt baca",
    excerpt: "Berapa biaya pembuatan website di Jogja tahun ini? Rincian komponen biayanya, dari domain sampai fitur, agar Anda tidak salah budget.",
    metaDescription: "Berapa biaya pembuatan website di Jogja 2026? Rincian komponen biayanya: domain, desain, fitur, dan revisi, plus cara menilai harga agar tidak salah budget.",
    cover: "/images/journal/biaya-pembuatan-website-jogja-2026.webp",
    coverAlt: "Sketsa komponen biaya pembuatan website di Jogja tahun 2026",
    body: [
      "Pertanyaan pertama hampir setiap klien kami sama: berapa biaya pembuatan website di Jogja? Jawaban jujurnya: tergantung. Tapi bukan berarti angkanya bisa ditebak sembarangan.",
      "## Tiga hal yang paling menentukan biaya",
      "Sebelum melihat angka, pahami dulu apa yang menggerakkannya. Ada tiga faktor utama: jumlah halaman, kebutuhan desain, dan fitur khusus.",
      "Landing page satu halaman tentu jauh lebih hemat daripada website company profile 12 halaman plus blog. Sama halnya, desain dari template umum lebih murah daripada desain kustom yang digambar khusus untuk brand Anda.",
      "## Kisaran harga pasar 2026",
      "Sebagai patokan kasar, ada tiga kelompok umum di pasar:",
      "### Landing page",
      "Biasanya di kisaran beberapa juta rupiah. Cocok untuk satu tujuan tunggal, misalnya mengubah klik iklan menjadi chat WhatsApp.",
      "### Website company profile UMKM",
      "Umumnya di kisaran belasan juta rupiah. Isinya profil, layanan, portofolio, dan kontak: fondasi kredibilitas jangka panjang.",
      "### Aplikasi web custom",
      "Mulai dari puluhan juta rupiah karena mencakup dashboard dan logika bisnis khusus.",
      "Angka pastinya selalu keluar setelah brief. Waspadai vendor yang memberi harga tanpa bertanya apa-apa lebih dulu.",
      "## Biaya sekali bayar vs biaya tahunan",
      "Pisahkan dua jenis biaya agar tidak kaget di tahun berikutnya. Domain (.com/.id) dan hosting/VPS adalah biaya tahunan yang kecil tapi wajib. Desain dan pembangunan adalah biaya sekali bayar.",
      "Perawatan bulanan sifatnya opsional, ambil bila Anda tidak mau mengurus update dan backup sendiri.",
      "## Waspadai biaya siluman",
      "Biaya tak terduga paling sering muncul dari revisi tak terbatas dan 'fitur kecil' yang ternyata besar. Minta semuanya tertulis: jumlah halaman, jumlah putaran revisi, dan apa yang termasuk garansi.",
      "Di [layanan website kami](/jasa-pembuatan-website-jogja/) setiap proyek memakai estimasi harga tetap yang disepakati sebelum mulai.",
      "## Menilai harga dari hasilnya",
      "Terakhir, ukur harga terhadap hasilnya. Website Rp15 juta yang mendatangkan 5 pelanggan baru per bulan jauh lebih murah daripada website Rp5 juta yang tidak pernah menghasilkan apa-apa. Tanyakan pada diri sendiri: berapa nilai satu pelanggan bagi bisnis Anda?",
    ],
  },
  {
    slug: "berapa-biaya-buat-toko-online-shopify",
    title: "Berapa Biaya Buat Toko Online Shopify? Rinciannya",
    seoTitle: "Berapa Biaya Buat Toko Online Shopify? Rinciannya | Ilmantara",
    tag: "Biaya",
    date: "10 Okt 2026",
    readTime: "6 mnt baca",
    excerpt: "Biaya buat toko online Shopify terdiri dari langganan Shopify, jasa setup, dan opsional aplikasi. Ini rinciannya agar budget Anda pas.",
    metaDescription: "Biaya buat toko online Shopify: langganan Shopify, jasa setup dan desain, serta aplikasi tambahan. Rincian lengkapnya agar budget Anda tepat.",
    cover: "/images/journal/berapa-biaya-buat-toko-online-shopify.webp",
    coverAlt: "Rincian komponen biaya membuat toko online Shopify",
    body: [
      "Sebelum mulai jualan, hampir semua pemilik brand bertanya hal yang sama: berapa biaya buat toko online Shopify? Kabar baiknya, komponennya bisa dihitung dengan jelas.",
      "## Tiga komponen biaya utama",
      "### 1. Langganan Shopify",
      "Paket Basic cukup untuk sebagian besar UMKM. Langganan ini dibayar bulanan atau tahunan langsung ke Shopify dan menjadi biaya operasional tetap Anda.",
      "### 2. Jasa setup dan desain",
      "Mulai dari pengaturan payment gateway dan ongkir sampai custom theme agar tampilannya sesuai brand. Ini bagian yang paling memengaruhi total investasi awal.",
      "### 3. Aplikasi tambahan (opsional)",
      "Diperlukan bila Anda butuh fitur khusus seperti aturan grosir, sistem langganan, atau integrasi gudang.",
      "## Gambaran total investasi awal",
      "Untuk toko standar dengan theme yang disesuaikan brand, total investasi awal biasanya masih di kisaran belasan juta rupiah di luar langganan. Yang mengerek biaya adalah kebutuhan custom: di sinilah aplikasi khusus dibangun.",
      "## Jangan lupa biaya berjalan",
      "Selain langganan Shopify, hitung juga potongan payment gateway per transaksi dan domain tahunan. Jumlahkan semuanya sebagai persentase omzet target. Kalau totalnya di bawah 5–10% omzet, tokonya sehat secara finansial.",
      "## Tips menghemat",
      "Mulai dari kebutuhan inti dulu. Katalog rapi, pembayaran lengkap, dan ongkir otomatis sudah cukup untuk jualan. Fitur canggih bisa menyusul setelah ada pemasukan.",
      "Butuh gambaran untuk kasus Anda? Lihat [jasa Shopify kami](/jasa-shopify/) dan minta estimasi gratis.",
    ],
  },
  {
    slug: "shopify-vs-woocommerce-untuk-umkm",
    title: "Shopify vs WooCommerce untuk UMKM: Mana yang Cocok?",
    seoTitle: "Shopify vs WooCommerce untuk UMKM: Mana yang Cocok? | Ilmantara",
    tag: "Panduan",
    date: "6 Okt 2026",
    readTime: "6 mnt baca",
    excerpt: "Shopify vs WooCommerce untuk UMKM: perbandingan jujur soal biaya, kemudahan, dan kontrol, plus rekomendasi untuk tiap kondisi.",
    metaDescription: "Shopify vs WooCommerce untuk UMKM: perbandingan jujur soal biaya, kemudahan, kontrol, dan perawatan, plus rekomendasi untuk tiap kondisi bisnis.",
    cover: "/images/journal/shopify-vs-woocommerce-untuk-umkm.webp",
    coverAlt: "Perbandingan platform Shopify dan WooCommerce untuk UMKM",
    body: [
      "Shopify dan WooCommerce menyelesaikan masalah yang sama, yaitu jualan online, dengan filosofi berlawanan. Memahami bedanya membuat pilihan jadi jauh lebih mudah.",
      "## Dua filosofi yang berlawanan",
      "Shopify itu seperti apartemen service: semua diurus (server, keamanan, update), Anda tinggal masuk dan jualan. WooCommerce seperti tanah milik sendiri: bebas bangun apa saja, tapi Anda yang mengurus izin dan perawatannya.",
      "## Kapan sebaiknya pilih Shopify",
      "Pilih Shopify bila Anda ingin fokus jualan. Toko bisa mulai dalam hitungan minggu, dashboard-nya sederhana untuk tim, dan checkout-nya sudah teruji. Langganan bulanan adalah harga dari kemudahan itu.",
      "Cocok untuk brand baru sampai menengah yang tidak punya tim teknis sendiri.",
      "## Kapan sebaiknya pilih WooCommerce",
      "Pilih WooCommerce bila Anda butuh kontrol penuh atau ingin menekan biaya langganan jangka panjang. Tidak ada komisi platform dan plugin-nya nyaris tak terbatas.",
      "Syaratnya, Anda (atau vendor Anda) siap mengurus hosting, keamanan, dan update. Tanpa itu, toko WordPress yang tidak dirawat justru jadi beban.",
      "## Aturan praktis kami",
      "Kalau pertanyaan Anda 'kapan bisa jualan?', jawabannya Shopify. Kalau pertanyaannya 'bisakah dibuat seperti ini?', jawabannya perlu didiskusikan, dan sering berujung custom di salah satu platform.",
      "Konsultasikan gratis, kami rekomendasikan yang paling hemat untuk kasus Anda. Anda juga bisa membandingkan dengan [jasa pembuatan toko online](/jasa-pembuatan-toko-online/) kami.",
    ],
  },
  {
    slug: "landing-page-vs-website-company-profile",
    title: "Landing Page vs Website Company Profile: Pilih yang Mana?",
    seoTitle: "Landing Page vs Website Company Profile: Pilih yang Mana? | Ilmantara",
    tag: "Panduan",
    date: "2 Okt 2026",
    readTime: "5 mnt baca",
    excerpt: "Landing page vs website company profile: beda tujuan, beda struktur. Panduan memilih agar budget promosi tidak terbuang.",
    metaDescription: "Landing page vs website company profile: beda tujuan dan struktur. Panduan memilih untuk iklan, kredibilitas, dan budget promosi yang tidak terbuang.",
    cover: "/images/journal/landing-page-vs-website-company-profile.webp",
    coverAlt: "Perbandingan struktur landing page dan website company profile",
    body: [
      "Landing page dan website company profile sering dianggap sama karena sama-sama 'website'. Padahal tujuan keduanya berbeda, dan itu menentukan kapan masing-masing dipakai.",
      "## Beda tujuan, beda struktur",
      "Landing page punya satu tugas untuk satu audiens, misalnya mengubah klik iklan menjadi chat WhatsApp. Company profile melayani banyak kebutuhan sekaligus: profil, layanan, portofolio, blog, dan kontak.",
      "## Kapan landing page menang",
      "Untuk campaign iklan, landing page hampir selalu menang. Pengunjung dari iklan punya perhatian sekitar 3 detik; halaman yang langsung nyambung dengan janji iklan mengubah jauh lebih baik daripada beranda ramai berisi banyak menu.",
      "Bonusnya, skor kualitas iklan ikut naik sehingga biaya per klik turun.",
      "## Kapan company profile wajib",
      "Untuk kredibilitas jangka panjang, company profile tidak tergantikan. Calon pelanggan besar, partner, dan pelamar kerja akan mengetik nama brand Anda di Google, dan yang harus muncul adalah website resmi yang meyakinkan, bukan cuma akun media sosial.",
      "## Jawaban untuk UMKM",
      "Pilihan paling umum untuk UMKM: butuh keduanya, dimulai dari yang menghasilkan dulu. Jalankan iklan ke landing page untuk pemasukan cepat, lalu bangun company profile sebagai rumah permanen.",
      "Kami mengerjakan keduanya, mulai dari [jasa landing page](/jasa-landing-page/) bila targetnya jualan bulan ini.",
    ],
  },
  {
    slug: "cara-memilih-software-house-di-yogyakarta",
    title: "Cara Memilih Software House di Yogyakarta (Tanpa Menyesal)",
    seoTitle: "Cara Memilih Software House di Yogyakarta (Tanpa Menyesal) | Ilmantara",
    tag: "Panduan",
    date: "28 Sep 2026",
    readTime: "6 mnt baca",
    excerpt: "Cara memilih software house di Yogyakarta: 5 cek praktis meliputi portofolio, kontrak harga tetap, proses, garansi, dan komunikasi.",
    metaDescription: "Cara memilih software house di Yogyakarta lewat 5 cek praktis: portofolio yang bisa diklik, harga tetap tertulis, proses, garansi, dan kepemilikan aset.",
    cover: "/images/journal/cara-memilih-software-house-di-yogyakarta.webp",
    coverAlt: "Daftar hal yang perlu dicek sebelum memilih software house di Yogyakarta",
    body: [
      "Yogyakarta penuh talenta digital, justru itu masalahnya: memilih software house di Yogyakarta yang tepat butuh saringan. Berikut lima cek praktis yang kami sarankan, bahkan bila Anda akhirnya tidak memakai jasa kami.",
      "## Lima cek praktis sebelum memilih",
      "### 1. Portofolio yang bisa diklik",
      "Lihat portofolio yang bisa dibuka, bukan sekadar screenshot. Buka websitenya di HP Anda: cepat atau lemot?",
      "### 2. Estimasi harga tetap tertulis",
      "Minta estimasi harga tetap tertulis: lingkup, jumlah revisi, dan timeline. Vendor yang hanya memberi harga lisan adalah bendera merah.",
      "### 3. Proses yang jelas",
      "Tanyakan prosesnya: kapan Anda melihat demo? Bagaimana revisi ditangani? Vendor yang rapi biasanya bisa menjelaskan ini dengan lancar.",
      "### 4. Garansi setelah serah terima",
      "Apa yang terjadi bila ada bug sebulan setelah serah terima? Jawaban yang jelas menandakan vendor siap bertanggung jawab.",
      "### 5. Kualitas komunikasi",
      "Uji komunikasinya sejak chat pertama. Vendor yang lambat saat pendekatan jarang membaik setelah DP dibayar.",
      "## Jangan lupa soal kepemilikan",
      "Satu lagi yang sering dilupakan: kepemilikan. Pastikan domain, hosting, dan kode sumber atas nama Anda, plus Anda bisa mengedit konten sendiri.",
      "Itu standar kami di setiap proyek [pembuatan website](/jasa-pembuatan-website-jogja/), dan seharusnya standar semua vendor.",
    ],
  },
];

export const AUTHOR = {
  initials: "IL",
  name: "Ilmantara",
  bioId:
    "Software house di Yogyakarta. Setiap email tentang tulisan ini dibalas.",
  email: "hello@ilmantara.com",
};
