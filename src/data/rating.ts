// components/features/games/game-detail/rating/types.ts

export interface Review {
    id: number;
    name: string;
    avatar: string;
    avatarBg: string;
    date: string;
    rating: number;
    text: string;
    helpful: number;
    device: string;
}

export const RATING_BARS = [
    { star: 5, pct: 80 },
    { star: 4, pct: 15 },
    { star: 3, pct: 3  },
    { star: 2, pct: 1  },
    { star: 1, pct: 1  },
];

export const DUMMY_REVIEWS: Review[] = [
    {
        id: 1,
        name: "Arya Pratama",
        avatar: "A",
        avatarBg: "#4f46e5",
        date: "12 Maret 2025",
        rating: 5,
        text: "Game yang luar biasa seru! Mekanisme merge-nya sangat adiktif dan ceritanya menarik. Sudah bermain 3 minggu dan belum bosan sama sekali.",
        helpful: 24,
        device: "Samsung Galaxy S23",
    },
    {
        id: 2,
        name: "Siti Nurhaliza",
        avatar: "S",
        avatarBg: "#0891b2",
        date: "5 Maret 2025",
        rating: 5,
        text: "Grafisnya cantik banget, alur ceritanya bikin penasaran. Tapi agak berat di HP lama. Overall recommended banget buat yang suka puzzle story!",
        helpful: 18,
        device: "Redmi Note 12",
    },
    {
        id: 3,
        name: "Budi Santoso",
        avatar: "B",
        avatarBg: "#059669",
        date: "28 Februari 2025",
        rating: 4,
        text: "Gameplay-nya asik, tapi ada beberapa bug kecil yang bikin frustasi. Semoga update berikutnya bisa diperbaiki. Tetap 4 bintang karena konsepnya bagus.",
        helpful: 9,
        device: "iPhone 14",
    },
];