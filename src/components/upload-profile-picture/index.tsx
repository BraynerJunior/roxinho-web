"use client"

import { Camera, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useState } from "react";

type UploadProfilePictureButtonProps = {
  userId: string;
};

export default function UploadProfilePictureButton({userId}: UploadProfilePictureButtonProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef= useRef<HTMLInputElement | null>(null);
    return(
        <>
        <input type="file"
               ref={fileInputRef}
               disabled={isUploading}
               className="hidden"
               onChange={async (e) =>{
                const file = e.target.files?.[0] as File;

                setIsUploading(true);

                const data = new FormData();
                data.set("file", file);
                if(userId){

                    data.set("userId", userId);
                   
                }

                const response = await fetch
                ("/api/upload", {
                    method: "POST",
                    body: data,
                });
                

                setIsUploading(false)
               }}

        />
        <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
              disabled={isUploading}
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              {isUploading ? <Loader2 className="animate-spin"/>:<Camera />}
        </Button>
        </>
    ) 
}