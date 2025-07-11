import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
  modules?: any;
  formats?: string[];
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  placeholder = "Write something amazing...",
  modules = defaultModules,
  formats = defaultFormats,
  className = "",
}) => {
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (quillRef.current && onImageUpload) {
      const editor = quillRef.current.getEditor();
      editor
        .getModule("toolbar")
        .addHandler("image", () => handleImageUpload(editor));
    }
  }, [onImageUpload]);

  const handleImageUpload = async (editor: any) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const imageUrl = await onImageUpload!(file);
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", imageUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Failed to upload image.");
      }
    };
  };

  return (
    <div className={`my-4 rounded-2xl ${className}`}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="custom-quill"
      />
    </div>
  );
};

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const defaultFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

export default RichTextEditor;
