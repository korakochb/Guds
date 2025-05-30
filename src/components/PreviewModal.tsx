// src/components/PreviewModal.tsx

import React from "react";

interface Props {
  show: boolean;
  image: string | null;
  onClose: () => void;
  onDownload: () => void;
}

export default function PreviewModal({ show, image, onClose, onDownload }: Props) {
  if (!show || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded shadow-lg text-center w-[90%] max-w-md">
        <h3 className="text-xl font-semibold mb-4">YOUR GÚD</h3>
        <div className="w-full max-h-[80vh] flex items-center justify-center overflow-hidden mx-auto mb-4 border bg-white">
          <img
            src={image}
            alt="Stack Preview"
            className="max-w-full h-auto object-contain"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={onDownload} className="bg-blue-600 text-white px-4 py-2 rounded">
            Download Image
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
