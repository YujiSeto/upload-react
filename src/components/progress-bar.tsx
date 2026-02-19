"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <p className="text-sm text-center my-2">{progress}%</p>
      <Progress value={progress} />
    </div>
  );
};
