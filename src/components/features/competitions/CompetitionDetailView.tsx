"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Link from 'next/link';
import { TournamentInfo } from '@/data/allItemsData';
import GameHero from "@/components/features/games/game-detail/GameHero";
import VideoModal from "@/components/features/games/game-detail/VideoModal";

interface CompetitionDetailViewProps {
    tournament: TournamentInfo;
}

export default function CompetitionDetailView({ tournament }: CompetitionDetailViewProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // Limits for truncation
    const CHAR_LIMIT = 200;
    const isLong = tournament.description.length > CHAR_LIMIT;

    const toggleDescription = () => setIsExpanded(!isExpanded);

    const renderDescription = (text: string) => {
        if (!isLong || isExpanded) {
            return text.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
            ));
        }
        return <p className="mb-0">{text.substring(0, CHAR_LIMIT)}...</p>;
    };

    const maxQuota = parseInt(tournament.teams.replace(/\D/g, '')) || 100;
    const currentRegistered = 64; // mock
    const progressPercent = Math.min((currentRegistered / maxQuota) * 100, 100);
    const isFull = currentRegistered >= maxQuota;

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-0 px-0 position-relative">
                <Sidebar />
                <article className="main-content w-100">
                    <GameHero
                        image={tournament.image || '/images/bghero.webp'}
                        title={tournament.title}
                        videoUrl={tournament.videoUrl}
                    >
                        <div className="gps-meta" style={{ padding: '0 0 24px', maxWidth: '900px' }}>
                            <div className="mb-4"><Breadcrumbs /></div>
                            
                            <h1 className="gps-title" style={{ fontSize: '3.5rem', fontWeight: 600, color: '#fff', marginBottom: '8px', lineHeight: 1.1 }}>
                                {tournament.title}
                            </h1>
                            <div className="gps-subtitle mb-6">
                                <span className="gps-developer" style={{ color: '#ff8c00', fontSize: '1.1rem', fontWeight: 500 }}>Turnamen Kompetitif</span>
                            </div>

                            <div className="gps-actions-row d-flex align-items-center gap-4 mt-8">
                                <Link 
                                    href={`/competitions/${tournament.slug}/register`} 
                                    className="gps-btn-primary" 
                                    style={{ background: '#ff8c00', color: '#fff', padding: '12px 32px', borderRadius: '6px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                                >
                                    Daftar Sekarang <i className="ti ti-chevron-right"></i>
                                </Link>
                                
                                {tournament.videoUrl && (
                                    <button 
                                        onClick={() => setIsVideoModalOpen(true)}
                                        className="gps-btn-trailer"
                                        style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '12px 24px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                           <path d="M8 5v14l11-7z" />
                                        </svg> Cuplikan
                                    </button>
                                )}
                            </div>
                        </div>
                    </GameHero>

                    <div className="container-fluid px-lg-15 px-md-10 px-6 mt-10 pb-120">
                        <section className="tournament-details">
                            <div className="row g-10">
                                {/* LEFT CONTENT: Description & Rules */}
                                <div className="col-lg-8 animate-fade-in-up">
                                    <div className="content-card mb-8 p-sm-10 p-6 rounded-4" style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h3 className="section-title mb-6 d-flex align-items-center gap-3">
                                            <i className="ti ti-target text-warning fs-two"></i>
                                            Tentang Kompetisi
                                        </h3>
                                        
                                        <div className="row g-4 mb-8">
                                            <div className="col-md-6">
                                                <div className="info-box d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <div className="icon-circle bg-warning text-white mt-1 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }}>
                                                        <i className="ti ti-bulb fs-xl"></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="tcn-1 fw-bold fs-md mb-2">Tujuan</h5>
                                                        <p className="tcn-6 fs-sm mb-0">Menguji kemampuan akademik dan strategi gameplay.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="info-box d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <div className="icon-circle bg-warning text-white mt-1 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }}>
                                                        <i className="ti ti-trophy fs-xl"></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="tcn-1 fw-bold fs-md mb-2">Tingkat</h5>
                                                        <p className="tcn-6 fs-sm mb-0">Kompetisi kompetitif skala nasional.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tcn-6 fs-md lh-lg border-top border-secondary border-opacity-10 pt-6">
                                            {renderDescription(tournament.description)}
                                            {isLong && (
                                                <button
                                                    onClick={toggleDescription}
                                                    className="btn btn-link pe-0 ps-0 mt-2 text-warning text-decoration-none fw-bold"
                                                >
                                                    {isExpanded ? 'Sembunyikan' : 'Baca Selengkapnya'}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="content-card mb-8 p-sm-10 p-6 rounded-4" style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h3 className="section-title mb-6 d-flex align-items-center gap-3">
                                            <i className="ti ti-file-text text-warning fs-two"></i>
                                            Syarat & Ketentuan
                                        </h3>
                                        <div className="rules-grid d-flex flex-column gap-3">
                                            {tournament.rules?.map((rule, index) => (
                                                <div key={index} className="rule-item d-flex align-items-start gap-3 p-4 rounded-3" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.1)' }}>
                                                    <i className="ti ti-check text-warning fs-xl mt-1"></i>
                                                    <span className="tcn-1 fs-md">{rule}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT CONTENT: Info Card */}
                                <div className="col-lg-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    <div className="sticky-info-card" style={{ position: 'sticky', top: '120px' }}>
                                        <div className="info-card p-6 rounded-4 border" style={{ background: 'rgba(20,20,20,0.8)', borderColor: 'rgba(255,255,255,0.05)' }}>
                                            <div className="d-flex justify-content-between align-items-center mb-6">
                                                <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-3 py-2 rounded-pill fw-bold">Pendaftaran Dibuka</span>
                                            </div>
                                            
                                            <h4 className="tcn-6 fs-sm text-uppercase mb-2">Total Hadiah</h4>
                                            <h2 className="text-warning fw-bold display-six mb-6">{tournament.prizeMoney}</h2>

                                            <div className="divider mb-6" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                                            <div className="d-flex flex-column gap-4 mb-8">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="icon-wrapper bg-secondary bg-opacity-10 p-3 rounded-circle text-white">
                                                        <i className="ti ti-calendar fs-xl"></i>
                                                    </div>
                                                    <div>
                                                        <span className="d-block tcn-6 fs-xs text-uppercase">Pelaksanaan</span>
                                                        <span className="tcn-1 fw-bold">{tournament.date}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="icon-wrapper bg-secondary bg-opacity-10 p-3 rounded-circle text-white">
                                                        <i className="ti ti-ticket fs-xl"></i>
                                                    </div>
                                                    <div>
                                                        <span className="d-block tcn-6 fs-xs text-uppercase">Biaya Pendaftaran</span>
                                                        <span className="tcn-1 fw-bold">{tournament.ticketFee || 'Gratis'}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="icon-wrapper bg-secondary bg-opacity-10 p-3 rounded-circle text-white">
                                                        <i className="ti ti-users fs-xl"></i>
                                                    </div>
                                                    <div>
                                                        <span className="d-block tcn-6 fs-xs text-uppercase">Kuota Tersedia</span>
                                                        <span className="tcn-1 fw-bold">{currentRegistered} / {maxQuota} Tim</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="progress-area mb-8">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="tcn-6 fs-xs text-uppercase">Kapasitas</span>
                                                    <span className="tcn-1 fw-bold fs-xs">{progressPercent.toFixed(0)}%</span>
                                                </div>
                                                <div className="progress rounded-pill bg-secondary bg-opacity-25" style={{ height: '8px' }}>
                                                    <div className="progress-bar bg-warning rounded-pill" style={{ width: `${progressPercent}%` }}></div>
                                                </div>
                                            </div>

                                            {isFull ? (
                                                <button className="btn btn-secondary w-100 py-3 rounded-3 fw-bold" disabled>Kuota Penuh</button>
                                            ) : (
                                                <Link href={`/competitions/${tournament.slug}/register`} className="gps-btn-primary w-100 py-3 rounded-3 fw-bold justify-content-center text-center text-decoration-none text-white d-block" style={{ background: '#ff8c00', transition: 'background 0.2s' }}>
                                                    Daftar Sekarang
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TIMELINE & PRIZES */}
                            <div className="row mt-12 g-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                {/* Timeline Component */}
                                <div className="col-lg-12">
                                    <h3 className="section-title mb-8 d-flex align-items-center gap-3">
                                        <i className="ti ti-calendar-stats text-warning fs-two"></i>
                                        Timeline Kompetisi
                                    </h3>
                                    <div className="timeline-container p-6 rounded-4 d-flex flex-column flex-md-row justify-content-between position-relative gap-6 gap-md-0" style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div className="timeline-line d-none d-md-block position-absolute top-50 start-0 w-100" style={{ height: '2px', background: 'rgba(255,255,255,0.1)', transform: 'translateY(-50%)', zIndex: 0 }}></div>
                                        
                                        <div className="timeline-step text-md-center position-relative z-1 d-flex flex-md-column align-items-center gap-4 gap-md-0" style={{ flex: 1 }}>
                                            <div className="timeline-dot mb-md-3 bg-warning d-flex align-items-center justify-content-center border border-3 border-dark" style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0 }}>
                                                <i className="ti ti-check text-white fs-xs"></i>
                                            </div>
                                            <div>
                                                <h5 className="tcn-1 fw-bold fs-md mb-1">Pendaftaran</h5>
                                                <span className="tcn-6 fs-sm">Dibuka</span>
                                            </div>
                                        </div>
                                        <div className="timeline-step text-md-center position-relative z-1 d-flex flex-md-column align-items-center gap-4 gap-md-0" style={{ flex: 1 }}>
                                            <div className="timeline-dot mb-md-3 bg-secondary d-flex align-items-center justify-content-center border border-3 border-dark" style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0 }}>
                                                <span className="text-white fs-xs fw-bold">2</span>
                                            </div>
                                            <div>
                                                <h5 className="tcn-1 fw-bold fs-md mb-1">Penyisihan</h5>
                                                <span className="tcn-6 fs-sm">{tournament.date}</span>
                                            </div>
                                        </div>
                                        <div className="timeline-step text-md-center position-relative z-1 d-flex flex-md-column align-items-center gap-4 gap-md-0" style={{ flex: 1 }}>
                                            <div className="timeline-dot mb-md-3 bg-secondary d-flex align-items-center justify-content-center border border-3 border-dark" style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0 }}>
                                                <span className="text-white fs-xs fw-bold">3</span>
                                            </div>
                                            <div>
                                                <h5 className="tcn-1 fw-bold fs-md mb-1">Grand Final</h5>
                                                <span className="tcn-6 fs-sm">{tournament.finalRound || 'TBA'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-12 g-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <div className="col-12 text-center mb-6">
                                    <h3 className="section-title d-flex align-items-center justify-content-center gap-3">
                                        <i className="ti ti-gift text-warning fs-two"></i>
                                        Hadiah & Penghargaan
                                    </h3>
                                </div>
                                
                                {/* Juara 1 */}
                                <div className="col-md-4">
                                    <div className="prize-card text-center p-8 rounded-4 h-100" style={{ background: 'rgba(255, 215, 0, 0.05)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                                        <i className="ti ti-trophy fs-display-four text-warning mb-4 d-block"></i>
                                        <h4 className="fw-bold text-warning mb-2 text-uppercase">{tournament.prizes?.[0]?.place || 'JUARA 1'}</h4>
                                        <h3 className="fw-extrabold text-white mb-3">{tournament.prizes?.[0]?.amount || 'Rp 7.500.000'}</h3>
                                        <p className="tcn-6 fs-sm mb-0">{tournament.prizes?.[0]?.reward || 'Trofi & Sertifikat'}</p>
                                    </div>
                                </div>
                                {/* Juara 2 */}
                                <div className="col-md-4">
                                    <div className="prize-card text-center p-8 rounded-4 h-100" style={{ background: 'rgba(192, 192, 192, 0.05)', border: '1px solid rgba(192, 192, 192, 0.2)' }}>
                                        <i className="ti ti-medal fs-display-four text-secondary mb-4 d-block" style={{ color: '#c0c0c0' }}></i>
                                        <h4 className="fw-bold mb-2 text-uppercase" style={{ color: '#c0c0c0' }}>{tournament.prizes?.[1]?.place || 'JUARA 2'}</h4>
                                        <h3 className="fw-extrabold text-white mb-3">{tournament.prizes?.[1]?.amount || 'Rp 5.000.000'}</h3>
                                        <p className="tcn-6 fs-sm mb-0">{tournament.prizes?.[1]?.reward || 'Medali & Sertifikat'}</p>
                                    </div>
                                </div>
                                {/* Juara 3 */}
                                <div className="col-md-4">
                                    <div className="prize-card text-center p-8 rounded-4 h-100" style={{ background: 'rgba(205, 127, 50, 0.05)', border: '1px solid rgba(205, 127, 50, 0.2)' }}>
                                        <i className="ti ti-medal fs-display-four mb-4 d-block" style={{ color: '#cd7f32' }}></i>
                                        <h4 className="fw-bold mb-2 text-uppercase" style={{ color: '#cd7f32' }}>{tournament.prizes?.[2]?.place || 'JUARA 3'}</h4>
                                        <h3 className="fw-extrabold text-white mb-3">{tournament.prizes?.[2]?.amount || 'Rp 2.500.000'}</h3>
                                        <p className="tcn-6 fs-sm mb-0">{tournament.prizes?.[2]?.reward || 'Medali & Sertifikat'}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </main>

            {isVideoModalOpen && tournament.videoUrl && (
                <VideoModal videoUrl={tournament.videoUrl} onClose={() => setIsVideoModalOpen(false)} />
            )}

            <style jsx>{`
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .gps-btn-primary:hover {
                    background: #e67e00 !important;
                }
                .gps-btn-trailer:hover {
                    background: rgba(255,255,255,0.15) !important;
                }
                
                .prize-card {
                    transition: transform 0.3s ease;
                }
                .prize-card:hover {
                    transform: translateY(-5px);
                }
            `}</style>
        </>
    );
}
