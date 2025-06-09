import React from "react";

interface TicketDetailsProps {
  ticket: {
    id: string;
    subject: string;
    message: string;
    attachments: string[];
  };
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  const fieldStyle =
    "w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-800 shadow-sm";

  const labelStyle = "text-xs mb-1 text-gray-600 font-medium";

  return (
    <div className="space-y-4 mt-4">
      {/* Ticket ID */}
      <div>
        <p className={labelStyle}>Ticket ID</p>
        <div className={fieldStyle}>#{ticket.id}</div>
      </div>

      {/* Subject */}
      <div>
        <p className={labelStyle}>Subject</p>
        <div className={fieldStyle}>{ticket.subject}</div>
      </div>

      {/* Message */}
      <div>
        <p className={labelStyle}>Message</p>
        <div className={`${fieldStyle} whitespace-pre-line min-h-[100px]`}>
          {ticket.message}
        </div>
      </div>

      {/* Attachments */}
      {ticket.attachments?.length > 0 && (
        <div>
          <p className={labelStyle}>Attachments</p>
          <div className="flex gap-4 flex-wrap">
            {ticket.attachments.map((_, idx) => (
              <div
                key={idx}
                className="w-32 h-32 border border-gray-300 rounded-md bg-white flex items-center justify-center text-xs text-gray-500 shadow-sm"
              >
                Placeholder
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
