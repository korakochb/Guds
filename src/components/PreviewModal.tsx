// src/components/PreviewModal.tsx

import React from "react";
import { FiRefreshCw } from "react-icons/fi";

interface Props {
  show: boolean;
  image: string | null;
  onClose: () => void;
  onShare: () => Promise<void>;
  userName: string;
  setUserName: (name: string) => void;
  previewContent?: React.ReactNode;
  shareDisabled?: boolean;
  confirmButton?: React.ReactNode;
  saveButton?: React.ReactNode;
  backButton?: React.ReactNode;
  showOverlay?: boolean;
  onRefresh?: () => void;
}

const PreviewModal: React.FC<Props> = ({ show, image, onClose, onShare, userName, setUserName, previewContent, shareDisabled, confirmButton, saveButton, backButton, showOverlay, onRefresh }) => {
  if (!show) return null;
  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-2xl overflow-hidden">
    //   <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-[95vw] sm:max-w-2xl w-auto max-h-screen overflow-y-auto flex flex-col items-center">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-2xl overflow-x-hidden h-[100dvh]">
      <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-[95vw] sm:max-w-2xl w-auto h-[100dvh] max-h-[100dvh] overflow-y-auto overflow-x-hidden flex flex-col items-center relative${showOverlay ? ' overflow-hidden' : ''}`}>
        {!image && (
          <>
            <h2 className="text-2xl font-avenir-demi mb-4 text-center">YOUR GÚD</h2>
            <input
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded text-center text-lg font-avenir-reg"
              placeholder="Enter your name..."
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </>
        )}
        {/* Preview Area */}
        <div className="w-full flex justify-center items-center mb-6" style={{ background: '#f7f7f7', borderRadius: 8, maxWidth: '100%', position: 'relative' }}>
          {image && onRefresh && (
            <button
              className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
              onClick={onRefresh}
              title="Refresh"
              style={{ zIndex: 10 }}
            >
              <FiRefreshCw size={24} />
            </button>
          )}
          {previewContent ? previewContent : image ? (
            <img src={image} alt="Preview" className="max-w-full h-auto rounded" />
          ) : null}
        </div>
        {confirmButton}
        {image && (
          <button
            className="w-full bg-[#d9d1c8] text-black font-avenir-reg text-lg px-8 py-3 rounded-full hover:bg-gray-200 transition-colors mb-3"
            onClick={onShare}
            disabled={shareDisabled}
          >
            Share
          </button>
        )}
        {saveButton}
        {backButton}
        <button
          className="w-full bg-gray-100 text-gray-700 font-avenir-reg text-lg px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
        {showOverlay && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-500/80 backdrop-blur-2xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white border-opacity-80 mb-4"></div>
              <span className="text-white text-2xl font-bold">LOADING</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
