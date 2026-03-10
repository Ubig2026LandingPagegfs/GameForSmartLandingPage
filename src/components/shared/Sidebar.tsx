"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      setOpen(e.detail.open);
    };
    window.addEventListener("sidebar-toggle", handler);
    return () => window.removeEventListener("sidebar-toggle", handler);
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
      {/* SIDEBAR CONTENT */}

      {/* SIDEBAR CONTENT */}
      <div className={`sidebar-wrapper ${open ? "show-menu" : ""} d-lg-flex`}>
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
          position: sticky;
          top: 100px; /* adjusted for better fit */
          align-self: flex-start;
          height: fit-content;
          max-height: calc(100vh - 100px);
          z-index: 1000;
        }

        .sidebar-menu-capsule {
          background: #1a1a1a;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: inline-block;
          margin-left: 15px;
          margin-top: 10px;
          margin-bottom: 15px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none; /* Firefox */
        }

        .sidebar-menu-capsule::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
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

        /* Responsive height for scroll/zoom issues */
        @media (max-height: 800px) and (min-height: 651px) {
          .menu-link {
            width: 60px;
            height: 60px;
          }
          .sidebar-icon {
            font-size: 28px;
          }
          .sidebar-menu-capsule {
            border-radius: 60px;
          }
        }

        /* Responsive width for smaller desktops/tablets */
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
        /* MOBILE OVERLAY (Also triggers on short screens) */
        /* ============================= */

        @media (max-width: 991px), (max-height: 650px) {
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
            left: -120px; /* Lebar capsule approx */
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            width: 100vw;
            display: none !important;
            justify-content: flex-start;
            align-items: center;
            backdrop-filter: blur(5px);
          }

          .sidebar-wrapper.show-menu {
            display: flex !important;
            left: 0;
          }

          .sidebar-menu-capsule {
            margin-left: 20px;
            margin-top: 0;
            border-radius: 40px;
            max-height: 90vh; /* Allow more scrolling space on mobile */
          }
        }

        /* ============================= */
        /* DESKTOP */
        /* ============================= */

        @media (min-width: 992px) and (min-height: 651px) {
          .sidebar-wrapper {
            display: flex !important;
            position: static !important;
            transform: none !important; /* Override style.css 1750px breakpoint */
            opacity: 1 !important;
          }

          .sidebar {
            display: block !important;
            transform: none !important;
            position: sticky !important;
            top: 130px !important;
            height: fit-content !important;
            align-self: flex-start !important;
            width: fit-content !important;
            z-index: 1000;
          }
        }
      `}</style>
    </aside>
  );
}
