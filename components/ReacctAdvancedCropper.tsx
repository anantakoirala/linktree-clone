"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Cropper, CropperRef } from "react-advanced-cropper";

type Props = {
  open: boolean;
  setOpen: React.SetStateAction<any>;
};

const ReacctAdvancedCropper = ({ open, setOpen }: Props) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<CropperRef>(null);
  const [imgSrc, setImgSrc] = useState("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const closeModal = () => {
    setOpen(false);
    setImgSrc("");
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="[&>button]:hidden max-w-[80vw] "
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <div className="w-full flex flex-row items-center justify-between">
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <button onClick={closeModal}>
              <X />
            </button>
          </div>
        </DialogHeader>
        <div className="w-full">
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={selectFile}
          />
          {imgSrc ? (
            <>
              <div className="example">
                <div className="example__cropper-wrapper">
                  <Cropper
                    ref={cropperRef}
                    className=""
                    backgroundClassName=""
                    src={imgSrc}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
                onClick={() => imageInputRef.current?.click()}
              >
                Pick image
              </button>
            </>
          )}

          {/* Display the cropped image */}
          {/* {croppedImageUrl && (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Cropped Image:</h3>
      <div className="w-40 h-40 overflow-hidden rounded-full">
        <img
          src={croppedImageUrl}
          alt="Cropped"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReacctAdvancedCropper;
