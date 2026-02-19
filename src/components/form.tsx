"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";

export const Form = () => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile!);

      const req = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });
      const json = await req.json();
      console.log(json);
    }
  };

  return (
    <div>
      <input className="block- my-5" type="file" onChange={handleFileChange} />
      <Button variant="outline" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
};
