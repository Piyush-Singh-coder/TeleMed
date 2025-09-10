// src/pages/AddMedicinePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMedicineStore } from "../store/useMedicineStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Pill } from "lucide-react";

const AddMedicinePage = () => {
  const navigate = useNavigate();
  const { addMedicine, isAdding } = useMedicineStore();
  const { authUser } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    composition: "",
    usage: "",
    price: "",
    stock: "",
    isPrescriptionRequired: false,
  });

  if (authUser?.role !== "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-500">
          ❌ You are not authorized to add medicines.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMedicine(formData);
    navigate("/medicines");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 sm:p-12">
      <div className="w-full max-w-lg bg-base-100 shadow-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Pill className="size-6 text-primary" /> Add Medicine
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Paracetamol"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Brand */}
          <div className="form-control">
            <label className="label">Brand</label>
            <input
              type="text"
              placeholder="Cipla"
              className="input input-bordered w-full"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
          </div>

          {/* Composition */}
          <div className="form-control">
            <label className="label">Composition</label>
            <input
              type="text"
              placeholder="Acetaminophen 500mg"
              className="input input-bordered w-full"
              value={formData.composition}
              onChange={(e) =>
                setFormData({ ...formData, composition: e.target.value })
              }
            />
          </div>

          {/* Usage */}
          <div className="form-control">
            <label className="label">Usage</label>
            <textarea
              placeholder="Used for fever and mild pain relief"
              className="textarea textarea-bordered w-full"
              value={formData.usage}
              onChange={(e) =>
                setFormData({ ...formData, usage: e.target.value })
              }
            ></textarea>
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">Price (₹)</label>
            <input
              type="number"
              placeholder="50"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>

          {/* Stock */}
          <div className="form-control">
            <label className="label">Stock</label>
            <input
              type="number"
              placeholder="100"
              className="input input-bordered w-full"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
          </div>

          {/* Prescription Required */}
          <div className="form-control flex flex-row items-center gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={formData.isPrescriptionRequired}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isPrescriptionRequired: e.target.checked,
                })
              }
            />
            <span>Prescription Required</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <Loader2 className="size-5 animate-spin" /> Adding...
              </>
            ) : (
              "Add Medicine"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicinePage;
