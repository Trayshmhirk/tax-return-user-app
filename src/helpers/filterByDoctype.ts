import { mapFileTypeToDocumentType } from "./mapFileType";

export const filterByDoctype = (
   doc: DocumentsPropTypes,
   selectedFilter: string
) => {
   if (selectedFilter === "" || selectedFilter === "All") {
      // if no filter is selected, all users should be included
      return true;
   }
   return mapFileTypeToDocumentType(doc.document_type) === selectedFilter;
};
