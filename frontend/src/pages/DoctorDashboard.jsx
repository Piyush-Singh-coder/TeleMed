// src/pages/DoctorDashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorStore } from "../store/useDoctorStore";
import { Loader2, User, Stethoscope, ToggleRight } from "lucide-react";

const DoctorDashboard = () => {
  const { doctorProfile, fetchDoctorProfile, toggleAvailability, isUpdating } =
    useDoctorStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorProfile();
  }, [fetchDoctorProfile]);

  if (!doctorProfile)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );

  const doctorId = doctorProfile.user?._id;
  const roomName = `consult-${doctorId}`;
  const meetingLink = `/meeting/${roomName}`;

  return (
    <div className="p-6 sm:p-12">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Stethoscope className="size-6 text-primary" /> Doctor Dashboard
      </h1>

      {/* Profile Info */}
      <div className="bg-base-100 rounded-2xl shadow-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <User className="size-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">{doctorProfile.user?.name}</h2>
            <p className="text-sm text-base-content/70">
              {doctorProfile.specialization} • {doctorProfile.yearsOfExperience}{" "}
              years
            </p>
          </div>
        </div>

        <p className="text-sm text-base-content/70">
          Consultation Fee: ₹{doctorProfile.consultationFee}
        </p>

        {/* Availability toggle */}
        <div className="flex items-center justify-between bg-base-200 p-4 rounded-xl">
          <span className="font-medium">
            Availability:{" "}
            <span
              className={
                doctorProfile.isAvailable ? "text-green-500" : "text-red-500"
              }
            >
              {doctorProfile.isAvailable ? "Available" : "Not Available"}
            </span>
          </span>

          <button
            className="btn btn-sm btn-primary flex items-center gap-2"
            onClick={() => toggleAvailability()}
            disabled={isUpdating}
          >
            {isUpdating && <Loader2 className="size-4 animate-spin" />}
            <ToggleRight className="size-4" />
            {doctorProfile.isAvailable ? "Set Unavailable" : "Set Available"}
          </button>
        </div>
      </div>

      {/* Meeting Section */}
      <div className="mt-6 bg-base-100 p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Consultation Room</h2>
        <p className="text-sm text-base-content/70 mb-4">
          Share this link with your patients:
        </p>
        <div className="flex items-center gap-2">
          <code className="bg-base-200 px-2 py-1 rounded">{meetingLink}</code>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/meeting/${doctorId}`)} // ✅ opens inside app
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;