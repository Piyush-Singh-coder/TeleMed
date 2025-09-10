import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useDoctorStore =  create((set) => ({
    doctors: [],
    doctorProfile: null,
    isLoading: false,
    isUpdating: false,
    error: null,
    
    fetchDoctors: async () => {
        set({isLoading: true, error: null});
        try {
            const res = await axiosInstance.get('/doctor');
            set({doctors: res.data});
        } catch (error) {
            console.error("Error fetching doctors:", error.response?.data || error.message);
            set({ error: "Failed to load doctors" });
        }finally {
            set({isLoading: false});
        }
    },

    fetchDoctorProfile: async () => {
        set({isLoading: true, error: null});
        try {
            const res = await axiosInstance.get('/doctor/me');
            set({doctorProfile: res.data});
        } catch (error) {
            console.error("Error fetching doctor profile:", error.response?.data || error.message);
            set({ error: "Failed to load profile" });
        }finally{
            set({isLoading:false});
        }
    },

    toggleAvailability: async() => {
        set({isUpdating: true});
        try {
            const res = await axiosInstance.patch('/doctor/me/availability');
            set({doctorProfile: res.data});
        } catch (error) {
            console.error("Error updating availability:", error.response?.data || error.message);
        }finally{
            set({ isUpdating: false });
        }
    }
}))