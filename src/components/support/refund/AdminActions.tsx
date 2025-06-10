import React, { useState } from "react";
import Switch from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { SendHorizontal } from "lucide-react";

interface RefundAdminActionsProps {
  ticket: {
    id: string;
  };
}

const AdminActions: React.FC<RefundAdminActionsProps> = ({ ticket }) => {
  const [requestAltPayment, setRequestAltPayment] = useState(false);
  const [message, setMessage] = useState(
    "Hey User, we are connecting you to the technical team for faster resolution"
  );

  const labelStyle = "text-xs mb-1 text-gray-600 font-medium";
  const fieldStyle =
    "w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-800 shadow-sm";

  return (
    <div className="space-y-3 mb-2 mt-4">
      {/* Ticket ID */}
      <div>
        <p className={labelStyle}>Ticket ID</p>
        <div className={fieldStyle}>#{ticket.id}</div>
      </div>

      {/* Action Section  */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <p className={labelStyle}>Action</p>
          <Info className="h-3 w-3 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm rounded">
            Approve Refund
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded">
            Deny Refund
          </Button>
        </div>
      </div>

      {/* Alternative Payment Section */}
      <div className="border border-gray-300 rounded-md max-w-[380px] px-4 py-2 flex items-center justify-between">
        <p className={labelStyle}>
          Request Alternative Payment Details from User
        </p>
        <Switch
          checked={requestAltPayment}
          onCheckedChange={setRequestAltPayment}
        />
      </div>

      {/* Manual Message Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <p className={labelStyle}>Message (for manual refunds):</p>
          <Info className="h-3 w-3 text-gray-400" />
        </div>
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={`${fieldStyle} resize-none min-h-[120px] pr-8`}
          />
          <Button
            variant="ghost"
            className="absolute bottom-2 right-2 text-blue-500 px-1 py-0 px-0 h-8 w-8"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminActions;
