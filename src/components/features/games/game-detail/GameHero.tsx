// components/GameHero.tsx
// Hero banner fullwidth di bagian paling atas halaman detail game

interface GameHeroProps {
    image: string;
    title: string;
}

export default function GameHero({ image, title }: GameHeroProps) {
    return (
        <>
            <div className="gps-hero position-relative overflow-hidden">
                <img src={image} alt={title} className="gps-hero-bg" />
                <div className="gps-hero-overlay" />
            </div>

            <style jsx>{`
                .gps-hero {
                    width: 100%;
                    height: 340px;
                    background: #0a0c12;
                }
                .gps-hero-bg {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.55;
                    filter: brightness(0.8);
                }
                .gps-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(15,17,24,0.1) 0%, rgba(15,17,24,0.85) 100%);
                }

                @media (max-width: 768px) {
                    .gps-hero { height: 220px; }
                }
            `}</style>
        </>
    );
}