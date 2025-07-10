import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AskToExperts } from "@/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
  Input,
  Avatar,
} from "@nextui-org/react";

interface CommunityRowProps {
  community: AskToExperts;
  index: number;
}

const teamMembers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
  { id: 4, name: "Emily Carter" },
];

export const CommunityRow: React.FC<CommunityRowProps> = ({
  community,
  index,
}) => {
  const navigate = useNavigate();
  const [assignedTo, setAssignedTo] = useState(
    community.assignTo || null
  );

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleNavigate = () => {
    navigate(`/community/${community._id}`, {
      state: { ticket: community },
    });
  };

  const handleAssign = (memberId: number) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (member) {
      // Convert to expected type: {_id, fullname}
      setAssignedTo({
        _id: String(member.id),
        fullname: member.name,
      });

      // TODO: Call your API to update assignTo in backend
      console.log("Assigned to:", member.name);
    }
  };

  return (
    <TableRow
      onClick={() => handleNavigate()}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">
        {formatDate(community.createdAt)}
      </TableCell>
      <TableCell className="px-3 py-1 capitalize">
        {community.userId.fullname}
      </TableCell>
      <TableCell className="px-3 py-1 truncate">
        {community?.question}
      </TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              community.status.toLowerCase() === "active"
                ? "bg-yellow-500"
                : "bg-gray-400"
            }`}
          ></span>
          <span>{community?.status}</span>
        </div>
      </TableCell>

      {/* Assign To column */}
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          {assignedTo ? (
            <span className="flex items-center gap-1">
              <span className="w-5 h-5 bg-gray-200 rounded-full text-center text-xs font-medium flex items-center justify-center">
                {assignedTo.fullname?.charAt(0).toUpperCase()}
              </span>
              {assignedTo.fullname}
            </span>
          ) : (
            <Popover placement="bottom-start" showArrow offset={10}>
              <PopoverTrigger>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-5 w-5 rounded-full border border-gray-300 text-gray-500 p-0"
                  // onClick={(e) => e.stopPropagation()}
                  disabled
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px] p-2">
                <div className="text-sm font-semibold px-2 mb-2">
                  Assign To Team
                </div>
                <Input
                  size="sm"
                  radius="sm"
                  placeholder="Search"
                  className="mb-2"
                />
                <Listbox
                  aria-label="Assign list"
                  onAction={(key) => handleAssign(Number(key))}
                >
                  {teamMembers.map((member) => (
                    <ListboxItem key={member.id} textValue={member.name}>
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={member.name}
                          size="sm"
                          className="text-xs border border-gray-400"
                        />
                        <span>{member.name}</span>
                      </div>
                    </ListboxItem>
                  ))}
                </Listbox>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </TableCell>

      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
