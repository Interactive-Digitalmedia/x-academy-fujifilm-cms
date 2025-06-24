import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
  import { Trash2 } from "lucide-react";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
  
  // ⬇️ Make sure this exists in activity.ts
  import { deleteActivity } from "@/api/activity";
import { useState } from "react";
  
  type DeleteEventProps = {
    activityId: string; // <— pass the _id of the event
  };
  
  export default function DeleteEventButton({ activityId }: DeleteEventProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
  
    const handleDelete = async () => {
      try {
        setSubmitting(true);
        await deleteActivity(activityId);          // 🔥 API call
        toast.success("Event deleted");
        onOpenChange();                           // Close modal
        navigate("/events");                      // 👈 back to list (optional)
      } catch (err) {
        toast.error("Failed to delete event");
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <>
        {/* ------ Trigger button ------ */}
        <button
          className="border p-2 rounded-md hover:bg-red-50"
          onClick={onOpen}
          aria-label="Delete event"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
  
        {/* ------ Confirmation modal ------ */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
          <ModalContent>
            <ModalHeader className="flex items-center gap-3">
              <Trash2 className="w-6 h-6 text-red-600" />
              <span className="text-lg font-semibold">Delete Event</span>
            </ModalHeader>
  
            <ModalBody>
              <p>
                Are you sure you want to delete this event? <br />
                <span className="font-medium">This action cannot be undone.</span>
              </p>
            </ModalBody>
  
            <ModalFooter className="justify-between">
              <Button
                variant="light"
                onPress={onOpenChange}
                disabled={submitting}
              >
                Cancel&nbsp;<kbd className="text-xs text-gray-500">(esc)</kbd>
              </Button>
  
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={submitting}
              >
                Yes, Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  