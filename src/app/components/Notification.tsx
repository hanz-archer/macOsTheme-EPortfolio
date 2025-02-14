import React from 'react';

interface NotificationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const Notification: React.FC<NotificationProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M12 6.75c-2.9 0-5.25 2.35-5.25 5.25s2.35 5.25 5.25 5.25 5.25-2.35 5.25-5.25S14.9 6.75 12 6.75z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Download Resume</h2>
              <p className="text-xs text-gray-500">Do you want to download the resume?</p>
            </div>
          </div>
          <span className="text-xs text-gray-500">Now</span>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">Leave on Time Sensitive notifications for downloads?</p>
          <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification; 