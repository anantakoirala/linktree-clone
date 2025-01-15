"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  type Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  setOpen: React.SetStateAction<any>;
};
const MIN_DIMENSION = 150; // Minimum dimension for crop
const ASPECT_RATIO = 1; // Aspect ratio (e.g., 1 for a square)

const ImageCropper = ({ open, setOpen }: Props) => {
  const [filename, setFileName] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState<string>();

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: any) => {
        if (error) setError("");
        const { naturalHeight, naturalWidth } = e.currentTarget;
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          setError(
            `Image must be atleast ${MIN_DIMENSION} px by ${MIN_DIMENSION} px`
          );
          return setImgSrc("");
        }
      });

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

  const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();
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
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                  onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                >
                  <img
                    src={imgSrc}
                    ref={imageRef}
                    style={{ maxHeight: "70vh" }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
                <button
                  className="flex items-center mt-2 justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
                  disabled={!imgSrc}
                  onClick={() => {
                    setCanvasPreview(
                      imageRef.current as HTMLImageElement,
                      canvasRef.current as HTMLCanvasElement,
                      convertToPixelCrop(
                        crop as PixelCrop,
                        imageRef.current?.width as number,
                        imageRef.current?.height as number
                      )
                    );
                    const dataUrl = canvasRef.current?.toDataURL();
                  }}
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

          {crop && (
            <canvas
              ref={canvasRef}
              className="mt-4 "
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: "150",
                height: "150",
              }}
            />
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

export default ImageCropper;
