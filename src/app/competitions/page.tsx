"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TournamentCard from "@/components/features/tournaments/TournamentCard";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

// Status yang akan ditampilkan di halaman kompetisi
const ALLOWED_STATUSES = ["coming_soon", "published"];

// Label filter: "All" = semua yang allowed, "Coming Soon" = coming_soon, "Published" = published
const FILTER_TABS = ["Semua", "Coming Soon", "Published"];

interface Competition {
  id: string | number;
  title: string;
  description: string;
  status: string;
  slug: string;
  poster_url: string | null;
  prize_pool: string | null;
  category: string | null;
  registration_deadline: string | null;
  start_date: string | null;
}

interface MappedTournament {
  id: string | number;
  title: string;
  type: string;
  image: string;
  status: string;
  prizeMoney: string;
  date: string;
  teams: string;
  description: string;
  slug: string;
  link: string;
}

function mapCompetition(db: Competition): MappedTournament {
  // Normalize status display
  let displayStatus = db.status;
  if (db.status === "published") displayStatus = "Published";
  else if (db.status === "coming_soon") displayStatus = "Coming Soon";

  return {
    id: db.id,
    title: db.title,
    description: db.description || "Kompetisi terbaru GameforSmart",
    status: displayStatus,
    slug: db.slug,
    image: db.poster_url || "/images/competitions/nasional.webp",
    prizeMoney: db.prize_pool || "Lihat Detail",
    type: db.category || "Umum",
    date: db.registration_deadline
      ? new Date(db.registration_deadline).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Sesuai Jadwal",
    teams: "–",
    link: `/competitions/${db.slug}`,
  };
}

