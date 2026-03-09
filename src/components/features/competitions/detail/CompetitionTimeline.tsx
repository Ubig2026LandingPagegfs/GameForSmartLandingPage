// components/features/competitions/competition-detail/CompetitionTimeline.tsx

interface CompetitionTimelineProps {
  date?: string;
  finalRound?: string;
}

export default function CompetitionTimeline({ date, finalRound }: CompetitionTimelineProps) {
  const steps = [
    { label: "Pendaftaran", sub: "Dibuka",             icon: <i className="ti ti-check text-white fs-xs" />, active: true },
    { label: "Penyisihan",  sub: date ?? "TBA",        icon: <span className="text-white fs-xs fw-bold">2</span>, active: false },
    { label: "Grand Final", sub: finalRound ?? "TBA",  icon: <span className="text-white fs-xs fw-bold">3</span>, active: false },
  ];

  return (
    <div className="col-lg-12">
      <h3 className="section-title mb-8 d-flex align-items-center gap-3">
        <i className="ti ti-calendar-stats text-warning fs-two" />
        Timeline Kompetisi
      </h3>

      <div
        className="p-6 rounded-4 d-flex flex-column flex-md-row justify-content-between position-relative gap-6 gap-md-0"
        style={{ background: "rgba(20,20,20,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* connector line */}
        <div
          className="d-none d-md-block position-absolute top-50 start-0 w-100"
          style={{ height: 2, background: "rgba(255,255,255,0.1)", transform: "translateY(-50%)", zIndex: 0 }}
        />

        {steps.map(({ label, sub, icon, active }) => (
          <div
            key={label}
            className="text-md-center position-relative z-1 d-flex flex-md-column align-items-center gap-4 gap-md-0"
            style={{ flex: 1 }}
          >
            <div
              className={`mb-md-3 d-flex align-items-center justify-content-center border border-3 border-dark ${active ? "bg-warning" : "bg-secondary"}`}
              style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0 }}
            >
              {icon}
            </div>
            <div>
              <h5 className="tcn-1 fw-bold fs-md mb-1">{label}</h5>
              <span className="tcn-6 fs-sm">{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}