import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchBlogPost, fetchBlogs } from "@/lib/blog";
import { ShareButton } from "../components/ShareButton";
import { AnimatedContent, AnimatedHeader } from "../components/AnimatedContent";
import { LikeDislikeButton } from "../components/LikeDislikeButton";
import { CommentsSection } from "../components/CommentsSection";

const BASE_URL = "https://tamilarasu-portfolio.vercel.app";

// Generate static params for all blog posts (optional SSG)
export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.map((blog) => ({ id: blog.slug }));
}

// Dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchBlogPost(id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const ogImage = post.coverImage || "/avatar.png";

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} by ${post.author.name}`,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} by ${post.author.name}`,
      type: "article",
      url: `${BASE_URL}/blog/${post.slug}`,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read ${post.title} by ${post.author.name}`,
      images: [ogImage],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

// JSON-LD structured data for rich snippets
function generateArticleJsonLd(post: {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author: { name: string; avatar?: string };
  createdAt: string;
  updatedAt: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || `${BASE_URL}/avatar.png`,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Tamilarasu",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/avatar.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchBlogPost(id);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const jsonLd = generateArticleJsonLd(post);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/blog"
              className="text-[#6b6b6b] hover:text-[#242424] transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#6b6b6b]">
                {post.readingTime || 5} min read
              </span>
              <ShareButton />
            </div>
          </div>
        </header>

        <article className="pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <AnimatedHeader className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#242424] mb-6 font-serif leading-tight">
                {post.title}
              </h1>

              {/* Author & Meta */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#2563EB] text-white text-lg font-medium">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-[#242424]">
                    {post.author.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                    <span>{post.readingTime || 5} min read</span>
                    <span>·</span>
                    <time dateTime={post.createdAt}>{formattedDate}</time>
                  </div>
                </div>
              </div>
            </AnimatedHeader>

            {/* Cover Image */}
            {post.coverImage && (
              <AnimatedContent delay={0.1} className="mb-10 -mx-6 md:mx-0">
                <div className="relative aspect-[2/1] md:rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </AnimatedContent>
            )}

            {/* Content */}
            <AnimatedContent delay={0.2}>
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#242424] prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-[#242424] prose-p:leading-[1.75] prose-p:text-lg prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#242424] prose-blockquote:border-l-[#2563EB] prose-blockquote:text-[#6b6b6b] prose-blockquote:not-italic prose-blockquote:font-normal prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[#242424] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#1e1e1e] prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-lg prose-ul:text-[#242424] prose-ol:text-[#242424]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </AnimatedContent>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <AnimatedContent
                delay={0.3}
                className="mt-12 pt-8 border-t border-gray-100"
              >
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-[#6b6b6b] rounded-full text-sm hover:bg-gray-200 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimatedContent>
            )}

            {/* Engagement - Like/Dislike */}
            <AnimatedContent
              delay={0.35}
              className="mt-8 flex items-center gap-4"
            >
              <span className="text-[#6b6b6b] text-sm">Was this helpful?</span>
              <LikeDislikeButton slug={post.slug} />
            </AnimatedContent>

            {/* Share & Actions */}
            <AnimatedContent
              delay={0.4}
              className="mt-12 pt-8 border-t border-gray-100"
            >
              <div className="flex items-center justify-between">
                {/* Author Bio */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#2563EB] text-white text-xl font-medium">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#242424] text-lg">
                      Written by {post.author.name}
                    </p>
                    <p className="text-[#6b6b6b] text-sm">
                      Building digital products
                    </p>
                  </div>
                </div>

                {/* Share Button */}
                <ShareButton variant="secondary" />
              </div>
            </AnimatedContent>

            {/* Comments Section */}
            <AnimatedContent delay={0.5}>
              <CommentsSection slug={post.slug} />
            </AnimatedContent>

            {/* More Stories Link */}
            <AnimatedContent delay={0.6} className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#2563EB] font-medium hover:underline"
              >
                Read more stories
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </AnimatedContent>
          </div>
        </article>
      </main>
    </>
  );
}
