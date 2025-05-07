import { api } from "../api";
import { setIconPosition, setShopStatus } from "./settingSlice";

export const settingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateSetting: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/setting/edit-setting`,
          method: "PATCH",
          body: { data }, // Send the data object directly
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result.data.setting.social_icon_position);
          // dispatch(setIconPosition(result.data.setting.social_icon_position));
        } catch (error) {
          console.log("updated error");
          console.log(error);
        }
      },
    }),
    getSetting: builder.query({
      query: () => {
        return {
          url: `/api/v1/setting/get-setting`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result.data);
          dispatch(setIconPosition(result.data.setting.social_icon_position));
          dispatch(setShopStatus(result.data.setting.shopStatus));
        } catch (error: any) {
          console.log("updated error");
          console.log(error);
        }
      },
    }),
  }),
});

export const { useUpdateSettingMutation, useLazyGetSettingQuery } = settingApi;
