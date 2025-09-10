import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

const BASE_URL = import.meta.env.MODE === "development" ? "https://localhost:5000" : "/";

export const useAuthStore = create((set) => ({
    authUser: null,
    profile: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isFetchingProfile: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },
    register: async (data) =>{
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in register:", error.response?.data || error.message);
        } finally{
            set({isSigningUp: false});
        }
    },
    login: async(data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in login:", error.response?.data || error.message);
        }finally{
            set({isLoggingIn: false});
        }
    },
    logout: async() => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser: null})
        } catch (error) {
            console.log("Error in logout:", error.response?.data || error.message);
        }
    },
    getProfile: async () => {
        set({isFetchingProfile: true})
        try {
            const res = await axiosInstance.get('/auth/profile');
            set({profile: res.data});
        } catch (error) {
            console.log("Error in getProfile:", error.response?.data || error.message);
            set({ profile: null });
        } finally{
            set({ isFetchingProfile: false });
        }
    },

    updateProfile: async(data, role) => {
        set({isUpdatingProfile: true});
        try {
            const url = role === "PATIENT" ? "/patient/profile" : "/doctor/profile";
            const res = await axiosInstance.put(url, data);
            set({profile: res.data});
        } catch (error) {
            console.log("Error in updateProfile:", error);
        } finally{
            set({isUpdatingProfile: false});
        }
    }
 }))