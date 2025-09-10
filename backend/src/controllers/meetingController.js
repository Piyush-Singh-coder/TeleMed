import jwt from "jsonwebtoken";

export const generateMeetingToken = async (req, res) => {
  try {
    const { roomName } = req.body;
    if (!roomName) {
      return res.status(400).json({ message: "Room name is required" });
    }

    const appId = process.env.JITSI_APP_ID;     // vpaas-magic-cookie-...
    const privateKey = process.env.JITSI_SECRET.replace(/\\n/g, '\n'); // handle multiline
    const domain = process.env.JITSI_DOMAIN;    // 8x8.vc

    const now = Math.floor(Date.now() / 1000);

    // Jitsi JWT Payload
    const payload = {
      aud: "jitsi",          // always "jitsi"
      iss: appId,            // app id
      sub: domain,           // must match domain (8x8.vc)
      room: roomName,        // e.g. consult-<doctorId>
      exp: now + 60 * 60,    // expires in 1 hour
      nbf: now - 10,         // valid 10s before now
      context: {
        user: {
          name: req.user?.name || "Guest",   // from your auth
          email: req.user?.email || "guest@example.com",
          moderator: req.user?.role === "DOCTOR" // doctors join as moderators
        }
      }
    };

    const options = {
      algorithm: "RS256",
      header: {
        kid: appId // required by Jitsi
      }
    };

    const token = jwt.sign(payload, privateKey, options);
    console.log("Generating token for room:", roomName);
    console.log("Token:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Jitsi token:", error.message);
    res.status(500).json({ message: "Failed to generate token" });
  }
};
