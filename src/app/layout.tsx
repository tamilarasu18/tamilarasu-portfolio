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
  title: "Tamilarasu | Full Stack Developer",
  description:
    "Results-driven Full Stack Developer with 4+ years of experience in Flutter, React, Next.js, and backend development. Passionate about AI and automation.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Flutter",
    "FastAPI",
    "MongoDB",
    "AI",
  ],
  authors: [{ name: "Tamilarasu" }],
  openGraph: {
    title: "Tamilarasu | Full Stack Developer",
    description:
      "Results-driven Full Stack Developer with 4+ years of experience",
    type: "website",
  },
  manifest: "/manifest.json",
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
