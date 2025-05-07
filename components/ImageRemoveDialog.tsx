"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Link } from "@/types/Link";
import { handleApiError } from "@/lib/handleApiError";
import { useRemoveImageMutation } from "@/redux/link/linkApi";
import toast from "react-hot-toast";

type Props = {
  deleteImageModalOpen: boolean;
  setDeleteImageModalOpen: Dispatch<SetStateAction<boolean>>;
  link: Link;
};

const ImageRemoveDialog = ({
  deleteImageModalOpen,
  setDeleteImageModalOpen,
  link,
}: Props) => {
  const [removeImage, { isLoading }] = useRemoveImageMutation();
  const handleSubmit = async () => {
    try {
      await removeImage({ id: link._id }).unwrap();
      toast.success("Image removed successfully");
      setDeleteImageModalOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Dialog open={deleteImageModalOpen} onOpenChange={setDeleteImageModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <p className="text-sm text-muted-foreground tracking-tight">
            This action cannot be undone
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setDeleteImageModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-700 text-white"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageRemoveDialog;
