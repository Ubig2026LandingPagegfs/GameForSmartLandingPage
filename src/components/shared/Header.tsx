"use client";
import { useSearch } from "@/context/SearchContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gamesData } from "@/data/gamesData";
import { tournamentsData } from "@/data/tournamentsData";
import UserAccountPopup from "@/components/features/auth/UserAccountPopup";
import NotificationArea from "@/components/shared/NotificationArea";

export default function Header() {
  const { searchQuery, setSearchQuery } = useSearch();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNtfOpen, setIsNtfOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsNtfOpen(false);
        setIsProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
        setIsMobileSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom event for sidebar toggle
  const handleSidebarToggle = () => {
    // Dispatch a custom event for sidebar toggle
    window.dispatchEvent(
      new CustomEvent("sidebar-toggle", { detail: { open: !sidebarOpen } }),
    );
    setSidebarOpen((prev) => !prev);
  };

  const sortedGames = [...gamesData].sort((a, b) => a.title.localeCompare(b.title));
  const sortedTournaments = [...tournamentsData].sort((a, b) => a.id - b.id); // Asumsi ID lebih kecil = jadwal lebih awal/kronologis

  const visibleGames = searchQuery 
    ? sortedGames.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())) 
    : sortedGames;
  const visibleTournaments = searchQuery 
    ? sortedTournaments.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())) 
    : sortedTournaments;
  const allVisibleItems = [...visibleGames, ...visibleTournaments];

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery, isSearchActive]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchActive && e.key !== 'Enter') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.min(selectedIndex + 1, allVisibleItems.length - 1);
      setSelectedIndex(nextIndex);
      requestAnimationFrame(() => {
        itemRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = Math.max(selectedIndex - 1, 0);
      setSelectedIndex(prevIndex);
      requestAnimationFrame(() => {
        itemRefs.current[prevIndex]?.scrollIntoView({ block: 'nearest' });
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isSearchActive && selectedIndex >= 0 && selectedIndex < allVisibleItems.length) {
        router.push(allVisibleItems[selectedIndex].href);
        setIsSearchActive(false);
        setSearchQuery("");
      } else if (allVisibleItems.length > 0) {
        router.push(allVisibleItems[0].href);
        setIsSearchActive(false);
        setSearchQuery("");
      }
    } else if (e.key === 'Escape') {
      setIsSearchActive(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allVisibleItems.length > 0) {
      router.push(allVisibleItems[0].href);
      setIsSearchActive(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="header-section bgn-4 w-100 header-fixed">
      <div className="py-sm-6 py-3 mx-xxl-10 mx-md-8 mx-2">
        <div className="d-between gap-lg-4 gap-2">
          <div className={`top-bar alt d-flex align-items-center gap-4 ${isMobileSearchOpen ? "d-none d-lg-flex" : ""}`}>
            <button
              className={`sidebar-toggle-btn responsive-toggle d-lg-none d-block ${sidebarOpen ? "open" : ""}`}
              type="button"
              aria-label="Toggle sidebar"
              onClick={handleSidebarToggle}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <Link
              className="navbar-brand d-flex align-items-center gap-4"
              href="/"
            >
              <img
                className="d-block"
                style={{ width: "250px", minWidth: "250px", height: "auto" }}
                src="/images/gameforsmartlogo.webp"
                alt="GameForSmart Logo"
              />
            </Link>
          </div>
          <div
            className="header-btn-area d-flex align-items-center justify-content-between gap-xl-6 gap-3 w-100 position-relative"
            ref={headerRef}
          >
            <div
              className={`search-bar header-search-bar position-relative ${isMobileSearchOpen ? "mobile-open w-100" : ""}`}
              ref={searchRef}
            >
              <form action="#" onSubmit={handleSearchSubmit} className="w-100">
                <div className="input-area d-flex align-items-center gap-2 w-100">
                  {isMobileSearchOpen ? (
                    <button 
                      type="button" 
                      onClick={() => setIsMobileSearchOpen(false)} 
                      className="bg-transparent border-0 text-white d-lg-none d-flex align-items-center justify-content-center p-0"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <i className="ti ti-arrow-left fs-4"></i>
                    </button>
                  ) : (
                    <i className="ti ti-search d-none d-lg-block"></i>
                  )}
                  <input
                    type="text"
                    placeholder="Type a command or search..."
                    className="header-search-input flex-grow-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchActive(true)}
                    onKeyDown={handleKeyDown}
                    suppressHydrationWarning
                  />
                </div>
              </form>

              {/* CMD PALETTE DROPDOWN */}
              {isSearchActive && (
                <div 
                  className="search-dropdown-menu position-absolute w-100"
                  style={{
                    top: "calc(100% + 8px)",
                    left: 0,
                    backgroundColor: "var(--color-bg-surface, #161920)",
                    border: "1px solid var(--color-border, #2a2d38)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    zIndex: 9999,
                    maxHeight: "350px",
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                    padding: "8px",
                  }}
                  data-lenis-prevent="true"
                >
                  {/* Games Category */}
                  {visibleGames.length > 0 && (
                    <div className="mb-2">
                      <div className="px-3 py-2 text-xs text-muted fw-bold text-uppercase" style={{ color: "#8b8fa8", fontSize: "11px" }}>
                        Game
                      </div>
                      <div className="d-flex flex-column gap-1">
                        {visibleGames.map((game, idx) => {
                          const globalIdx = idx;
                          const isSelected = selectedIndex === globalIdx;
                          return (
                            <Link
                              key={game.id}
                              href={game.href}
                              ref={(el) => { itemRefs.current[globalIdx] = el; }}
                              className="search-item d-flex align-items-center gap-3 px-3 py-2 rounded"
                              onClick={() => { setIsSearchActive(false); setSearchQuery(""); }}
                              style={{ 
                                transition: "background 0.2s", 
                                color: "#e8eaf0", 
                                textDecoration: "none",
                                backgroundColor: isSelected ? "var(--color-bg-elevated, #1e2130)" : "transparent"
                              }}
                              onMouseOver={() => setSelectedIndex(globalIdx)}
                            >
                              <div style={{ width: "52px", height: "52px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.5)" }}>
                                <img src={game.image} alt={game.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              <div className="d-flex flex-column">
                                <span style={{ fontSize: "14px", fontWeight: 500, color: "#e8eaf0" }}>{game.title}</span>
                                <span style={{ fontSize: "11px", color: "#8b8fa8", marginTop: "-2px" }}><i className="ti ti-device-gamepad-2 me-1"></i>{(game as any).genre || "Web Game"}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Tournaments Category */}
                  {visibleTournaments.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs text-muted fw-bold text-uppercase" style={{ color: "#8b8fa8", fontSize: "11px" }}>
                        Kompetisi
                      </div>
                      <div className="d-flex flex-column gap-1">
                        {visibleTournaments.map((tour, idx) => {
                          const globalIdx = visibleGames.length + idx;
                          const isSelected = selectedIndex === globalIdx;
                          return (
                            <Link
                              key={tour.id}
                              href={tour.href}
                              ref={(el) => { itemRefs.current[globalIdx] = el; }}
                              className="search-item d-flex align-items-center gap-3 px-3 py-2 rounded"
                              onClick={() => { setIsSearchActive(false); setSearchQuery(""); }}
                              style={{ 
                                transition: "background 0.2s", 
                                color: "#e8eaf0", 
                                textDecoration: "none",
                                backgroundColor: isSelected ? "var(--color-bg-elevated, #1e2130)" : "transparent"
                              }}
                              onMouseOver={() => setSelectedIndex(globalIdx)}
                            >
                              <div style={{ width: "42px", height: "54px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.5)" }}>
                                <img src={tour.image} alt={tour.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              <div className="d-flex flex-column">
                                <span style={{ fontSize: "14px", fontWeight: 500, color: "#e8eaf0" }}>{tour.title}</span>
                                <span style={{ fontSize: "11px", color: "#8b8fa8", marginTop: "-2px" }}><i className="ti ti-trophy me-1"></i>{tour.date || "Turnamen"}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {allVisibleItems.length === 0 && (
                    <div className="text-center py-4" style={{ color: "#8b8fa8", fontSize: "14px" }}>
                      Tidak ada hasil yang ditemukan untuk "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={`header-btns d-flex align-items-center justify-content-end gap-lg-6 gap-sm-4 gap-2 w-100 ${isMobileSearchOpen ? "d-none d-lg-flex" : ""}`}>
              <button 
                className={`search-toggle-btn toggle-btn box-style fs-2xl d-block d-lg-none ${isMobileSearchOpen ? "active" : ""}`} 
                onClick={() => {
                  setIsMobileSearchOpen(!isMobileSearchOpen);
                  if (!isMobileSearchOpen) {
                    setIsNtfOpen(false);
                    setIsProfileOpen(false);
                  }
                }}
                suppressHydrationWarning
              >
                <i className={`ti ${isMobileSearchOpen ? "ti-x" : "ti-search"}`}></i>
              </button>

              <button
                className={`ntf-btn box-style fs-2xl ${isNtfOpen ? "active" : ""}`}
                onClick={() => {
                  setIsNtfOpen(!isNtfOpen);
                  setIsProfileOpen(false);
                  setIsSearchActive(false);
                }}
                suppressHydrationWarning
              >
                <i className="ti ti-bell-filled"></i>
              </button>
              <div
                className="header-profile pointer"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNtfOpen(false);
                  setIsSearchActive(false);
                }}
              >
                <div className="profile-wrapper d-flex align-items-center gap-3">
                  <div className="img-area overflow-hidden">
                    <img
                      className="w-100"
                      src="/assets/img/profile.png"
                      alt="profile"
                    />
                  </div>
                  <span className="user-name d-none d-xxl-block text-nowrap">
                    David Malan
                  </span>
                  <i className="ti ti-chevron-down d-none d-xxl-block"></i>
                </div>
              </div>
            </div>

            {/* Notification Popup */}
            <NotificationArea
              isOpen={isNtfOpen}
              onClose={() => setIsNtfOpen(false)}
            />

            {/* Profile Popup */}
            <UserAccountPopup
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      </div>
      </header>

      <style jsx>{`
        .header-fixed {
          z-index: 10001;
        }
        .header-search-bar {
          max-width: 400px;
          width: 100%;
        }
        .header-search-input {
          padding: 0 4px;
        }
        
        @media (max-width: 991px) {
          .header-search-bar {
            display: none;
            width: 100% !important;
            max-width: 100% !important;
          }
          .header-search-bar.mobile-open {
            display: block;
          }
          .header-search-input {
            width: 100%;
          }
        }

        .sidebar-toggle-btn {
          padding: 0 !important;
          min-width: 36px;
        }

        @media (max-width: 991px) {
          .d-between {
             flex-wrap: nowrap;
          }
        }

        @media (min-width: 992px) and (max-height: 700px) {
          .responsive-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
