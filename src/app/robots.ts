import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tamilarasu-portfolio.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/blog/create", "/blog/*/edit"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
