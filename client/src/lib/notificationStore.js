import { create } from "zustand";
import axiosInstance from "./axios.js";

export const useNotificationStore = create((set) => ({
  number: 0,
  // Fetch the notification count from the backend API.
  fetch: async () => {
    try {
      const res = await axiosInstance.get("/users/notification");
      set({ number: res.data });
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  },
  // Optional: Increase the notification count optimistically.
  increase: () => set((state) => ({ number: state.number + 1 })),
  decrease: () => set((state) => ({ number: state.number - 1 })),
  reset: () => set({ number: 0 }),
}));
