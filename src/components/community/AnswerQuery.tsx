import React from "react";

interface AnswerQueryProps {
  answer: string;
  onAnswerChange: (value: string) => void;
  question?: string;
}

const AnswerQuery: React.FC<AnswerQueryProps> = ({
  answer,
  onAnswerChange,
  question = "Query", // default if no prop is passed
}) => {
  return (
    <div className="mt-6 space-y-6">
      {/* Question */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Question</label>
        <input
          type="text"
          value={question}
          readOnly
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      {/* Answer */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Answer</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="w-full border border-gray-200 rounded-md px-3 py-8 text-sm bg-white"
        />
      </div>
    </div>
  );
};

export default AnswerQuery;
