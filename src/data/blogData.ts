export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string[];
  excerpt: string;
  content: string;
  image: string;
  slug: string;
}

export const blogData: BlogPost[] = [
  {
    id: 1,
    title: "Bagaimana Teknologi Mengubah Masa Depan Dunia Kerja di 2024",
    author: "Taufik Hidayat",
    date: "16 Oktober 2024",
    category: ["TEKNOLOGI", "BISNIS"],
    excerpt: "Di dunia yang terus berkembang saat ini, mendongeng telah menjadi alat yang ampuh untuk koneksi. Platform unik untuk individu...",
    content: `
      <p>Memasuki tahun 2024, lanskap profesional dunia mengalami transformasi besar yang dipacu oleh integrasi teknologi kecerdasan buatan (AI) dan otomatisasi. Perubahan ini bukan sekadar tren sesaat, melainkan pergeseran paradigma tentang bagaimana kita memandang produktivitas dan kolaborasi.</p>
      
      <h2>1. Kecerdasan Buatan sebagai Rekan Kerja</h2>
      <p>AI tidak lagi hanya digunakan untuk analisis data berat. Kini, asisten virtual berbasis AI membantu dalam penulisan laporan, manajemen jadwal, hingga pengambilan keputusan strategis. Hal ini memungkinkan pekerja manusia untuk lebih fokus pada tugas-tugas kreatif dan empati yang tidak bisa digantikan oleh mesin.</p>
      
      <h2>2. Fleksibilitas Tanpa Batas</h2>
      <p>Model kerja hibrida kini menjadi standar global. Dengan alat kolaborasi berbasis cloud yang semakin canggih, jarak geografis bukan lagi penghalang. Tim dapat bekerja secara sinkron meskipun berada di zona waktu yang berbeda.</p>
      
      <h2>3. Kebutuhan Akan 'Soft-Skills'</h2>
      <p>Di tengah dominasi mesin, kemampuan manusia dalam berkomunikasi, bernegosiasi, dan kepemimpinan justru menjadi aset yang paling berharga. Perusahaan kini lebih menghargai kecerdasan emosional (EQ) daripada sekadar kemampuan teknis yang dapat dipelajari oleh algoritma.</p>
    `,
    image: "/assets/img/blog/blog1.webp",
    slug: "teknologi-masa-depan-kerja"
  },
  {
    id: 2,
    title: "Masa Depan Pembelajaran: Tren Smart Learning dan AI",
    author: "Siti Aminah",
    date: "29 September 2024",
    category: ["EDUKASI", "TREN"],
    excerpt: "Cari tahu mengapa tahun 2024 diprediksi menjadi tahun penting bagi teknologi pembelajaran dan dampaknya terhadap industri edukasi.",
    content: `
      <p>Dunia pendidikan tidak luput dari revolusi digital. Smart Learning kini hadir sebagai solusi untuk menciptakan pengalaman belajar yang lebih personal, adaptif, dan menyenangkan bagi pelajar di segala usia.</p>
      
      <h2>Personalisasi Kurikulum</h2>
      <p>Dengan bantuan AI, platform edukasi dapat menganalisis gaya belajar setiap siswa secara individu. Jika seorang siswa lebih cepat menangkap informasi melalui visual, sistem akan secara otomatis menyuguhkan lebih banyak infografis dan video pembelajaran.</p>
      
      <h2>Gamifikasi dalam Kelas</h2>
      <p>Belajar bukan lagi sekadar menghafal. Integrasi elemen game seperti skor, leaderboard, dan reward membuat motivasi belajar siswa meningkat tajam. Inilah inti dari apa yang kami perjuangkan di GameForSmart: membuat belajar semenarik mungkin.</p>
      
      <h2>Aksesibilitas Global</h2>
      <p>Teknologi memungkinkan seorang anak di desa terpencil untuk mengakses materi pembelajaran yang sama dengan mereka yang berada di kota besar. Demokratisasi informasi adalah kunci utama dari Smart Learning di dekade ini.</p>
    `,
    image: "/assets/img/blog/blog2.webp",
    slug: "tren-smart-learning-ai"
  },
  {
    id: 3,
    title: "Strategi Menang di Arena Esports Nasional",
    author: "Budi Santoso",
    date: "12 September 2024",
    category: ["ESPORTS", "GAME"],
    excerpt: "Kuasai panggung kompetisi dengan strategi pro. Pelajari bagaimana atlet esports papan atas mempersiapkan diri menghadapi turnamen besar.",
    content: `
      <p>Esports kini telah diakui sebagai cabang olahraga resmi yang prestisius. Menjadi juara bukan hanya tentang refleks yang cepat, tetapi juga tentang kedisiplinan mental dan strategi analitis yang mendalam.</p>
      
      <h2>Persiapan Fisik dan Mental</h2>
      <p>Atlet esports profesional menjalani latihan fisik secara rutin. Stamina yang baik sangat krusial untuk menjaga konsentrasi selama pertandingan panjang yang intens. Selain itu, latihan meditasi membantu mereka mengelola tekanan saat dalam situasi kritis.</p>
      
      <h2>Analisis Meta Game</h2>
      <p>Dunia game terus berubah dengan adanya pembaruan (patch). Pemain harus selalu 'up-to-date' dengan strategi yang paling efektif saat ini. Mempelajari rekaman pertandingan lawan adalah bagian dari rutinitas harian tim juara.</p>
      
      <h2>Komunikasi Tim yang Efektif</h2>
      <p>Di arena kompetitif, satu kesalahan komunikasi dapat berakibat fatal. Tim pemenang memiliki protokol komunikasi yang singkat, padat, dan jelas. Kepercayaan antar rekan setim adalah pondasi dari setiap kemenangan besar.</p>
    `,
    image: "/assets/img/blog/blog3.webp",
    slug: "strategi-menang-esports"
  },
  {
    id: 4,
    title: "Meningkatkan Fokus Anak Melalui Game Edukasi",
    author: "Dr. Laila",
    date: "05 September 2024",
    category: ["EDUKASI", "PARENTING"],
    excerpt: "Game tidak selalu buruk. Temukan bagaimana game yang dirancang khusus dapat membantu meningkatkan kognitif dan fokus anak secara menyenangkan.",
    content: `
      <p>Sebagai orang tua, kita sering merasa khawatir tentang 'screen time' anak. Namun, penelitian terbaru menunjukkan bahwa tidak semua waktu di depan layar itu merugikan. Game edukasi yang tepat justru dapat menjadi stimulus bagi perkembangan otak.</p>
      
      <h2>Stimulasi Kognitif</h2>
      <p>Game puzzle dan logika memaksa otak untuk memecahkan masalah dengan cara yang kreatif. Ini melatih kemampuan analisis anak sejak dini dengan cara yang tidak membosankan.</p>
      
      <h2>Melatih Kesabaran dan Ketekunan</h2>
      <p>Dalam game, anak akan mengalami kegagalan berulang kali sebelum berhasil melewati level tertentu. Proses ini secara tidak langsung mengajarkan mereka untuk tidak mudah menyerah dan terus mencoba hingga berhasil.</p>
    `,
    image: "/assets/img/blog/blog2.webp",
    slug: "fokus-anak-game-edukasi"
  },
  {
    id: 5,
    title: "Review: Axiom - Game Puzzle Paling Menantang Tahun Ini",
    author: "Admin Game",
    date: "01 September 2024",
    category: ["GAME", "REVIEW"],
    excerpt: "Kami mengupas tuntas mekanisme gameplay Axiom, game yang sedang viral karena tingkat kesulitannya yang membuat ketagihan.",
    content: `
      <p>Game Axiom telah mengambil alih dunia game puzzle dengan badai. Sederhana dalam desain namun sangat dalam dalam strategi, Axiom adalah bukti bahwa ide brilian bisa datang dari konsep yang minimalis.</p>
      
      <h2>Visual Minimalis, Tantangan Maksimal</h2>
      <p>Jangan tertipu oleh tampilannya yang bersih. Setiap level di Axiom dirancang untuk menantang logika spasial Anda hingga ke batas. Tidak ada elemen keberuntungan, murni hanya kemampuan otak Anda yang diuji.</p>
      
      <h2>Audio yang Menenangkan</h2>
      <p>Meskipun menantang, Axiom dibalut dengan musik latar yang meditatif. Ini membantu pemain tetap tenang saat mencoba memecahkan teka-teki yang paling sulit sekalipun.</p>
    `,
    image: "/assets/img/blog/blog1.webp",
    slug: "review-axiom-puzzle"
  },
  {
    id: 6,
    title: "Membangun Karier di Industri Game Development",
    author: "Kevin Flynn",
    date: "25 Agustus 2024",
    category: ["KARIER", "TEKNOLOGI"],
    excerpt: "Ingin bekerja di industri game? Berikut adalah langkah-langkah konkret yang harus Anda ambil untuk mulai membangun portfolio yang menarik.",
    content: `
      <p>Industri game global bernilai miliaran dolar, dan permintaannya akan talenta baru tidak pernah surut. Jika Anda bermimpi untuk menciptakan game Anda sendiri, sekarang adalah waktu terbaik untuk memulai.</p>
      
      <h2>Pilih Spesialisasi Anda</h2>
      <p>Industri ini sangat luas. Apakah Anda ingin menjadi programmer, desainer grafis, penulis cerita, atau sound designer? Fokuslah pada satu bidang terlebih dahulu dan kuasai alat-alat yang diperlukan seperti Unity, Unreal Engine, atau Blender.</p>
      
      <h2>Mulai dari Proyek Kecil</h2>
      <p>Jangan mencoba membuat game AAA dalam satu malam. Mulailah dengan membuat prototipe sederhana. Game jam adalah tempat yang sempurna untuk melatih kecepatan kerja dan kolaborasi tim Anda.</p>
    `,
    image: "/assets/img/blog/blog3.webp",
    slug: "karier-game-development"
  }
];
