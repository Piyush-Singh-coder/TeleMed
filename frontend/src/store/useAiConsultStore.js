import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAiConsultStore = create((set) => ({
  reply: null,
  isLoading: false,
  error: null,

  consultAI: async (symptoms) => {
    if (!symptoms || symptoms.trim().length === 0) {
      set({ error: "Please provide your symptoms.", reply: null });
      return;
    }

    set({ isLoading: true, error: null, reply: null });
    try {
      const res = await axiosInstance.post("/ai-consult", { symptoms });
      set({ reply: res.data.reply });
    } catch (err) {
      console.error("AI Consult error:", err.response?.data || err.message);
      set({ error: err.response?.data?.message || "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  clear: () => set({ reply: null, error: null })
}));
