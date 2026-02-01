import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com/gists";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
  try {
    // Fetch public gists - no token needed for reading public gists
    // We'll fetch from a specific user's gists for the blog
    const username = process.env.GITHUB_USERNAME || "tamilarasu18";
    const response = await fetch(
      `https://api.github.com/users/${username}/gists?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch gists");
    }

    const gists = await response.json();

    // Filter only blog posts (gists with a specific file naming convention)
    const blogPosts = gists
      .filter((gist: { files: Record<string, { filename: string }> }) => {
        const files = Object.keys(gist.files);
        return files.some((file) => file.startsWith("blog_"));
      })
      .map(
        (gist: {
          id: string;
          description: string;
          files: Record<string, { filename: string; content?: string }>;
          created_at: string;
          updated_at: string;
        }) => {
          const blogFile = Object.values(gist.files).find((file) =>
            file.filename.startsWith("blog_"),
          );
          return {
            id: gist.id,
            title: gist.description || "Untitled",
            filename: blogFile?.filename,
            createdAt: gist.created_at,
            updatedAt: gist.updated_at,
          };
        },
      );

    return NextResponse.json(blogPosts);
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
    const { title, content, author, password } = body;

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

    // Create gist with blog content
    const filename = `blog_${Date.now()}.json`;
    const blogData = {
      title,
      content,
      author: author || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: title,
        public: true,
        files: {
          [filename]: {
            content: JSON.stringify(blogData, null, 2),
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create gist");
    }

    const gist = await response.json();

    return NextResponse.json({
      id: gist.id,
      title,
      url: gist.html_url,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
