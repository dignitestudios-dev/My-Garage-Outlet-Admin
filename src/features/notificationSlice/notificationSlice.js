import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const notificationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/admin/notification/viewSentNotifications",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    deleteNotification: builder.mutation({
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

    createNotification: builder.mutation({
      query: ({ title, message, userType }) => ({
        url: `/admin/notification/createAndSendNotification?userType=${userType}`,
        method: "POST",
        body: {
          title,
          message,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  reducerPath: "notificationApi",
});

export const {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useCreateNotificationMutation,
} = notificationApi;

export default notificationApi;
