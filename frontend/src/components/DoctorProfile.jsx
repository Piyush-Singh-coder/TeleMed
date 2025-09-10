import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, PenSquareIcon, Trash2Icon, User } from "lucide-react";

const DoctorProfile = () => {
  const { profile} = useAuthStore();
  return (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Specialization
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{profile?.specialization}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Year of Experience
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{profile?.yearsOfExperience}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Consultation fees
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">&#8377;{profile?.consultationFee}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Slot
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {profile.slots?.length > 0 ? (
                  <ul className="list-disc list-inside text-sm">
                    {profile.slots.map((slot, idx) => (
                      <li key={idx}>
                        {slot.day}: {slot.from} - {slot.to}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No slots available</p>
                )}
                </p>
            </div>
            {/* <button className="btn btn-soft btn-info"><PenSquareIcon className='size-5'/> Edit</button> */}
          </div>
  );
};
export default DoctorProfile;