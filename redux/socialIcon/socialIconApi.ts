import { api } from "../api";
import { setSocialIcons } from "./socialIconSlice";

export const shopApi = api.injectEndpoints({
  endpoints: (builder) => ({
    saveSocialIcon: builder.mutation({
      query: (data) => {
        console.log("data api", data);
        return {
          url: `/api/v1/socialicons/save-social-icons`,
          method: "POST",
          body: data,
          credentials: "include" as const,
          headers: {
            "Content-Type": "application/json", // Ensure headers are set
          },
        };
      },
      invalidatesTags: ["social"],
    }),
    getAllSocialIcons: builder.query({
      query: () => {
        return {
          url: `/api/v1/socialicons/get-all-icons`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSocialIcons(result.data.icons));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
      providesTags: ["social"],
    }),
    changeSocialIconStatus: builder.mutation({
      query: ({ id, publish }) => {
        return {
          url: `/api/v1/socialicons/update-social-icon-status/${id}`,
          method: "PATCH",
          body: { publish }, // Send the data object directly
        };
      },
      invalidatesTags: ["social"],
    }),
    getSingleSocialIcon: builder.query({
      query: (id) => {
        return {
          url: `/api/v1/socialicons/single-social-icon/${id}`,
          method: "GET",
        };
      },
    }),
    updateSocialIcon: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/v1/socialicons/update-social-icon/${id}`,
          method: "PATCH",
          body: { data }, // Send the data object directly
        };
      },
      invalidatesTags: ["social"],
    }),
  }),
});

export const {
  useSaveSocialIconMutation,
  useGetAllSocialIconsQuery,
  useLazyGetAllSocialIconsQuery,
  useChangeSocialIconStatusMutation,
  useGetSingleSocialIconQuery,
  useLazyGetSingleSocialIconQuery,
  useUpdateSocialIconMutation,
} = shopApi;
