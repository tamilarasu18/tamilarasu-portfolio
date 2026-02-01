"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import { useState, useCallback, useRef } from "react";

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function BlogEditor({
  content,
  onChange,
  onImageUpload,
}: BlogEditorProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        // Disable markdown auto-detection for lists to prevent double markers
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "mx-auto rounded-lg max-w-full",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#2563EB] hover:underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Heading...";
          }
          return "Tell your story...";
        },
      }),
      Youtube.configure({
        width: 680,
        height: 400,
        HTMLAttributes: {
          class: "mx-auto rounded-lg",
        },
      }),
      Dropcursor.configure({
        color: "#2563EB",
        width: 2,
      }),
      Gapcursor,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[500px] focus:outline-none px-4 py-6 font-serif",
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            handleImageUpload(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of items) {
            if (item.type.startsWith("image/")) {
              const file = item.getAsFile();
              if (file) {
                handleImageUpload(file);
                return true;
              }
            }
          }
        }
        return false;
      },
    },
  });

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor || !onImageUpload) return;

      setUploading(true);
      try {
        const url = await onImageUpload(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error("Failed to upload image:", error);
      } finally {
        setUploading(false);
      }
    },
    [editor, onImageUpload],
  );

  const insertImage = useCallback(() => {
    if (!editor) return;

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageModal(false);
    }
  }, [editor, imageUrl]);

  const insertVideo = useCallback(() => {
    if (!editor) return;

    if (videoUrl) {
      editor.commands.setYoutubeVideo({ src: videoUrl });
      setVideoUrl("");
      setShowVideoModal(false);
    }
  }, [editor, videoUrl]);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    e.target.value = "";
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return <div className="min-h-[500px] bg-white rounded-xl animate-pulse" />;
  }

  return (
    <div className="relative">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Editor Container */}
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-3 flex flex-wrap items-center gap-1">
          {/* Media */}
          <div className="flex items-center gap-1 mr-2">
            <ToolbarButton
              onClick={triggerFileUpload}
              title="Upload image"
              disabled={uploading}
            >
              {uploading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </ToolbarButton>

            <ToolbarButton
              onClick={() => setShowImageModal(true)}
              title="Insert image from URL"
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => setShowVideoModal(true)}
              title="Embed YouTube video"
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </ToolbarButton>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Text Formatting */}
          <div className="flex items-center gap-1 mx-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Bold (Ctrl+B)"
            >
              <span className="font-bold text-sm">B</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Italic (Ctrl+I)"
            >
              <span className="italic text-sm">I</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={addLink}
              isActive={editor.isActive("link")}
              title="Add link"
            >
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </ToolbarButton>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Headings */}
          <div className="flex items-center gap-1 mx-2">
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor.isActive("heading", { level: 1 })}
              title="Heading 1"
            >
              <span className="font-bold text-sm">H1</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              <span className="font-bold text-sm">H2</span>
            </ToolbarButton>

            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              isActive={editor.isActive("heading", { level: 3 })}
              title="Heading 3"
            >
              <span className="font-bold text-sm">H3</span>
            </ToolbarButton>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Lists & Blocks */}
          <div className="flex items-center gap-1 mx-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Bullet list"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Numbered list"
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
                  d="M7 8h10M7 12h10M7 16h10M3 8h.01M3 12h.01M3 16h.01"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              title="Quote"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive("codeBlock")}
              title="Code block"
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </ToolbarButton>
          </div>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} />
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Embed YouTube Video</h3>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube URL..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] mb-4"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={insertVideo}
                disabled={!videoUrl}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 cursor-pointer"
              >
                Embed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image URL Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL or GIF URL..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] mb-4"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                disabled={!imageUrl}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 cursor-pointer"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload indicator */}
      {uploading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
          <div className="flex items-center gap-3 text-gray-600">
            <svg
              className="w-6 h-6 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Uploading image...</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({
  onClick,
  isActive = false,
  title,
  disabled = false,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent the button from stealing focus from the editor
    e.preventDefault();
  };

  return (
    <button
      type="button"
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center ${
        isActive
          ? "bg-[#2563EB]/10 text-[#2563EB]"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
