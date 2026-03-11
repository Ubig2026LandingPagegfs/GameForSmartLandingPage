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

  // Dynamically track actual header height and set as CSS variable.
  // This is the key fix: padding-top of the overlay always equals the
  // real rendered header height, so it stays correct at any zoom level.
  useEffect(() => {
    const updateHeaderHeight = () => {
      // Adjust this selector to match your actual header element.
      const header =
        document.querySelector("header") ||
        document.querySelector(".header") ||
        document.querySelector("[data-header]") ||
        document.querySelector("nav");

      const height = header ? header.getBoundingClientRect().height : 100;

      // Add a 16px comfortable gap below the header
      document.documentElement.style.setProperty(
        "--sidebar-overlay-top",
        `${height + 16}px`
      );
    };

    updateHeaderHeight();

    // ResizeObserver re-measures whenever header size changes (including zoom)
    const header =
      document.querySelector("header") ||
      document.querySelector(".header") ||
      document.querySelector("[data-header]") ||
      document.querySelector("nav");

    const ro = new ResizeObserver(updateHeaderHeight);
    if (header) ro.observe(header);

    // Also listen to window resize as a fallback
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
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
      <div ref={wrapperRef} className={`sidebar-wrapper ${open ? "show-menu" : ""}`}>
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
          max-height: calc(100svh - (2 * var(--top-offset)) + var(--header-height));
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
          max-height: inherit;
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
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: transparent;
          margin: 0 auto;
        }

        .menu-link:hover {
          background: rgba(255, 140, 0, 0.3);
        }

        .active-menu {
          background: rgba(255, 140, 0, 0.2);
        }

        .sidebar-icon {
          font-size: 32px;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }

        .sidebar-icon.active {
          color: #ff8c00;
          text-shadow: 0 0 10px #ff8c00, 0 0 20px #ff4500;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        @media (max-height: 800px) {
          .menu-link {
            width: 56px;
            height: 56px;
          }
          .sidebar-icon {
            font-size: 26px;
          }
          .sidebar-menu-capsule {
            border-radius: 60px;
          }
        }

        @media (max-height: 600px) {
          .menu-link {
            width: 46px;
            height: 46px;
          }
          .sidebar-icon {
            font-size: 22px;
          }
          .sidebar-menu-capsule {
            border-radius: 40px;
          }
        }

        @media (max-width: 1199px) {
          .menu-link {
            width: 55px;
            height: 55px;
          }
          .sidebar-icon {
            font-size: 26px;
          }
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
            left: -120px;
            /*
              Pakai min-height bukan height agar wrapper tidak memotong
              konten. Saat zoom tinggi, wrapper bisa "lebih panjang"
              dari layar dan di-scroll, sehingga item Kontak tetap dapat
              dijangkau.
            */
            min-height: 100dvh;
            height: auto;
            background: rgba(0, 0, 0, 0.85);
            width: 100vw;
            display: none !important;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding-top: var(--sidebar-overlay-top, 116px);
            padding-bottom: 32px;
            backdrop-filter: blur(8px);
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
            box-sizing: border-box;
          }

          .sidebar-wrapper::-webkit-scrollbar {
            display: none;
          }

          .sidebar-wrapper.show-menu {
            display: flex !important;
            left: 0;
          }

          .sidebar-menu-capsule {
            margin-left: 20px;
            margin-top: 0;
            border-radius: 40px;
            /* Tidak ada max-height — capsule penuh, wrapper yang scroll */
            max-height: none;
            overflow-y: visible;
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