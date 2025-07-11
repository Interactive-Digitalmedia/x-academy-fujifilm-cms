import React from "react";
import { SupportTicket } from "@/types";

interface TicketDetailsProps {
  support: SupportTicket;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ support }) => {
  const fieldStyle =
    "w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-800 shadow-sm";

  const labelStyle = "text-xs mb-1 text-gray-600 font-medium";

  return (
    <div className="space-y-4 mt-4">
      {/* Ticket ID */}
      <div>
        <p className={labelStyle}>Ticket ID</p>
        <div className={fieldStyle}>#{support._id}</div>
      </div>

      {/* Subject */}
      <div>
        <p className={labelStyle}>Subject</p>
        <div className={fieldStyle}>{support.subject}</div>
      </div>

      {/* Message */}
      <div>
        <p className={labelStyle}>Message</p>
        <div className={`${fieldStyle} whitespace-pre-line min-h-[100px]`}>
          {support.message || "—"}
        </div>
      </div>

      {/* Attachments */}
      {/* {support.attachments?.length > 0 && (
        <div>
          <p className={labelStyle}>Attachments</p>
          <div className="flex gap-4 flex-wrap">
            {support.attachments.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`attachment-${idx + 1}`}
                className="w-32 h-32 object-cover rounded-md border border-gray-300 shadow-sm"
              />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TicketDetails;
