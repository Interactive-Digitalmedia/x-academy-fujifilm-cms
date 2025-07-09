import { CmsUserProfileData } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { updateAdminProfileData } from "@/api/user";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface MyInformationProps {
  adminData?: CmsUserProfileData;
}

const MyInformation: React.FC<MyInformationProps> = ({ adminData }) => {
  const [editableFields, setEditableFields] = useState({
    fullname: false,
    contactNumber: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    fullname: adminData?.fullname || "",
    contactNumber: adminData?.contactNumber || "",
    password: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const toggleEdit = (field: keyof typeof editableFields) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const response = await updateAdminProfileData(formData);
    setIsSaving(false);

    if (response?.status === 200) {
      toast.success("Profile updated successfully");
      setEditableFields({
        fullname: false,
        contactNumber: false,
        password: false,
      });
    } else {
      toast.error(response?.message || "Failed to update profile");
    }
  };

  const hasChanges = Object.values(editableFields).some((v) => v);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          value={adminData?.email || ""}
          readOnly
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white outline-none"
        />
      </div>

      {/* Organization */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Organization
        </label>
        <input
          type="text"
          value="Fujifilm"
          readOnly
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white outline-none"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Role
        </label>
        <input
          type="text"
          value={adminData?.userRole || ""}
          readOnly
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white outline-none"
        />
      </div>

      {/* Fullname */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.fullname}
            readOnly={!editableFields.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-10 bg-white outline-none"
          />
          {!editableFields.fullname && (
            <Pencil
              className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => toggleEdit("fullname")}
            />
          )}
        </div>
      </div>

      {/* Contact Number */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Phone
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.contactNumber}
            readOnly={!editableFields.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-10 bg-white outline-none"
          />
          {!editableFields.contactNumber && (
            <Pencil
              className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => toggleEdit("contactNumber")}
            />
          )}
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            disabled
            type="password"
            placeholder="*********"
            value={formData.password}
            readOnly={!editableFields.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-10 bg-white outline-none"
          />
          {/* {!editableFields.password && (
            <Pencil
              className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => toggleEdit("password")}
            />
          )} */}
        </div>
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="col-span-2 flex gap-4">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700"
            onClick={() => {
              setFormData({
                fullname: adminData?.fullname || "",
                contactNumber: adminData?.contactNumber || "",
                password: "",
              });
              setEditableFields({
                fullname: false,
                contactNumber: false,
                password: false,
              });
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#1098F7] text-white"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyInformation;
