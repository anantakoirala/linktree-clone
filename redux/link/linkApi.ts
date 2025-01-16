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
  }),
});

export const {
  useCreateLinkMutation,
  useGetAllLinksQuery,
  useLazyGetAllLinksQuery,
} = linkApi;
