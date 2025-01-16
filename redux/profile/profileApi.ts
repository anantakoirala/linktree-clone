import { api } from "../api";
import { setProfile } from "./profileSlice";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        return {
          url: `/api/v1/auth/me`,
          method: "GET",
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setProfile(result.data.user));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    uploadProfileImage: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: `/api/v1/profile/add`,
          method: "POST",
          body: data, // Send the data object directly
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setProfile(result.data.user));
        } catch (error) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    updateUserProfile: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/profile/updateTheme`,
          method: "POST",
          body: data, // Send the data object directly
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setProfile(result.data.user));
        } catch (error) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLazyGetProfileQuery,
  useUploadProfileImageMutation,
  useUpdateUserProfileMutation,
} = profileApi;
