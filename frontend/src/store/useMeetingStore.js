import {create} from "zustand";
import { axiosInstance } from "../lib/axios";


export const useMeetingStore = create((set) => ({
    token: null,
    isGenerating:false,
    error: null,

    generateToken : async (roomName) =>{
        set({isGenerating: true, error: null, token: null});
        try {
            const res = await axiosInstance.post('/meetings/token', {roomName});
            set({token: res.data.token});
        } catch (err) {
            console.error("Error generating meeting token:", err.response?.data || err.message);
            set({ error: err.response?.data?.message || err.message });
        } finally{
            set({isGenerating: false})
        }
    },
    clearToken: () => set({ token: null, error: null }),
}))