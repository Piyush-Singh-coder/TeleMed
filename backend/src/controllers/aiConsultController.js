import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // store key in .env
  baseURL: "https://generativelanguage.googleapis.com/v1beta/"
});

export const aiConsult = async (req, res) => {
  try {
    const { symptoms } = req.body;

    // Check if symptoms provided
    if (!symptoms || symptoms.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Sorry, I can only provide consultation if you provide symptoms."
      });
    }

    // Call Gemini
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content:
            "You are an AI medical assistant. Always provide safe, general advice. Never give prescriptions. If the input is not symptoms, politely refuse."
        },
        {
          role: "user",
          content: `Patient symptoms: ${symptoms}`
        }
      ]
    });

    const reply = response.choices?.[0]?.message?.content || "No response";

    return res.status(200).json({
      success: true,
      reply
    });
  } catch (error) {
    console.error("AI consult error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
