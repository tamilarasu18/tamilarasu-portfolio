import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tamilarasu-portfolio.vercel.app"),
  title: {
    default: "Tamilarasu | Full Stack Developer",
    template: "%s | Tamilarasu",
  },
  description:
    "Results-driven Full Stack Developer with 4+ years of experience in Flutter, React, Next.js, and backend development. Passionate about AI and automation.",
  keywords: [
    "Tamilarasu",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Flutter Developer",
    "FastAPI",
    "MongoDB",
    "AI Developer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [
    { name: "Tamilarasu", url: "https://tamilarasu-portfolio.vercel.app" },
  ],
  creator: "Tamilarasu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tamilarasu-portfolio.vercel.app",
    siteName: "Tamilarasu Portfolio",
    title: "Tamilarasu | Full Stack Developer",
    description:
      "Results-driven Full Stack Developer with 4+ years of experience in Flutter, React, Next.js, and backend development.",
    images: [
      {
        url: "/avatar.png",
        width: 512,
        height: 512,
        alt: "Tamilarasu - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamilarasu | Full Stack Developer",
    description:
      "Results-driven Full Stack Developer with 4+ years of experience in Flutter, React, Next.js, and backend development.",
    images: ["/avatar.png"],
    creator: "@tamilarasu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://tamilarasu-portfolio.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
