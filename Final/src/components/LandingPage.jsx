import React from 'react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="text-center space-y-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Create Stunning AI Faces
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Transform your descriptions into lifelike faces using our advanced AI technology
        </p>
        <button 
          onClick={onGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-colors duration-200 transform hover:scale-105"
        >
          Start Generating
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    icon: "🎯",
    title: "Precise Control",
    description: "Fine-tune every detail of the generated face with detailed descriptions"
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Generate high-quality images in seconds with our optimized AI model"
  },
  {
    icon: "🎨",
    title: "Creative Freedom",
    description: "Unlimited possibilities to create diverse and unique facial features"
  }
];

export default LandingPage;
