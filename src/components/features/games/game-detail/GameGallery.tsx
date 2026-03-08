// components/GameGallery.tsx
// Galeri screenshot dan video horizontal scroll

interface MediaItem {
    type: 'image' | 'video';
    src: string;
}

interface GameGalleryProps {
    media: MediaItem[];
    activeIndex: number;
    onSelect: (idx: number) => void;
    onOpenVideo: () => void;
}

export default function GameGallery({ media, activeIndex, onSelect, onOpenVideo }: GameGalleryProps) {
    if (media.length === 0) return null;

    return (
        <>
            <div className="gps-gallery">
                <div className="gps-gallery-scroll">
                    {media.map((item, idx) => (
                        <div
                            key={idx}
                            className={`gps-gallery-item ${activeIndex === idx ? 'active' : ''}`}
                            onClick={() => {
                                onSelect(idx);
                                if (item.type === 'video') onOpenVideo();
                            }}
                        >
                            <img src={item.src} alt={`Preview ${idx + 1}`} />
                            {item.type === 'video' && (
                                <div className="gps-gallery-play">
                                    <div className="gps-gallery-play-btn">▶</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .gps-gallery {
                    padding: 20px 0;
                    border-bottom: 1px solid var(--border);
                }
                .gps-gallery-scroll {
                    display: flex;
                    gap: 12px;
                    overflow-x: auto;
                    padding-bottom: 8px;
                    scrollbar-width: thin;
                    scrollbar-color: var(--bg-elevated) transparent;
                }
                .gps-gallery-scroll::-webkit-scrollbar { height: 4px; }
                .gps-gallery-scroll::-webkit-scrollbar-thumb { background: var(--bg-elevated); border-radius: 4px; }

                .gps-gallery-item {
                    flex-shrink: 0;
                    width: 284px;
                    height: 160px;
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;
                    border: 2px solid transparent;
                    position: relative;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .gps-gallery-item.active { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(255,122,0,0.2); }
                .gps-gallery-item:hover { border-color: var(--border); }
                .gps-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
                .gps-gallery-item:hover img { transform: scale(1.04); }

                .gps-gallery-play {
                    position: absolute; inset: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(0,0,0,0.4);
                }
                .gps-gallery-play-btn {
                    width: 52px; height: 52px;
                    background: rgba(255,122,0,0.85);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 16px rgba(255,122,0,0.4);
                }

                @media (max-width: 768px) {
                    .gps-gallery-item { width: 220px; height: 124px; }
                }
            `}</style>
        </>
    );
}