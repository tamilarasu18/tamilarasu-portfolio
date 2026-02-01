import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_REPO = "tamilarasu18/tamilarasu-portfolio-blog";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface BlogPost {
  title: string;
  slug: string;
  content: string;
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: slug } = await params;

    // Fetch the blog post file from repo
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/posts/${slug}.json`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    const fileData = await response.json();

    // Decode base64 content
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");
    const post: BlogPost = JSON.parse(content);

    return NextResponse.json({
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags || [],
      readingTime: post.readingTime,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}
