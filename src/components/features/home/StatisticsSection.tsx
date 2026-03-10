"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Helper component for counting up animation
function Counter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  end: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  // Extract numeric value from string (handling commas and decimals)
  const target = parseFloat(end.replace(/,/g, "").replace(/[^0-9.-]+/g, ""));
  const isInt = end.indexOf(".") === -1;

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);

      const currentCount = progress === 1 ? target : target * ease;
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  // Format the number back to string with commas/decimals
  const formattedCount = isInt
    ? Math.floor(count).toLocaleString("en-US")
    : count.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}

function TiltCard({
  children,
  className,
  style,
  borderColor,
  isHighlighted,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  borderColor: string;
  isHighlighted?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt X
    const rotateY = ((x - centerX) / centerX) * 10; // Max tilt Y

    setRotation({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, visible: false }));
  };

  return (
    <Card
      ref={cardRef}
      className={cn("border-0", className)}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
        transition:
          "transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight Effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: spotlight.visible
            ? `radial-gradient(circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 140, 0, 0.15), transparent 80%)`
            : "transparent",
          pointerEvents: "none",
          borderRadius: "inherit",
          zIndex: 1,
          transition: "background 0.3s ease",
        }}
      />
      <CardContent
        className="p-0"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}

export default function StatisticsSection() {
  const statistics = [
    {
      id: 1,
      label: "Current prize total",
      value: "240.32",
      prefix: "$",
      icon: "🏆",
      iconColor: "#ff8c00",
      borderColor: "#ff8c00",
      bgClass: "linear-gradient(180deg, #3d2b25 0%, #2b1d1a 100%)", // Darker brown gradient
      isHighlighted: true,
    },
    {
      id: 2,
      label: "Active Games",
      value: "20",
      icon: "🎮",
      iconColor: "#FF6B6B",
      borderColor: "#FF6B6B",
      isHighlighted: false,
    },
    {
      id: 3,
      label: "Active users",
      value: "8,909",
      icon: "👥",
      iconColor: "#4DABF7",
      borderColor: "#4DABF7",
      isHighlighted: false,
    },
    {
      id: 4,
      label: "Total Games",
      value: "304",
      icon: "♟️",
      iconColor: "#FF8C42",
      borderColor: "#FF8C42",
      isHighlighted: false,
    },
    {
      id: 5,
      label: "All-time prizes paid",
      value: "17,406",
      prefix: "$",
      icon: "💰",
      iconColor: "#ff8c00",
      borderColor: "#ff8c00",
      isHighlighted: false,
    },
    {
      id: 6,
      label: "Your Balance",
      value: "0",
      prefix: "$",
      icon: "💳",
      iconColor: "#ff8c00",
      borderColor: "#ff8c00",
      isHighlighted: false,
    },
  ];

  return (
    <section className="statistics-section pb-120 bgn-4">
      <style jsx>{`
        .stat-card {
          /* Transition handled in TiltCard inline style for transform */
        }
        .stat-card:hover {
          box-shadow: 0 10px 20px rgba(255, 140, 0, 0.2);
          border-color: #ff8c00 !important;
        }
        .stat-card:hover .stat-icon-wrapper {
          border-color: #ff8c00 !important;
          color: #ff8c00 !important;
        }
      `}</style>
      <div className="container-fluid pt-120">
        <div className="row mb-lg-15 mb-sm-10 mb-8">
          <div className="col-lg-6 text-start">
            <h2 className="display-four tcn-1 cursor-scale growUp title-anim font-heading">
              Statistics
            </h2>
          </div>
        </div>
        <div className="row g-6">
          {statistics.map((stat) => (
            <div key={stat.id} className="col-xl-4 col-md-6">
              <TiltCard
                className={`stat-card p-6 rounded-4 d-flex align-items-center gap-4`}
                style={{
                  background: "#080808", // Uniform background for all cards
                  border: stat.isHighlighted
                    ? "1px solid rgba(255, 215, 0, 0.2)"
                    : `1px solid ${stat.borderColor}10`,
                  position: "relative",
                  overflow: "hidden",
                }}
                borderColor={stat.borderColor}
                isHighlighted={stat.isHighlighted}
              >
                <div
                  className="stat-icon-wrapper d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: stat.isHighlighted
                      ? "rgba(255, 215, 0, 0.1)"
                      : "transparent",
                    border: `2px solid ${stat.borderColor}`,
                    fontSize: "2rem",
                    color: stat.borderColor, // Icon color same as border
                  }}
                >
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <p className="stat-label tcn-6 mb-2 fs-sm">{stat.label}</p>
                  <h3 className="stat-value tcn-1 mb-0 fw-bold display-six">
                    <Counter end={stat.value} prefix={stat.prefix} />
                  </h3>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
