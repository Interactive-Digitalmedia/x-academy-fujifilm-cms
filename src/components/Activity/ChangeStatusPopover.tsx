import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Check } from "lucide-react";

type Props = {
  currentStatus: "draft" | "published";
  onChange: (newStatus: "draft" | "published") => void;
};

export default function ChangeStatusPopover({
  currentStatus,
  onChange,
}: Props) {
  const statusOptions: ("draft" | "published")[] = ["draft", "published"];

  return (
    <Popover placement="bottom-end" showArrow>
      <PopoverTrigger>
        <Button size="sm" color="primary" className="bg-[#1098F7] text-white">
          Change Status
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-1">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={status === currentStatus ? "solid" : "light"}
              color={status === currentStatus ? "success" : "default"}
              size="sm"
              className="justify-between"
              onPress={() => onChange(status)}
            >
              {status === "draft" ? "Draft" : "Published"}
              {status === currentStatus && <Check className="w-4 h-4" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
