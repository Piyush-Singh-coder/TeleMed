import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await axiosInstance.get("/admin/doctors");
    setDoctors(res.data);
  };

  const toggleApproval = async (id, currentStatus) => {
    await axiosInstance.put(`/admin/doctors/${id}/approval`, { isApproved: !currentStatus });
    fetchDoctors();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Doctors</h1>
      <div className="grid gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="card bg-base-100 shadow p-4 flex justify-between">
            <div>
              <h3 className=" mb-2 text-lg font-semibold">{doc.user?.name}</h3>
              <p className="mb-2">{doc.specialization}</p>
              <p className="mb-2">
                Status:{" "}
                {doc.isApproved ? (
                  <span className="text-green-600">Approved ✅</span>
                ) : (
                  <span className="text-red-600">Pending ❌</span>
                )}
              </p>
            </div>
            <div>

            <button
              className={`btn ${doc.isApproved ? "btn-error" : "btn-success"}`}
              onClick={() => toggleApproval(doc._id, doc.isApproved)}
              >
              {doc.isApproved ? "Revoke" : "Approve"}
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
