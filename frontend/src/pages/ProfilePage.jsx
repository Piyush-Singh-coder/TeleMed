import { useEffect, useState } from "react";
import DoctorProfile from "../components/DoctorProfile";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, Pencil, User, Loader2 } from "lucide-react";
import PatientProfile from "../components/PatientProfile";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const {
    authUser,
    updateProfile,
    profile,
    getProfile,
    isFetchingProfile,
    isUpdatingProfile,
  } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) getProfile();
  }, [authUser, getProfile]);

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData, authUser.role);
    setIsEditing(false);
    navigate("/profile");
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.name}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          {isFetchingProfile ? (
            <p>Loading profile...</p>
          ) : !profile ? (
            <p>No profile found.</p>
          ) : authUser.role === "PATIENT" ? (
            <PatientProfile />
          ) : authUser.role === "DOCTOR" ? (
            <DoctorProfile />
          ) : (
            <p>Admins do not have profiles.</p>
          )}

          <button
            className="btn btn-sm btn-outline"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="size-4" /> Edit
          </button>

          {/* Edit Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-base-100 rounded-xl p-6 w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {authUser.role === "PATIENT" ? (
                    <>
                      <label className="form-control flex">
                        <span className="label-text mr-2">Gender</span>
                        <select
                          value={formData.gender || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="select select-bordered"
                        >
                          <option value="">Select</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </label>

                      <label className="form-control flex">
                        <span className="label-text mr-2">Blood Group</span>
                        <select
                          value={formData.bloodGroup || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bloodGroup: e.target.value,
                            })
                          }
                          className="select select-bordered"
                        >
                          <option value="">Select</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </label>

                      <label className="form-control flex">
                        <span className="label-text mr-2">Date of Birth</span>
                        <input
                          type="date"
                          value={formData.dateOfBirth || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dateOfBirth: e.target.value,
                            })
                          }
                          className="input input-bordered mb-2"
                        />
                      </label>

                      <label className="form-control flex">
                        <span className="label-text mr-2">Contact</span>
                        <input
                          type="text"
                          value={formData.contact || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact: e.target.value,
                            })
                          }
                          className="input input-bordered mb-2"
                        />
                      </label>

                      <label className="form-control flex">
                        <span className="label-text mr-2">Past Illnesses</span>
                        <input
                          type="text"
                          value={
                            formData.medicalHistory?.pastIllnesses?.join(
                              ", "
                            ) || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medicalHistory: {
                                ...formData.medicalHistory,
                                pastIllnesses: e.target.value
                                  .split(",")
                                  .map((s) => s.trim()),
                              },
                            })
                          }
                          className="input input-bordered mb-2"
                          placeholder="e.g. Diabetes, Hypertension"
                        />
                      </label>

                      <label className="form-control flex">
                        <span className="label-text mr-2">Surgeries</span>
                        <input
                          type="text"
                          value={
                            formData.medicalHistory?.surgeries?.join(", ") || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medicalHistory: {
                                ...formData.medicalHistory,
                                surgeries: e.target.value
                                  .split(",")
                                  .map((s) => s.trim()),
                              },
                            })
                          }
                          className="input input-bordered mb-2"
                          placeholder="e.g. Appendectomy"
                        />
                      </label>

                      <label className="form-control flex">
                        <span className="label-text mr-2">Family History</span>
                        <input
                          type="text"
                          value={
                            formData.medicalHistory?.familyHistory?.join(
                              ", "
                            ) || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medicalHistory: {
                                ...formData.medicalHistory,
                                familyHistory: e.target.value
                                  .split(",")
                                  .map((s) => s.trim()),
                              },
                            })
                          }
                          className="input input-bordered mb-2"
                          placeholder="e.g. Heart Disease"
                        />
                      </label>

                      <label className="form-control flex">
                        <span className="label-text mr-2">Allergies</span>
                        <input
                          type="text"
                          value={
                            formData.medicalHistory?.allergies?.join(", ") || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medicalHistory: {
                                ...formData.medicalHistory,
                                allergies: e.target.value
                                  .split(",")
                                  .map((s) => s.trim()),
                              },
                            })
                          }
                          className="input input-bordered mb-2"
                          placeholder="e.g. Penicillin"
                        />
                      </label>

                      <label className="form-control ">
                        <span className="label-text mr-2">
                          Current Medication
                        </span>
                        <input
                          type="text"
                          value={
                            formData.medicalHistory?.currentMedication?.join(
                              ", "
                            ) || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medicalHistory: {
                                ...formData.medicalHistory,
                                currentMedication: e.target.value
                                  .split(",")
                                  .map((s) => s.trim()),
                              },
                            })
                          }
                          className="input input-bordered mb-2"
                          placeholder="e.g. Metformin"
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <label className="form-control">
                        <span className="label-text mr-2">Specialization:</span>
                        <input
                          type="text"
                          value={formData.specialization || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specialization: e.target.value,
                            })
                          }
                          className="input input-bordered mb-2"
                        />
                      </label>
                      <label className="form-control ">
                        <span className="label-text mr-2">
                          Experience (years):
                        </span>
                        <input
                          type="number"
                          value={formData.yearsOfExperience || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              yearsOfExperience: e.target.value,
                            })
                          }
                          className="input input-bordered mb-2"
                        />
                      </label>
                      <label className="form-control">
                        <span className="label-text mr-2">
                          Consultation Fee:
                        </span>
                        <input
                          type="number"
                          value={formData.consultationFee || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consultationFee: e.target.value,
                            })
                          }
                          className="input input-bordered"
                        />
                      </label>
                    </>
                  )}

                  <div className="flex mt-2 justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isUpdatingProfile}
                    >
                      {isUpdatingProfile && (
                        <Loader2 className="size-4 animate-spin mr-1" />
                      )}
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Role</span>
                <span className="text-green-500">{authUser.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
