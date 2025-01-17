import { api } from "../api";
import { setAllProducts } from "./shopSlice";

export const shopApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchOg: builder.query({
      query: ({ url }) => {
        return {
          url: `/api/v1/shop/get-og?url=${encodeURIComponent(url)}`,
          method: "GET",
        };
      },
    }),
    saveProduct: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/api/v1/shop/save-product`,
          method: "POST",
          body: data,
          credentials: "include" as const,
          headers: {
            "Content-Type": "application/json", // Ensure headers are set
          },
        };
      },
      invalidatesTags: ["shop"],
    }),
    getAllProducts: builder.query({
      query: () => {
        return {
          url: `/api/v1/shop/get-all-products`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setAllProducts(result.data.products));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
      providesTags: ["shop"],
    }),
    createCustomProduct: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: `/api/v1/shop/save-custom-product`,
          method: "POST",
          body: data, // Send the data object directly
        };
      },
      invalidatesTags: ["shop"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        console.log("data", data);
        return {
          url: `/api/v1/shop/update-product/${id}`,
          method: "PATCH",
          body: data, // Send the data object directly
        };
      },
      invalidatesTags: ["shop"],
    }),
    changeProductStatus: builder.mutation({
      query: ({ id, status }) => {
        console.log("state id", status);
        return {
          url: `/api/v1/shop/change-product-status/${id}`,
          method: "PATCH",
          body: { status }, // Send the data object directly
        };
      },
    }),
  }),
});

export const {
  useFetchOgQuery,
  useLazyFetchOgQuery,
  useSaveProductMutation,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useCreateCustomProductMutation,
  useUpdateProductMutation,
  useChangeProductStatusMutation,
} = shopApi;
