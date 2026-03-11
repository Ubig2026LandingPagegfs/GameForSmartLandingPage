"use client";
// components/VideoModal.tsx
// Modal fullscreen untuk memutar trailer/video game

interface VideoModalProps {
    videoUrl: string;
    onClose: () => void;
}

import { useEffect } from "react";

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <>
            <div className="gps-modal-overlay" onClick={onClose}>
                <button className="gps-modal-close" onClick={onClose}>✕</button>
                <div className="gps-modal-inner" onClick={e => e.stopPropagation()}>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={`${videoUrl}?autoplay=1`}
                            title="Game Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .gps-modal-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.92);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 9999;
                    backdrop-filter: blur(8px);
                }
                .gps-modal-close {
                    position: absolute; top: 20px; right: 20px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    width: 44px; height: 44px;
                    border-radius: 50%;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: background 0.2s;
                }
                .gps-modal-close:hover { background: rgba(255,255,255,0.2); }
                .gps-modal-inner {
                    width: 90%;
                    max-width: 900px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.08);
                }
            `}</style>
        </>
    );
}