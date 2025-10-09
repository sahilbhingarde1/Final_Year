
import React, { useState } from "react";

// Use environment variable for backend API URL
const API_URL = process.env.REACT_APP_API_URL 

const InputSection = ({ onGenerate }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                  "Authorization": `Bearer ${process.env.HF_TOKEN}`,},
        body: JSON.stringify({ prompt: inputValue }),
      });
      if (!response.ok) throw new Error("Failed to generate image");
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      onGenerate(inputValue, imageUrl);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleGenerateClick} className="flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        className="w-full md:w-2/3 px-4 py-2 rounded-lg text-black"
        placeholder="Describe the face you want to generate..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        disabled={loading}
        required
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
};

export default InputSection;
