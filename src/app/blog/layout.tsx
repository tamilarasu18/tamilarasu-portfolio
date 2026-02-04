import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles about web development, Flutter, React, Next.js, AI, and more by Tamilarasu - a Full Stack Developer sharing insights and experiences.",
  openGraph: {
    title: "Blog | Tamilarasu",
    description:
      "Read articles about web development, Flutter, React, Next.js, AI, and more.",
    type: "website",
    url: "https://tamilarasu-portfolio.vercel.app/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Tamilarasu",
    description:
      "Read articles about web development, Flutter, React, Next.js, AI, and more.",
  },
  alternates: {
    canonical: "https://tamilarasu-portfolio.vercel.app/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
