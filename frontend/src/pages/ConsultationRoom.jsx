// src/pages/ConsultationRoom.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useMeetingStore } from "../store/useMeetingStore";
import { loadJitsiScript } from "../lib/loadJitsi";
import { Loader2, ArrowLeft } from "lucide-react";

const ConsultationRoom = () => {
  const { roomName } = useParams(); // ✅ shared doctor room
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { generateToken, token, isGenerating, error, clearToken } =
    useMeetingStore();

  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const start = async () => {
      if (!containerRef.current) {
        setTimeout(start, 100);
        return;
      }

      try {
        // 1. Generate JWT from backend
        await generateToken(roomName);

        // wait until token is in store
        if (!token) return;

        const domain = import.meta.env.VITE_JITSI_DOMAIN || "8x8.vc";
        const JitsiExternalAPI = await loadJitsiScript(domain);
        console.log("Using room:", roomName);
        console.log("Token from store:", token);
        if (!mounted || !containerRef.current) return;

        // 2. Create Jitsi meeting inside container
        const api = new JitsiExternalAPI(domain, {
          roomName,
          jwt: token,
          parentNode: containerRef.current,
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "hangup",
              "chat",
              "desktop",
              "tileview",
              "filmstrip",
            ],
          },
          userInfo: {
            displayName: authUser?.name || "Guest",
            email: authUser?.email || "",
          },
        });

        apiRef.current = api;
        setLoading(false); // ✅ stop spinner when Jitsi is ready
      } catch (err) {
        console.error("❌ Error starting meeting:", err);
      }
    };

    start();

    return () => {
      mounted = false;
      if (apiRef.current) apiRef.current.dispose();
      clearToken();
    };
  }, [roomName, authUser, token, generateToken, clearToken]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 bg-base-200 flex items-center gap-4">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h2 className="text-lg font-semibold">Consultation Room</h2>
        <div className="ml-auto text-sm text-base-content/70">
          Room: {roomName}
        </div>
      </div>

      {/* Meeting container */}
      <div className="flex-1 bg-black/5 p-4">
        {loading || isGenerating ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="animate-spin size-8 text-primary" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[60vh] text-red-500">
            {error}
          </div>
        ) : (
          <div
            ref={containerRef}
            style={{ height: "80vh", borderRadius: 12, overflow: "hidden" }}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationRoom;
