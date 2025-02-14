import React, { useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import MockDetailsWindow from './MockDetailsWindow';

interface MockFileManagerProps {
  onClose: () => void;
}

const MockFileManager: React.FC<MockFileManagerProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleIconClick = (projectName: string) => {
    setSelectedProject(projectName);
  };

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[900px] h-[80vh] md:h-[500px] bg-gray-900/95 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl window-transition">
        {/* Window Header */}
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 relative">
              <button
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors relative"
                onClick={onClose}
                onMouseEnter={(e) => {
                  const tooltip = document.createElement('div');
                  tooltip.innerText = 'Close';
                  tooltip.className = 'absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded';
                  e.currentTarget.appendChild(tooltip);
                }}
                onMouseLeave={(e) => {
                  const tooltip = e.currentTarget.querySelector('div');
                  if (tooltip) e.currentTarget.removeChild(tooltip);
                }}
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-gray-400 ml-2">ZaneCoder Internship</span>
          </div>
        </div>
        {/* File Manager Content */}
        <div className="flex-1 p-4 bg-gray-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleIconClick('Project 1')}
            >
              <FaFolder size={48} className="text-yellow-500" />
              <span className="text-sm text-white mt-2">Project 1</span>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleIconClick('Project 2')}
            >
              <FaFolder size={48} className="text-yellow-500" />
              <span className="text-sm text-white mt-2">Project 2</span>
            </div>
            {/* Add more folders as needed */}
          </div>
        </div>
      </div>
      {selectedProject && (
        <MockDetailsWindow
          projectName={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default MockFileManager; 