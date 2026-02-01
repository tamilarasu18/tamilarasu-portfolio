import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const response = await fetch(`https://api.github.com/gists/${id}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    const gist = await response.json();

    // Find the blog file
    const blogFile = Object.values(gist.files).find((file: unknown) =>
      (file as { filename: string }).filename.startsWith("blog_"),
    ) as { filename: string; content: string } | undefined;

    if (!blogFile) {
      return NextResponse.json({ error: "Invalid blog post" }, { status: 404 });
    }

    // Parse the blog content
    const blogData = JSON.parse(blogFile.content);

    return NextResponse.json({
      id: gist.id,
      title: blogData.title || gist.description,
      content: blogData.content,
      author: blogData.author || "Anonymous",
      createdAt: blogData.createdAt || gist.created_at,
      updatedAt: gist.updated_at,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}
