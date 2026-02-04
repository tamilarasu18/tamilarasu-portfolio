import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_REPO = "tamilarasu18/tamilarasu-portfolio-blog";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  comments?: Comment[];
  [key: string]: unknown;
}

// GET: Fetch all comments for a blog post
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
      comments: post.comments || [],
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

// POST: Add a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { author, content: commentContent } = body;

    if (!author || !commentContent) {
      return NextResponse.json(
        { error: "Author and content are required" },
        { status: 400 },
      );
    }

    if (author.length > 50) {
      return NextResponse.json(
        { error: "Author name is too long (max 50 characters)" },
        { status: 400 },
      );
    }

    if (commentContent.length > 1000) {
      return NextResponse.json(
        { error: "Comment is too long (max 1000 characters)" },
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
    const postContent = Buffer.from(fileData.content, "base64").toString(
      "utf-8",
    );
    const post: BlogPost = JSON.parse(postContent);

    // Initialize comments array if not exists
    if (!post.comments) {
      post.comments = [];
    }

    // Create new comment
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: author.trim(),
      content: commentContent.trim(),
      createdAt: new Date().toISOString(),
    };

    post.comments.push(newComment);

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
          message: `Add comment by ${author} on: ${post.title}`,
          content: updatedContent,
          sha: fileData.sha,
          branch: "main",
        }),
      },
    );

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      console.error("GitHub API error:", error);
      throw new Error(error.message || "Failed to add comment");
    }

    return NextResponse.json({
      comment: newComment,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 },
    );
  }
}
