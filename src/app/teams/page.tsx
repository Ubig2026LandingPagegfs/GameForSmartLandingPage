import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TeamCard from "@/components/features/teams/TeamCard";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Tim",
  description: "Temukan dan bergabunglah dengan tim terbaik di GameForSmart.",
};

const teams = [
  {
    id: 1,
    name: "S2 E-SPORT",
    logo: "/assets/img/team-logo1.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 2,
    name: "ASIA MOK32",
    logo: "/assets/img/team-logo2.webp",
    playersCount: "4 players",
    language: "English",
    slots: "02/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 3,
    name: "TEAM XR",
    logo: "/assets/img/team-logo3.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 4,
    name: "BG TEAM",
    logo: "/assets/img/team-logo4.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 5,
    name: "TEAM DAEMON",
    logo: "/assets/img/team-logo5.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 6,
    name: "OFF DEAD",
    logo: "/assets/img/team-logo6.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 7,
    name: "LANNUS",
    logo: "/assets/img/team-logo7.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 8,
    name: "NAGUARANETA",
    logo: "/assets/img/team-logo8.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
  {
    id: 9,
    name: "EQUIPO DE JUAN",
    logo: "/assets/img/team-logo9.webp",
    playersCount: "3 players",
    language: "English",
    slots: "04/12",
    members: [
      "/assets/img/player1.webp",
      "/assets/img/player2.webp",
      "/assets/img/player3.webp",
      "/assets/img/player4.webp",
      "plus",
    ],
  },
];

export default function TeamsPage() {
  return (
    <>
      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-sm-20 pt-15 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-lg-10 mt-6">
          <div className="container-fluid px-lg-15 px-md-10 px-6">
            <div className="mb-10">
              <Breadcrumbs />
            </div>
            
            <section className="teams-section">
              <div className="row mb-lg-15 mb-sm-10 mb-4 pb-lg-10 pb-sm-6">
                <div className="col-12 mb-lg-15 mb-sm-10 mb-4">
                  <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                    Teams
                  </h2>
                </div>
                <div className="col-12">
                  <div className="parallax-banner-area parallax-container">
                    <img
                      className="w-100 rounded-5 parallax-img"
                      src="/assets/img/team-banner.webp"
                      alt="team banner"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="teams-card-section pb-120">
              <div className="row">
                <div className="col-12 mb-lg-15 mb-10">
                  <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                    Find Teams
                  </h2>
                </div>
              </div>
              <div className="row g-6 mb-lg-15 mb-10">
                {teams.map((team) => (
                  <div key={team.id} className="col-lg-4 col-md-6">
                    <TeamCard {...team} />
                  </div>
                ))}
              </div>
              <div className="d-center">
                <button className="btn-half-border position-relative d-inline-block py-2 bgp-1 px-6 rounded-pill z-2 border-0">
                  View More
                </button>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
