import React from "react";

const ImageDisplaySection = ({ imageUrl, prompt }) => {
  if (!imageUrl) return null;

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-6 mt-6 text-2xl font-semibold text-white">Generated Face</h2>
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center"
        style={{
          padding: "2rem",
          marginBottom: "2rem",
          maxWidth: "700px",
          width: "90vw",
        }}
      >
        <img
          src={imageUrl}
          alt="Generated face"
          style={{
            maxWidth: "500px",
            maxHeight: "60vh",
            minWidth: "300px",
            minHeight: "300px",
            width: "100%",
            objectFit: "contain",
            borderRadius: "1.5rem",
            boxShadow: "0 6px 40px 0 rgba(0,0,0,0.8)",
            background: "#181a20",
          }}
        />
        {prompt && (
          <div className="text-base text-gray-300 italic mt-6 text-center max-w-2xl">
            Prompt: {prompt}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplaySection;