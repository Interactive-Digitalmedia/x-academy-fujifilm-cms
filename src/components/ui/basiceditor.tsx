import React, { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Image,
  Code,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

type StaticEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

const StaticEditor: React.FC<StaticEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  // Set initial HTML value
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 px-3 py-2">
        <select className="rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none">
          <option>Paragraph</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
        </select>

        <button className="icon-btn">
          <Bold size={16} />
        </button>
        <button className="icon-btn">
          <Italic size={16} />
        </button>
        <button className="icon-btn">
          <Underline size={16} />
        </button>
        <button className="icon-btn">
          <Strikethrough size={16} />
        </button>
        <button className="icon-btn">
          <Image size={16} />
        </button>
        <button className="icon-btn">
          <Code size={16} />
        </button>
        <button className="icon-btn">
          <Quote size={16} />
        </button>
        <button className="icon-btn">
          <List size={16} />
        </button>
        <button className="icon-btn">
          <ListOrdered size={16} />
        </button>
        <button className="icon-btn">
          <AlignLeft size={16} />
        </button>
        <button className="icon-btn">
          <AlignCenter size={16} />
        </button>
        <button className="icon-btn">
          <AlignRight size={16} />
        </button>
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[150px] px-4 py-3 focus:outline-none"
        suppressContentEditableWarning
      />
    </div>
  );
};

export default StaticEditor;
