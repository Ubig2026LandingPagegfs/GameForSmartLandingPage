"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/types";

interface BlogCardProps extends BlogPost {}

export default function BlogCard({
  title,
  author,
  date,
  category,
  excerpt,
  image,
  slug,
  published_at,
}: BlogCardProps) {
  const displayImage = image || "/images/blog/blog-1.webp";
  const displayDate = date || (published_at ? new Date(published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-");
  const displayExcerpt = excerpt || "";
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayLimit = isMobile ? 3 : 5;
  return (
    <div className="blog-card bg-[#161920] border border-black/5 rounded-2xl overflow-hidden hover-bg-elevated transition-all duration-300 group h-100 d-flex flex-column">
      {/* Landscape Image with Category Overlay */}
      <Link href={`/blog/${slug}`} className="card-image-wrap position-relative overflow-hidden aspect-video d-block">
        <img 
          src={displayImage} 
          alt={title} 
          className="w-100 h-100 object-fit-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div 
          className={`position-absolute top-0 start-0 m-4 ${isExpanded ? 'overflow-x-auto hide-scrollbar' : 'd-flex gap-2 flex-wrap'}`} 
          style={{ maxWidth: 'calc(100% - 2rem)' }}
        >
          {isExpanded ? (
            <div className="d-flex flex-column gap-2" style={{ width: 'max-content' }}>
              <div className="d-flex gap-2 flex-nowrap">
                {category.slice(0, Math.ceil(category.length / 2)).map((cat, index) => (
                  <span key={index} className="badge-tag text-truncate" style={{ maxWidth: '100px', background: 'rgba(0,0,0,0.7)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{cat}</span>
                ))}
              </div>
              <div className="d-flex gap-2 flex-nowrap align-items-center">
                {category.slice(Math.ceil(category.length / 2)).map((cat, index) => (
                  <span key={index + 100} className="badge-tag text-truncate" style={{ maxWidth: '100px', background: 'rgba(0,0,0,0.7)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{cat}</span>
                ))}
                <span 
                  className="badge-tag cursor-pointer d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: '26px', padding: '0', background: 'rgba(234, 88, 12, 0.9)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  title="Tutup Tag"
                >
                  <i className="ti ti-x fs-6"></i>
                </span>
              </div>
            </div>
          ) : (
            <>
              {category.slice(0, displayLimit).map((cat, index) => (
                <span key={index} className="badge-tag text-truncate" style={{ maxWidth: '100px', background: 'rgba(0,0,0,0.7)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{cat}</span>
              ))}
              {category.length > displayLimit && (
                <span 
                  className="badge-tag cursor-pointer flex-shrink-0"
                  style={{ background: 'rgba(0,0,0,0.7)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(true);
                  }}
                >
                  +{category.length - displayLimit}
                </span>
              )}
            </>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="card-body p-6 d-flex flex-column flex-grow-1">
        <div className="mb-3 d-flex align-items-center gap-2">
          <span className="text-secondary fs-xs fw-medium text-uppercase tracking-wider">
            {author}
          </span>
          <span className="text-secondary fs-xs">•</span>
          <span className="text-secondary fs-xs">
            {displayDate}
          </span>
        </div>
        
        <Link href={`/blog/${slug}`} className="text-decoration-none">
          <h3 className="text-white fs-5 fw-bold mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-secondary fs-sm line-clamp-2 mb-0">
          {displayExcerpt}
        </p>
      </div>

      <style jsx>{`
        .blog-card {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .aspect-video {
          aspect-ratio: 16 / 9;
        }
        .badge-tag {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: white;
          padding: 5px 14px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        .fs-xs { font-size: 11px; }
        .fs-sm { font-size: 13px; }
        .text-secondary { color: rgba(255, 255, 255, 0.6) !important; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .cursor-pointer { cursor: pointer; }
        .flex-shrink-0 { flex-shrink: 0; }
      `}</style>
    </div>
  );
}
