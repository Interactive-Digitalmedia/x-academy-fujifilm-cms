import React from "react";
import PartnersTable from "./PartnersTable";
interface Partner {
  sno: number;
  name: string;
  role: string;
  city: string;
  countryEmoji: string;
  upcomingEvents: number;
  totalEvents: number;
  fujiGearOwned: number;
  imageUrl: string;
}

interface PartnersListViewProps {
  partners: Partner[];
}

const PartnersListView: React.FC<PartnersListViewProps> = ({ partners }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-6 bg-white rounded-xl border border-gray-200">
      
      <PartnersTable partners={partners} />
    </div>
  );
};

export default PartnersListView;