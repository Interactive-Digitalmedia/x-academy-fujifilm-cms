import * as React from "react";

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepIndicator: React.FunctionComponent<StepIndicatorProps> = ({
  steps,
  currentStep,
  setCurrentStep,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 pb-6 border-b border-gray-200">
      {steps.map((step, index) => (
        <div
          key={step.number}
          onClick={() => setCurrentStep(index)}
          className="flex items-center hover:bg-gray-100 px-2 py-1.5 rounded-full "
        >
          <div className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                index === currentStep
                  ? "bg-blue-500 text-white"
                  : index < currentStep
                    ? // ? "bg-green-500 text-white"
                      "bg-gray-200 text-gray-600"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {/* {index < currentStep ? "✓" : step.number} */}
              {step.number}
            </div>
            <div className="ml-1">
              <p
                className={`text-xs font-medium ${
                  index === currentStep ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-4 ${
                // index < currentStep ? "bg-green-500" : "bg-gray-200"
                index < currentStep ? "bg-gray-200" : "bg-gray-200"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
