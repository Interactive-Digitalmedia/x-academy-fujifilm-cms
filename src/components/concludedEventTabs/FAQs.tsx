import React from "react";

const FAQs: React.FC = () => {
  return (
    <div className="space-y-6">
      {[1, 2].map((_, index) => (
        <div key={index} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Question
            </label>
            <input
              type="text"
              defaultValue="Question 1"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Answer
            </label>
            <textarea
              defaultValue="Sample"
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows={3}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
