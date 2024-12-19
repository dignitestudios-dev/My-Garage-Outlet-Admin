import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import usersApi from "./userSlice/userSlice";
import eventApi from "./eventSlice/eventSlice";
import itemApi from "./itemSlice/itemSlice";
import notificationApi from "./notificationSlice/notificationSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [notificationApi.reducerPath]: itemApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware, // Add usersApi middleware
      eventApi.middleware, // Add eventApi middleware
      itemApi.middleware, // Add itemApi middleware
      notificationApi.middleware // Add notificationApi middleware
    ),
});

setupListeners(store.dispatch);
