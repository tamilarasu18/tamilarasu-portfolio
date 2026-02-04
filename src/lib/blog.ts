const GITHUB_API_URL = "https://api.github.com";
const GITHUB_REPO = "tamilarasu18/tamilarasu-portfolio-blog";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  readingTime?: number;
  tags?: string[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Engagement {
  likes: number;
  dislikes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  engagement?: Engagement;
  comments?: Comment[];
}

export async function fetchBlogs(): Promise<BlogPostMeta[]> {
  try {
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
      if (response.status === 404) {
        return [];
      }
      throw new Error("Failed to fetch posts");
    }

    const files = await response.json();
    const jsonFiles = files.filter(
      (file: { name: string }) =>
        file.name.endsWith(".json") && file.name !== "index.json",
    );

    const posts: (BlogPostMeta | null)[] = await Promise.all(
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

    return posts
      .filter((p): p is BlogPostMeta => p !== null)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  } catch {
    return [];
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
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
      return null;
    }

    const fileData = await response.json();
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");
    const post: BlogPost = JSON.parse(content);
    return post;
  } catch {
    return null;
  }
}
