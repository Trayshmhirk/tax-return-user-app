import DocumentTypeIcon from "../icons/DocumentTypeIcon";
import { FileType } from "../../types/AllTypes";
import { mapFileTypeToDocumentType } from "../../helpers/mapFileType";

// Reusable component to show file upload progress
export const FileUploadProgress = ({
   file,
   progress,
   fileSizeInMB,
}: {
   file: File;
   progress: number;
   fileSizeInMB: number;
}) => {
   const currentFileSize = parseFloat(
      ((progress / 100) * fileSizeInMB).toFixed(2)
   );

   return (
      <div className="flex flex-col gap-1">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <DocumentTypeIcon
                  docType={mapFileTypeToDocumentType(file.type as FileType)}
               />
               <p className="text-xs font-medium">{file.name}</p>
            </div>
            <div className="text-xs text-mutedGray dark:text-white">{`${currentFileSize} of ${fileSizeInMB}mb`}</div>
         </div>

         <div className="w-full h-1 bg-spanishGray rounded-md">
            <div
               className="h-1 bg-richElectricBlue rounded-md"
               style={{ width: `${progress}%` }}
            ></div>
         </div>

         <div className="flex self-end">
            <div className="text-richElectricBlue text-xs">
               {`${progress === 100 ? "Uploaded" : "Uploading..."}`}
            </div>
         </div>
      </div>
   );
};
