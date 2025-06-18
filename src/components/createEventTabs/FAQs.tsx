import { useState } from "react";
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";

const blankFaq = { Q: "", A: "" };

export default function FAQs({ data, setData }: any) {
  const [faqBlocks, setFaqBlocks] = useState([{ ...blankFaq }]);

  const handleFieldChange = (
    index: number,
    field: "Q" | "A",
    value: string
  ) => {
    const updated = [...faqBlocks];
    updated[index][field] = value;
    setFaqBlocks(updated);
    setData({ ...data, FAQ: updated });
  };

  const handleAddFaq = () => {
    const updated = [...faqBlocks, { ...blankFaq }];
    setFaqBlocks(updated);
    setData({ ...data, FAQ: updated });
  };

  const handleRemoveFaq = (index: number) => {
    if (faqBlocks.length === 1) return;
    const updated = [...faqBlocks];
    updated.splice(index, 1);
    setFaqBlocks(updated);
    setData({ ...data, FAQ: updated });
  };

  return (
    <div className="space-y-2 mt-[-25px]">
      <h2 className="text-base font-bold mb-1">Frequently Asked Questions</h2>

      {/* Event Type Dropdown */}
      <div className="w-[460px]">
        <label className="block text-[#818181] text-sm font-medium mb-1">
          Choose from Template
        </label>
        <Select
          placeholder="Select a Template"
          selectedKeys={[data.type || ""]}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          classNames={{
            trigger:
              "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
          }}
        >
          <SelectItem key="workshop">Workshop</SelectItem>
          <SelectItem key="eventr">Event</SelectItem>
          <SelectItem key="exhibition">Exhibition</SelectItem>
        </Select>
      </div>

      {/* FAQ Blocks */}
      {faqBlocks.map((faq, index) => (
        <div
          key={index}
          className="space-y-4 p-6 rounded-xl border bg-white relative"
        >
          {faqBlocks.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveFaq(index)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition"
              title="Remove this question"
            >
              <Trash2 size={16} />
            </button>
          )}

          <h2 className="text-sm font-bold mt-[-13px] mb-1">Question Item</h2>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Question
            </label>
            <input
              type="text"
              placeholder="Enter your question"
              value={faq.Q}
              onChange={(e) => handleFieldChange(index, "Q", e.target.value)}
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Answer
            </label>
            <textarea
              placeholder="Type your answer"
              rows={3}
              value={faq.A}
              onChange={(e) => handleFieldChange(index, "A", e.target.value)}
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddFaq}
          className="inline-flex items-center gap-2 rounded-md bg-[#1098F7] px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} strokeWidth={2} />
          Add Item
        </button>
      </div>
    </div>
  );
}
