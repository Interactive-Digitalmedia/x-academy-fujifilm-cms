import React from "react";

const AboutEvent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* About the Event */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About the Event
        </label>
        <textarea
          rows={3}
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
          defaultValue="Workshop"
        />
        <p className="text-xs text-gray-500 mt-1">
          Note: Write a compelling description of your event. Include what
          attendees can expect to learn or experience.
        </p>
      </div>

      {/* What's Included */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What’s Included?
        </label>
        <textarea
          rows={3}
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
          defaultValue="Workshop"
        />
      </div>

      {/* What's Not Included */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What’s Not Included?
        </label>
        <textarea
          rows={3}
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
          defaultValue="Workshop"
        />
      </div>

      {/* Tips */}
      <div className="text-sm text-gray-700 mt-4">
        <p className="font-semibold mb-2">Tips for a great description:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
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
};

export default AboutEvent;
