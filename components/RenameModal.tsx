"use client";
import { useUser } from "@clerk/nextjs";
import { useAppStore } from "@/store";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const [fileId, filename, isRenameModalOpen, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.filename,
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
    ]);
  const renameFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading("Renaming...")

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
    });
    toast.success("Renamed Successfully",{
        id:toastId
    })
    setInput("");
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>
          <Input
            defaultValue={filename}
            id="Link"
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
        </DialogHeader>
        <div className="flex justify-end space-x-2 py-3">
          <Button
            size="sm"
            className="px-3"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    // <Dialog
    //   open={isRenameModalOpen}
    //   onOpenChange={(isOpen) => {
    //     setIsRenameModalOpen(isOpen);
    //   }}
    // >
    //   <DialogContent className="sm:max-w-md">
    //     <DialogHeader>
    //       <DialogTitle>Rename File</DialogTitle>
    //     </DialogHeader>
    //     <div className="flex items-center space-x-2">
    //       <div className="grid flex-1 gap-2">
    //         <Input
    //           id="link"
    //           defaultValue={filename}
    //           onChange={(e) => setInput(e.target.value)}
    //           onKeyDownCapture={(e) => {
    //             if (e.key === "Enter") {
    //               renameFile();
    //             }
    //           }}
    //         />
    //         <Button
    //           size="sm"
    //           className="px-3 flex-1"
    //           variant={"ghost"}
    //           onClick={() => renameFile()}
    //         >
    //           <span className="sr-only">Rename</span>
    //           <span>Rename</span>
    //         </Button>
    //       </div>
    //     </div>
    //     <DialogFooter className="sm:justify-start">
    //       <DialogClose asChild>
    //         <Button
    //           size="sm"
    //           className="px-3"
    //           variant={"ghost"}
    //           onClick={() => setIsRenameModalOpen(false)}
    //         >
    //           <span className="sr-only">Cancel</span>
    //           <span>Cancel</span>
    //         </Button>
    //       </DialogClose>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}

export default RenameModal;
