import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PartnerRow from "./PartnerRow";

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

interface PartnersTableProps {
  partners: Partner[];
}

const PartnersTable: React.FC<PartnersTableProps> = ({ partners }) => {
  // ... render rows from partners

  return (
    <Table>
      <TableHeader>
        <TableRow style={{ fontSize: "12px" }}>
          <TableHead className="px-3 py-1">S. NO.</TableHead>
          <TableHead className="px-3 py-1">NAME</TableHead>
          <TableHead className="px-3 py-1">ROLE</TableHead>
          <TableHead className="px-3 py-1">UPCOMING EVENTS</TableHead>
          <TableHead className="px-3 py-1">TOTAL EVENTS</TableHead>
          <TableHead className="px-3 py-1">FUJI GEARS OWNED</TableHead>
          <TableHead className="px-3 py-1"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partners.map((partner, index) => (
          <PartnerRow key={partner.sno} partner={partner} index={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PartnersTable;
