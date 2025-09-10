import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMedicineStore } from "../store/useMedicineStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, ArrowLeft, Pencil, Trash2 } from "lucide-react";

const MedicineDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedMedicine, fetchMedicineById, updateMedicine, deleteMedicine, isLoading } = useMedicineStore();
  const { authUser } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchMedicineById(id);
  }, [id, fetchMedicineById]);

  useEffect(() => {
    if (selectedMedicine) {
      setFormData(selectedMedicine);
    }
  }, [selectedMedicine]);

  if (isLoading || !selectedMedicine) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMedicine(id, formData);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await deleteMedicine(id);
        navigate("/medicines");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6 sm:p-12">
      <Link to="/medicines" className="btn btn-sm btn-ghost mb-4">
        <ArrowLeft className="size-4 mr-2" /> Back
      </Link>

      <div className="card card-border border-[#64d1f653] bg-base-100 shadow-lg rounded-2xl">
        <div className="card-body">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={formData.brand || ""}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Brand"
              />
              <input
                type="text"
                value={formData.composition || ""}
                onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Composition"
              />
              <input
                type="text"
                value={formData.usage || ""}
                onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Usage"
              />
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Price"
              />
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Stock"
              />
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{selectedMedicine.name}</h1>
              <p className="text-base-content/70">Brand: {selectedMedicine.brand || "N/A"}</p>
              <p className="text-base-content/70">Composition: {selectedMedicine.composition || "N/A"}</p>
              <p className="text-base-content/70">Usage: {selectedMedicine.usage || "N/A"}</p>
              <p className="text-base-content/70">Price: ₹{selectedMedicine.price}</p>
              <p className="text-base-content/70">Stock: {selectedMedicine.stock}</p>
              <p className="text-base-content/70">
                Prescription Required: {selectedMedicine.isPrescriptionRequired ? "Yes" : "No"}
              </p>
            </>
          )}

          {authUser?.role === "ADMIN" && !isEditing && (
            <div className="flex gap-4 mt-4">
              <button className="btn btn-sm btn-outline btn-primary" onClick={() => setIsEditing(true)}>
                <Pencil className="size-4 mr-1" /> Edit
              </button>
              <button className="btn btn-sm btn-outline btn-error" onClick={handleDelete}>
                <Trash2 className="size-4 mr-1" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailPage;
