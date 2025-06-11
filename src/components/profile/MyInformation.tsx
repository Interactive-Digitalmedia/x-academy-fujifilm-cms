import { Pencil } from "lucide-react";

const MyInformation = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Name
        </label>
        <input
          type="text"
          value="John Doe"
          readOnly
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
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
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          value="johndoe@email.com"
          readOnly
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
        />
      </div>

      {/* Phone with icon */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Phone
        </label>
        <div className="relative">
          <input
            type="text"
            value="+91 xxxxx xxxxx"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm bg-white"
          />
          <Pencil className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Password with icon */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            value=""
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm bg-white"
          />
          <Pencil className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Role with icon */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Role
        </label>
        <div className="relative">
          <input
            type="text"
            value="Associate Admin"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm bg-white"
          />
          <Pencil className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default MyInformation;
