import React from 'react';

interface MockDetailsWindowProps {
  projectName: string;
  onClose: () => void;
}

const MockDetailsWindow: React.FC<MockDetailsWindowProps> = ({ projectName, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[600px] h-[60vh] md:h-[400px] bg-gray-900/95 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl window-transition">
      {/* Window Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-gray-400 ml-2">{projectName} Details</span>
        </div>
      </div>
      {/* Details Content */}
      <div className="flex-1 p-6 bg-gray-800/50">
        <h3 className="text-xl font-semibold text-white mb-4">{projectName} Details</h3>
        <p className="text-gray-300 mb-6">Explore the comprehensive details about {projectName} below.</p>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h4 className="text-lg font-medium text-white">Overview</h4>
            <p className="text-sm text-gray-300">A brief overview of the project, its goals, and outcomes.</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h4 className="text-lg font-medium text-white">Technologies Used</h4>
            <p className="text-sm text-gray-300">List of technologies and tools used in the project.</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h4 className="text-lg font-medium text-white">Challenges</h4>
            <p className="text-sm text-gray-300">Key challenges faced during the project and how they were overcome.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockDetailsWindow; 