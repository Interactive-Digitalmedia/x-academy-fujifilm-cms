import React from "react";
import PartnersTable from "./PartnersTable";
import { Ambassador } from "@/types";

interface PartnersListViewProps {
  partners: Ambassador[];
}

const PartnersListView: React.FC<PartnersListViewProps> = ({ partners }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-6 bg-white rounded-xl border border-gray-200">
      <PartnersTable partners={partners} />
    </div>
  );
};

export default PartnersListView;
