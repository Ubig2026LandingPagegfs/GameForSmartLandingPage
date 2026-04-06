"use client";
import Link from "next/link";

export default function NotificationArea({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={`notification-area p-4 ${isOpen ? "open" : ""}`}
      data-lenis-prevent
    >
      <div className="notification-header d-between border-bottom pb-4 mb-4">
        <span className="fs-five fw-bold text-white">Notifications</span>
      </div>
      <div className="notification-card d-grid gap-lg-4 gap-2" data-tilt>
        {[1, 2, 1, 2].map((id, idx) => (
          <Link
            href="#"
            key={idx}
            onClick={onClose}
            className="text-decoration-none"
          >
            <div className="card-item d-flex align-items-center gap-4 hover-lift p-2 rounded">
              <div className="card-img-area">
                <img
                  className="w-100 rounded-circle"
                  src={`/assets/img/avatar${id}.webp`}
                  alt="profile"
                />
              </div>
              <div className="card-info">
                <span className="card-title d-block tcn-1">
                  {" "}
                  {id === 1 ? "Cristofer Dorwart" : "Piter Maio"}
                </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  {id === 1 ? "Winners The Last Game" : "Accept your challenge"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
