import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const eventApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: "/admin/event/viewAllEvents?time=recently created&page=1&limit=10",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    fetchEvent: builder.query({
      query: ({ eventId }) => ({
        url: `/admin/event/viewEventDetails/${eventId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteEvent: builder.mutation({
      query: ({ eventId, reason }) => ({
        url: `/admin/event/deleteSingleEvent/${eventId}`,
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
  reducerPath: "eventApi",
});

export const { useGetEventsQuery, useFetchEventQuery, useDeleteEventMutation } =
  eventApi;

export default eventApi;
