import { useState } from "react";
import { useAiConsultStore } from "../store/useAiConsultStore";
import { Loader2 } from "lucide-react";
import { formatAiReply } from "../lib/formatAiReply.js";

const AiConsultPage = () => {
  const [symptoms, setSymptoms] = useState("");
  const { reply, isLoading, error, consultAI, clear } = useAiConsultStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    consultAI(symptoms);
  };

  const formattedReply = formatAiReply(reply);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Consultation</h1>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms..."
          className="input input-bordered flex-1"
        />
        <button type="submit" disabled={isLoading} className="btn btn-primary">
          {isLoading ? <Loader2 className="animate-spin size-4" /> : "Consult"}
        </button>
      </form>

      {/* Errors */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* AI Response */}
      {formattedReply.length > 0 && (
        <div className="bg-base-100 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">AI Suggestions:</h2>
          <ul className="list-disc list-inside space-y-2">
            {formattedReply.map((item) => (
              <li key={item.id} className="text-base-content/80">
                {item.text}
              </li>
            ))}
          </ul>
          <button
            onClick={clear}
            className="btn btn-sm btn-outline mt-4"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default AiConsultPage;
