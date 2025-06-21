import { useRef, useState } from "react";
import React from "react";
import domtoimage from 'dom-to-image-more';
import { parts } from "../data/parts";
import StackDisplay from "../components/StackDisplay";
import CharacterCard from "../components/CharacterCard";
import { STACK_OFFSET, BASE_OFFSET, MAX_STACK_ITEMS } from "../constants/layout";
import PreviewModal from "../components/PreviewModal";

export default function Home() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [stack, setStack] = useState([{ id: "base", uid: "base" }]);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAddPart = (partId) => {
    if (stack.length >= MAX_STACK_ITEMS) return; // ✅ จำกัดสูงสุด 7 ชิ้นรวมฐาน
    const uid = `${partId}-${Date.now()}`;
    setStack((prev) => [{ id: partId, uid }, ...prev]);
  };

  const handleRemoveAbove = (index, id) => {
    if (id === "base") return;
    setStack((prev) => prev.slice(index + 1));
  };

  const handlePreview = async () => {
    const elementToCapture = stackRef.current;
    if (!elementToCapture) {
      console.error("Preview target element not found.");
      return;
    }

    // Use a more aggressive, global stylesheet to remove any potential outlines or borders
    // during capture. This is the most forceful way to address the white-border issue.
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        outline: none !important;
        border: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add a small delay to ensure the browser applies the new global style
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const dataUrl = await domtoimage.toPng(elementToCapture, {
        quality: 1.0,
        cacheBust: true,
      });

      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error("dom-to-image-more returned a blank image.");
      }

      setCapturedImg(dataUrl);
      setShowModal(true);
    } catch (error) {
      console.error('Error capturing preview with dom-to-image:', error);
      alert(`An error occurred while creating the preview. Please check the console for details.`);
    } finally {
      document.head.removeChild(style);
    }
  };

  const handleDownload = () => {
    if (!capturedImg) return;
    const a = document.createElement("a");
    a.href = capturedImg;
    a.download = "my-gud-stack.png";
    a.click();
  };

  const handleShare = async () => {
    if (!capturedImg) return;
  
    try {
      // Convert data URL to blob
      const response = await fetch(capturedImg);
      const blob = await response.blob();
  
      // Create a file from the blob
      const file = new File([blob], 'my-gud-stack.png', { type: blob.type });
  
      // Check if the Web Share API can share this file
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My GÚD Stack',
          text: 'Check out the GÚD friend I created!',
        });
        console.log('Shared successfully');
      } else {
        alert('Sharing is not supported on this browser, or it cannot share these files.');
      }
    } catch (error) {
      // Handle cases where the user cancels the share sheet
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        alert(`An error occurred while sharing: ${error.message}`);
      }
    }
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-0 items-start min-h-screen"
      style={{ background: "#b0a79e" }}
    >
      {/* ฝั่งซ้าย */}
      <div className="relative h-screen">
        <div className="absolute left-4 bottom-4 z-10 flex flex-col">
          <button
            onClick={() => setIsDarkMode(false)}
            className={`w-10 h-8 flex items-center justify-center font-bold text-white ${!isDarkMode ? 'bg-[#444]' : 'bg-[#666]'} rounded-t`}
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            aria-label="Light mode"
          >
            i
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`w-10 h-8 flex items-center justify-center font-bold text-white ${isDarkMode ? 'bg-[#444]' : 'bg-[#666]'} rounded-b`}
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            aria-label="Dark mode"
          >
            o
          </button>
        </div>
        <StackDisplay
          ref={stackRef}
          stack={stack}
          parts={parts}
          onRemoveAbove={handleRemoveAbove}
          onAddPart={handleAddPart}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* ฝั่งขวา */}
      <div className="h-screen flex flex-col justify-start items-center pt-12 px-4">
        <h2 className="text-xl font-bold mb-12 tracking-wide text-center">
          CHOOSE YOUR GÚD FRIEND SHAPE
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-y-12 gap-x-8">
          {parts.map((part) => (
            <CharacterCard
              key={part.id}
              part={part}
              stackRef={stackRef}
              onAddPart={handleAddPart}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>
        <br></br>
        <button
          className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={handlePreview}
        >
          Preview & Share
        </button>
      </div>

      <PreviewModal
        show={showModal}
        image={capturedImg}
        onClose={() => setShowModal(false)}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    </div>
  );
}
