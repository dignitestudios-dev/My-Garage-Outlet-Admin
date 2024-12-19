import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const itemApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: "/admin/item/viewAllItems?search=&time=all&page=1&limit=10",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    fetchItem: builder.query({
      query: ({ itemId }) => ({
        url: `/admin/item/viewItemDetails/${itemId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteItem: builder.mutation({
      query: ({ itemId, reason }) => ({
        url: `/admin/item/deleteSingleItem/${itemId}`,
        method: "POST",
        body: {
          reason,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  reducerPath: "itemApi",
});

export const { useGetItemsQuery, useFetchItemQuery, useDeleteItemMutation } =
  itemApi;

export default itemApi;
