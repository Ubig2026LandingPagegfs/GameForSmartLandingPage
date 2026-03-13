"use client";
// components/VideoModal.tsx
// Modal fullscreen untuk memutar trailer/video game

import { useEffect } from "react";

interface VideoModalProps {
    videoUrl: string;
    onClose: () => void;
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const getEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[2].length === 11) ? match[2] : null;
        if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        return url; // fallback
    };

    return (
        <>
            <div className="gps-modal-portal">
                <div className="gps-modal-overlay" onClick={onClose}>
                    <button 
                      className="gps-modal-close" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                    <div className="gps-modal-inner" onClick={e => e.stopPropagation()}>
                        <div className="ratio">
                            <iframe
                                src={getEmbedUrl(videoUrl)}
                                title="Game Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ border: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .gps-modal-portal {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                }
                .gps-modal-overlay {
                    position: absolute; inset: 0;
                    background: rgba(0,0,0,0.95);
                    display: flex; align-items: center; justify-content: center;
                    backdrop-filter: blur(12px);
                    cursor: pointer;
                }
                .gps-modal-inner {
                    width: 95%;
                    max-width: 1240px;
                    aspect-ratio: 16 / 9;
                    background: #000;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                    position: relative;
                    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.7);
                    cursor: default;
                }
                .ratio {
                    width: 100%;
                    height: 100%;
                }
                .ratio iframe {
                    width: 100%;
                    height: 100%;
                }
                .gps-modal-close {
                    position: absolute; 
                    top: clamp(20px, 4.5vh, 48px); 
                    right: clamp(20px, 4.5vw, 48px);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255,255,255,0.15);
                    color: #fff;
                    width: 54px; height: 54px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(16px);
                    z-index: 100;
                }
                .gps-modal-close:hover { 
                    background: #fff; 
                    color: #000;
                    transform: scale(1.1) rotate(90deg);
                }
                .gps-modal-close:active {
                    transform: scale(0.95);
                }

                @media (max-width: 768px) {
                    .gps-modal-inner {
                        width: 98%;
                        border-radius: 8px;
                    }
                    .gps-modal-close {
                        top: 16px; right: 16px;
                        width: 42px; height: 42px;
                        font-size: 1.1rem;
                    }
                }

                @media (min-width: 1600px) {
                    .gps-modal-inner {
                        max-width: 1400px;
                    }
                }
            `}</style>
        </>
    );
}