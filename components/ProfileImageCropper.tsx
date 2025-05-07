"use client";
import React, { SyntheticEvent, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CropIcon, X } from "lucide-react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { generateRandomString } from "@/lib/generateRandomStrings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  croppedImageUrl: string;
  setCroppedImageUrl: React.Dispatch<React.SetStateAction<string>>;
  uploadProfileImage?: any;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileImageCropper = ({
  open,
  setOpen,
  croppedImageUrl,
  setCroppedImageUrl,
  uploadProfileImage,
  fileName,
  setFileName,
}: Props) => {
  const aspect = 1;

  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { _id, image } = useSelector((state: RootState) => state.profile);

  const resetStates = () => {
    setImgSrc("");
    setCrop(undefined);
    setCroppedImageUrl("");
    setFileName("");
  };

  const closeModal = () => {
    resetStates();
    setOpen(false);
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const file_name = generateRandomString(10) + "." + file.type.split("/")[1];
    setFileName(file_name);

    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result?.toString() || "");
    };
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  };

  const onCropComplete = (crop: PixelCrop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedUrl = getCroppedImg(imageRef.current, crop);
      setCroppedImageUrl(croppedUrl);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop): string => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }

    return canvas.toDataURL("image/png", 1.0);
  };

  const onCrop = async () => {
    try {
      if (!croppedImageUrl) {
        alert("Please select and crop an image first.");
        return;
      }

      console.log("croppedImageUrl", croppedImageUrl);

      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const newfile = new File([blob], fileName, { type: blob.type });

      const formData = new FormData();
      formData.append("file", newfile);
      formData.append("_id", _id);

      if (uploadProfileImage) {
        await uploadProfileImage(formData).unwrap();
      }

      closeModal();
    } catch (error) {
      console.error("Crop/Upload error:", error);
      alert("Something went wrong during cropping or uploading.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent
        className="[&>button]:hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex justify-between items-center w-full">
            <DialogTitle>Crop Image</DialogTitle>
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
            <div className="relative w-full">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={onCropComplete}
                aspect={aspect}
                className="w-full"
              >
                <Avatar className="w-full h-auto rounded-none">
                  <AvatarImage
                    ref={imageRef}
                    className="w-full h-auto rounded-none"
                    alt="Crop preview"
                    src={imgSrc}
                    onLoad={onImageLoad}
                  />
                  <AvatarFallback className="min-h-[500px] rounded-none">
                    Loading...
                  </AvatarFallback>
                </Avatar>
              </ReactCrop>
            </div>
          ) : (
            <Button
              className="w-full py-3 bg-[#8228D9] hover:bg-[#6c21b3] text-white font-semibold rounded-full"
              onClick={() => imageInputRef.current?.click()}
            >
              Pick image
            </Button>
          )}
        </div>

        {croppedImageUrl && (
          <DialogFooter>
            <Button
              size="sm"
              className="bg-[#8228D9] hover:bg-[#6c21b3]"
              onClick={onCrop}
              disabled={!croppedImageUrl}
            >
              <CropIcon className="mr-1.5 h-4 w-4" />
              Crop
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageCropper;

export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 50 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}
