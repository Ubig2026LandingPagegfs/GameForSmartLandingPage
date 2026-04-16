"use client";

// components/GameGallery.tsx
// Galeri screenshot dan video — landscape wide items, Swiper for both strip and lightbox

import { useRef, useState, useEffect, useCallback } from "react";

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
    const [lightbox, setLightbox] = useState<number | null>(null);
    const stripSwiperRef = useRef<any>(null);
    const lbSwiperRef = useRef<any>(null);

    // Initializing Swipers (Strip and Lightbox)
    useEffect(() => {
        let stripInstance: any = null;
        let lbInstance: any = null;
        let retryCount = 0;
        const maxRetries = 20;

        const initSwipers = () => {
            if (typeof window !== "undefined" && (window as any).Swiper) {
                const Swiper = (window as any).Swiper;

                // Strip Swiper
                if (stripInstance) stripInstance.destroy();
                stripInstance = new Swiper(".gps-strip-swiper", {
                    slidesPerView: "auto",
                    spaceBetween: 8,
                    grabCursor: true,
                    freeMode: true,
                    navigation: {
                        nextEl: ".gps-strip-next",
                        prevEl: ".gps-strip-prev",
                    },
                });
                stripSwiperRef.current = stripInstance;

                // Lightbox Swiper (only if lightbox is open)
                if (lightbox !== null) {
                    if (lbInstance) lbInstance.destroy();
                    lbInstance = new Swiper(".gps-lb-swiper", {
                        slidesPerView: 1,
                        initialSlide: lightbox,
                        speed: 400,
                        grabCursor: true,
                        navigation: {
                            nextEl: ".gps-lb-next",
                            prevEl: ".gps-lb-prev",
                        },
                        on: {
                            slideChange: (swiper: any) => {
                                setLightbox(swiper.realIndex);
                                onSelect(swiper.realIndex);
                            }
                        }
                    });
                    lbSwiperRef.current = lbInstance;
                }
                
                return true;
            }
            return false;
        };

        if (!initSwipers()) {
            const interval = setInterval(() => {
                retryCount++;
                if (initSwipers() || retryCount >= maxRetries) clearInterval(interval);
            }, 300);
            return () => clearInterval(interval);
        }

        return () => {
            if (stripInstance) stripInstance.destroy();
            if (lbInstance) lbInstance.destroy();
        };
    }, [media, lightbox]);

    // Side effects for Lightbox (hide sidebar/header, lock scroll)
    useEffect(() => {
        if (lightbox === null) {
            document.body.classList.remove('lightbox-active');
            document.body.style.overflow = '';
            return;
        }
        
        document.body.classList.add('lightbox-active');
        document.body.style.overflow = 'hidden';

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
        };
        window.addEventListener("keydown", onKey);
        
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.classList.remove('lightbox-active');
            document.body.style.overflow = '';
        };
    }, [lightbox]);

    const handleItemClick = (item: MediaItem, idx: number) => {
        onSelect(idx);
        if (item.type === "video") {
            onOpenVideo();
        } else {
            setLightbox(idx);
        }
    };

    if (media.length === 0) return null;

    return (
        <>
            {/* ── GALLERY STRIP (SWIPER) ── */}
            <div className="gps-gallery">
                <div className="swiper gps-strip-swiper">
                    <div className="swiper-wrapper">
                        {media.map((item, idx) => (
                            <div
                                key={idx}
                                className={`swiper-slide gps-gallery-item${activeIndex === idx ? ' active' : ''}`}
                                onClick={() => handleItemClick(item, idx)}
                            >
                                <img src={encodeURI(item.src)} alt={`Screenshot ${idx + 1}`} draggable={false} />
                                <div className="gps-item-hover">
                                    {item.type === "video" ? (
                                        <div className="gps-play-btn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                    ) : (
                                        <div className="gps-zoom-icon">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows for Strip */}
                <button className="gps-strip-nav gps-strip-prev" aria-label="Previous">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button className="gps-strip-nav gps-strip-next" aria-label="Next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
            </div>

            {/* ── LIGHTBOX (SWIPER) ── */}
            {lightbox !== null && (
                <div className="gps-lightbox" onClick={() => setLightbox(null)}>
                    <button className="gps-lb-close" onClick={() => setLightbox(null)} aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>

                    <div className="gps-lb-counter">{lightbox + 1} / {media.length}</div>

                    <div className="swiper gps-lb-swiper w-100 h-100" onClick={e => e.stopPropagation()}>
                        <div className="swiper-wrapper">
                            {media.map((item, idx) => (
                                <div key={idx} className="swiper-slide d-center">
                                    <div className="gps-lb-img-wrap">
                                        <img src={encodeURI(item.src)} alt={`Screenshot ${idx + 1}`} className="gps-lb-img" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Navigation Arrows for Lightbox */}
                        <button className="gps-lb-nav gps-lb-prev" aria-label="Previous">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        <button className="gps-lb-nav gps-lb-next" aria-label="Next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* ── Strip ── */
                .gps-gallery {
                    position: relative;
                    padding: 24px 0;
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .gps-strip-swiper {
                    flex: 1;
                    min-width: 0;
                }

                .gps-strip-nav {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    z-index: 10;
                }
                .gps-strip-nav:hover { background: var(--accent); border-color: var(--accent); }
                .gps-strip-nav.swiper-button-disabled { opacity: 0.1; cursor: default; }

                /* ── Items ── */
                .gps-gallery-item {
                    width: 420px !important; /* Forces landscape wide */
                    height: 236px;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    border: 2px solid transparent;
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .gps-gallery-item.active {
                    border-color: var(--accent, #ff7a00);
                    box-shadow: 0 0 20px rgba(255,122,0,0.3);
                    transform: scale(0.98);
                }
                .gps-gallery-item:hover {
                    border-color: rgba(255,255,255,0.3);
                }
                .gps-gallery-item img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .gps-gallery-item:hover img { transform: scale(1.08); }

                .gps-item-hover {
                    position: absolute; inset: 0;
                    background: rgba(0,0,0,0);
                    display: flex; align-items: center; justify-content: center;
                    transition: background 0.3s;
                }
                .gps-gallery-item:hover .gps-item-hover { background: rgba(0,0,0,0.4); }

                .gps-zoom-icon {
                    opacity: 0; transform: scale(0.8);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    width: 52px; height: 52px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    backdrop-filter: blur(8px);
                }
                .gps-play-btn {
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    width: 64px; height: 64px;
                    background: var(--accent);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    box-shadow: 0 8px 30px rgba(255,122,0,0.5);
                }
                .gps-gallery-item:hover .gps-play-btn {
                    transform: scale(1.1);
                }
                .gps-gallery-item:hover .gps-zoom-icon {
                    opacity: 1; transform: scale(1);
                }


                /* ── Lightbox ── */
                .gps-lightbox {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.96);
                    z-index: 99999;
                    display: flex; align-items: center; justify-content: center;
                    backdrop-filter: blur(20px);
                    animation: lbFadeIn 0.3s ease;
                }
                @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }

                :global(body.lightbox-active) .sidebar,
                :global(body.lightbox-active) .header-section {
                    opacity: 0 !important;
                    pointer-events: none !important;
                    visibility: hidden !important;
                }

                .gps-lb-img-wrap {
                    max-width: 92vw;
                    max-height: 85vh;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.9);
                    background: #000;
                }
                .gps-lb-img {
                    display: block; width: 100%; height: 100%;
                    object-fit: contain;
                }

                .gps-lb-close {
                    position: absolute; top: 32px; right: 32px;
                    width: 48px; height: 48px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.15);
                    color: #fff; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; z-index: 100;
                    transition: all 0.2s;
                }
                .gps-lb-close:hover { background: #fff; color: #000; transform: scale(1.1); }

                .gps-lb-counter {
                    position: absolute; bottom: 32px; left: 50%;
                    transform: translateX(-50%);
                    font-size: 14px; color: rgba(255,255,255,0.5);
                    font-weight: 500; letter-spacing: 1px;
                    z-index: 100;
                }

                .gps-lb-nav {
                    width: 56px; height: 56px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: all 0.2s;
                }
                .gps-lb-nav:hover { background: rgba(255,255,255,0.15); transform: scale(1.1); }
                .gps-lb-prev { position: absolute; left: 24px; top: 50%; transform: translateY(-50%); z-index: 100; }
                .gps-lb-next { position: absolute; right: 24px; top: 50%; transform: translateY(-50%); z-index: 100; }

                /* ── Responsive ── */
                @media (max-width: 900px) {
                    .gps-gallery-item { width: 320px !important; height: 180px; }
                    .gps-lb-nav { display: none; }
                }
                @media (max-width: 500px) {
                    .gps-gallery-item { width: 260px !important; height: 146px; }
                }
            `}</style>
        </>
    );
}