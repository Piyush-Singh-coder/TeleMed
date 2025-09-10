export const formatAiReply = (text) => {
  if (!text) return [];

  return text
    .split(/\n+/) // split by line breaks
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, idx) => {
      // Remove Markdown bullets and extra asterisks
      const cleaned = line
        .replace(/^\*+\s*/, "") // remove leading * bullets
        .replace(/^\d+\.?\s*/, "") // remove leading numbers
        .replace(/\*\*/g, ""); // remove bold markers **

      return { id: idx, text: cleaned };
    });
};
