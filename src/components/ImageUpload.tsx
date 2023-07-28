"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FC } from "react";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "./ui/empty-state";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="">
      {value.map((url) => (
        <div key={url} className="relative h-40 rounded-md overflow-hidden">
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={() => onRemove(url)}
              variant="destructive"
              size="sm"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image fill className="object-cover" alt="Image" src={url} />
        </div>
      ))}
      <CldUploadWidget onUpload={onUpload} uploadPreset="gnogfsgj">
        {({ open }) => {
          const onClick = () => {
            open?.();
          };

          return (
            <EmptyState
              className="h-40 border cursor-pointer hover:bg-secondary transition-all"
              onClick={onClick}
            >
              <EmptyStateContent className="gap-2">
                <EmptyStateIcon>
                  <ImagePlus />
                </EmptyStateIcon>
                <EmptyStateTitle>Upload an image!</EmptyStateTitle>
                <EmptyStateDescription>
                  Upload your team member image here!
                </EmptyStateDescription>
              </EmptyStateContent>
            </EmptyState>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
