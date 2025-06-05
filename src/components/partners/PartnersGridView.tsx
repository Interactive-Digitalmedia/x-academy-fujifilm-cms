import React from "react";
import PartnerCard from "./PartnerCard";

interface Partner {
  name: string;
  role: string;
  city: string;
  countryCode: string;
  upcomingEvents: number;
  totalEvents: number;
  fujiGearOwned: number;
  imageUrl: string;
}

interface PartnersGridViewProps {
  partners: Partner[];
}

const PartnersGridView: React.FC<PartnersGridViewProps> = ({ partners }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {partners.map((partner) => (
        <PartnerCard key={partner.name} partner={partner} />
      ))}
    </div>
  );
};

export default PartnersGridView;
