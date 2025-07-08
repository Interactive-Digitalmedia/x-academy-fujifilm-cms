import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserInformation from "@/components/support/UserInformation";
import AnswerQuery from "@/components/community/AnswerQuery";
import { Badge } from "@/components/ui/badge";
import { getAskTheExpertsById } from "@/api/askTheExperts";
import { AskToExperts } from "@/types";

const TABS = ["User Information", "Answer Query"];

const CommunityDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("User Information");
  const [answer, setAnswer] = useState("");
  const { state } = useLocation();
  const [ticket, setTicket] = useState<AskToExperts | null>(
    state?.ticket || null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {    
    if (!ticket && id) {
      (async () => {
        const res = await getAskTheExpertsById(id);
        if (res?.status === 200 && res.data) {
          setTicket(res.data);
        }
      })();
    }
  }, [id, ticket]);

  if (!ticket) {
    return <div className="text-red-500 px-4 py-6">Ticket not found</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "User Information":
        return <UserInformation ticket={ticket} />;
      case "Answer Query":
        return (
          <AnswerQuery
            answer={answer}
            onAnswerChange={(value) => setAnswer(value)}
            question={ticket.question}
          />
        );
      default:
        return <div className="mt-4 text-sm text-gray-600">Coming soon...</div>;
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <Badge variant="outline" className="bg-orange-100 text-orange-600 mb-2">
          ● {ticket?.status || "Unknown Status"}
        </Badge>

        {/* Updated Tabs UI */}
        <div className="flex gap-3 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`btn-toggle ${
                activeTab === tab ? "btn-toggle-active" : "btn-toggle-inactive"
              }`}
              style={{
                display: "flex",
                width: "145px",
                padding: "6px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default CommunityDetails;
