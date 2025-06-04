import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { badgeColors } from "@/assets/badgeColors";

type Partner = {
  name: string;
  city: string;
  imageUrl: string;
  countryCode?: string;
};

type Props = {
  partner: Partner;
};

const getBadgeColorClass = (name: string) => {
  const index = name.charCodeAt(0) % badgeColors.length;
  return badgeColors[index];
};

const getEmojiFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const PartnerCard: React.FC<Props> = ({ partner }) => {
  const navigate = useNavigate();
  const badgeColorClass = getBadgeColorClass(partner.name);

  return (
    <div
      onClick={() =>
        navigate(`/partners/${partner.name.toLowerCase().replace(/ /g, "-")}`)
      }
      className="card cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="relative w-full p-3">
        <div className="aspect-square overflow-hidden rounded-[12px]">
          <img
            src={partner.imageUrl}
            alt={partner.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-1">
            {partner.name}{" "}
            {partner.countryCode && (
              <span className="text-lg font-emoji">
                {getEmojiFlag(partner.countryCode)}
              </span>
            )}
          </h3>
          <p
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${badgeColorClass}`}
          >
            {partner.city}
          </p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default PartnerCard;
