import { useRef, useState } from "react";
import React from "react";
import html2canvas from "html2canvas";
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
    if (!stackRef.current) return;
    const canvas = await html2canvas(stackRef.current, {
      backgroundColor: null,
      useCORS: true,
    });
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImg(dataUrl);
    setShowModal(true);
  };

  const handleDownload = () => {
    if (!capturedImg) return;
    const a = document.createElement("a");
    a.href = capturedImg;
    a.download = "my-gud-stack.png";
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* ฝั่งซ้าย */}
      <StackDisplay
        ref={stackRef}
        stack={stack}
        parts={parts}
        onRemoveAbove={handleRemoveAbove}
        onAddPart={handleAddPart}
      />

      {/* ฝั่งขวา */}
      <div className="text-center self-center" >
        <h2 className="text-xl font-bold mb-4 tracking-wide">
          CHOOSE YOUR GÚD FRIEND SHAPE
        </h2>
        <div className="grid grid-cols-4 gap-y-12 gap-x-8">
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
      />
    </div>
  );
}
