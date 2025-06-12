import React from "react";
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

const StaticEditor = () => {
  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 px-3 py-2">
        {/* Dropdown */}
        <select className="rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none">
          <option>Paragraph</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
        </select>

        {/* Icons */}
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

      {/* Editable Text Area */}
      <div
        contentEditable
        className="min-h-[150px] px-4 py-3 focus:outline-none border-none"
        suppressContentEditableWarning
      >
        {/* Placeholder */}
        <p className="text-gray-500">Start writing here...</p>
      </div>
    </div>
  );
};

export default StaticEditor;
