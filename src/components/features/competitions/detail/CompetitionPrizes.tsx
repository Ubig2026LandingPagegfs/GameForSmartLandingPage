// components/features/competitions/competition-detail/CompetitionPrizes.tsx

interface Prize {
  place: string;
  amount?: string;
  reward?: string;
}

interface CompetitionPrizesProps {
  prizes?: Prize[];
}

const TIERS = [
  {
    defaultPlace:  "JUARA 1",
    defaultAmount: "Rp 7.500.000",
    defaultReward: "Trofi & Sertifikat",
    icon:          "ti-trophy",
    color:         "#ffd700",
    bg:            "rgba(255,215,0,0.05)",
    border:        "rgba(255,215,0,0.2)",
  },
  {
    defaultPlace:  "JUARA 2",
    defaultAmount: "Rp 5.000.000",
    defaultReward: "Medali & Sertifikat",
    icon:          "ti-medal",
    color:         "#c0c0c0",
    bg:            "rgba(192,192,192,0.05)",
    border:        "rgba(192,192,192,0.2)",
  },
  {
    defaultPlace:  "JUARA 3",
    defaultAmount: "Rp 2.500.000",
    defaultReward: "Medali & Sertifikat",
    icon:          "ti-medal",
    color:         "#cd7f32",
    bg:            "rgba(205,127,50,0.05)",
    border:        "rgba(205,127,50,0.2)",
  },
];

export default function CompetitionPrizes({ prizes = [] }: CompetitionPrizesProps) {
  return (
    <>
      <div className="col-12 text-center mb-6">
        <h3 className="section-title d-flex align-items-center justify-content-center gap-3">
          <i className="ti ti-gift text-warning fs-two" />
          Hadiah &amp; Penghargaan
        </h3>
      </div>

      {TIERS.map((tier, i) => {
        const prize = prizes[i];
        return (
          <div key={i} className="col-md-4">
            <div
              className="prize-card text-center p-8 rounded-4 h-100"
              style={{ background: tier.bg, border: `1px solid ${tier.border}` }}
            >
              <i className={`ti ${tier.icon} fs-display-four mb-4 d-block`} style={{ color: tier.color }} />
              <h4 className="fw-bold mb-2 text-uppercase" style={{ color: tier.color }}>
                {prize?.place  ?? tier.defaultPlace}
              </h4>
              <h3 className="fw-extrabold text-white mb-3">
                {prize?.amount ?? tier.defaultAmount}
              </h3>
              <p className="tcn-6 fs-sm mb-0">
                {prize?.reward ?? tier.defaultReward}
              </p>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .prize-card { transition: transform 0.3s ease; }
        .prize-card:hover { transform: translateY(-5px); }
      `}</style>
    </>
  );
}