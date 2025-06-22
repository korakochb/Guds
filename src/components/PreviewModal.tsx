// src/components/PreviewModal.tsx

import React from "react";

interface Props {
  show: boolean;
  image: string | null;
  onClose: () => void;
  onShare: () => void;
}

export default function PreviewModal({ show, image, onClose, onShare }: Props) {
  if (!show || !image) return null;

  // Check for Web Share API support
  const canShare = typeof navigator.share === 'function';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="bg-white p-6 rounded shadow-lg text-center w-[90%] max-w-md">
          <h3 className="text-xl font-avenir-demi font-semibold mb-4">YOUR GÚD</h3>
          <div className="w-full flex items-center justify-center mx-auto mb-4 border bg-white">
            <img
              src={image}
              alt="Stack Preview"
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="w-full flex flex-col gap-3 mt-4">
            {canShare && (
              <button 
                onClick={onShare} 
                className="w-full text-black px-4 py-3 rounded-lg font-avenir-reg text-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#d9d1c8' }}
              >
                Share
              </button>
            )}
            <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mt-2 font-avenir-reg hover:bg-gray-300 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
