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
        console.log("data", data);
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
    }),
  }),
});

export const {
  useFetchOgQuery,
  useLazyFetchOgQuery,
  useSaveProductMutation,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
} = shopApi;
