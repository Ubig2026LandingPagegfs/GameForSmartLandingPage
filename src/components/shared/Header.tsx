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

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsNtfOpen(false);
        setIsProfileOpen(false);
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const allData = [...gamesData, ...tournamentsData];
    const firstMatch = allData.find(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (firstMatch) {
      router.push(firstMatch.href);
    }
  };

  return (
    <>
      <header className="header-section bgn-4 w-100 header-fixed">
      <div className="py-sm-6 py-3 mx-xxl-10 mx-md-8 mx-2">
        <div className="d-between gap-lg-4 gap-2">
          <div className="top-bar alt d-flex align-items-center gap-4">
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
              className="navbar-brand d-flex align-items-center gap-4 header-logo-link"
              href="/home"
            >
              <img
                className="w-100 d-block"
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
              className="search-bar header-search-bar"
            >
              <form action="#" onSubmit={handleSearchSubmit}>
                <div className="input-area d-flex align-items-center gap-2">
                  <i className="ti ti-search"></i>
                  <input
                    type="text"
                    placeholder="Cari Kompetisi, Permainan..."
                    className="header-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="header-btns d-flex align-items-center justify-content-end gap-lg-6 gap-sm-4 gap-2 w-100">
              <button className="search-toggle-btn toggle-btn box-style fs-2xl d-block d-lg-none">
                <i className="ti ti-search"></i>
              </button>

              <button
                className={`ntf-btn box-style fs-2xl ${isNtfOpen ? "active" : ""}`}
                onClick={() => {
                  setIsNtfOpen(!isNtfOpen);
                  setIsProfileOpen(false);
                }}
              >
                <i className="ti ti-bell-filled"></i>
              </button>
              <div
                className="header-profile pointer"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNtfOpen(false);
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
        .header-logo-link {
          max-width: 240px;
          width: 100%;
        }
        .header-search-bar {
          max-width: 400px;
          width: 100%;
        }
        .header-search-input {
          padding: 0 4px;
        }

        .sidebar-toggle-btn {
          padding: 0 !important;
          min-width: 36px;
        }

        @media (max-width: 991px) {
          .header-logo-link {
            max-width: 150px;
          }
          .d-between {
             flex-wrap: nowrap;
          }
        }

        @media (min-width: 992px) and (max-height: 650px) {
          .responsive-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
