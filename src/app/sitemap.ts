import { MetadataRoute } from "next";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_REPO = "tamilarasu18/tamilarasu-portfolio-blog";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface BlogPostMeta {
  slug: string;
  updatedAt: string;
}

async function fetchBlogs(): Promise<BlogPostMeta[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/posts`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      return [];
    }

    const files = await response.json();
    const jsonFiles = files.filter(
      (file: { name: string }) =>
        file.name.endsWith(".json") && file.name !== "index.json",
    );

    const posts: BlogPostMeta[] = await Promise.all(
      jsonFiles.map(async (file: { download_url: string; name: string }) => {
        try {
          const contentRes = await fetch(file.download_url, {
            next: { revalidate: 3600 },
          });
          const post = await contentRes.json();
          return {
            slug: post.slug || file.name.replace(".json", ""),
            updatedAt: post.updatedAt || post.createdAt,
          };
        } catch {
          return null;
        }
      }),
    );

    return posts.filter((p): p is BlogPostMeta => p !== null);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tamilarasu-portfolio.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic blog pages
  const blogs = await fetchBlogs();
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
