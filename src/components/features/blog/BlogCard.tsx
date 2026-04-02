"use client";
import React from "react";
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
}: BlogCardProps) {
  return (
    <div className="blog-card bg-[#161920] border border-white/5 rounded-2xl overflow-hidden hover-bg-elevated transition-all duration-300 group h-100 d-flex flex-column">
      {/* Landscape Image with Category Overlay */}
      <Link href={`/blog/${slug}`} className="card-image-wrap position-relative overflow-hidden aspect-video d-block">
        <img 
          src={image} 
          alt={title} 
          className="w-100 h-100 object-fit-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="position-absolute top-0 start-0 m-4 d-flex gap-2">
          {category.map((cat, index) => (
            <span key={index} className="badge-tag">{cat}</span>
          ))}
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
            {date}
          </span>
        </div>
        
        <Link href={`/blog/${slug}`} className="text-decoration-none">
          <h3 className="text-white fs-5 fw-bold mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-secondary fs-sm line-clamp-2 mb-0">
          {excerpt}
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
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
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
      `}</style>
    </div>
  );
}
