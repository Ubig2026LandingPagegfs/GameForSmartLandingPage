import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Banner from "@/components/features/home/Banner";
import TournamentSection from "@/components/features/tournaments/TournamentSection";
import GamesSection from "@/components/features/home/GamesSection";
import CTA from "@/components/features/home/CTA";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "GameForSmart",
  description:
    "Mainkan berbagai game seru dan ikuti turnamen berhadiah di GameForSmart 2026.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-20 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content">
          <Banner />
          <GamesSection />
          <TournamentSection />
          <CTA />
        </article>
      </main>
      <Footer />
    </>
  );
}
