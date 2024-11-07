import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Assuming RootState is set up with user slice
import {
   CategoriesType,
   ChatsPropType,
   DocumentsPropTypes,
   ServicesTypes,
   VideoPropTypes,
} from "@/types/Types";

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

   tagTypes: ["Documents", "Videos", "Services", "Categories", "Chats"],

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

      // videos api
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
   useGetDocsQuery,
   useSetDocsMutation,
   useDeleteDocsMutation,
   useGetVideosQuery,
   useGetVideoByIDQuery,
} = apiSlice;
