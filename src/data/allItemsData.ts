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
        description: "Experience the ultimate speed challenge! Compete against top racers in this high-octane arcade game. Test your reflexes and strategic driving to the limit.",
        status: "Racing",
        slug: "1",
        href: "/games/1",
        rules: [
            "Any form of cheating or software manipulation will result in an immediate ban.",
            "Each match consists of 3 rounds; the winner proceeds to the next bracket.",
            "Internet stability is the responsibility of the player."
        ],
        videoUrl: "https://www.youtube.com/embed/zviUQmGOrOs",
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
        videoUrl: "https://www.youtube.com/embed/RkQ1cbL8Nqk",
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
        ]
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
        description: "Conquer the cosmos in this high-stakes trivia battle. Put on your astronaut helmet and explore galactic mysteries, space tech, and the deep history of the stars.",
        status: "Trivia",
        slug: "3",
        href: "/games/3",
        rules: [
            "Points are awarded based on difficulty and speed.",
            "Bonus rounds are included for the top 10%",
            "One entry per account."
        ],
        videoUrl: "https://www.youtube.com/embed/L1Zk9vQYtEA",
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
        description: "Test your mental fortitude with the Mystery Cards. Sharp concentration and rapid-fire recall are your only weapons in this atmospheric and enigmatic puzzle game.",
        status: "Puzzle",
        slug: "4",
        href: "/games/4",
        rules: [
            "Strict non-distraction environment recommended.",
            "Pattern recognition speed is the primary metric.",
            "Fair play is mandatory."
        ],
        videoUrl: "https://www.youtube.com/embed/zHkEwT7aKss",
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
