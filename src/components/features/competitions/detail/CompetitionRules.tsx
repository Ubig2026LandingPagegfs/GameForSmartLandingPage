// components/features/competitions/competition-detail/CompetitionRules.tsx

interface CompetitionRulesProps {
  rules: string[];
}

export default function CompetitionRules({ rules }: CompetitionRulesProps) {
  if (!rules?.length) return null;

  return (
    <div
      className="content-card mb-8 p-sm-10 p-6 rounded-4"
      style={{ background: "rgba(20,20,20,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <h3 className="section-title mb-6 d-flex align-items-center gap-3">
        <i className="ti ti-file-text text-warning fs-two" />
        Syarat &amp; Ketentuan
      </h3>

      <div className="d-flex flex-column gap-3">
        {rules.map((rule, i) => (
          <div
            key={i}
            className="d-flex align-items-start gap-3 p-4 rounded-3"
            style={{ background: "rgba(255,140,0,0.05)", border: "1px solid rgba(255,140,0,0.1)" }}
          >
            <i className="ti ti-check text-warning fs-xl mt-1" />
            <span className="tcn-1 fs-md">{rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
}