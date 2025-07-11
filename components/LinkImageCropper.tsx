"use client";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CropIcon, Trash2Icon, Upload, X } from "lucide-react";
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
import { Link } from "@/types/Link";
import { useSaveImageLinkMutation } from "@/redux/link/linkApi";

type Props = {
  open: boolean;
  setOpen: React.SetStateAction<any>;
  croppedImageUrl: string;
  setCroppedImageUrl: React.SetStateAction<any>;
  uploadProfileImage?: any;
  fileName: string;
  setFileName: React.SetStateAction<any>;
  link: Link;
  setIsImage: Dispatch<SetStateAction<boolean>>;
};

const LinkImageCropper = ({
  open,
  setOpen,
  croppedImageUrl,
  setCroppedImageUrl,
  uploadProfileImage,
  fileName,
  setFileName,
  link,
  setIsImage,
}: Props) => {
  const aspect = 1;

  const [crop, setCrop] = React.useState<Crop>();
  const [imgSrc, setImgSrc] = useState("");

  const [croppedImage, setCroppedImage] = React.useState<string>("");
  const [hasMovedCrop, setHasMovedCrop] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [saveImage, { isLoading }] = useSaveImageLinkMutation();

  const closeModal = () => {
    setOpen(false);
    setCroppedImageUrl("");
    setImgSrc("");
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const file_name = generateRandomString(10) + "." + file.type.split("/")[1];

    setFileName(file_name);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      console.log("width", width);
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  async function onCrop() {
    try {
      if (!croppedImageUrl) {
        alert("Please select and crop an image first.");
        return;
      }
      console.log("hello");
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const newfile = new File([blob], fileName, { type: blob.type });

      const formData = new FormData();
      formData.append("file", newfile);
      formData.append("_id", link._id);

      await saveImage(formData).unwrap();

      setCroppedImage(croppedImageUrl);
      setOpen(false);
      setImgSrc("");
      setHasMovedCrop(false);
      setIsImage(false);
    } catch (error) {
      console.log("error", error);
      alert("Something went wrong!");
    }
  }

  const onCropComplete = (crop: PixelCrop) => {
    console.log("hello");
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef.current, crop);

      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop) => {
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

  const uploadImage = () => {};
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent
        className="[&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <div className="w-full flex flex-row items-center justify-between">
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
            <>
              <div className="size-full relative">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => {
                    if (!hasMovedCrop) {
                      setHasMovedCrop(true);
                    }
                    setCrop(percentCrop);
                  }}
                  onComplete={(c) => onCropComplete(c)}
                  aspect={aspect}
                  className="w-full"
                >
                  <Avatar className="size-full rounded-none">
                    <AvatarImage
                      ref={imageRef}
                      className="size-full rounded-none "
                      alt="Image Cropper Shell"
                      src={imgSrc}
                      onLoad={onImageLoad}
                    />
                    <AvatarFallback className="size-full min-h-[500px] rounded-none">
                      Loading...
                    </AvatarFallback>
                  </Avatar>
                </ReactCrop>
              </div>
              {/* {croppedImageUrl && (
                <div className="absolute bottom-9">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full size-32 cursor-pointer ring-offset-2 ring-2 ring-slate-200">
                    <img
                      src={croppedImageUrl}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </span>
                </div>
              )} */}
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
        </div>
        <DialogFooter>
          <div className="flex flex-row gap-1 justify-end">
            <>
              {hasMovedCrop && (
                <Button
                  type="submit"
                  size={"sm"}
                  className="w-fit bg-[#8228D9] hover:bg-[#6c21b3]"
                  onClick={onCrop}
                >
                  <CropIcon className="mr-1.5 size-4" />
                  Crop
                </Button>
              )}
            </>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkImageCropper;

export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