function SkeletonCard() {
  return (
    <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-8 col-12">
      <div className="skeleton-card">
        <div className="skeleton-img" />
        <div className="skeleton-body">
          <div className="skeleton-line short" />
          <div className="skeleton-line long" />
          <div className="skeleton-line medium" />
          <div className="skeleton-line short" style={{ marginTop: "auto" }} />
        </div>
      </div>
    </div>
  );
}

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tournaments, setTournaments] = useState<MappedTournament[]>([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Kompetisi | GameForSmart";
  }, []);

  // Fetch dari Supabase hanya coming_soon dan published
  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("competitions")
          .select("*")
          .in("status", ALLOWED_STATUSES)
          .order("created_at", { ascending: false });

        if (data && !error) {
          setTournaments(data.map(mapCompetition));
        } else {
          console.error("Error fetching competitions:", error);
        }
      } catch (err) {
        console.error("Gagal memuat kompetisi dari Supabase", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  // Filter berdasarkan tab aktif
  const filteredTournaments = tournaments.filter((t) => {
    if (activeTab === "Semua") return true;
    return t.status === activeTab;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Header />
      <main className="main-container container-fluid d-flex pt-16 pb-20 px-0 position-relative">
        <Sidebar />
        <article className="main-content mt-0">
          <section className="tournament-section pb-120">
            <div className="tournament-wrapper alt">
              <div className="container-fluid py-lg-15 py-sm-10 py-8 px-lg-15 px-md-10 px-6">
                <div className="mb-10">
                  <Breadcrumbs />
                </div>

                {/* Title */}
                <div className="row align-items-center justify-content-between mb-lg-15 mb-md-8 mb-sm-6 mb-4">
                  <div className="col-12 text-center">
                    <motion.h1
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="display-four tcn-1 cursor-scale growUp text-uppercase"
                    >
                      Competition
                    </motion.h1>
                    {!loading && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 mt-2 text-sm"
                      >
                        {tournaments.length} kompetisi tersedia
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Filter */}
                <div className="singletab tournaments-tab mb-10">
                  <div className="d-center gap-6 mb-lg-15 mb-sm-10 mb-6 w-100 overflow-visible">
                    {/* Desktop Tabs */}
                    <ul
                      className="tablinks d-none d-md-flex flex-nowrap align-items-center justify-content-lg-center gap-3 list-unstyled m-0 p-2 overflow-x-auto w-100"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {FILTER_TABS.map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <Button
                            variant={activeTab === tab ? "default" : "outline"}
                            className={`rounded-pill py-3 py-sm-6 px-5 px-sm-8 text-sm text-sm-base transition-all ${
                              activeTab === tab
                                ? "bg-orange-gradient text-white border-none shadow-[0_0_15px_rgba(255,140,0,0.5)]"
                                : "bg-transparent text-[#e6e6e6] border-[#262626] hover:bg-[#1a1a1a] hover:text-white"
                            }`}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </Button>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile Dropdown */}
                    <div
                      className="d-block d-md-none position-relative w-100"
                      ref={dropdownRef}
                    >
                      <button
                        className="dropdown-toggle-btn w-100 d-flex justify-content-between align-items-center py-3 px-6 rounded-3 tcn-1 bgn-3 border-0"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span>{activeTab}</span>
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="dropdown-menu-list position-absolute start-0 w-100 mt-2 p-2 rounded-3 bgn-3 list-unstyled shadow-lg"
                            style={{ zIndex: 100 }}
                          >
                            {FILTER_TABS.map((tab) => (
                              <li key={tab}>
                                <button
                                  className={`dropdown-item w-100 text-start py-3 px-4 rounded-2 border-0 bg-transparent tcn-1 ${
                                    activeTab === tab
                                      ? "bg-primary-dark fw-bold"
                                      : "hover-bg-n4"
                                  }`}
                                  style={{
                                    color:
                                      activeTab === tab ? "#ff8c00" : "inherit",
                                  }}
                                  onClick={() => {
                                    setActiveTab(tab);
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  {tab}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Cards */}
                <div className="row gy-lg-10 gy-6 justify-content-center">
                  {loading ? (
                    // Skeleton loading
                    Array.from({ length: 4 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))
                  ) : filteredTournaments.length > 0 ? (
                    filteredTournaments.map((tournament) => (
                      <div
                        key={tournament.id}
                        className="col-xxl-3 col-lg-4 col-md-6 col-sm-8 col-12"
                      >
                        <TournamentCard
                          id={Number(tournament.id)}
                          title={tournament.title}
                          type={tournament.type}
                          image={tournament.image}
                          status={tournament.status}
                          prizeMoney={tournament.prizeMoney}
                          date={tournament.date}
                          teams={tournament.teams}
                          description={tournament.description}
                          slug={tournament.slug}
                          link={tournament.link}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-20">
                      <div className="empty-state">
                        <div className="empty-icon">🏆</div>
                        <h3 className="tcn-1 mt-4">
                          Belum ada kompetisi untuk &quot;{activeTab}&quot;
                        </h3>
                        <p className="text-gray-400 mt-2 text-sm">
                          Pantau terus untuk kompetisi baru yang akan datang!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />

      <style jsx>{`
        /* Dropdown styles */
        .dropdown-toggle-btn {
          background: #1c1f2a;
          color: rgb(var(--n1));
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transition: all 0.3s ease;
        }
        .dropdown-toggle-btn:hover {
          border-color: rgba(var(--p1), 0.5) !important;
        }
        .dropdown-menu-list {
          background: #1c1f2a;
          border: 1px solid rgba(var(--p1), 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }
        .dropdown-item {
          transition: all 0.2s ease;
          color: rgb(var(--n1));
          font-size: 14px;
        }
        .dropdown-item:hover {
          background: rgba(var(--p1), 0.1);
          color: #ff8c00;
          padding-left: 20px;
        }
        .bg-primary-dark {
          background: rgba(var(--p1), 0.15);
        }
        .hover-bg-n4:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        /* Skeleton loading */
        .skeleton-card {
          border-radius: 12px;
          overflow: hidden;
          background: #161920;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .skeleton-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: linear-gradient(
            90deg,
            #1e2130 25%,
            #252a3a 50%,
            #1e2130 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-height: 160px;
        }
        .skeleton-line {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(
            90deg,
            #1e2130 25%,
            #252a3a 50%,
            #1e2130 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-line.short {
          width: 40%;
        }
        .skeleton-line.medium {
          width: 65%;
        }
        .skeleton-line.long {
          width: 100%;
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Empty state */
        .empty-state {
          max-width: 400px;
          margin: 0 auto;
        }
        .empty-icon {
          font-size: 4rem;
          filter: grayscale(50%) opacity(0.5);
        }
      `}</style>
    </>
  );
}
