"use client";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId,
    ]);
  async function deleteFile() {
    if (!user || !fileId) return;

    const toastId = toast.loading("Deleting...");
    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef)
        .then(async () => {
          console.log("File Deleted");
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("deleted");
            toast.success("Deleted Successfully", {
              id: toastId,
            });
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
        });
    } catch (err) {
      console.log("error while deleting");
      toast.error("Error Deleting Document",{
        id:toastId,
    })
    }
    setIsDeleteModalOpen(false);
  }
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanantly delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
