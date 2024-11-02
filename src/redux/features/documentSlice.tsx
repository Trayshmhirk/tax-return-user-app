import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentsPropTypes } from "@/types/Types";
import { v4 as uuidv4 } from "uuid";

type DocumentsState = {
   documents: DocumentsPropTypes[];
};

const initialState: DocumentsState = {
   documents: [
      {
         id: uuidv4(),
         document_name: "Document 1adfuubadfdajhjahdf",
         document_size: "20",
         document_type: "application/pdf",
         date_modified: "2024-08-25",
         base64: "",
      },
   ],
};

const documentSlice = createSlice({
   name: "documents",
   initialState,
   reducers: {
      addDocuments: (state, action: PayloadAction<DocumentsPropTypes[]>) => {
         state.documents = action.payload;
      },
   },
});

export const { addDocuments } = documentSlice.actions;

export default documentSlice.reducer;
