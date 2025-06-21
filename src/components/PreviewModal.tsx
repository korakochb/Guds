// src/components/PreviewModal.tsx

import React from "react";

interface Props {
  show: boolean;
  image: string | null;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export default function PreviewModal({ show, image, onClose, onDownload, onShare }: Props) {
  if (!show || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto p-4 sm:p-6">
      <div className="bg-white p-6 rounded shadow-lg text-center w-[90%] max-w-md">
        <h3 className="text-xl font-semibold mb-4">YOUR GÚD</h3>
        <div className="w-full flex items-center justify-center mx-auto mb-4 border bg-white">
          <img
            src={image}
            alt="Stack Preview"
            className="max-w-full h-auto object-contain"
          />
        </div>
        <div className="w-full flex flex-col gap-3 mt-4">
          <button onClick={onShare} className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors">
            Share
          </button>
          <button onClick={onDownload} className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
            Download Image
          </button>
          <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mt-2 hover:bg-gray-300 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
