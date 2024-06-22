// import "./styles.scss";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBold,
  FaStrikethrough,
  FaRedo,
  FaUndo,
  FaItalic,
  FaParagraph,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaHeading,
  FaUnderline,
} from "react-icons/fa";
import Underline from "@tiptap/extension-underline";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className=" flex justify-between border-b-[1px] p-4 ">
      <div className="flex gap-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={
            editor.isActive("heading", { level: 1 })
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaHeading />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "is-active bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
              : "bg-gray-200 hover:bg-gray-300 rounded-sm p-1"
          }
        >
          <FaQuoteLeft />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
];

const content = ``;

export const TipTap = () => {
  return (
    <div className="border-gray-300 border-[1px] min-h-[100px]">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </div>
  );
};
