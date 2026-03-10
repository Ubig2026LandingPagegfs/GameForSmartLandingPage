// components/features/games/game-detail/rating/RatingStars.tsx

interface RatingStarsProps {
    rating: number;       // 1–5
    size?: "sm" | "md" | "lg";
    color?: string;
}

export default function RatingStars({ rating, size = "md", color }: RatingStarsProps) {
    const sizes = { sm: "0.75rem", md: "1rem", lg: "1.3rem" };

    return (
        <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(s => (
                <span
                    key={s}
                    style={{
                        fontSize: sizes[size],
                        color: s <= rating
                            ? (color ?? "var(--star-color, #f59e0b)")
                            : "var(--bg-elevated, rgba(255,255,255,0.15))",
                        lineHeight: 1,
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}