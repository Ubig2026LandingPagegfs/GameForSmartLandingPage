"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      setOpen(e.detail.open);
    };
    window.addEventListener("sidebar-toggle", handler);
    return () => window.removeEventListener("sidebar-toggle", handler);
  }, []);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (open && window.innerWidth < 992) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      // Ensure we restore scrolling when unmounted
      document.body.style.overflow = "";
    };
  }, [open]);

  // Dynamically track dimensions
  useEffect(() => {
    const updateDimensions = () => {
      // 1. Header height for overlay padding-top
      const header =
        document.querySelector("header") ||
        document.querySelector(".header") ||
        document.querySelector("[data-header]") ||
        document.querySelector("nav");
      const headerH = header ? header.getBoundingClientRect().height : 60;

      document.documentElement.style.setProperty(
        "--sidebar-overlay-top",
        `${headerH + 16}px`,
      );

      // 2. Capsule max-height: fill available space below header
      // If content overflows → capsule scrolls. Icons NEVER shrink.
      const vh = window.innerHeight;
      const topOffset = headerH + 24;
      const bottomPadding = 32;
      const maxCapsuleH = vh - topOffset - bottomPadding;

      document.documentElement.style.setProperty(
        "--capsule-max-h",
        `${Math.max(maxCapsuleH, 200)}px`,
      );

      // visualViewport hooks removed so sidebar doesn't arbitrarily resize on zoom
      // and retains the same size as unzoomed screen.
    };

    updateDimensions();

    // ResizeObserver re-measures whenever header size changes (including zoom)
    const header =
      document.querySelector("header") ||
      document.querySelector(".header") ||
      document.querySelector("[data-header]") ||
      document.querySelector("nav");

    const ro = new ResizeObserver(updateDimensions);
    if (header) ro.observe(header);

    // Also listen to window resize as a fallback
    window.addEventListener("resize", updateDimensions);
    // No visualViewport listeners

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
      // No visualViewport cleanup
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/home" && pathname === "/") return true;
    return pathname === path || pathname.startsWith(path + "/");
  };

  const menuItems = [
    { href: "/home", icon: "ti-home", label: "Beranda" },
    { href: "/competitions", icon: "ti-trophy", label: "Kompetisi" },
    { href: "/games", icon: "ti-device-gamepad-2", label: "Permainan" },
    { href: "/community", icon: "ti-users", label: "Komunitas" },
    { href: "/about", icon: "ti-info-circle", label: "Tentang" },
    { href: "/contact", icon: "ti-mail", label: "Kontak" },
  ];

  return (
    <aside className="sidebar">
      <div
        ref={wrapperRef}
        className={`sidebar-wrapper ${open ? "show-menu" : ""}`}
      >
        <div className="sidebar-menu-capsule py-xxl-20 py-sm-15 py-10 px-6">
          <div className="d-grid gap-sm-12 gap-8 sidebar-menu-items text-center">
            {menuItems.map((item) => (
              <div key={item.href} className="p-1">
                <Link
                  href={item.href}
                  className={`menu-link transition-all ${
                    isActive(item.href) ? "active-menu" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <i
                    className={`ti ${item.icon} sidebar-icon ${
                      isActive(item.href) ? "active" : ""
                    }`}
                  ></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ============================= */
        /* STICKY DESKTOP VERSION */
        /* ============================= */

        .sidebar {
          --header-height: 110px;
          --top-offset: clamp(130px, 18vh, 170px);
          position: sticky;
          top: var(--top-offset);
          align-self: flex-start;
          height: fit-content;
          max-height: calc(
            100svh - (2 * var(--top-offset)) + var(--header-height)
          );
          z-index: 10000;
        }

        .sidebar-menu-capsule {
          background: #1a1a1a;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: inline-block;
          margin-left: 15px;
          margin-top: 0;
          margin-bottom: 0;
          max-height: var(--capsule-max-h, 480px);
          overflow-y: auto;
          overflow-x: hidden;
          
          scrollbar-width: none;
        }

        .sidebar-menu-capsule::-webkit-scrollbar {
          display: none;
        }

        .sidebar-wrapper {
          transition: all 0.3s ease;
        }

        .menu-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: transparent;
          margin: 0 auto;
          flex-shrink: 0;
        }

        .menu-link:hover {
          background: rgba(255, 140, 0, 0.3);
        }

        .active-menu {
          background: rgba(255, 140, 0, 0.2);
        }

        .sidebar-icon {
          font-size: 28px;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .sidebar-icon.active {
          color: #ff8c00;
          text-shadow:
            0 0 10px #ff8c00,
            0 0 20px #ff4500;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        /* ============================= */
        /* MOBILE OVERLAY */
        /* ============================= */

        @media (max-width: 991px), (max-height: 700px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            z-index: 9999;
          }

          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            background: rgba(0, 0, 0, 0.85);
            width: 100vw;
            display: flex !important;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding-top: var(--sidebar-overlay-top, 116px);
            padding-bottom: 32px;
            backdrop-filter: blur(8px);
            
            /* Tetap beri overflow, cuma kalau benar2 dVh kurang dr isi */
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            box-sizing: border-box;

            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }

          /* Hilangkan custom scrollbar pada wrapper */
          .sidebar-wrapper::-webkit-scrollbar {
            display: none;
          }

          .sidebar-wrapper.show-menu {
            opacity: 1;
            pointer-events: auto;
          }

          .sidebar-menu-capsule {
            margin-left: 20px;
            margin-top: 0;
            border-radius: 40px;
            
            height: auto;
            max-height: calc(100vh - var(--sidebar-overlay-top, 116px) - 32px) !important;
            overflow-y: auto;
            
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
            
            /* Setup animasi slide in/out */
            transform: translateX(-150px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: auto; 
          }

          .sidebar-menu-capsule::-webkit-scrollbar {
            display: block;
            width: 5px;
          }
          
          .sidebar-menu-capsule::-webkit-scrollbar-track {
            background: transparent;
            margin-block: 50px;
          }
          
          .sidebar-menu-capsule::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
          }
          
          .sidebar-menu-capsule::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          .sidebar-wrapper.show-menu .sidebar-menu-capsule {
            transform: translateX(0);
          }

          /* Slightly smaller but still comfortable and FIXED */
          .menu-link {
            width: 56px;
            height: 56px;
          }

          .sidebar-icon {
            font-size: 26px;
          }
        }

        /* ============================= */
        /* DESKTOP */
        /* ============================= */

        @media (min-width: 992px) and (min-height: 701px) {
          .sidebar-wrapper {
            display: flex !important;
            position: static !important;
            transform: none !important;
            opacity: 1 !important;
          }

          .sidebar {
            display: block !important;
            transform: none !important;
          }
        }
      `}</style>
    </aside>
  );
}