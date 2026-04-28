"use client";

// components/GameGallery.tsx
// Galeri screenshot dan video — landscape wide items, Swiper for both strip and lightbox
// Features: Mini Thumbnails, Story Progress Bar, Smooth Reveal (Fade-in Loading)

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
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const stripSwiperRef = useRef<any>(null);
    const lbSwiperRef = useRef<any>(null);
    const thumbsContainerRef = useRef<HTMLDivElement>(null);

    // Track loaded images for smooth reveal
    const handleImageLoad = useCallback((idx: number) => {
        setLoadedImages(prev => {
            // Mencegah infinite loop: jika gambar sudah ditandai loaded, kembalikan state lama
            if (prev.has(idx)) return prev;
            const newSet = new Set(prev);
            newSet.add(idx);
            return newSet;
        });
    }, []);

    // Initializing Swipers (Strip and Lightbox)
    useEffect(() => {
        let stripInstance: any = null;
        let lbInstance: any = null;
        let retryCount = 0;
        const maxRetries = 20;

        const initSwipers = () => {
            if (typeof window !== "undefined" && (window as any).Swiper) {
                const Swiper = (window as any).Swiper;

                if (stripInstance) stripInstance.destroy();
                stripInstance = new Swiper(".gps-strip-swiper", {
                    slidesPerView: "auto",
                    spaceBetween: 16,
                    grabCursor: true,
                    speed: 700,
                    keyboard: { enabled: true },
                    navigation: {
                        nextEl: ".gps-strip-next",
                        prevEl: ".gps-strip-prev",
                    },
                });
                stripSwiperRef.current = stripInstance;

                if (lightbox !== null) {
                    if (lbInstance) lbInstance.destroy();
                    lbInstance = new Swiper(".gps-lb-swiper", {
                        slidesPerView: 1,
                        spaceBetween: 60, /* Memberi ruang antar slide agar tidak menempel */
                        initialSlide: lightbox,
                        speed: 800, /* Diperlambat agar sangat smooth */
                        grabCursor: true,
                        keyboard: { enabled: true },
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

    // Side effects for Lightbox
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

    // Auto-scroll thumbnail strip ke item yang sedang aktif
    useEffect(() => {
        if (lightbox === null || !thumbsContainerRef.current) return;
        const container = thumbsContainerRef.current;
        const activeThumb = container.querySelector(`[data-thumb-index="${lightbox}"]`) as HTMLElement;
        if (activeThumb) {
            const scrollLeft = activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, [lightbox]);

    const handleItemClick = (item: MediaItem, idx: number) => {
        onSelect(idx);
        if (item.type === "video") {
            onOpenVideo();
        } else {
            setLightbox(idx);
        }
        if (stripSwiperRef.current) {
            stripSwiperRef.current.slideTo(idx);
        }
    };

    // Lightbox thumbnail click handler
    const handleLbThumbClick = (idx: number) => {
        if (lbSwiperRef.current) {
            lbSwiperRef.current.slideTo(idx);
        }
        setLightbox(idx);
        onSelect(idx);
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
                                className={`swiper-slide gps-gallery-item${activeIndex === idx ? ' active' : ''}${loadedImages.has(idx) ? ' loaded' : ''}`}
                                onClick={() => handleItemClick(item, idx)}
                            >
                                {/* Shimmer skeleton placeholder */}
                                <div className="gps-shimmer" />
                                <img
                                    src={encodeURI(item.src)}
                                    alt={`Screenshot ${idx + 1}`}
                                    draggable={false}
                                    onLoad={() => handleImageLoad(idx)}
                                    ref={(el) => {
                                        // Fix untuk browser cache: Jika gambar sudah ter-load, langsung tampilkan
                                        if (el && el.complete) {
                                            handleImageLoad(idx);
                                        }
                                    }}
                                />
                                <div className="gps-item-overlay" />
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

                <div className="gps-strip-controls">
                    <button className="gps-strip-nav gps-strip-prev" aria-label="Previous">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <button className="gps-strip-nav gps-strip-next" aria-label="Next">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </div>
            </div>

            {/* ── LIGHTBOX ── */}
            {lightbox !== null && (
                <div className="gps-lightbox" onClick={() => setLightbox(null)}>
                    {/* Top Bar — Story Progress Bar */}
                    <div className="gps-lb-topbar" onClick={e => e.stopPropagation()}>
                        <div className="gps-story-progress">
                            {media.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`gps-story-bar${idx === lightbox ? ' active' : ''}${idx < lightbox ? ' done' : ''}`}
                                    onClick={() => handleLbThumbClick(idx)}
                                />
                            ))}
                        </div>
                        <button className="gps-lb-close" onClick={() => setLightbox(null)} aria-label="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>

                    {/* Main Image Swiper */}
                    <div className="swiper gps-lb-swiper w-100 h-100" onClick={e => e.stopPropagation()}>
                        <div className="swiper-wrapper">
                            {media.map((item, idx) => (
                                <div key={idx} className="swiper-slide d-center">
                                    <div 
                                        className="gps-lb-img-wrap"
                                        style={{ cursor: item.type === "video" ? "pointer" : "default", position: "relative" }}
                                        onClick={() => {
                                            if (item.type === "video") {
                                                setLightbox(null); // Tutup lightbox
                                                onOpenVideo(); // Buka pemutar video utama
                                            }
                                        }}
                                    >
                                        <img src={encodeURI(item.src)} alt={`Screenshot ${idx + 1}`} className="gps-lb-img" />
                                        
                                        {/* Play Button Overlay untuk Video */}
                                        {item.type === "video" && (
                                            <div className="gps-lb-play-overlay">
                                                <div className="gps-lb-play-icon">
                                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="gps-lb-nav gps-lb-prev" aria-label="Previous">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        <button className="gps-lb-nav gps-lb-next" aria-label="Next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                    </div>

                    {/* Mini Thumbnails Strip — Sliding Window (hanya tampilkan 7 terdekat) */}
                    {(() => {
                        const WINDOW_SIZE = 7; // Jumlah thumbnail yang terlihat
                        const HALF = Math.floor(WINDOW_SIZE / 2); // 3
                        const currentIdx = lightbox ?? 0;
                        const total = media.length;

                        // Hitung batas awal dan akhir jendela
                        let start = currentIdx - HALF;
                        let end = currentIdx + HALF;

                        // Koreksi jika melewati batas
                        if (start < 0) { end += Math.abs(start); start = 0; }
                        if (end >= total) { start -= (end - total + 1); end = total - 1; }
                        if (start < 0) start = 0;

                        const hiddenBefore = start; // Gambar tersembunyi di kiri
                        const hiddenAfter = total - 1 - end; // Gambar tersembunyi di kanan
                        const visibleItems = media.slice(start, end + 1);

                        return (
                            <div className="gps-lb-thumbs" ref={thumbsContainerRef} onClick={e => e.stopPropagation()}>
                                {/* Counter kiri — klik untuk lompat ke awal */}
                                {hiddenBefore > 0 && (
                                    <div className="gps-thumb-counter left" onClick={() => handleLbThumbClick(start - 1)}>
                                        +{hiddenBefore}
                                    </div>
                                )}

                                {visibleItems.map((item, i) => {
                                    const realIdx = start + i;
                                    return (
                                        <div
                                            key={realIdx}
                                            data-thumb-index={realIdx}
                                            className={`gps-lb-thumb${realIdx === lightbox ? ' active' : ''}`}
                                            onClick={() => handleLbThumbClick(realIdx)}
                                        >
                                            <img src={encodeURI(item.src)} alt={`Thumb ${realIdx + 1}`} />
                                            {item.type === "video" && (
                                                <div className="gps-thumb-play">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Counter kanan — klik untuk lompat maju */}
                                {hiddenAfter > 0 && (
                                    <div className="gps-thumb-counter right" onClick={() => handleLbThumbClick(end + 1)}>
                                        +{hiddenAfter}
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>
            )}

            <style jsx>{`
                /* ── Strip Container ── */
                .gps-gallery {
                    position: relative;
                    padding: 24px 0;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .gps-strip-swiper {
                    flex: 1;
                    min-width: 0;
                    border-radius: 16px;
                    padding: 24px 0;
                    margin: -24px 0;
                }
                .gps-strip-controls {
                    display: flex;
                    gap: 8px;
                    flex-shrink: 0;
                }
                .gps-strip-nav {
                    width: 48px; height: 48px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.25);
                    color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
                    backdrop-filter: blur(12px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                }
                .gps-strip-nav:hover:not(.swiper-button-disabled) {
                    background: var(--accent, #ff7a00);
                    transform: translateY(-4px) scale(1.05);
                    border-color: var(--accent, #ff7a00);
                    box-shadow: 0 10px 24px rgba(255,122,0,0.4);
                }
                .gps-strip-nav.swiper-button-disabled {
                    opacity: 0.15;
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                    cursor: not-allowed;
                    box-shadow: none;
                }

                /* ── Items ── */
                .gps-gallery-item {
                    width: 380px !important;
                    aspect-ratio: 16/9;
                    height: auto;
                    border-radius: 14px;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.5s cubic-bezier(0.25,1,0.5,1);
                    transform-origin: center;
                    background: #111;
                    opacity: 0.5;
                    filter: grayscale(40%);
                }
                .gps-gallery-item::after {
                    content: '';
                    position: absolute; inset: 0;
                    border-radius: 14px;
                    border: 2px solid transparent;
                    transition: all 0.4s ease;
                    z-index: 5;
                    pointer-events: none;
                }

                /* ── Shimmer Skeleton (Feature 3) ── */
                .gps-shimmer {
                    position: absolute; inset: 0;
                    background: linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.8s ease-in-out infinite;
                    z-index: 1;
                    border-radius: 14px;
                }
                .gps-gallery-item.loaded .gps-shimmer {
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                }
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                /* Image — Smooth Reveal (Feature 3) */
                .gps-gallery-item img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease;
                    opacity: 0;
                    position: relative;
                    z-index: 2;
                }
                .gps-gallery-item.loaded img {
                    opacity: 1;
                }
                .gps-gallery-item:hover img, .gps-gallery-item.active img {
                    transform: scale(1.06);
                }

                /* Active State */
                .gps-gallery-item.active {
                    opacity: 1;
                    filter: grayscale(0%);
                    transform: scale(1);
                    box-shadow: 0 15px 35px -5px rgba(255,122,0,0.25);
                }
                .gps-gallery-item.active::after {
                    border-color: var(--accent, #ff7a00);
                }

                /* Hover State */
                .gps-gallery-item:hover:not(.active) {
                    opacity: 1;
                    filter: grayscale(0%);
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 16px 30px -5px rgba(0,0,0,0.8);
                }
                .gps-gallery-item:hover:not(.active)::after {
                    border-color: rgba(255,255,255,0.6);
                }

                .gps-item-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);
                    opacity: 0.5;
                    transition: opacity 0.5s;
                    z-index: 3;
                }
                .gps-gallery-item:hover .gps-item-overlay,
                .gps-gallery-item.active .gps-item-overlay {
                    opacity: 0.8;
                }

                .gps-item-hover {
                    position: absolute; inset: 0;
                    display: flex; align-items: center; justify-content: center;
                    z-index: 4;
                }

                .gps-zoom-icon {
                    opacity: 0; transform: scale(0.5);
                    transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
                    width: 48px; height: 48px;
                    background: rgba(15,15,20,0.6);
                    border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                }
                .gps-play-btn {
                    transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
                    width: 56px; height: 56px;
                    background: var(--accent, #ff7a00);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    box-shadow: 0 8px 24px rgba(255,122,0,0.4);
                }
                .gps-gallery-item:not(.active):not(:hover) .gps-play-btn {
                    opacity: 0.7; transform: scale(0.9);
                }
                .gps-gallery-item:hover .gps-play-btn,
                .gps-gallery-item.active .gps-play-btn {
                    opacity: 1; transform: scale(1.15);
                    box-shadow: 0 12px 32px rgba(255,122,0,0.6);
                }
                .gps-gallery-item:hover .gps-zoom-icon {
                    opacity: 1; transform: scale(1);
                }

                /* ══════════════════════════════════════ */
                /* ── LIGHTBOX                        ── */
                /* ══════════════════════════════════════ */
                .gps-lightbox {
                    position: fixed; inset: 0;
                    background: rgba(10,10,12,0.92);
                    z-index: 99999;
                    display: flex; flex-direction: column;
                    backdrop-filter: blur(20px) saturate(150%);
                    animation: lbFadeIn 0.4s cubic-bezier(0.16,1,0.3,1);
                }
                @keyframes lbFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                :global(body.lightbox-active) .sidebar,
                :global(body.lightbox-active) .header-section {
                    opacity: 0 !important;
                    pointer-events: none !important;
                    visibility: hidden !important;
                }

                /* ── Story Progress Bar (Feature 2) ── */
                .gps-lb-topbar {
                    display: flex;
                    align-items: center;
                    justify-content: center; 
                    height: 80px; /* Tinggi pasti agar punya jarak aman dari atap layar */
                    padding: 0 32px;
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    z-index: 100;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
                }
                .gps-story-progress {
                    display: flex;
                    width: 100%;
                    max-width: 480px; 
                    gap: 6px;
                    align-items: center;
                    overflow-x: auto;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE */
                }
                .gps-story-progress::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                }
                .gps-story-bar {
                    flex: 1;
                    min-width: 24px; /* Minimal lebar agar tetap bisa diklik */
                    height: 2px;
                    border-radius: 2px;
                    background: rgba(255,255,255,0.2);
                    cursor: pointer;
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                }
                .gps-story-bar:hover {
                    background: rgba(255,255,255,0.4);
                    transform: scaleY(2);
                }
                .gps-story-bar.done {
                    background: var(--accent, #ff7a00);
                }
                .gps-story-bar.active {
                    background: rgba(255,255,255,0.2);
                }
                .gps-story-bar.active::after {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 100%;
                    background: var(--accent, #ff7a00);
                    border-radius: 2px;
                    animation: storyFill 0.5s ease forwards;
                }
                @keyframes storyFill {
                    from { width: 0%; }
                    to { width: 100%; }
                }

                .gps-lb-close {
                    position: absolute;
                    right: 32px; 
                    top: 50%;
                    transform: translateY(-50%);
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
                    backdrop-filter: blur(8px);
                }
                .gps-lb-close:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateY(-50%) scale(1.05) rotate(90deg);
                }

                /* ── Main Image ── */
                .gps-lb-swiper {
                    flex: 1;
                    width: 100%;
                }
                .swiper-slide.d-center {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .gps-lb-img-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    padding: 60px 5vw 90px;
                    /* Efek transisi smooth saat digeser antar slide */
                    transition: transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease;
                    opacity: 0.2;
                    transform: scale(0.85);
                }
                .swiper-slide-active .gps-lb-img-wrap {
                    opacity: 1;
                    transform: scale(1);
                }
                .gps-lb-img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 20px 80px rgba(0,0,0,0.8);
                }
                
                /* Video Play Button di Lightbox */
                .gps-lb-play-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
                .gps-lb-play-icon {
                    width: 88px; height: 88px;
                    border-radius: 50%;
                    background: var(--accent, #ff7a00);
                    color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 10px 40px rgba(255,122,0,0.6);
                    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
                    pointer-events: auto; /* Agar bisa memicu hover dari wrap */
                }
                .gps-lb-img-wrap:hover .gps-lb-play-icon {
                    transform: scale(1.15);
                    box-shadow: 0 15px 50px rgba(255,122,0,0.8);
                }

                /* ── Lightbox Nav ── */
                .gps-lb-nav {
                    width: 60px; height: 60px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
                    backdrop-filter: blur(8px);
                }
                .gps-lb-nav:hover:not(.swiper-button-disabled) {
                    background: rgba(255,255,255,0.15);
                    transform: scale(1.1) translateY(-50%);
                    border-color: rgba(255,255,255,0.3);
                }
                .gps-lb-nav.swiper-button-disabled {
                    opacity: 0; pointer-events: none;
                }
                .gps-lb-prev { position: absolute; left: 32px; top: 50%; transform: translateY(-50%); z-index: 100; }
                .gps-lb-next { position: absolute; right: 32px; top: 50%; transform: translateY(-50%); z-index: 100; }

                /* ── Mini Thumbnails (Feature 1) ── */
                .gps-lb-thumbs {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    padding: 14px 32px 22px;
                    background: rgba(0,0,0,0.75);
                    border-top: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(16px);
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    z-index: 100;
                    animation: thumbsSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s both;
                    /* Scroll horizontal jika gambar banyak */
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    /* Pusatkan konten jika sedikit */
                    margin: 0 auto;
                }
                .gps-lb-thumbs::-webkit-scrollbar {
                    display: none;
                }
                @keyframes thumbsSlideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .gps-lb-thumb {
                    width: 80px; height: 48px;
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: pointer;
                    border: 2px solid rgba(255,255,255,0.25); /* Border terang agar selalu terlihat */
                    opacity: 0.6;
                    filter: grayscale(40%);
                    transition: all 0.3s cubic-bezier(0.25,1,0.5,1);
                    position: relative;
                    flex-shrink: 0;
                    background: #222; /* Fallback background agar tidak menyatu */
                }
                .gps-lb-thumb img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                }
                .gps-lb-thumb:hover {
                    opacity: 1;
                    filter: grayscale(0%);
                    transform: translateY(-4px) scale(1.08);
                    border-color: rgba(255,255,255,0.6);
                }
                .gps-lb-thumb.active {
                    opacity: 1;
                    filter: grayscale(0%);
                    border-color: var(--accent, #ff7a00);
                    box-shadow: 0 0 20px rgba(255,122,0,0.5), 0 0 6px rgba(255,122,0,0.3);
                    transform: scale(1.12);
                }
                .gps-thumb-play {
                    position: absolute; inset: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(0,0,0,0.4);
                }

                /* Counter Badge ("+5" di ujung thumbnail strip) */
                .gps-thumb-counter {
                    width: 48px; height: 48px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: rgba(255,255,255,0.7);
                    font-size: 13px;
                    font-weight: 600;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                }
                .gps-thumb-counter:hover {
                    background: var(--accent, #ff7a00);
                    color: #fff;
                    border-color: var(--accent, #ff7a00);
                    transform: scale(1.1);
                    box-shadow: 0 0 16px rgba(255,122,0,0.4);
                }

                /* ── Responsive ── */
                @media (max-width: 900px) {
                    .gps-gallery-item { width: 300px !important; }
                    .gps-lb-nav { display: none; }
                    
                    /* Centering everything around the image */
                    .gps-lightbox { justify-content: center; }
                    
                    /* Remove fixed absolute positions to stack them nicely */
                    .gps-lb-topbar { 
                        position: relative; 
                        height: 40px; 
                        padding: 0 16px; /* Removed right padding so progress bar can span full width */
                        background: transparent; 
                    }
                    .gps-lb-close {
                        right: 16px;
                        top: -50px; /* Moved up into the empty space */
                        transform: none; /* Override desktop vertical centering */
                    }
                    
                    .gps-lb-swiper { 
                        flex: 0 0 auto; 
                        width: 100%;
                        height: auto !important;
                        aspect-ratio: 16 / 9;
                        margin: 8px 0; 
                    }
                    .gps-lb-img-wrap { 
                        padding: 0; 
                        width: 100%;
                        height: 100%; 
                        max-height: none; 
                        border-radius: 0; 
                        opacity: 1; /* override desktop opacity transition issues on mobile */
                        transform: scale(1);
                    }
                    .gps-lb-img { border-radius: 0; width: 100%; height: 100%; object-fit: contain; }
                    
                    .gps-lb-thumbs { 
                        position: relative; 
                        background: transparent; 
                        border-top: none;
                        padding: 8px 16px;
                        gap: 8px;
                    }
                    .gps-lb-thumb { width: 56px; height: 32px; border-radius: 6px; }
                }
                @media (max-width: 500px) {
                    .gps-gallery-item { width: 240px !important; }
                    .gps-gallery { flex-direction: column; align-items: stretch; }
                    .gps-strip-controls { justify-content: flex-end; }
                    .gps-lb-thumb { width: 44px; height: 26px; }
                }
            `}</style>
        </>
    );
}