"use client";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import axios from "axios";
import { FileCheck, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export const Form = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, open } = useDropzone({
    maxFiles: 1,
    noClick: true,
    accept: {
      "image/*": [],
    },
  });

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

      const url = "https://httpbin.org/post";

      const req = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const pct = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            setProgressUpload(pct);
          }
        },
      });
      console.log(req.data);
      alert(`Sucessfully uploaded (${selectedFile!.name}) with legend: ${legendField}`);
    }
  };

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center ${
        isDragActive ? "bg-background/80 backdrop-blur-sm" : ""
      }`}
      {...getRootProps()}
    >
      <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold justify-center text-center">Upload</h1>
        <label
          htmlFor="file-upload"
          onClick={(e) => {
            e.preventDefault();
            open();
          }}
          className="flex flex-col items-center gap-2 border-2 border-dashed text-muted-foreground p-10 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {isDragActive ? (
            <>
              <FileCheck className="w-10 h-10" />
              <span>Drop a file</span>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10" />
              <span>Select a file</span>
            </>
          )}
        </label>

        {selectedFile && <div className="text-m">Selected File: {selectedFile.name}</div>}

        <input
          type="text"
          placeholder="Insert a Legend"
          value={legendField}
          onChange={(e) => setLegendField(e.target.value)}
          className="border-2 p-2 rounded-md text-center"
        />
        <Button className="cursor-pointer p-5" variant="outline" onClick={handleSubmit}>
          Send
        </Button>

        <div className="w-xl">{progressUpload > 0 && <ProgressBar progress={progressUpload} />}</div>
      </div>
    </div>
  );
};
