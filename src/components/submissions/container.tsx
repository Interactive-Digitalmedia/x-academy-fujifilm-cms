import { useState } from "react";
import { SubmissionTable } from "./submissiontable";
import { Submission } from "@/types";

const statusOptions = ["Pending", "Approved", "Rejected"] as const;
type Status = (typeof statusOptions)[number];

interface ContainerProps {
  submissions: Submission[];
}

const Container: React.FC<ContainerProps> = ({submissions}) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>("Pending");

  return (
    <div
      style={{
        display: "flex",
        padding: "16px 16px 67px 16px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid #EDEDED",
        background: "#FFF",
      }}
    >
      <div className="w-full">
        {/* Toggle Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          {(statusOptions as readonly Status[]).map((status) => (
            <button
              key={status}
              className={`btn-toggle ${
                selectedStatus === status
                  ? "btn-toggle-active"
                  : "btn-toggle-inactive"
              }`}
              style={{
                display: "flex",
                width: "121px",
                padding: "6px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                alignSelf: "stretch",
              }}
              onClick={() => setSelectedStatus(status)}
              type="button"
              disabled
            >
              {status !== "Pending" && (
                <span
                  className={`h-2 w-2 rounded-full ${
                    status === "Approved" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              )}
              {status}
            </button>
          ))}
        </div>

        {/* Table Section */}
        <SubmissionTable submissions={submissions} />
      </div>
    </div>
  );
};

export default Container;
