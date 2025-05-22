
import React from "react";
import { File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");
  
  return (
    <div className="relative group border rounded-md p-2 mb-2 bg-slate-50">
      <div className="flex items-center gap-2">
        {isImage ? (
          <div className="h-16 w-16 relative">
            <img 
              src={URL.createObjectURL(file)} 
              alt={file.name} 
              className="h-full w-full object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="h-16 w-16 flex items-center justify-center bg-blue-100 rounded-md">
            <File className="h-8 w-8 text-blue-500" />
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-slate-200 p-1 h-auto" 
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FilePreview;
