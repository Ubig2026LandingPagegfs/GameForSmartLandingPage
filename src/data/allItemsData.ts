export interface TournamentInfo {
    id: number;
    type: "game" | "tournament";
    title: string;
    subtitle?: string;
    image: string;
    players: string;
    platform: string;
    rating: string;
    genre: string;
    description: string;
    rules: string[];
    slug: string;
    href: string;
    status: "Active" | "Upcoming" | "Playing" | "Finished" | "Coming Soon" | "Racing" | "Action" | "Trivia" | "Puzzle";
    prizeMoney?: string;
    ticketFee?: string;
    date?: string;
    teams?: string;
    prizes?: { place: string; amount?: string; reward?: string }[];
    practiceAttempts?: number;
    competitionAttempts?: number;
    finalRound?: string;
    videoUrl?: string;
    screenshots?: string[];
    features?: { icon: string; title: string; description: string }[];
    playUrl?: string;
}

export const allItemsData: TournamentInfo[] = [
    // Games
    {
        id: 1,
        type: "game",
        title: "Crazy Race",
        subtitle: "High Speed Challenge",
        image: "/images/crazyrace.webp",
        players: "12k",
        platform: "Mobile & Web",
        rating: "4.8",
        genre: "Arcade",
        description: `Rasakan sensasi balap yang sesungguhnya di Crazy Race — game aksi kecepatan tinggi yang dirancang untuk menguji refleks dan kemampuan strategis kamu di lintasan yang dinamis!

Dalam setiap balapan, kamu akan menghadapi trek dengan belokan tajam, rintangan acak, dan lawan-lawan tangguh dari seluruh dunia. Gunakan item boost, blokir lawan, dan pilih jalur tercepat untuk merebut posisi pertama di setiap race.

Tersedia berbagai mode permainan mulai dari Time Trial untuk melatih kecepatan, hingga mode Grand Prix penuh dengan lapisan strategi dan penghitungan poin kumulatif. Unggah rekormu ke Global Leaderboard dan tunjukkan siapa pembalap terhebat!

• Mode: Single Race · Grand Prix · Time Trial
• Jumlah Lintasan: 12 Trek Unik
• Pemain: Solo & Multiplayer Online`,
        status: "Racing",
        slug: "1",
        href: "/games/1",
        rules: [
            "Any form of cheating or software manipulation will result in an immediate ban.",
            "Each match consists of 3 rounds; the winner proceeds to the next bracket.",
            "Internet stability is the responsibility of the player."
        ],
        videoUrl: "https://www.youtube.com/embed/AJm-cwt0Ba8?si=jj2jNgwrt3vnggRo",
        playUrl: "https://crazy-race-next.vercel.app",
        screenshots: ["/images/crazyrace.webp", "/images/spacequiz.webp", "/assets/img/game-1.png"],
        features: [
            { icon: "ti ti-steering-wheel", title: "Kontrol Presisi Tinggi", description: "Rasakan pengalaman berkendara responsif dengan sistem kontrol yang dioptimalkan untuk kecepatan." },
            { icon: "ti ti-road", title: "Lintasan Menantang", description: "Jelajahi berbagai lintasan dengan tingkat kesulitan yang meningkat dan rintangan unik." },
            { icon: "ti ti-trophy", title: "Sistem Ranking Global", description: "Bersaing dengan pembalap dari seluruh dunia dan pantau posisimu di leaderboard global." },
            { icon: "ti ti-bolt", title: "Mode Turbo Boost", description: "Gunakan boost strategis pada momen tepat untuk melewati lawan dan merebut posisi terdepan." }
        ]
    },
    {
        id: 2,
        type: "game",
        title: "Quiz Rush",
        subtitle: "Brain Blitz",
        image: "/images/quizrush.webp",
        players: "8k",
        platform: "Web",
        rating: "4.9",
        genre: "Action-Trivia",
        description: "Siapkan dirimu untuk tantangan quiz paling menegangkan di tengah kepungan zombie! Quiz Rush: Zombie Edition adalah ajang adu kecerdasan real-time di mana kecepatan dan ketepatan adalah satu-satunya cara untuk bertahan hidup. Jawab pertanyaan dengan cepat sebelum para zombie mendekat dan buktikan bahwa kamulah penyintas paling pintar di dunia.",
        status: "Action",
        slug: "2",
        href: "/games/2",
        rules: [
            "30 detik per pertanyaan untuk bertahan hidup.",
            "Kesalahan jawaban akan mempercepat pergerakan zombie.",
            "Dapatkan skor tertinggi untuk menjadi top survivor.",
            "Admin berhak atas keputusan akhir setiap duel."
        ],
        videoUrl: "https://www.youtube.com/embed/AJm-cwt0Ba8?si=jj2jNgwrt3vnggRo",
        screenshots: [
            "/images/quizrush.webp",
            "/images/spacequiz.webp",
            "/images/memoryquiz.webp"
        ],
        features: [
            { icon: "ti ti-biohazard", title: "Zombie Escape 60 Detik", description: "Jawab cepat atau tertangkap! Selesaikan tantangan dalam waktu terbatas." },
            { icon: "ti ti-skull", title: "Survival Score Challenge", description: "Kumpulkan poin sebanyak mungkin dengan jawaban yang tepat." },
            { icon: "ti ti-world", title: "Global Survivor Leaderboard", description: "Bandingkan peringkatmu dengan penyintas lain di seluruh dunia." },
            { icon: "ti ti-swords", title: "Zombie Horde Duel", description: "Tantang pemain lain dalam duel otak di tengah invasi zombie." }
        ],
        playUrl: "https://quizrun.vercel.app",
    },
    {
        id: 3,
        type: "game",
        title: "Space Quiz",
        subtitle: "Cosmic Knowledge",
        image: "/images/spacequiz.webp",
        players: "5k",
        platform: "Web",
        rating: "4.7",
        genre: "Educational",
        description: `Conquer the cosmos in this high-stakes trivia battle! Space Quiz mengajakmu menjelajahi misteri alam semesta sambil menguji seberapa dalam pengetahuanmu tentang luar angkasa.

Dengan lebih dari 500 pertanyaan yang mencakup astronomi, fisika kosmik, sejarah penjelajahan luar angkasa, dan teknologi antariksa terkini, setiap sesi permainan akan terasa seperti petualangan baru di galaksi yang tak terbatas.

Jawab pertanyaan dengan cepat sebelum waktu habis! Mode Kecepatan Kilat memberikan bonus poin ekstra bagi pemain yang bisa menjawab dalam 5 detik pertama. Naiki tangga dari Cadet hingga Galaxy Master dan buktikan kamu adalah penjelajah terpintar di semesta ini.

• Topik: Astronomi · Fisika · Sejarah Antariksa · Teknologi Luar Angkasa
• Level: Cadet → Astronaut → Commander → Galaxy Master
• Mode: Solo · Duel Head-to-Head · Turnamen Mingguan`,
        status: "Trivia",
        slug: "3",
        href: "/games/3",
        rules: [
            "Points are awarded based on difficulty and speed.",
            "Bonus rounds are included for the top 10%",
            "One entry per account."
        ],
        videoUrl: "https://www.youtube.com/embed/MmB9b5njVbA",
        playUrl: "https://spacequizv1.vercel.app",
        screenshots: ["/images/spacequiz.webp", "/images/crazyrace.webp", "/assets/img/game-3.png"],
        features: [
            { icon: "ti ti-planet", title: "500+ Soal Luar Angkasa", description: "Bank soal komprehensif mencakup astronomi, fisika kosmik, sejarah penjelajahan antariksa, dan teknologi luar angkasa." },
            { icon: "ti ti-clock-bolt", title: "Mode Kecepatan Kilat", description: "Jawab pertanyaan sebelum waktu habis — semakin cepat jawabanmu, semakin besar bonusnya." },
            { icon: "ti ti-chart-bar", title: "Progress Level Galaksi", description: "Naiki tangga dari Cadet hingga Galaxy Master dengan sistem XP dan level yang menantang." },
            { icon: "ti ti-users", title: "Duel Head-to-Head", description: "Tantang temanmu atau pemain acak dalam duel trivia langsung secara real-time." }
        ]
    },
    {
        id: 4,
        type: "game",
        title: "Memory Quiz",
        subtitle: "Pattern Mastery",
        image: "/images/memoryquiz.webp",
        players: "3k",
        platform: "Web",
        rating: "4.6",
        genre: "Puzzle",
        description: `Latih kekuatan otak dan daya ingatmu bersama Memory Quiz — game puzzle yang menantang konsentrasi dan kecepatan recall dalam suasana yang misterius dan mendebarkan!

Setiap sesi permainan menghadirkan susunan kartu acak yang berbeda, sehingga tidak ada dua permainan yang sama. Temukan pasangan kartu yang cocok secepat mungkin sebelum waktu habis untuk mendapatkan skor sempurna.

Semakin tinggi level, semakin banyak kartu yang perlu diingat, semakin singkat waktu yang tersedia. Sistem tingkat kesulitan adaptif memastikan game selalu terasa menantang tanpa terasa terlalu mudah atau terlalu susah.

• Mode: Classic · Challenge · Time Attack · Survival
• Level Kesulitan: Mudah (4×4) → Sedang (6×6) → Sulit (8×8)
• Fitur: Daily Challenge · Streak Bonus · Achievement System`,
        status: "Puzzle",
        slug: "4",
        href: "/games/4",
        rules: [
            "Strict non-distraction environment recommended.",
            "Pattern recognition speed is the primary metric.",
            "Fair play is mandatory."
        ],
        videoUrl: "https://www.youtube.com/embed/TAlKhARUcoY",
        playUrl: "https://memorygame-quiz.vercel.app",
        screenshots: ["/images/memoryquiz.webp", "/images/quizrush.webp", "/assets/img/game-4.png"],
        features: [
            { icon: "ti ti-brain", title: "Latihan Memori Adaptif", description: "Tingkat kesulitan menyesuaikan kemampuanmu secara otomatis untuk melatih daya ingat secara optimal." },
            { icon: "ti ti-cards", title: "Ratusan Pola Kartu Unik", description: "Ratusan kombinasi pola kartu yang berbeda memastikan setiap sesi permainan selalu terasa segar." },
            { icon: "ti ti-medal", title: "Pencapaian & Lencana", description: "Kumpulkan lencana eksklusif atas pencapaian luar biasa dan pamerkan ke seluruh komunitas." },
            { icon: "ti ti-clock", title: "Mode Tantangan Waktu", description: "Selesaikan semua pasangan kartu dalam batas waktu ketat untuk mendapatkan skor sempurna." }
        ]
    },
    {
        id: 5,
        type: "game",
        title: "NitroQuiz",
        subtitle: "Speed Trivia",
        image: "/images/quizrush.webp",
        players: "256",
        platform: "Web",
        rating: "4.8",
        genre: "Trivia",
        description: "Tantang pengetahuanmu dengan cepat di NitroQuiz.",
        status: "Trivia",
        slug: "5",
        href: "/games/5",
        rules: ["Jawab pertanyaan secepat mungkin.", "Pemain dengan skor tertinggi menang."],
        playUrl: "#",
        screenshots: ["/images/quizrush.webp", "/assets/img/game-2.png"],
        features: [
            { icon: "ti ti-bolt", title: "Kecepatan Menjawab", description: "Waktu sangat berharga, jawab secepatnya." },
            { icon: "ti ti-trophy", title: "Leaderboard", description: "Raih skor tertinggi." }
        ]
    },
    {
        id: 6,
        type: "game",
        title: "Axiom",
        subtitle: "Strategic Mastery",
        image: "/assets/img/game3.png",
        players: "128",
        platform: "Web",
        rating: "4.9",
        genre: "Strategy",
        description: "Susun strategimu dan taklukkan lawan di Axiom.",
        status: "Puzzle",
        slug: "6",
        href: "/games/6",
        rules: ["Kembangkan strategi bermainmu.", "Hindari kesalahan untuk menang."],
        playUrl: "#",
        screenshots: ["/assets/img/game3.png", "/assets/img/game-3.png"],
        features: [
            { icon: "ti ti-chess", title: "Tantangan Strategi", description: "Pikirkan beberapa langkah ke depan." },
            { icon: "ti ti-medal", title: "Peringkat", description: "Raih peringkat master." }
        ]
    },
    {
        id: 7,
        type: "game",
        title: "Zigma",
        subtitle: "Survival Action",
        image: "/assets/img/game4.png",
        players: "512",
        platform: "Web",
        rating: "4.7",
        genre: "Action",
        description: "Bertahan hidup dan kalahkan musuh di dunia Zigma.",
        status: "Action",
        slug: "7",
        href: "/games/7",
        rules: ["Bertahan hidup selama mungkin.", "Kalahkan target yang datang."],
        playUrl: "#",
        screenshots: ["/assets/img/game4.png", "/assets/img/game-4.png"],
        features: [
            { icon: "ti ti-swords", title: "Aksi Tanpa Henti", description: "Hadapi berbagai musuh." },
            { icon: "ti ti-shield", title: "Survival", description: "Daya tahan adalah kunci utama." }
        ]
    },
    // Tournaments
    {
        id: 11,
        type: "tournament",
        title: "Grand Prix Championship",
        subtitle: "Elite Racing Series",
        image: "/assets/img/slide-3d-1.png",
        prizeMoney: "Rp 800.000",
        ticketFee: "Free Entry",
        date: "07 OCT, 5:10 AM",
        teams: "12/12",
        players: "128",
        platform: "Mobile & Web",
        rating: "4.8",
        genre: "Arcade",
        description: "Join the elite ranks in the Grand Prix Championship! This premier racing event brings together 128 of the world's most skilled drivers to compete for glory and a significant prize pool. Navigate challenging circuits and outmaneuver your rivals in a high-stakes, single-elimination battle where only the fastest survive.",
        status: "Active",
        slug: "grand-prix-championship",
        href: "/competitions/grand-prix-championship",
        rules: [
            "Any form of cheating or software manipulation will result in an immediate ban.",
            "Each match consists of 3 rounds; the winner proceeds to the next bracket.",
            "Competition admins have the final say in all disputes."
        ],
        prizes: [
            { place: "1st", amount: "Rp 400k" },
            { place: "2nd", amount: "Rp 250k" },
            { place: "3rd", amount: "Rp 150k" }
        ]
    },
    {
        id: 12,
        type: "tournament",
        title: "Galaxy Trivia Masters",
        subtitle: "Space Knowledge Battle",
        image: "/assets/img/slide-3d-2.png",
        prizeMoney: "Rp 1.500.000",
        ticketFee: "Free Entry",
        date: "12 OCT, 8:00 PM",
        teams: "32/32",
        players: "256",
        platform: "Web",
        rating: "4.9",
        genre: "Trivia",
        description: "Test your cosmic knowledge in the Galaxy Trivia Masters! This interstellar competition challenges 256 contestants across the galaxy to prove their mastery of space science, history, and technology. Journey through multiple rounds of rapid-fire questions to claim your place among the trivia elite and win amazing prizes.",
        status: "Upcoming",
        slug: "galaxy-trivia-masters",
        href: "/competitions/galaxy-trivia-masters",
        rules: [
            "30 seconds per question.",
            "No external help or search engines allowed.",
            "In case of a tie, the faster average response time wins."
        ],
        prizes: [
            { place: "1st", amount: "Rp 750k" },
            { place: "2nd", amount: "Rp 500k" },
            { place: "3rd", amount: "Rp 250k" }
        ]
    },
    {
        id: 13,
        type: "tournament",
        title: "Memory Peak Tournament",
        subtitle: "Ultimate Mind Games",
        image: "/assets/img/slide-3d-3.png",
        prizeMoney: "Rp 500.000",
        ticketFee: "Free Entry",
        date: "20 OCT, 3:00 PM",
        teams: "16/16",
        players: "64",
        platform: "Web",
        rating: "4.7",
        genre: "Puzzle",
        description: "Reach the summit of mental performance in the Memory Peak Tournament! Battle against 64 other participants in a series of increasingly complex memory and pattern recognition challenges. This tournament tests your focus, speed, and cognitive endurance in a high-pressure environment where every millisecond counts towards victory.",
        status: "Playing",
        slug: "memory-peak-tournament",
        href: "/competitions/memory-peak-tournament",
        rules: [
            "Pattern recognition speed is the primary metric.",
            "Fair play is mandatory.",
            "One entry per account."
        ],
        prizes: [
            { place: "1st", amount: "Rp 250k" },
            { place: "2nd", amount: "Rp 150k" },
            { place: "3rd", amount: "Rp 100k" }
        ]
    },
    {
        id: 14,
        type: "tournament",
        title: "Master Mind Plate",
        subtitle: "The Strategist's Gauntlet",
        image: "/assets/img/slide-3d-4.png",
        prizeMoney: "Rp 800.000",
        ticketFee: "Free Entry",
        date: "07 OCT, 5:10 AM",
        teams: "12/12",
        players: "32",
        platform: "Web",
        rating: "4.6",
        genre: "Puzzle",
        description: "Enter The Strategist's Gauntlet in the Master Mind Plate. This tournament is designed for those with exceptional focus and rapid-recall capabilities. Navigate through complex pattern recognition trials that push your mental fortitude to its absolute limit in a competitive arena.",
        status: "Upcoming",
        slug: "master-mind-plate",
        href: "/competitions/master-mind-plate",
        rules: [
            "Strict non-distraction environment recommended.",
            "Pattern recognition speed is the primary metric.",
            "Fair play is mandatory."
        ],
        prizes: [
            { place: "1st Place", reward: "Rp 400.000" },
            { place: "2nd Place", reward: "Rp 250.000" },
            { place: "3rd Place", reward: "Rp 150.000" }
        ]
    },
    {
        id: 21,
        type: "tournament",
        title: "Lomba Cerdas Cermat – Malangraya",
        subtitle: "Edisi Khusus Jawa Timur",
        image: "/assets/img/malang-raya-banner-v2.png",
        prizeMoney: "Rp 5.000.000",
        ticketFee: "Rp 25.000",
        date: "April – Mei",
        teams: "100 Player",
        players: "100",
        platform: "Web",
        rating: "5.0",
        genre: "Educational",
        description: `Kompetisi Cerdas Cermat tingkat Malang Raya bagi siswa SD hingga SMK. Ajang ini merupakan kesempatan emas bagi pelajar di wilayah Malang untuk menunjukkan kecerdasan, ketangkasan, dan sportivitas mereka dalam kompetisi intelektual yang menantang.\n\nDiselenggarakan oleh Gameforsmart.com dengan dukungan dari para ahli edukasi, kompetisi ini mencakup berbagai mata pelajaran mulai dari Matematika, Sains, hingga Kebudayaan Umum. Peserta akan melewati serangkaian babak eliminasi yang ketat sebelum mencapai babak Final yang megah.\n\n• Penyisihan: April – Mei | Final: Juni\n• Lokasi: Online & Offline (Final)\n• Biaya Pendaftaran: Rp 25.000/player\n• Total Hadiah: Rp 5.000.000 + Sertifikat & Medali\n\nSegera daftarkan dirimu dan jadilah kebanggaan sekolahmu di tingkat Malang Raya!`,
        status: "Upcoming",
        slug: "malang-raya",
        href: "/competitions/malang-raya",
        finalRound: "Juni",
        rules: [
            "Terbuka untuk siswa SD, SMP, SMA Sederajat.",
            "Pendaftaran melalui website resmi Gameforsmart.com.",
            "Keputusan panitia bersifat mutlak."
        ],
        prizes: [
            { place: "JUARA 1", amount: "Rp 2.500.000", reward: "Trofi Eksklusif & Sertifikat Nasional Gold" },
            { place: "JUARA 2", amount: "Rp 1.500.000", reward: "Medali Perak & Sertifikat Nasional Silver" },
            { place: "JUARA 3", amount: "Rp 1.000.000", reward: "Medali Perunggu & Sertifikat Nasional Bronze" }
        ]
    },
    {
        id: 22,
        type: "tournament",
        title: "Lomba Cerdas Cermat – Jawa Timur",
        subtitle: "Tingkat Provinsi",
        image: "/assets/img/lomba-cerdas-cermat-jawatimur.jpg",
        prizeMoney: "Rp 10.000.000",
        ticketFee: "Rp 25.000",
        date: "Juli",
        teams: "100 Player",
        players: "100",
        platform: "Web",
        rating: "5.0",
        genre: "Educational",
        description: `Kompetisi Cerdas Cermat tingkat Jawa Timur yang mempertemukan sekolah-sekolah terbaik antar wilayah. Tunjukkan keunggulan intelektual sekolahmu dan buktikan bahwa timmu adalah yang terbaik di seluruh provinsi!\n\nJawa Timur Competition adalah ajang tahunan yang paling dinanti oleh ribuan pelajar. Tahun ini, kami menghadirkan tantangan yang lebih kompleks dengan kategori soal yang mencakup literasi digital, penalaran logis, dan pengetahuan global. Setiap tim akan bersaing dalam suasana kompetitif yang sehat untuk memperebutkan gelar Juara Provinsi.\n\n• Penyisihan: Juli | Final: Agustus\n• Cakupan: Seluruh Kabupaten/Kota di Jawa Timur\n• Biaya Pendaftaran: Rp 25.000/player\n• Hadiah: Rp 10.000.000 + Trofi Bergilir Gubernur\n\nJangan lewatkan kesempatan untuk mengukir sejarah! Amankan kursimu sekarang!`,
        status: "Upcoming",
        slug: "jawa-timur",
        href: "/competitions/jawa-timur",
        finalRound: "Agustus",
        rules: [
            "Terbuka untuk seluruh sekolah di wilayah Jawa Timur.",
            "Setiap sekolah dapat mengirimkan lebih dari satu wakil.",
            "Wajib mengikuti seleksi babak penyisihan."
        ],
        prizes: [
            { place: "JUARA 1", amount: "Rp 5.000.000", reward: "Trofi Eksklusif & Sertifikat Nasional Gold" },
            { place: "JUARA 2", amount: "Rp 3.000.000", reward: "Medali Perak & Sertifikat Nasional Silver" },
            { place: "JUARA 3", amount: "Rp 2.000.000", reward: "Medali Perunggu & Sertifikat Nasional Bronze" }
        ]
    },
    {
        id: 23,
        type: "tournament",
        title: "Lomba Cerdas Cermat – Nasional",
        subtitle: "Kejuaraan Indonesia Bersinar",
        image: "/assets/img/lomba-cerdas-cermat-nasional.jpg",
        prizeMoney: "Rp 15.000.000 - Rp 20.000.000",
        ticketFee: "Rp 50.000",
        date: "Agustus – September",
        teams: "200 Player",
        players: "100",
        platform: "Web",
        rating: "5.0",
        genre: "Educational",
        description: `Kompetisi prestisius tingkat Nasional yang menghadirkan elite pelajar terbaik dari seluruh Indonesia. Ajang eksklusif bagi calon pemimpin bangsa untuk beradu argumen, pengetahuan, dan strategi di panggung nasional.\n\nNasional Cerdas Cermat (NCC) bukan sekadar lomba, melainkan platform bagi tunas bangsa untuk membangun jejaring, mengasah mentalitas juara, dan mendapatkan rekognisi di tingkat tertinggi. Finalis akan bertanding secara live dan disaksikan oleh jutaan penonton di seluruh Indonesia.\n\n• Penyisihan: Agustus – September | Final: Oktober\n• Juri: Akademisi & Praktisi Profesional\n• Biaya Pendaftaran: Rp 50.000/player\n• Hadiah Utama: Rp 15.000.000+ per pemenang\n\nUkir prestasi nasional dan rebut hadiah utama sebagai bukti kecerdasanmu!`,
        status: "Upcoming",
        slug: "nasional",
        href: "/competitions/nasional",
        finalRound: "Oktober",
        rules: [
            "Competition skala Nasional dengan pengawasan ketat.",
            "Hadiah utama untuk pemenang terbaik.",
            "Dokumentasi resmi akan disiarkan secara online."
        ],
        prizes: [
            { place: "JUARA 1", amount: "Rp 10.000.000", reward: "Trofi Eksklusif & Sertifikat Nasional Gold" },
            { place: "JUARA 2", amount: "Rp 5.000.000", reward: "Medali Perak & Sertifikat Nasional Silver" },
            { place: "JUARA 3", amount: "Rp 2.500.000", reward: "Medali Perunggu & Sertifikat Nasional Bronze" }
        ]
    },
];
