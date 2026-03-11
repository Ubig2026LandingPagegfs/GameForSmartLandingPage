"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import TournamentCard from "@/components/features/tournaments/TournamentCard";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";
import { tournamentsData } from "@/data/tournamentsData";

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <main
        className="main-container container-fluid d-flex align-items-start pt-sm-20 pt-15 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-lg-10">
          <section className="tournament-banner mb-lg-15 mb-sm-10 mb-4 pb-lg-10 pb-sm-6">
            <div className="container-fluid">
              <div className="parallax-banner-area parallax-container">
                <img
                  className="w-100 h-100 rounded-5 parallax-img"
                  src="/assets/img/tournament-banner.png"
                  alt="tournament banner"
                />
              </div>
            </div>
          </section>

          <section className="tournament-section pb-120">
            <div className="tournament-wrapper alt">
              <div className="container-fluid px-lg-15 px-md-10 px-6">
                <Breadcrumbs />
                <div className="row justify-content-between align-items-end mb-8">
                  <div className="col">
                    <h1 className="display-four tcn-1 cursor-scale growUp title-anim text-uppercase">
                      Competition
                    </h1>
                  </div>
                </div>
                <div className="singletab tournaments-tab">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-lg-15 mb-sm-10 mb-6">
                    {/* Desktop Tabs */}
                    <ul className="tablinks d-none d-md-flex flex-wrap align-items-center gap-3 list-unstyled mb-0">
                      {["All", "Active", "Upcoming", "Finished"].map((tab) => (
                        <li
                          key={tab}
                          className={`nav-links ${activeTab === tab ? "active" : ""}`}
                        >
                          <button
                            className="tablink py-sm-3 py-2 px-sm-8 px-6 rounded-pill tcn-1"
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </button>
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
                          className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                            {["All", "Active", "Upcoming", "Finished"].map((tab) => (
                              <li key={tab}>
                                <button
                                  className={`dropdown-item w-100 text-start py-2 px-4 rounded-2 border-0 bg-transparent tcn-1 ${activeTab === tab ? 'bg-primary-dark text-orange-500' : 'hover-bg-n4'}`}
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
                  <div className="tabcontents">
                    <div className="tabitem active">
                      <div className="row justify-content-md-start justify-content-center g-6">
                        {filteredTournaments.length > 0 ? (
                          filteredTournaments.map((tournament) => (
                            <div
                              key={tournament.id}
                              className="col-xxl-3 col-lg-4 col-md-6 col-sm-8"
                            >
                              <TournamentCard {...tournament} />
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-center py-20">
                            <h3 className="tcn-1">
                              No competitions found for "{activeTab}"
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />

      <style jsx>{`
        .dropdown-toggle-btn {
          background: rgba(var(--n3), 0.4);
          color: rgb(var(--n1));
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .dropdown-menu-list {
          background: #1c1f2a;
          border: 1px solid rgba(var(--p1), 0.2);
        }
        .dropdown-item {
          transition: all 0.2s ease;
          color: rgb(var(--n1));
        }
        .dropdown-item:hover {
          background: rgba(var(--n4), 0.6);
          color: orange;
        }
        .bg-primary-dark {
          background: rgba(var(--p1), 0.1);
        }
        .hover-bg-n4:hover {
          background: rgba(var(--n4), 0.4);
        }
      `}</style>
    </>
  );
}
