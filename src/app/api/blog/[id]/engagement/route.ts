import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_REPO = "tamilarasu18/tamilarasu-portfolio-blog";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  engagement?: {
    likes: number;
    dislikes: number;
  };
  [key: string]: unknown;
}

// GET: Fetch engagement counts for a blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/posts/${id}.json`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    const fileData = await response.json();
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");
    const post: BlogPost = JSON.parse(content);

    return NextResponse.json({
      likes: post.engagement?.likes || 0,
      dislikes: post.engagement?.dislikes || 0,
    });
  } catch (error) {
    console.error("Error fetching engagement:", error);
    return NextResponse.json(
      { error: "Failed to fetch engagement" },
      { status: 500 },
    );
  }
}

// POST: Update engagement (like or dislike)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, previousAction } = body;

    if (!action || !["like", "dislike"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'like' or 'dislike'" },
        { status: 400 },
      );
    }

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 },
      );
    }

    // Fetch current blog post
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/posts/${id}.json`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    const fileData = await response.json();
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");
    const post: BlogPost = JSON.parse(content);

    // Initialize engagement if not exists
    if (!post.engagement) {
      post.engagement = { likes: 0, dislikes: 0 };
    }

    // Handle vote changes
    if (previousAction === "like") {
      post.engagement.likes = Math.max(0, post.engagement.likes - 1);
    } else if (previousAction === "dislike") {
      post.engagement.dislikes = Math.max(0, post.engagement.dislikes - 1);
    }

    // Apply new vote
    if (action === "like") {
      post.engagement.likes += 1;
    } else if (action === "dislike") {
      post.engagement.dislikes += 1;
    }

    // Update file in GitHub
    const updatedContent = Buffer.from(JSON.stringify(post, null, 2)).toString(
      "base64",
    );

    const updateResponse = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/posts/${id}.json`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Update engagement for: ${post.title}`,
          content: updatedContent,
          sha: fileData.sha,
          branch: "main",
        }),
      },
    );

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      console.error("GitHub API error:", error);
      throw new Error(error.message || "Failed to update engagement");
    }

    return NextResponse.json({
      likes: post.engagement.likes,
      dislikes: post.engagement.dislikes,
    });
  } catch (error) {
    console.error("Error updating engagement:", error);
    return NextResponse.json(
      { error: "Failed to update engagement" },
      { status: 500 },
    );
  }
}
