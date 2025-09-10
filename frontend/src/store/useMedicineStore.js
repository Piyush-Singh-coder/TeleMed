import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useMedicineStore = create ((set, get) => ({
    medicines: [],
    selectedMedicine: null,
    isLoading: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,

    fetchMedicines: async () =>{
        set({isLoading: true});
        try {
            const res = await axiosInstance.get("/medicine");
            set({medicines: res.data})
        } catch (error) {
            console.error("Error fetching medicines:", error.response?.data || error.message);
        }finally{
            set({isLoading: false});
        }
    },

    fetchMedicineById: async (id) =>{
        set({isLoading: true});
        try {
            const res = await axiosInstance.get(`/medicine/${id}`);
            set({selectedMedicine: res.data});
        } catch (error) {
            console.error("Error fetching medicine:", error.response?.data || error.message);
        } finally{
            set({isLoading: false});
        }
    },

    addMedicine: async (data) =>{
        set({isAdding: true});
        try {
            const res = await axiosInstance.post("/medicine", data);
            set({medicines: [res.data, ...get().medicines]});
        } catch (error) {
            console.error("Error adding medicine:", error.response?.data || error.message);
        } finally{
            set({isAdding: false});
        }
    },

    updateMedicine: async (id, data) =>{
        set({isUpdating: true});
        try {
            const res = await axiosInstance.put(`/medicine/${id}`, data);
            set((state) => ({
                medicines: state. medicines.map((m) => 
                m._id === id ? res.data : m
                ),
                selectedMedicine: state.selectedMedicine?._id === id ? res.data : state.selectedMedicine,
            }));
        } catch (error) {
            console.error("Error updating medicine:", error.response?.data || error.message);
        } finally{
            set({isUpdating: false});
        }
    },

    deleteMedicine: async (id) =>{
        set({isDeleting: true});
        try {
            await axiosInstance.delete(`/medicine/${id}`);
            set((state) => ({
                medicines: state. medicines.filter((m) => 
                m._id !== id),
                selectedMedicine: state.selectedMedicine?._id === id ? null : state.selectedMedicine,
            }));
        } catch (error) {
            console.error("Error updating medicine:", error.response?.data || error.message);
        } finally{
            set({isDeleting: false});
        }
    },
}))

