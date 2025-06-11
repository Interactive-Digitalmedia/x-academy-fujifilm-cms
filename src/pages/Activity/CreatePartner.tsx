import { useState } from "react";
import CreatePartnerLayout from "@/layouts/CreatePartnerLayout";

export default function CreatePartner() {
  const [formData, setFormData] = useState({});

  return <CreatePartnerLayout data={formData} setData={setFormData} />;
}
