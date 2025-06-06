import * as React from "react";
import StepIndicator from "@/components/blogs/StepIndicator";
import PublicProfile from "./PublicProfile";

interface PartnerData {
  name: string;
  title: string;
  tags: string[];
  bio: string;
  location: string;
  joinedDate: string;
  profilePicture: {
    url: string;
    file: any;
  };
  coverImage: {
    url: string;
    file: any;
  };
}

const steps = [
  { number: 1, title: "Public Profile" },
  { number: 2, title: "Gallery" },
  { number: 3, title: "Gears" },
  { number: 4, title: "Contact Details - Internal" },
];

const TestPartnerPage: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [partnerData, setPartnerData] = React.useState<PartnerData>({
    name: "",
    title: "",
    tags: [],
    bio: "",
    location: "",
    joinedDate: "",
    profilePicture: {
      url: "",
      file: null,
    },
    coverImage: {
      url: "",
      file: null,
    },
  });

  const updatePartnerData = (field: keyof PartnerData, value: any) => {
    setPartnerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    console.log("Saved Draft:", partnerData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PublicProfile data={partnerData} setData={setPartnerData} />;
      // Steps 2–4 will be plugged in later
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl p-8">
      <div className="[&_.connector-line]:w-24">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">New Ambassador</h1>
      </div>

      <div className="mb-8">{renderStepContent()}</div>

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
          className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-lg font-medium"
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default TestPartnerPage;
