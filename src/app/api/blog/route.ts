import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_REPO = "tamilarasu18/tamilarasu-portfolio-blog";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface BlogPostMeta {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  readingTime?: number;
}

interface BlogPost extends BlogPostMeta {
  content: string;
}

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper to calculate reading time
function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Helper to extract excerpt from content
function extractExcerpt(content: string, maxLength: number = 160): string {
  const text = content.replace(/<[^>]*>/g, "");
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export async function GET() {
  try {
    // Fetch posts directory from repo
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/posts`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      // If posts folder doesn't exist yet, return empty array
      if (response.status === 404) {
        return NextResponse.json([]);
      }
      throw new Error("Failed to fetch posts");
    }

    const files = await response.json();

    // Filter only .json files and fetch each post's content
    const jsonFiles = files.filter(
      (file: { name: string }) =>
        file.name.endsWith(".json") && file.name !== "index.json",
    );

    const posts: BlogPostMeta[] = await Promise.all(
      jsonFiles.map(async (file: { download_url: string; name: string }) => {
        try {
          const contentRes = await fetch(file.download_url, {
            next: { revalidate: 60 },
          });
          const post: BlogPost = await contentRes.json();
          return {
            slug: post.slug || file.name.replace(".json", ""),
            title: post.title,
            excerpt: post.excerpt,
            coverImage: post.coverImage,
            author: post.author,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            tags: post.tags || [],
            readingTime: post.readingTime,
          };
        } catch {
          return null;
        }
      }),
    );

    // Filter out failed fetches and sort by date (newest first)
    const validPosts = posts
      .filter((p): p is BlogPostMeta => p !== null)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    return NextResponse.json(validPosts);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { title, content, author, password, coverImage, tags } = body;

    // Simple password protection
    const adminPassword = process.env.BLOG_ADMIN_PASSWORD || "admin123";
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const slug = generateSlug(title);
    const now = new Date().toISOString();

    const blogPost: BlogPost = {
      title,
      slug,
      content,
      excerpt: extractExcerpt(content),
      coverImage: coverImage || null,
      author: {
        name: author || "Tamilarasu",
        avatar: "/avatar.png",
      },
      createdAt: now,
      updatedAt: now,
      tags: tags || [],
      readingTime: calculateReadingTime(content),
    };

    // Create file in repo via GitHub API
    const filePath = `posts/${slug}.json`;
    const fileContent = Buffer.from(JSON.stringify(blogPost, null, 2)).toString(
      "base64",
    );

    // Check if file exists to get SHA for update
    let sha: string | undefined;
    const checkResponse = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      },
    );

    if (checkResponse.ok) {
      const existingFile = await checkResponse.json();
      sha = existingFile.sha;
    }

    const createResponse = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: sha
            ? `Update blog post: ${title}`
            : `Add blog post: ${title}`,
          content: fileContent,
          branch: "main",
          sha, // Include sha if updating
        }),
      },
    );

    if (!createResponse.ok) {
      const error = await createResponse.json();
      console.error("GitHub API error:", error);
      throw new Error(error.message || "Failed to create blog post");
    }

    return NextResponse.json({
      slug,
      title,
      message: "Blog post created successfully",
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        error: `Failed to create blog post: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}
