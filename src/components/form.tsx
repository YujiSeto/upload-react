"use client";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import axios from "axios";
import { Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";


export const Form = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [legendField, setLegendField] = useState("");
  const [progressUpload, setProgressUpload] = useState(0);

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
      formData.append("legend", legendField);

      const url = "https://httpbin.org/post"

      const req = await axios.post(url , formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const pct = Math.floor((progressEvent.loaded / progressEvent.total)* 100) ;
            setProgressUpload(pct);
          }
        }
      });
      console.log(req.data);
      alert(`Sucessfully uploaded (${selectedFile!.name}) with legend: ${legendField}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-5">
      <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center gap-2 border-2 border-dashed border-muted text-muted-foreground p-6 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Upload className="w-8 h-8" />
        <span>Select a File</span>
      </label>
      {selectedFile && <div className="text-m">Selected File: {selectedFile.name}</div>}
      <input
        type="text"
        placeholder="Insert a Legend"
        value={legendField}
        onChange={(e) => setLegendField(e.target.value)}
        className="border-2 p-2 rounded-md text-center"
      />
      <Button className="cursor-pointer" variant="outline" onClick={handleSubmit}>
        Send
      </Button>

      <div className="w-xl">
        {progressUpload > 0 && <ProgressBar progress={progressUpload}/>}
      </div>
    </div>
  );
};
