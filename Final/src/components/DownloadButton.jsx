import React from "react";

const DownloadButton = ({ imageUrl }) => {
  if (!imageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-face.png';
    link.click();
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        Download Image
      </button>
    </div>

  );
};
export default DownloadButton;