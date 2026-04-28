"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";
import blogDataRaw from "@/data/blog.json";
import { BlogPost } from "@/data/types";
import { supabase } from "@/lib/supabase";

const fallbackData = blogDataRaw as unknown as BlogPost[];
import BlogCard from "./BlogCard";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Semua", icon: "ti-apps" },
  { name: "Teknologi", icon: "ti-cpu" },
  { name: "Game", icon: "ti-device-gamepad-2" },
  { name: "Edukasi", icon: "ti-school" },
  { name: "Bisnis", icon: "ti-briefcase" },
  { name: "Tren", icon: "ti-trending-up" },
  { name: "Esports", icon: "ti-trophy" },
];

export default function BlogView() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [blogData, setBlogData] = useState<BlogPost[]>(fallbackData);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts dari Supabase
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'PUBLISHED')
          .order('published_at', { ascending: false });

        if (data && !error && data.length > 0) {
          setBlogData(data as BlogPost[]);
        }
      } catch (err) {
        console.error('BlogView: Supabase fetch failed, using fallback', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredPosts = activeCategory === "Semua"
    ? blogData
    : blogData.filter(post => 
        post.category.some(cat => cat.toLowerCase() === activeCategory.toLowerCase())
      );

  return (
    <>
      <Header />
      <main className="main-container container-fluid d-flex align-items-start pt-20 pb-20 px-0 position-relative" style={{ overflow: "visible" }}>
        <Sidebar />
        <article className="main-content mt-lg-10 blog-root">
          <section className="pb-120">
            <div className="container-fluid px-lg-15 px-md-10 px-6">
              
              <div className="mb-10">
                <Breadcrumbs />
              </div>

              {/* HERO SECTION */}
              <div className="blog-hero text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-orange-500 fw-bold fs-xs text-uppercase tracking-[0.3em] mb-4">Wawasan & Berita</p>
                  <h1 className="display-4 text-white fw-black mb-6">
                    Inspirasi <span className="text-orange-500">Cerdas</span> Untuk <br/> Masa Depan Gaming
                  </h1>
                  <p className="text-secondary mx-auto fs-lg mb-0" style={{ maxWidth: "700px" }}>
                    Temukan artikel pilihan seputar teknologi, edukasi, dan strategi gaming dari para ahli di bidangnya. Bergabunglah dengan ribuan pembaca setia kami.
                  </p>
                </motion.div>
              </div>

              {/* CATEGORIES SECTION */}
              <div className="blog-categories-wrap mb-14 text-center">
                <p className="text-secondary fs-xs fw-bold text-uppercase tracking-widest mb-6">Jelajahi Topik Terkini</p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`cat-btn d-flex align-items-center gap-2 px-5 py-3 rounded-pill transition-all duration-300 ${activeCategory === cat.name ? "active" : ""}`}
                    >
                      <i className={`ti ${cat.icon} fs-5`}></i>
                      <span className="fw-semibold">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* BLOG GRID */}
              <div className="blog-grid-wrap position-relative">
                {loading ? (
                  <div className="text-center py-20">
                    <div className="spinner-border text-orange-500" role="status" style={{ width: '3rem', height: '3rem', borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#ea580c' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-secondary mt-4">Memuat artikel...</p>
                  </div>
                ) : (
                  <motion.div 
                    layout
                    className="row g-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredPosts.map((post) => (
                        <motion.div 
                          key={post.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          className="col-lg-4 col-md-6 col-12"
                        >
                          <BlogCard {...post} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                {!loading && filteredPosts.length === 0 && (
                  <div className="text-center py-20 mt-10">
                    <i className="ti ti-search fs-1 text-secondary mb-4"></i>
                    <h3 className="text-white">Tidak ada artikel ditemukan</h3>
                    <p className="text-secondary">Coba pilih kategori lain atau periksa kembali pencarian Anda.</p>
                  </div>
                )}
              </div>

            </div>
          </section>
        </article>
      </main>
      <Footer />

      <style jsx>{`
        .blog-root {
          width: 100%;
        }
        .text-secondary { color: rgba(255, 255, 255, 0.6) !important; }
        .text-orange-500 { color: #ea580c !important; }
        .fs-xs { font-size: 11px; }
        .fs-lg { font-size: 18px; }
        .fw-black { font-weight: 900; }

        .cat-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
        }
        .cat-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        .cat-btn.active {
          background: #ea580c;
          border-color: #ea580c;
          box-shadow: 0 4px 15px rgba(234, 88, 12, 0.4);
        }

        @media (max-width: 991px) {
          .display-4 { font-size: 2.5rem; }
          .fs-lg { font-size: 16px; }
        }
      `}</style>
    </>
  );
}
