import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Video } from "lucide-react";
import { useDoctorStore } from "../store/useDoctorStore";

const DoctorsPage = () => {
  const { doctors, fetchDoctors, isLoading, error } = useDoctorStore();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  if (isLoading) return <div className="p-6 text-center">Loading doctors...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Doctors</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="bg-base-100 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold">{doctor.user?.name}</h2>
                {
                    doctor.isApproved ? (
                        <div className="badge badge-soft badge-accent">Verifed</div>
                    ) :
                    (
                        <div className="badge badge-soft badge-error">Not verified</div>
                    )
                }
            </div>
            <p className="text-sm text-base-content/70">{doctor.specialization}</p>
        
            <p className="text-sm text-base-content/70">{doctor.isApproved}</p>
            <div className="mt-3 flex justify-between items-center">
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  doctor.isAvailable ? "text-green-700" : " text-red-500"
                }`}
              >
                {doctor.isAvailable ? "Available" : "Unavailable"}
              </span>
              <Link to={`/meeting/${doctor._id}`}>
              {
                doctor.isAvailable ? (
                    <button
                  disabled={!doctor.isAvailable}
                  className={`btn btn-sm ${
                    doctor.isAvailable ? "btn-primary" : "btn-disabled"
                  }`}
                >
                  <Video className="size-4" />
                  Consult
                </button>
                ) :
                 <button></button>
              }
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
