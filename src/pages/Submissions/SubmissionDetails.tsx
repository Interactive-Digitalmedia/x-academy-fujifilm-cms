import { useParams } from "react-router-dom";
import { dummySubmissions } from "@/assets/dummySubmissions";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function SubmissionDetails() {
  const { id } = useParams();
  const submission = dummySubmissions.find((s) => s.sno === Number(id));

  if (!submission) {
    return <div className="p-6 text-gray-600">Submission not found.</div>;
  }

  return (
    <div className="p-6 mt-[-20px] w-full">
      <h2 className="text-xl font-semibold mb-4">
        {submission.name}’s Submission
      </h2>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <button
          className="btn-toggle mb-4 btn-toggle-active w-[150px] px-3 py-1 flex justify-center items-center gap-2 text-sm rounded"
          type="button"
        >
          User Information
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs mb-1 text-gray-500">Name</p>
            <div className="border px-3 py-2 rounded-md">{submission.name}</div>
          </div>
          <div>
            <p className="text-xs mb-1 text-gray-500">Link</p>
            <div className="border px-3 py-2 rounded-md flex justify-between items-center">
              {submission.link}
              <a
                href={`https://${submission.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs mb-1 text-gray-500">Email</p>
            <div className="border px-3 py-2 rounded-md">johndoe@email.com</div>
          </div>
          <div>
            <p className="text-xs mb-1 text-gray-500">Phone</p>
            <div className="border px-3 py-2 rounded-md flex justify-between items-center">
              +91 xxxxx xxxxx
              <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <p className="text-xs mb-1 text-gray-500">Upload Date</p>
            <div className="border px-3 py-2 rounded-md">
              {submission.uploadDate}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Approve Submission
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Deny Submission
          </Button>
        </div>
      </div>
    </div>
  );
}
