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
import { tournamentsData } from "@/data/tournamentsData";

const FILTER_TABS = ["All", "Active", "Upcoming", "Finished"];

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Kompetisi | GameForSmart"; }, []);

  const filteredTournaments = tournamentsData.filter((t) => {
    return activeTab === "All" || t.status === activeTab;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
                    <div className="d-block d-md-none position-relative w-100" ref={dropdownRef}>
                      <button
                        className="dropdown-toggle-btn w-100 d-flex justify-content-between align-items-center py-3 px-6 rounded-3 tcn-1 bgn-3 border-0"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span>{activeTab}</span>
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
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
                                    activeTab === tab ? "bg-primary-dark fw-bold" : "hover-bg-n4"
                                  }`}
                                  style={{ color: activeTab === tab ? "#ff8c00" : "inherit" }}
                                  onClick={() => { setActiveTab(tab); setIsDropdownOpen(false); }}
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
                  {filteredTournaments.length > 0 ? (
                    filteredTournaments.map((tournament) => (
                      <div key={tournament.id} className="col-xxl-3 col-lg-4 col-md-6 col-sm-8 col-12">
                        <TournamentCard {...tournament} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-20">
                      <h3 className="tcn-1">Tidak ada kompetisi ditemukan untuk &quot;{activeTab}&quot;</h3>
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
      `}</style>
    </>
  );
}
