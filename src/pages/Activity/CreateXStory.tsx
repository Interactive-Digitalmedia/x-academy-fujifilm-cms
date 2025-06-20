import { useState } from "react";
import CreateXStoryLayout from "@/layouts/CreateXStoryLayout";

export default function CreateXStory() {
  const [formData, setFormData] = useState({});

  return <CreateXStoryLayout />;
}
