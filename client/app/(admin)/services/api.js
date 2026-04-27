import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/product/allproducts",
    }),
    getCategories: build.query({
      query: () => "/category/all",
    }),
    createNewProduct: build.mutation({
      query: (productData) => ({
        url: "/product/create",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: productData,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useCreateNewProductMutation } = adminApiService;

// getProducts = http://localhost:8000/products
