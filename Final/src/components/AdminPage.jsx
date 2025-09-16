import React, { useEffect, useState } from 'react';

const AdminPage = ({ generations, history }) => {
  // generations: number, starts at 0, increments as user generates images
  // history: array of { prompt, imageUrl, timestamp } for each generated image

  // Calculate success rate (all successful for demo, can be dynamic if you track errors)
  const [successRate, setSuccessRate] = useState(100);

  useEffect(() => {
    // Assume all generations are successful for demo
    setSuccessRate(100);
  }, [generations]);

  // Helper for "time ago"
  const timeAgo = (date) => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now - then) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return then.toLocaleString();
  };

  // Find most frequent prompt for stats card
  const mostFrequentPrompt = (() => {
    if (!history?.length) return "N/A";
    const counts = {};
    history.forEach(({ prompt }) => {
      counts[prompt] = (counts[prompt] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  })();

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">User Mode Dashboard</h2>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-300">Total Generations</h3>
            <p className="text-3xl font-bold text-blue-400">{generations}</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-300">Most Frequent Prompt</h3>
            <p className="text-lg font-bold text-yellow-400 break-words">
              {mostFrequentPrompt}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-300">Success Rate</h3>
            <p className="text-3xl font-bold text-green-400">{successRate}%</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-700/30 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {history?.length > 0 ? (
              history.slice(0).reverse().map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                      <img
                        src={item.imageUrl}
                        alt="Generated"
                        className="w-16 h-16 rounded-lg object-cover border border-gray-600 mb-2 md:mb-0"
                        style={{ background: "#23272f" }}
                      />
                    </div>
                    <div>
                      <div className="text-gray-200 text-sm">
                        <span className="font-semibold">Prompt: </span>{item.prompt}
                      </div>
                      <div className="text-xs text-gray-400 italic">
                        {timeAgo(item.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = item.imageUrl;
                        link.download = 'generated-image.png';
                        link.click();
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white text-sm"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 italic">No recent activity.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;