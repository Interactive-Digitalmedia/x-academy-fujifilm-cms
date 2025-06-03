import * as React from "react";

interface BlogsProps {}

const Blogs: React.FunctionComponent<BlogsProps> = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [blogTitle, setBlogTitle] = React.useState("Event Name xyz");
  const [selectedAuthor, setSelectedAuthor] = React.useState("");
  const [publishingDate, setPublishingDate] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([
    { name: "Event", color: "purple", removable: true },
    { name: "Fashion", color: "orange", removable: true },
    { name: "Street", color: "blue", removable: false },
    { name: "Wildlife", color: "green", removable: false },
    { name: "Portrait", color: "pink", removable: false },
  ]);

  const steps = [
    { number: 1, title: "Publishing Details", active: true },
    { number: 2, title: "Blog Image", active: false },
    { number: 3, title: "Blog Content", active: false },
    { number: 4, title: "CTA Button", active: false },
    { number: 5, title: "Meta Description", active: false },
  ];

  const removeTag = (index: number) => {
    if (selectedTags[index].removable) {
      setSelectedTags(selectedTags.filter((_, i) => i !== index));
    }
  };

  const getTagColorClasses = (color: string) => {
    const colorMap = {
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
      blue: "bg-blue-500 text-white",
      green: "bg-green-600 text-white",
      pink: "bg-pink-500 text-white",
    };
    return colorMap[color] || "bg-gray-500 text-white";
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Publishing Details
            </h2>

            {/* Blog Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                Blog Title
              </label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                placeholder="Enter blog title"
              />
            </div>

            {/* Author and Publishing Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  Original Author
                </label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                >
                  <option value="">Select author's name</option>
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  Publishing Date
                </label>
                <input
                  type="datetime-local"
                  value={publishingDate}
                  onChange={(e) => setPublishingDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                  placeholder="Select publishing date & time"
                />
              </div>
            </div>

            {/* Blog Tags */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-600">
                Blog Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTagColorClasses(tag.color)}`}
                  >
                    {tag.name}
                    {tag.removable && (
                      <button
                        onClick={() => removeTag(index)}
                        className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">
              Step {currentStep + 1} content coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white h-full rounded-xl p-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === currentStep
                    ? "bg-blue-500 text-white"
                    : index < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < currentStep ? "✓" : step.number}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    index === currentStep ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 ${
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-8">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg font-medium ${
            currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNextStep}
          disabled={currentStep === steps.length - 1}
          className={`px-6 py-2 rounded-lg font-medium ${
            currentStep === steps.length - 1
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Blogs;
