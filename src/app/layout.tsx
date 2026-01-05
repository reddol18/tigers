'use client';

import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import { Inter } from "next/font/google";
import cn from "classnames";
import { useMetadataStore } from '@/store/metadataStore';

import "./globals.css";

// pages/_document.tsx (TypeScript) 또는 pages/_document.js (JavaScript)
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Google Analytics 측정 ID 가져오기 (이 파일은 서버 사이드에서만 실행되므로 NEXT_PUBLIC_ 접두사가 필요 없음)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; // 그래도 NEXT_PUBLIC_으로 통일하는게 일반적


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { title, description, openGraph } = useMetadataStore();

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />
        <meta property="og:image" content={openGraph.images} />
  
        
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        {GA_MEASUREMENT_ID && (
            <>
              <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              />
              <script
                  dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                  }}
              />
            </>
        )}
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
