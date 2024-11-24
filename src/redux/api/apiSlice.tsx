import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Assuming RootState is set up with user slice

export interface UserSecurity {
   email: string;
   token: string;
}

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000",
      prepareHeaders: (headers, { getState }) => {
         const { email, token } = (getState() as RootState).user;
         if (email && token) {
            headers.set("useremail", email);
            headers.set("usertoken", token);
         }
         return headers;
      },
   }),

   tagTypes: [
      "Documents",
      "Videos",
      "Services",
      "Categories",
      "Chats",
      "Invoices",
      "Cards",
   ],

   endpoints: (builder) => ({
      // categories api
      getCategories: builder.query<CategoriesType[], string | void>({
         query: () => ({
            url: "/categories",
            method: "GET",
         }),
         providesTags: ["Categories"],
      }),

      // services api
      getServices: builder.query<ServicesTypes[], string | void>({
         query: () => ({
            url: "/services",
            method: "GET",
         }),
         providesTags: ["Services"],
      }),

      // create service chat api
      createServiceChat: builder.mutation<
         ChatsPropType,
         Partial<ChatsPropType>
      >({
         query: (serviceChat) => ({
            url: "/chats",
            method: "POST",
            body: serviceChat,
         }),
         invalidatesTags: ["Chats"],
      }),

      // fetch service chats
      getServiceChats: builder.query<ChatsPropType[], string | void>({
         query: () => ({
            url: "/chats",
            method: "GET",
         }),
         providesTags: ["Chats"],
      }),

      // documents api calls
      getDocs: builder.query<DocumentsPropTypes[], string | void>({
         query: () => ({
            url: "/documents",
            method: "GET",
         }),
         providesTags: ["Documents"],
      }),
      setDocs: builder.mutation<
         DocumentsPropTypes,
         Partial<DocumentsPropTypes> // use Omit<DocumentsPropTypes, "id"> when actual api is live
      >({
         query: (document) => ({
            url: "/documents",
            method: "POST",
            body: document,
         }),
         invalidatesTags: ["Documents"],
      }),
      deleteDocs: builder.mutation<
         { success: boolean; id: string },
         { id: string }
      >({
         query: ({ id }) => ({
            url: `/documents/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Documents"],
      }),

      // invoices api calls
      getInvoices: builder.query<InvoicesPropTypes[], string | void>({
         query: () => ({
            url: "/invoices",
            method: "GET",
         }),
         providesTags: ["Invoices"],
      }),
      deleteInvoice: builder.mutation<
         { success: boolean; id: string },
         { id: string }
      >({
         query: ({ id }) => ({
            url: `/invoices/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Invoices"],
      }),

      // get cards
      getCreditCards: builder.query<CreditCardsProps[], string | void>({
         query: () => ({
            url: "/cards",
            method: "GET",
         }),
         providesTags: ["Cards"],
      }),

      // videos api calls
      getVideos: builder.query<VideoPropTypes[], string | void>({
         query: () => ({
            url: "/videos",
            method: "GET",
         }),
         providesTags: ["Videos"],
      }),
      getVideoByID: builder.query<VideoPropTypes, { id: string }>({
         query: ({ id }) => ({
            url: `/videos/${id}`,
            method: "GET",
         }),
         providesTags: ["Videos"],
      }),
   }),
});

export const {
   useGetCategoriesQuery,
   useGetServicesQuery,
   useCreateServiceChatMutation,
   useGetServiceChatsQuery,
   useGetDocsQuery,
   useSetDocsMutation,
   useDeleteDocsMutation,
   useGetInvoicesQuery,
   useDeleteInvoiceMutation,
   useGetCreditCardsQuery,
   useGetVideosQuery,
   useGetVideoByIDQuery,
} = apiSlice;
