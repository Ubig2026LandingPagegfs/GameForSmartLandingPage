"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import { BlogPost } from "@/data/types";
import BlogCard from "./BlogCard";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface BlogDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(13);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Baca artikel menarik: ${post.title}`;
    switch (platform) {
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "copy":
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(url).then(() => {
            alert("Link berhasil disalin!");
          }).catch(() => {
            prompt("Salin URL berikut:", url);
          });
        } else {
          prompt("Salin URL berikut:", url);
        }
        break;
    }
  };

  const customCrumbs = [
    { href: "/blog", label: "Blog", isLast: false },
    { href: `/blog/${post.slug}`, label: post.title, isLast: true },
  ];

  return (
    <>
      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-sm-20 pt-15 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-lg-10 blog-detail-root">
          <section className="pb-120">
            <div className="container-fluid px-lg-15 px-md-10 px-6">
              <div className="mb-8">
                <Breadcrumbs customCrumbs={customCrumbs} />
              </div>
              <div className="row g-10">
                
                {/* ── LEFT: Main Article Column ── */}
                <div className="col-xl-8 col-lg-7">

                  {/* Article Title */}
                  <h1 className="article-title text-white fw-black mb-4">
                    {post.title}
                  </h1>

                  {/* Meta: author, category, date */}
                  <div className="d-flex align-items-center gap-3 article-meta mb-6">
                    <div className="author-avatar">
                      <img
                        src="/assets/img/profile.webp"
                        alt={post.author}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      <span className="text-white fw-bold fs-sm">{post.author}</span>
                      <span className="meta-sep">•</span>
                      <span className="meta-category">{post.category[0]}</span>
                      <span className="meta-sep">•</span>
                      <span className="meta-date">{post.date || (post.published_at ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-')}</span>
                    </div>
                  </div>

                  <div className="featured-image-wrap mb-10">
                    <img
                      src={post.image || '/images/blog/blog-1.webp'}
                      alt={post.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  {/* Article Body */}
                  <div className="article-body">
                    <h2 className="text-white fw-black mb-4 fs-5">
                      Jakarta, Indonesia –
                    </h2>
                    <div
                      className="article-content"
                      dangerouslySetInnerHTML={{ __html: post.content || '' }}
                    />
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="bottom-action-bar mt-12">
                    {/* Left: Like, Comment, Share counts */}
                    <div className="action-counts d-flex align-items-center gap-5">
                      <button
                        className={`action-btn ${liked ? "liked" : ""}`}
                        onClick={handleLike}
                      >
                        <i className={`ti ${liked ? "ti-thumb-up-filled" : "ti-thumb-up"}`}></i>
                        <span>{likeCount} Likes</span>
                      </button>
                      <button className="action-btn">
                        <i className="ti ti-message-2"></i>
                        <span>55 Comments</span>
                      </button>
                      <button className="action-btn">
                        <i className="ti ti-share"></i>
                        <span>980 Shares</span>
                      </button>
                    </div>

                    {/* Right: Comment Input */}
                    <div className="comment-input-wrap">
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="comment-input"
                      />
                      <button className="comment-send-btn">
                        <i className="ti ti-send"></i>
                      </button>
                    </div>
                  </div>

                  {/* Related Articles – mobile only */}
                  <div className="mt-20 d-lg-none">
                    <h2 className="text-white fw-black mb-8 fs-4">Baca Juga</h2>
                    <div className="row g-6">
                      {relatedPosts
                        .slice(0, 3)
                        .map((p) => (
                          <div key={p.id} className="col-md-6 col-12">
                            <BlogCard {...p} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Sticky Sidebar ── */}
                <div className="col-xl-4 col-lg-5 d-none d-lg-block">
                  <div className="sticky-sidebar-inner">

                    {/* Share to */}
                    <div className="sidebar-widget mb-10">
                      <h5 className="sidebar-widget-title">Share to</h5>
                      <div className="d-flex gap-3 mt-4">
                        {[
                          { key: "whatsapp", icon: "ti-brand-whatsapp", hoverClass: "hover-green" },
                          { key: "twitter",  icon: "ti-brand-x",        hoverClass: "hover-dark" },
                          { key: "linkedin", icon: "ti-brand-linkedin",  hoverClass: "hover-blue" },
                          { key: "facebook", icon: "ti-brand-facebook",  hoverClass: "hover-fb" },
                          { key: "copy",     icon: "ti-mail",            hoverClass: "hover-orange" },
                        ].map(({ key, icon, hoverClass }) => (
                          <button
                            key={key}
                            onClick={() => handleShare(key)}
                            className={`social-btn ${hoverClass}`}
                          >
                            <i className={`ti ${icon}`}></i>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Related Articles */}
                    <div className="sidebar-widget">
                      <div className="d-flex align-items-center justify-content-between mb-6">
                        <h5 className="sidebar-widget-title">Related Articles</h5>
                        <Link href="/blog" className="text-orange-500 fs-xs fw-bold text-decoration-none hover-underline">View All</Link>
                      </div>
                      <div className="d-flex flex-column gap-2 mt-4">
                        {relatedPosts.map((p, idx) => (
                          <Link
                            key={p.id}
                            href={`/blog/${p.slug}`}
                            className={`related-item text-decoration-none group ${idx < relatedPosts.length - 1 ? "related-item-border" : ""}`}
                          >
                            <div className="related-thumb position-relative overflow-hidden">
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-100 h-100 object-fit-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="related-info">
                              <p className="related-title transition-colors decoration-none">{p.title}</p>
                              <div className="d-flex align-items-center gap-2">
                                <span className="related-cat">{p.category[0]}</span>
                                <span className="text-secondary-dim fs-xs">•</span>
                                <span className="related-date">
                                  {p.date 
                                    ? p.date.split(' ').slice(0, 2).join(' ') 
                                    : (p.published_at ? new Date(p.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }) : '-')}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />

      <style jsx>{`
        /* ── Root ── */
        .blog-detail-root { width: 100%; }

        /* ── Article Title ── */
        .article-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        /* ── Meta ── */
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid rgba(234, 88, 12, 0.3);
          box-shadow: 0 0 10px rgba(234, 88, 12, 0.2);
        }
        .fs-sm  { font-size: 14px; }
        .meta-sep  { color: rgba(255,255,255,0.15); font-size: 14px; margin: 0 4px; }
        .meta-category {
          color: #ea580c;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .meta-date { color: rgba(255,255,255,0.5); font-size: 13px; }

        /* ── Featured Image ── */
        .featured-image-wrap {
          width: 100%;
          aspect-ratio: 21 / 9;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        @media (max-width: 991px) {
          .featured-image-wrap { aspect-ratio: 16 / 9; }
        }

        /* ── Article Body ── */
        .article-body {
          max-width: 850px;
        }
        .article-content {
          color: rgba(255,255,255,0.8);
          font-size: 1.125rem;
          line-height: 1.9;
        }
        .article-content :global(h2) {
          color: #fff;
          font-weight: 900;
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.75rem;
          background: linear-gradient(to right, #fff, #999);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .article-content :global(p)  { margin-bottom: 1.8rem; }

        /* ── Bottom Action Bar ── */
        .bottom-action-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          padding: 12px 24px;
        }
        .action-counts { flex-shrink: 0; }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          padding: 8px 12px;
          border-radius: 99px;
        }
        .action-btn i { font-size: 18px; }
        .action-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .action-btn.liked { color: #ea580c; background: rgba(234, 88, 12, 0.1); }

        .comment-input-wrap {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .comment-input {
          width: 100%;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 12px 48px 12px 24px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }
        .comment-input::placeholder { color: rgba(255,255,255,0.25); }
        .comment-input:focus { border-color: #ea580c; box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.1); }
        .comment-send-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: #ea580c;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: transform 0.2s;
        }
        .comment-send-btn:hover { transform: translateY(-50%) scale(1.2); }

        /* ── Sticky Sidebar ── */
        .sticky-sidebar-inner {
          position: sticky;
          top: 120px;
        }
        .sidebar-widget-title {
          color: #fff;
          font-weight: 800;
          font-size: 16px;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ── Social Buttons ── */
        .social-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          background: #161920;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-btn:hover { transform: translateY(-4px) scale(1.1); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        .social-btn.hover-green:hover  { background: #22c55e; color: #fff; border-color: #22c55e; }
        .social-btn.hover-dark:hover   { background: #000;    color: #fff; border-color: #000; }
        .social-btn.hover-blue:hover   { background: #2563eb; color: #fff; border-color: #2563eb; }
        .social-btn.hover-fb:hover     { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
        .social-btn.hover-orange:hover { background: #ea580c; color: #fff; border-color: #ea580c; }

        /* ── Related Articles (Sidebar) ── */
        .related-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          transition: background 0.2s;
        }
        .related-item-border {
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .related-thumb {
          width: 100px;
          height: 68px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .related-info { flex: 1; min-width: 0; }
        .related-title {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
          margin: 0 0 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        .related-item:hover .related-title { color: #ea580c; }
        .related-cat {
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .related-date {
          color: rgba(255,255,255,0.3);
          font-size: 11px;
        }

        .hover-underline:hover { text-decoration: underline !important; }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .article-title { font-size: 2.2rem; }
          .article-content { font-size: 1.05rem; }
        }
      `}</style>
    </>
  );
}