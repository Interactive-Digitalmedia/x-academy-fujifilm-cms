import { Switch } from "@nextui-org/react";
import StaticEditor from "../ui/basiceditor";
import { Camera, Utensils } from "lucide-react";

export default function AboutEvent({ data, setData }: any) {
  const about = data.about || {
    whyShouldYouAttend: "",
    whatsIncluded: [],
    about: "",
  };

  const handleChange = (field: string, value: string | string[]) => {
    const updated = { ...about, [field]: value };
    setData({ ...data, about: updated });
  };

  const whatsIncludedOptions = [
    {
      label: "Lunch + Dinner",
      value: "food",
      icon: <Utensils className="text-green-600" />,
    },
    {
      label: "Camera Provided",
      value: "camera1",
      icon: <Camera className="text-purple-600" />,
    },
    {
      label: "Camera Provided",
      value: "camera2",
      icon: <Camera className="text-purple-600" />,
    },
    {
      label: "Camera Provided",
      value: "camera3",
      icon: <Camera className="text-purple-600" />,
    },
  ];

  return (
    <div className="space-y-2 mt-[-25px]">
      <h2 className="text-base font-bold  mb-1">About Event</h2>
      {/* About the Event */}
      <div>
        <label className="block text-sm text-[#818181] font-medium mb-1">
          About the Event
        </label>
        {/* Optional: Replace StaticEditor with Textarea if needed */}
        <StaticEditor />
        <p className="mt-1 text-xs text-gray-500">
          Note: Write a compelling description of your event. Include what
          attendees can expect to learn or experience.
        </p>
      </div>

      {/* What's Included */}
      <div className="w-full md:w-[420px]">
        <label className="block text-[#818181] text-sm font-medium mb-2">
          What's Included?
        </label>
        <div className="space-y-3">
          {whatsIncludedOptions.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <Switch
                size="sm"
                isSelected={about.whatsIncluded.includes(item.value)}
                onValueChange={(isSelected) => {
                  const updatedList = isSelected
                    ? [...about.whatsIncluded, item.value]
                    : about.whatsIncluded.filter(
                        (val: string) => val !== item.value
                      );
                  handleChange("whatsIncluded", updatedList);
                }}
                classNames={{
                  base: [
                    "w-[36px] h-[20px]",
                    "rounded-full",
                    "bg-gray-300",
                    "data-[selected=true]:bg-[#1098F7]",
                    "transition-colors",
                  ].join(" "),
                  thumb: [
                    "w-4 h-4",
                    "rounded-full",
                    "bg-white",
                    "shadow-md",
                    "transition-transform",
                    "translate-x-0",
                    "data-[selected=true]:translate-x-[16px]",
                  ].join(" "),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Should You Attend */}
      <div>
        <label className="block text-sm text-[#818181] font-medium mb-1">
          Why Should You Attend?
        </label>
        <StaticEditor />
      </div>

      {/* Tips Section */}
      <div className="pt-4">
        <p className="text-sm font-semibold text-[#818181]  mb-2">
          Tips for a great description:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
          <li>Be clear about what participants will gain from attending</li>
          <li>Highlight key speakers or special features</li>
          <li>Mention any prerequisites or who the event is ideal for</li>
          <li>
            Include information about refreshments, materials, or other
            amenities
          </li>
        </ul>
      </div>
    </div>
  );
}
