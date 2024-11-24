// Map file types to document types
export const mapFileTypeToDocumentType = (fileType: FileType): string => {
   const fileTypeMapping: Record<FileType, string> = {
      "application/pdf": "PDF",
      "image/png": "PNG",
      "application/msword": "DOC",
      "image/jpeg": "JPEG",
      "application/vnd.ms-excel": "XLS",

      // Add more mappings as needed
   };
   // Default to the original fileType if no mapping is founda
   return fileTypeMapping[fileType] || fileType;
};
