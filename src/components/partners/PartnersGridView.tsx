import React from "react";
import PartnerCard from "./PartnerCard";
import { Ambassador } from "@/types";


interface PartnersGridViewProps {
  partners: Ambassador[];
}

const PartnersGridView: React.FC<PartnersGridViewProps> = ({ partners }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4">
      {partners.map((partner) => (
        <PartnerCard key={partner.fullname} partner={partner} />
      ))}
    </div>
  );
};

export default PartnersGridView;
