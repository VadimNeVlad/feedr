import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolbar } from "./EditorToolbar/EditorToolbar";
import Highlight from "@tiptap/extension-highlight";
import TypographyExtension from "@tiptap/extension-typography";
import UnderlineExtension from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";

import TextAlign from "@tiptap/extension-text-align";
import Focus from "@tiptap/extension-focus";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { EditorProps } from "../../utils/types/props";

export const Editor: React.FC<EditorProps> = ({ content }) => {
  const limit = 5000;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      Highlight,
      TypographyExtension,
      UnderlineExtension,
      // Document,
      // Paragraph,
      // Text,
      // Dropcursor,
      // Code,
      Link,
      CharacterCount.configure({
        limit,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
    ],
    content,
  });

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  return (
    <>
      {editor && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
      {editor && (
        <div
          className={`character-count ${
            editor.storage.characterCount.characters() === limit
              ? "character-count--warning"
              : ""
          }`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            className="character-count__graph"
          >
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>

          <div className="character-count__text" style={{ marginLeft: 5 }}>
            {editor.storage.characterCount.characters()}/{limit} characters
          </div>
        </div>
      )}
    </>
  );
};
