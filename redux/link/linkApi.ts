import { api } from "../api";
import { setLinks } from "./linkSlice";

export const linkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLink: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: `/api/v1/link/create`,
          method: "POST",
          body: data, // Send the data object directly
        };
      },
      invalidatesTags: ["links"],
    }),
    getAllLinks: builder.query({
      query: () => {
        return {
          url: `/api/v1/link/all`,
          method: "GET",
        };
      },
      providesTags: ["links"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setLinks(result.data.links));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    deleteLink: builder.mutation({
      query: (id) => {
        return {
          url: `/api/v1/link/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["links"],
    }),
    saveImageLink: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: `/api/v1/link/save-link-image`,
          method: "POST",
          body: data, // Send the data object directly
        };
      },
      invalidatesTags: ["links"],
    }),
    removeImage: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: `/api/v1/link/remove-image`,
          method: "POST",
          body: data, // Send the data object directly
        };
      },
      invalidatesTags: ["links"],
    }),
  }),
});

export const {
  useCreateLinkMutation,
  useGetAllLinksQuery,
  useLazyGetAllLinksQuery,
  useDeleteLinkMutation,
  useSaveImageLinkMutation,
  useRemoveImageMutation,
} = linkApi;
