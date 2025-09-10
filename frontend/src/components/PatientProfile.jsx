import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const PatientProfile = () => {
  const { profile } = useAuthStore();
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <div className="text-sm text-zinc-400 flex items-center gap-2">
          <User className="w-4 h-4" />
          Gender
        </div>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
          {profile?.gender}
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="text-sm text-zinc-400 flex items-center gap-2">
          <User className="w-4 h-4" />
          Blood Group
        </div>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
          {profile?.bloodGroup}
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="text-sm text-zinc-400 flex items-center gap-2">
          <User className="w-4 h-4" />
          Date Of birth
        </div>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
          {profile?.dateOfBirth?.split("T")[0]}
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="text-sm text-zinc-400 flex items-center gap-2">
          <User className="w-4 h-4" />
          Contact
        </div>
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
          {profile?.contact}
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="text-sm text-zinc-400 flex items-center gap-2">
          <User className="w-4 h-4" />
          Medical History
        </div>

        <div className="px-4 py-2.5 bg-base-200 rounded-lg border space-y-2 text-sm text-zinc-400">
          <div>
            <strong>Past Illnesses:</strong>{" "}
            {profile?.medicalHistory?.pastIllnesses?.length
              ? profile?.medicalHistory.pastIllnesses.join(", ")
              : "N/A"}
          </div>
          <div>
            <strong>Surgeries:</strong>{" "}
            {profile?.medicalHistory?.surgeries?.length
              ? profile?.medicalHistory.surgeries.join(", ")
              : "N/A"}
          </div>
          <div>
            <strong>Family History:</strong>{" "}
            {profile?.medicalHistory?.familyHistory?.length
              ? profile?.medicalHistory.familyHistory.join(", ")
              : "N/A"}
          </div>
          <div>
            <strong>Allergies:</strong>{" "}
            {profile?.medicalHistory?.allergies?.length
              ? profile?.medicalHistory.allergies.join(", ")
              : "N/A"}
          </div>
          <div>
            <strong>Current Medication:</strong>{" "}
            {profile?.medicalHistory?.currentMedication?.length
              ? profile?.medicalHistory.currentMedication.join(", ")
              : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientProfile;
