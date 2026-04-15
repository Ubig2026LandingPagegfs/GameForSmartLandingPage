// components/features/competitions/competition-detail/CompetitionAbout.tsx

import { useState } from "react";

interface CompetitionAboutProps {
  description: string;
}

const CHAR_LIMIT = 200;

export default function CompetitionAbout({ description }: CompetitionAboutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = description.length > CHAR_LIMIT;

  const renderDescription = () => {
    if (!isLong || isExpanded) {
      return description.split("\n\n").map((para, i) => (
        <p key={i} className="mb-4">{para}</p>
      ));
    }
    return <p className="mb-0">{description.substring(0, CHAR_LIMIT)}...</p>;
  };

  return (
    <div
      className="content-card mb-8 p-sm-10 p-6 rounded-4"
      style={{ background: "rgba(20,20,20,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <h3 className="section-title mb-6 d-flex align-items-center gap-3">
        <i className="ti ti-target text-[#ff8c00] fs-two" />
        Tentang Kompetisi
      </h3>

      {/* <div className="row g-4 mb-8">
        {[
          { icon: "ti-bulb",   title: "Tujuan",  text: "Menguji kemampuan akademik dan strategi gameplay." },
          { icon: "ti-trophy", title: "Tingkat", text: "Kompetisi kompetitif skala nasional." },
        ].map(({ icon, title, text }) => (
          <div key={title} className="col-md-6">
            <div
              className="d-flex align-items-start gap-3 p-4 rounded-4 h-100"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="bg-[#ff8c00] text-white mt-1 d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0 }}
              >
                <i className={`ti ${icon} fs-xl`} />
              </div>
              <div>
                <h5 className="tcn-1 fw-bold fs-md mb-2">{title}</h5>
                <p className="tcn-6 fs-sm mb-0">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="tcn-6 fs-md lh-lg border-top border-secondary border-opacity-10 pt-6">
        {renderDescription()}
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-link pe-0 ps-0 mt-2 text-[#ff8c00] text-decoration-none fw-bold"
          >
            {isExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
          </button>
        )}
      </div>
    </div>
  );
}