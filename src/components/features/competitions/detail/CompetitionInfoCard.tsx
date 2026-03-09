// components/features/competitions/competition-detail/CompetitionInfoCard.tsx

import Link from "next/link";

interface CompetitionInfoCardProps {
  slug: string;
  prizeMoney?: string;
  date?: string;
  ticketFee?: string;
  currentRegistered: number;
  maxQuota: number;
}

export default function CompetitionInfoCard({
  slug,
  prizeMoney,
  date,
  ticketFee,
  currentRegistered,
  maxQuota,
}: CompetitionInfoCardProps) {
  const progressPercent = Math.min((currentRegistered / maxQuota) * 100, 100);
  const isFull = currentRegistered >= maxQuota;

  const infoRows = [
    { icon: "ti-calendar", label: "Pelaksanaan",       value: date ?? "TBA" },
    { icon: "ti-ticket",   label: "Biaya Pendaftaran", value: ticketFee || "Gratis" },
    { icon: "ti-users",    label: "Kuota Tersedia",    value: `${currentRegistered} / ${maxQuota} Tim` },
  ];

  return (
    <div style={{ position: "sticky", top: 120 }}>
      <div
        className="p-6 rounded-4 border"
        style={{ background: "rgba(20,20,20,0.8)", borderColor: "rgba(255,255,255,0.05)" }}
      >
        {/* Badge */}
        <div className="d-flex justify-content-between align-items-center mb-6">
          <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-3 py-2 rounded-pill fw-bold">
            Pendaftaran Dibuka
          </span>
        </div>

        {/* Prize */}
        <h4 className="tcn-6 fs-sm text-uppercase mb-2">Total Hadiah</h4>
        <h2 className="text-warning fw-bold display-six mb-6">{prizeMoney}</h2>

        <div className="mb-6" style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />

        {/* Info rows */}
        <div className="d-flex flex-column gap-4 mb-8">
          {infoRows.map(({ icon, label, value }) => (
            <div key={label} className="d-flex align-items-center gap-3">
              <div className="bg-secondary bg-opacity-10 p-3 rounded-circle text-white">
                <i className={`ti ${icon} fs-xl`} />
              </div>
              <div>
                <span className="d-block tcn-6 fs-xs text-uppercase">{label}</span>
                <span className="tcn-1 fw-bold">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="d-flex justify-content-between mb-2">
            <span className="tcn-6 fs-xs text-uppercase">Kapasitas</span>
            <span className="tcn-1 fw-bold fs-xs">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="progress rounded-pill bg-secondary bg-opacity-25" style={{ height: 8 }}>
            <div className="progress-bar bg-warning rounded-pill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* CTA */}
        {isFull ? (
          <button className="btn btn-secondary w-100 py-3 rounded-3 fw-bold" disabled>
            Kuota Penuh
          </button>
        ) : (
          <Link
            href={`/competitions/${slug}/register`}
            className="w-100 py-3 rounded-3 fw-bold text-center text-decoration-none text-white d-block"
            style={{ background: "#ff8c00" }}
          >
            Daftar Sekarang
          </Link>
        )}
      </div>
    </div>
  );
}