import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_REPO = "tamilarasu18/tamilarasu-portfolio-blog";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export async function POST(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string;

    // Simple password protection
    const adminPassword = process.env.BLOG_ADMIN_PASSWORD || "admin123";
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, MP4, WebM",
        },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB" },
        { status: 400 },
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "png";
    const sanitizedName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "-")
      .substring(0, 50);
    const filename = `${timestamp}-${sanitizedName}.${extension}`;

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64Content = Buffer.from(bytes).toString("base64");

    // Create date-based folder path (YYYY-MM-DD)
    const today = new Date();
    const dateFolder = today.toISOString().split("T")[0]; // e.g., "2026-02-02"

    // Upload to GitHub repo with date-based folder
    const filePath = `media/${dateFolder}/${filename}`;
    const uploadResponse = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Upload media: ${filename}`,
          content: base64Content,
          branch: "main",
        }),
      },
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();
      console.error("GitHub upload error:", error);
      throw new Error(error.message || "Failed to upload file");
    }

    const uploadData = await uploadResponse.json();

    // Return the raw URL for the uploaded file
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${filePath}`;

    return NextResponse.json({
      url: rawUrl,
      filename,
      size: file.size,
      type: file.type,
      sha: uploadData.content.sha,
    });
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { error: "Failed to upload media" },
      { status: 500 },
    );
  }
}
