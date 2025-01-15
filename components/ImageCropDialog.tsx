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
import ReactCrop, {
  centerCrop,
  type Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { restApi } from "@/api";
import axios from "axios";

type Props = {
  open: boolean;
  setOpen: React.SetStateAction<any>;
};

const MIN_DIMENSION = 150; // Minimum dimension for crop
const ASPECT_RATIO = 1; // Aspect ratio (e.g., 1 for a square)

const ImageCropDialog = ({ open, setOpen }: Props) => {
  const [filename, setFileName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>(); // Crop state
  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const closeModal = () => {
    setOpen(false);
    setImgSrc("");
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const onCropComplete = async (crop: PixelCrop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);

      if (croppedImageUrl) {
        try {
          // Fetch the cropped image as a blob
          const response = await fetch(croppedImageUrl);
          const blob = await response.blob(); // Convert the URL to a Blob

          // Log the blob to make sure it's being converted correctly
          console.log("blob", blob);
          const newfile = new File([blob], filename, { type: blob.type });
          console.log("newfile", newfile);

          // Prepare the FormData
          const formData = new FormData();
          formData.append("file", newfile); // The 'file' field must match the backend's expected field name

          // Send the file to the server
          axios
            .post("http://localhost:7000/api/v1/profile/add", formData)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        } catch (error) {
          console.error("Error uploading file", error);
        }
      }
    }
  };

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: PixelCrop
  ): Promise<string> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject("Canvas is empty");
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const handleCropButtonClick = () => {
    if (crop && imageRef.current) {
      onCropComplete(crop as PixelCrop);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent
        className="[&>button]:hidden"
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
              <div className="flex flex-col items-center justify-center  ">
                <ReactCrop
                  crop={crop}
                  circularCrop
                  onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
                  minHeight={150}
                  minWidth={150}
                  aspect={1}
                  className=""
                >
                  <img
                    src={imgSrc}
                    ref={imageRef}
                    onLoad={onImageLoad}
                    style={{ maxHeight: "70vh" }}
                  />
                </ReactCrop>
                <button
                  className="flex items-center mt-2 justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
                  onClick={handleCropButtonClick}
                  disabled={!imgSrc}
                >
                  Crop
                </button>
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

export default ImageCropDialog;
