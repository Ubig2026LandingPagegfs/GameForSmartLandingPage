"use client";
import { useState, useEffect } from "react";
import RatingStars from "./RatingStars";
import { Review } from "@/data/rating";

interface ReviewListModalProps {
    title: string;
    image: string;
    reviews: Review[];
    onClose: () => void;
}

export default function ReviewListModal({ title, image, reviews, onClose }: ReviewListModalProps) {
    const [selectedStar, setSelectedStar] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Lock body scroll and listen for ESC key when modal is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalStyle;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);
    // Filter reviews based on selected star
    const filteredReviews = selectedStar 
        ? reviews.filter(review => Math.floor(review.rating) === selectedStar)
        : reviews;

    return (
        <>
            <div className="rlm-overlay" onClick={onClose}>
                <div className="rlm-content" onClick={e => e.stopPropagation()}>
                    {/* Header */}
                    <div className="rlm-header">
                        <div className="rlm-header-left">
                            <img src={image} alt={title} className="rlm-icon" />
                            <div>
                                <h2 className="rlm-title">{title}</h2>
                                <span className="rlm-subtitle">Rating dan ulasan</span>
                            </div>
                        </div>
                        <button className="rlm-close" onClick={onClose} aria-label="Tutup">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>

                    {/* Filter Pills */}
                    <div className="rlm-filters">
                        <div style={{ position: 'relative' }}>
                            <button 
                                className={`rlm-filter-pill ${selectedStar ? 'active' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {selectedStar ? `Bintang ${selectedStar}` : 'Semua Rating'}
                                <svg className="rlm-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="rlm-dropdown">
                                    <button 
                                        className={`rlm-dropdown-item ${selectedStar === null ? 'active' : ''}`}
                                        onClick={() => { setSelectedStar(null); setIsDropdownOpen(false); }}
                                    >
                                        Semua Rating
                                    </button>
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <button 
                                            key={star}
                                            className={`rlm-dropdown-item ${selectedStar === star ? 'active' : ''}`}
                                            onClick={() => { setSelectedStar(star); setIsDropdownOpen(false); }}
                                        >
                                            Bintang {star}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="rlm-body">
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map(review => (
                            <div key={review.id} className="rlm-item">
                                {/* User row */}
                                <div className="rlm-user-row">
                                    <div className="rlm-avatar" style={{ background: review.avatarBg }}>
                                        {review.avatar}
                                    </div>
                                    <span className="rlm-username">{review.name}</span>
                                    <button className="rlm-more" aria-label="Opsi">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="5" r="1.5"/>
                                            <circle cx="12" cy="12" r="1.5"/>
                                            <circle cx="12" cy="19" r="1.5"/>
                                        </svg>
                                    </button>
                                </div>

                                {/* Meta */}
                                <div className="rlm-meta">
                                    <RatingStars rating={review.rating} size="sm" color="#01875f" />
                                    <span className="rlm-date">{review.date}</span>
                                </div>

                                {/* Text */}
                                <p className="rlm-text">{review.text}</p>

                                {/* Helpful */}
                                <div className="rlm-helpful">
                                    <span className="rlm-helpful-count">{review.helpful} orang merasa ulasan ini berguna</span>
                                    <div className="rlm-helpful-actions">
                                        <span>Apakah ulasan ini berguna bagi Anda?</span>
                                        <div className="rlm-action-buttons">
                                            <button className="rlm-pill">Ya</button>
                                            <button className="rlm-pill">Tidak</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Dev response (first review only) */}
                                {review.id === 1 && (
                                    <div className="rlm-dev">
                                        <div className="rlm-dev-header">
                                            <span className="rlm-dev-name">Gameforsmart.com</span>
                                            <span className="rlm-dev-date">13 Maret 2025</span>
                                        </div>
                                        <p className="rlm-dev-text">
                                            Halo {review.name.split(" ")[0]}! Senang sekali mendengar kamu menyukai game kami.
                                            Kami akan terus berusaha memberikan konten menarik. Terima kasih sudah bermain!
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))) : (
                            <div className="rlm-empty">
                                <p>Tidak ada ulasan untuk rating ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .rlm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.85);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: rlmFadeIn 0.2s ease;
                }
                @keyframes rlmFadeIn { from { opacity: 0; } to { opacity: 1; } }

                .rlm-content {
                    width: 100%;
                    max-width: 850px;
                    max-height: 80vh;
                    background: #202124; /* Google Play Dark Theme Background */
                    color: #e8eaed;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 24px 38px rgba(0,0,0,0.5);
                    animation: rlmScaleIn 0.22s cubic-bezier(0,0,0.2,1);
                    margin: 0 16px;
                    overflow: hidden;
                    border: 1px solid #3c4043;
                }
                @keyframes rlmScaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to   { transform: scale(1);    opacity: 1; }
                }

                /* Header */
                .rlm-header {
                    padding: 18px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #3c4043;
                    flex-shrink: 0;
                }
                .rlm-header-left { display: flex; align-items: center; gap: 16px; }
                .rlm-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    object-fit: cover;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                }
                .rlm-title {
                    font-size: 1.15rem;
                    font-weight: 500;
                    color: #e8eaed;
                    margin: 0;
                    line-height: 1.2;
                }
                .rlm-subtitle {
                    font-size: 0.85rem;
                    color: #9aa0a6;
                    display: block;
                    margin-top: 3px;
                }
                .rlm-close {
                    background: none;
                    border: none;
                    color: #9aa0a6;
                    padding: 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    transition: all 0.2s;
                }
                .rlm-close:hover { background: rgba(255,255,255,0.06); color: #fff; }

                /* Filters */
                .rlm-filters {
                    padding: 12px 24px;
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    border-bottom: 1px solid #3c4043;
                }
                .rlm-filter-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: #202124;
                    border: 1px solid #3c4043;
                    border-radius: 20px;
                    color: #e8eaed;
                    font-size: 0.82rem;
                    font-weight: 500;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s;
                }
                .rlm-filter-pill:hover { background: #2d2e31; }
                .rlm-filter-pill.active {
                    background: #e6f4ea;
                    color: #012e13;
                    border-color: #e6f4ea;
                }
                .rlm-chevron { opacity: 0.7; }
                
                /* Dropdown */
                .rlm-dropdown {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    background: #202124;
                    border: 1px solid #3c4043;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                    z-index: 10;
                    min-width: 150px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                .rlm-dropdown-item {
                    padding: 10px 16px;
                    background: transparent;
                    border: none;
                    color: #e8eaed;
                    font-size: 0.85rem;
                    text-align: left;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .rlm-dropdown-item:hover { background: #2d2e31; }
                .rlm-dropdown-item.active {
                    background: rgba(255, 140, 0, 0.1);
                    color: #ff8c00;
                    font-weight: 500;
                }

                /* Body */
                .rlm-body {
                    flex: 1;
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #3c4043 transparent;
                }
                .rlm-body::-webkit-scrollbar { width: 8px; }
                .rlm-body::-webkit-scrollbar-thumb { background: #3c4043; border-radius: 4px; }

                /* Item */
                .rlm-item {
                    padding: 24px;
                    border-bottom: 1px solid #3c4043;
                }
                .rlm-item:last-child { border-bottom: none; }

                .rlm-user-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
                .rlm-avatar {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 500;
                    font-size: 0.9rem;
                    flex-shrink: 0;
                }
                .rlm-username { flex: 1; font-size: 0.875rem; color: #e8eaed; }
                .rlm-more {
                    background: none;
                    border: none;
                    color: #9aa0a6;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 50%;
                    transition: all 0.2s;
                }
                .rlm-more:hover { background: rgba(255,255,255,0.06); }

                .rlm-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
                .rlm-date { font-size: 0.75rem; color: #9aa0a6; }

                .rlm-text { font-size: 0.875rem; color: #bdc1c6; line-height: 1.6; margin: 0 0 16px; }

                .rlm-helpful { display: flex; flex-direction: column; gap: 12px; }
                .rlm-helpful-count { font-size: 0.75rem; color: #9aa0a6; }
                .rlm-helpful-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
                .rlm-helpful-actions span { font-size: 0.75rem; color: #9aa0a6; }
                .rlm-action-buttons { display: flex; gap: 12px; }
                .rlm-pill {
                    padding: 5px 20px;
                    border: 1px solid #3c4043;
                    border-radius: 20px;
                    background: transparent;
                    font-size: 0.8rem;
                    color: #e8eaed;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .rlm-pill:hover { background: rgba(255,255,255,0.04); border-color: #5f6368; }

                /* Dev response */
                .rlm-dev {
                    margin-top: 16px;
                    padding: 16px;
                    background: #2d2e31;
                    border-radius: 8px;
                }
                .rlm-dev-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
                .rlm-dev-name { font-size: 0.8125rem; font-weight: 500; color: #e8eaed; }
                .rlm-dev-date { font-size: 0.75rem; color: #9aa0a6; }
                .rlm-dev-text { font-size: 0.8125rem; color: #9aa0a6; line-height: 1.55; margin: 0; }
                
                /* Empty state */
                .rlm-empty {
                    padding: 40px 20px;
                    text-align: center;
                    color: #9aa0a6;
                    font-size: 0.9rem;
                }
            `}</style>
        </>
    );
}