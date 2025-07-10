import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
import { Submission } from "@/types";
import { useEffect, useState } from "react";
import { getSubmissionById } from "@/api/submission";
import { ArrowUpRight, SquarePen } from "lucide-react";

export default function SubmissionDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [submission, setSubmission] = useState<Submission | null>(
    (location.state as { submission: Submission })?.submission || null
  );
  const isPopulatedUser = (
    user: string | any
  ): user is {
    fullname: string;
    email: string;
    phone?: string;
    instagram?: string;
  } => typeof user === "object" && user !== null && "fullname" in user;

  const user = isPopulatedUser(submission?.userId) ? submission?.userId : null;
  const [loading, setLoading] = useState(!submission);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      if (!submission && id) {
        try {
          setLoading(true);
          const res = await getSubmissionById(id);
          if (res.status == 200) {
            setSubmission(res.data);
          }
        } catch (err) {
          console.error("Failed to fetch submission:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSubmission();
  }, [id, submission]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading submission...</div>;
  }

  if (!submission) {
    return <div className="p-6 text-gray-600">Submission not found.</div>;
  }

  return (
    <div className="p-6 mt-[-20px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold capitalize">
          {user?.fullname || "User"}’s Submission
        </h2>

        <div className="flex gap-2">
          {/* Google Drive Button */}
          <a
            href={submission?.googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#eeeeee] text-gray-700 rounded-md border border-grey-200 hover:bg-gray-200"
          >
            <img
              src="/banner/icons/googleDriveIcon.png"
              alt="Drive"
              className="w-5"
            />
            Google Drive
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Instagram Button */}
          {user?.instagram && (
            <a
              href={user.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#eeeeee] text-gray-700 rounded-md border border-gray-200 hover:bg-gray-200"
            >
              <img
                src="/banner/icons/instagramIcon.png"
                alt="Instagram"
                className="w-4 h-4"
              />
              Instagram
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

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
            <div className="border h-[40px] px-3 py-2 rounded-md capitalize">
              {user?.fullname || "—"}
            </div>
          </div>
          <div>
           <div>
  <div className="flex justify-between items-center mb-1">
    <p className="text-xs text-gray-500">Link</p>
    {submission?.googleDriveLink && (
      <a
        href={submission.googleDriveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-black"
      >
        <ArrowUpRight className="w-4 h-4" />
      </a>
    )}
  </div>
  <div className="border h-[40px] px-3 py-2 rounded-md truncate flex items-center">
    <span className="truncate">{submission?.googleDriveLink || "—"}</span>
  </div>
</div>

          </div>

          <div>
            <p className="text-xs mb-1 text-gray-500">Email</p>
            <div className="border h-[40px] px-3 py-2 rounded-md">
              {user?.email || "—"}
            </div>
          </div>
          <div>
            <p className="text-xs mb-1 text-gray-500">Phone</p>
            <div className="border h-[40px] px-3 py-2 rounded-md flex justify-between items-center">
              <span>{user?.phone || "+91 xxxxx xxxxx"}</span>
              <SquarePen className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div>
            <p className="text-xs mb-1 text-gray-500">Upload Date</p>
            <div className="border h-[40px] px-3 py-2 rounded-md">
              {formatDate(submission?.createdAt)}
            </div>
          </div>
        </div>

        {/* Action Label + Buttons */}
        <div className="mt-2">
          <p className="text-xs mb-2 text-gray-500">Action</p>
          <div className="flex gap-4">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled
            >
              Approve Submission
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white" disabled>
              Deny Submission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
