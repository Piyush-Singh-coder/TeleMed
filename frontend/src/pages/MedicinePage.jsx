import React, { useEffect } from "react";
import { useMedicineStore } from "../store/useMedicineStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Pill, Loader2, Plus } from "lucide-react";

const MedicinePage = () => {
  const { medicines, fetchMedicines, isLoading } = useMedicineStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Pill className="size-6 text-primary" /> Medicines
        </h1>

        {/* Only show Add Medicine button to Admin */}
        {authUser?.role === "ADMIN" && (
          <Link
            to="/medicines/add"
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="size-5" />
            Add Medicine
          </Link>
        )}
      </div>

      {/* Medicines Grid */}
      {medicines.length === 0 ? (
        <p className="text-base-content/70">No medicines found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((medicine) => (
            <div
              key={medicine._id}
              className="card card-border border-[#64d1f653] bg-base-100 shadow-md hover:shadow-lg transition-shadow rounded-2xl"
            >
              <div className="card-body">
                <h2 className="card-title">{medicine.name}</h2>
                <p className="text-sm text-base-content/70">
                  Brand: {medicine.brand || "N/A"}
                </p>
                <p className="text-sm text-base-content/70">
                  Price: ₹{medicine.price}
                </p>
                <p className="text-sm text-base-content/70">
                  Stock: {medicine.stock}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/medicines/${medicine._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicinePage;
