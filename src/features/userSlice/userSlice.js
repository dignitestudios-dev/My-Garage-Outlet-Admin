import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";

const token = Cookies.get("token");
// const token = localStorage.getItem("token");

const usersApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/admin/home/fetchHomeInfo",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    fetchUser: builder.query({
      query: ({ userId, eventType }) => ({
        url: `/admin/user/viewUserDetails/${userId}?eventType=${eventType}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    suspendUser: builder.mutation({
      query: ({ userId, status, suspensionReason }) => ({
        url: `/admin/user/toggleLockUserAccount/${userId}/${status}`,
        method: "GET",
        body: { suspensionReason },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/user/viewAllUsers?search=sam&time=all&page=1&limit=10",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  reducerPath: "usersApi",
});

export const {
  useGetUsersQuery,
  useFetchUserQuery,
  useSuspendUserMutation,
  useGetAllUsersQuery,
} = usersApi;

export default usersApi;
