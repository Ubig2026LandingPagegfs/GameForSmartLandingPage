"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Crumb {
    href: string;
    label: string;
    isLast: boolean;
}

interface BreadcrumbsProps {
    customCrumbs?: Crumb[];
}

export default function Breadcrumbs({ customCrumbs }: BreadcrumbsProps) {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    const defaultCrumbs = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;  
        let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        // Manual mapping for consistency
        if (label === 'Competition') label = 'Competitions';
        if (label === 'Game') label = 'Games';

        const isLast = index === pathSegments.length - 1;

        return {
            href,
            label,  
            isLast
        };
    });

    const breadcrumbs = customCrumbs || defaultCrumbs;

    if (pathname === '/') return null;
 
    return (
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-8">
            <ol className="breadcrumb d-flex align-items-center gap-2 m-0 p-0 list-unstyled">
                <li className="breadcrumb-item">
                    <Link href="/" className="tcn-6 fs-sm hover-orange">Home</Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                        <li className="tcn-6 fs-xs">/</li>
                        <li className={`breadcrumb-item ${crumb.isLast ? 'active' : ''}`}>
                            {crumb.isLast ? (
                                <span className="text-orange-glow fs-sm fw-bold">{crumb.label}</span>
                            ) : (
                                <Link href={crumb.href} className="tcn-6 fs-sm hover-orange">{crumb.label}</Link>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
            <style jsx>{`
                .hover-orange:hover {
                    color: #ff8c00 !important;
                }
                .breadcrumb-item.active {
                    pointer-events: none;
                }
            `}</style>
        </nav>
    );
}
