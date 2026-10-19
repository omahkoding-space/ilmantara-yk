
export type WorkStackItem = { name: string; role: string };

export type WorkProject = {
  slug: string;
  name: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  cover: string;
  coverAlt: string;
  url: string;
  seoTitle: string;
  metaDescription: string;
  stack: WorkStackItem[];
  overview: string[];
  challenge: string[];
  approach: string[];
  built: string[];
  outcome: string[];
};

export const WORK: WorkProject[] = [
  {
    slug: "myart",
    name: "MyArt",
    title: "MyArt: Website Shopify untuk Jasa Komisi Ilustrasi",
    category: "Shopify",
    year: "2025",
    summary:
      "Website Shopify untuk ilustrator yang ingin memamerkan karya dan menerima pesanan komisi. Dilengkapi galeri ilustrasi, halaman layanan, serta FAQ agar calon klien lebih mudah memahami proses pemesanan.",
    cover: "/images/work/project-wellness.webp",
    coverAlt:
      "Halaman utama MyArt dengan carousel karya pilihan dan galeri ilustrasi",
    url: "https://test-ihmol6aj.myshopify.com/",
    seoTitle: "MyArt: Website Shopify Ilustrator | Ilmantara",
    metaDescription:
      "Lihat bagaimana Ilmantara membangun website Shopify untuk ilustrator, lengkap dengan galeri karya, paket komisi, FAQ, dan halaman layanan.",
    stack: [
      {
        name: "Shopify",
        role: "Mengelola website, katalog layanan, dan checkout",
      },
      {
        name: "Liquid",
        role: "Membangun tema Shopify dan komponen galeri sesuai kebutuhan",
      },
    ],
    overview: [
      "MyArt adalah website Shopify untuk ilustrator yang membuka pesanan komisi karya digital. Tujuannya membuat karya tampil menonjol sekaligus membantu calon klien memahami cara memesan.",
      "Website ini menggabungkan galeri karya, paket layanan, syarat dan ketentuan, FAQ, serta halaman kontak. Dengan begitu, pengunjung bisa mengenal karya dan aturan pemesanan tanpa harus mencari semua informasinya lewat media sosial.",
    ],
    challenge: [
      "Karya ilustrasi perlu mendapat perhatian utama. Tantangannya adalah menampilkan banyak gambar dengan rapi tanpa membuat halaman terasa penuh.",
      "Calon klien biasanya ingin tahu soal harga, revisi, dan aturan pemesanan. Informasi yang tersebar bisa membuat mereka harus bertanya berulang kali lewat DM.",
      "Beberapa kebutuhan tampilan galeri dan paket komisi tidak bisa dipenuhi sepenuhnya oleh komponen bawaan tema Shopify, sehingga perlu penyesuaian langsung pada tema.",
    ],
    approach: [
      "Kami menyusun halaman berdasarkan kebutuhan pengunjung: galeri untuk melihat karya, halaman layanan untuk memahami paket komisi, dan halaman syarat serta ketentuan untuk mengetahui aturan pemesanan.",
      "Tema Shopify disesuaikan dengan kebutuhan MyArt, termasuk tampilan galeri dan paket komisi yang memerlukan komponen khusus.",
      "Desain dibuat agar karya menjadi fokus utama. Informasi pendukung tetap ringkas, dengan alur yang memudahkan pengunjung menemukan cara memesan.",
    ],
    built: [
      "Homepage dengan carousel karya pilihan dan sorotan proyek terbaru",
      "Galeri ilustrasi dengan tata letak grid dan pemuatan gambar bertahap",
      "Halaman layanan untuk menjelaskan paket dan detail komisi",
      "Halaman syarat dan ketentuan serta FAQ tentang pemesanan",
      "Halaman About untuk memperkenalkan ilustrator",
      "Navigasi, keranjang Shopify, dan penyesuaian alur toko sesuai kebutuhan",
    ],
    outcome: [
      "MyArt memiliki website yang menampilkan karya dengan lebih teratur sekaligus menyediakan informasi pemesanan dalam satu tempat. Calon klien bisa memeriksa paket, aturan, dan FAQ sebelum menghubungi ilustrator.",
      "Konten karya juga bisa diperbarui melalui dashboard Shopify, sehingga ilustrator dapat mengelola galeri tanpa harus mengubah kode.",
    ],
  },
  {
    slug: "miseart",
    name: "Mise",
    title: "Mise: Website Shopify dengan Avatar 3D Interaktif",
    category: "Shopify",
    year: "2025",
    summary:
      "Website Shopify untuk ilustrator dengan avatar 3D yang bisa mengikuti gerakan wajah pengunjung. Pengalaman interaktif ini memberi Mise tampilan yang berbeda, tanpa menghilangkan fungsi utama website sebagai tempat melihat karya dan memesan komisi.",
    cover: "/images/work/project-vrm.webp",
    coverAlt:
      "Halaman utama Mise dengan avatar 3D interaktif, latar grid oranye, dan teks berjalan",
    url: "https://mise-u5ukp4yf.myshopify.com",
    seoTitle: "Mise: Website Shopify dengan Avatar 3D | Ilmantara",
    metaDescription:
      "Jelajahi proyek Mise, website Shopify untuk ilustrator dengan avatar VRM interaktif, galeri karya, halaman layanan, FAQ, dan tema kustom dari Ilmantara.",
    stack: [
      {
        name: "Shopify",
        role: "Mengelola website, katalog layanan, dan checkout",
      },
      {
        name: "Liquid",
        role: "Membangun tema Shopify dan bagian halaman yang interaktif",
      },
      {
        name: "VRM",
        role: "Menampilkan avatar karakter 3D sebagai bagian dari identitas brand",
      },
      {
        name: "Pelacakan wajah",
        role: "Membuat avatar mengikuti gerakan wajah melalui kamera di browser",
      },
    ],
    overview: [
      "Mise adalah website Shopify untuk ilustrator yang menerima pesanan komisi karakter. Hal yang paling menonjol ada di bagian atas halaman: avatar 3D yang dapat mengikuti gerakan wajah pengunjung setelah mereka memberikan izin akses kamera.",
      "Selain avatar, website ini memiliki halaman About, Showcase, Service, FAQ, syarat dan ketentuan, serta Kontak. Ada juga teks berjalan bertuliskan “Welcome to my little corner!” yang menambah karakter pada tampilannya.",
      "Karena penggemar ilustrasi sering tertarik pada kepribadian dan gaya visual seorang kreator, website ini dirancang agar terasa personal sekaligus tetap mudah digunakan.",
    ],
    challenge: [
      "Website ilustrator sering mengandalkan galeri dan layout yang serupa. Tantangannya adalah membuat Mise punya ciri khas yang langsung terlihat saat pengunjung membuka halaman.",
      "Avatar perlu bisa mengikuti gerakan wajah tanpa membuat pengunjung wajib menggunakan kamera. Website juga perlu tetap menampilkan pengalaman yang layak ketika akses kamera ditolak atau perangkat tidak mendukung fitur tersebut.",
      "Interaksi 3D harus melengkapi pengalaman berbelanja, bukan mengalihkan perhatian dari karya, layanan, dan informasi pemesanan.",
    ],
    approach: [
      "Kami menempatkan avatar VRM di bagian utama halaman. Jika pengunjung mengizinkan akses kamera, avatar dapat mengikuti gerakan wajah mereka. Jika tidak, avatar tetap ditampilkan tanpa pelacakan wajah.",
      "Informasi penting seperti galeri karya, layanan komisi, FAQ, dan syarat pemesanan tetap disusun dengan jelas di bagian halaman lainnya.",
      "Tampilan menggunakan latar grid, teks berjalan, dan tipografi tebal untuk membangun gaya visual yang playful dan sesuai dengan karakter brand.",
    ],
    built: [
      "Hero interaktif dengan avatar VRM yang mengikuti gerakan wajah secara real-time",
      "Tampilan alternatif ketika kamera tidak tersedia atau aksesnya ditolak",
      "Teks berjalan “Welcome to my little corner!” sebagai elemen visual brand",
      "Halaman Showcase untuk galeri karya dan About untuk profil ilustrator",
      "Halaman Service, FAQ, dan syarat serta ketentuan untuk informasi komisi",
      "Bagian bukti sosial dan kontak yang terintegrasi dengan website Shopify",
    ],
    outcome: [
      "Mise memadukan website Shopify dengan avatar 3D interaktif yang memberi pengunjung pengalaman berbeda sejak pertama kali membuka halaman.",
      "Di luar fitur avatar, pengunjung tetap bisa menjelajahi karya, membaca detail layanan, dan menemukan informasi pemesanan melalui struktur halaman yang jelas.",
    ],
  },
];

export function getWork(slug: string): WorkProject | undefined {
  return WORK.find((project) => project.slug === slug);
}

/** Other projects to link to from a case study, most recent first. */
export function relatedWork(slug: string, limit = 3): WorkProject[] {
  return WORK.filter((project) => project.slug !== slug).slice(0, limit);
}
