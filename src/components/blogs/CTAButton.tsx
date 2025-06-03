import * as React from "react";

interface CTAButtonProps {
  // Add props here when you know what data this step needs
  // For example:
  // buttonText: string;
  // setButtonText: (text: string) => void;
  // buttonLink: string;
  // setButtonLink: (link: string) => void;
}

const CTAButton: React.FunctionComponent<CTAButtonProps> = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">CTA Button</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Button Text
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="Enter button text"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Button Link
            </label>
            <input
              type="url"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-600 mb-3">
            Button Preview
          </label>
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Call to Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAButton;
