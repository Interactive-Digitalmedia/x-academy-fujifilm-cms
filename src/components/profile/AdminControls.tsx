const AdminControls = () => {
  const controls = [
    { title: "Events", description: "View, Create & Update Events" },
    { title: "Ambassador", description: "View, Create & Update Ambassadors" },
    { title: "Support", description: "View, Create & Update Tickets" },
    { title: "Blogs", description: "View, Create & Update Blogs" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {controls.map((control) => (
        <div key={control.title}>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {control.title}
          </label>
          <div className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
            {control.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminControls;
