// src/components/StackDisplay.tsx

import React, { forwardRef, useState } from "react";
import { parts } from '../config/parts';
import LightHintOverlay from "./LightHintOverlay";

export type StackItem = {
  id: string;
  uid: string;
  img: string;
};

interface Props {
  stack: StackItem[];
  onRemoveAbove: (index: number, id: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  onPreview: () => void;
  userName?: string;
  showNameWording?: boolean;
}

const StackDisplay = forwardRef<HTMLDivElement, Props>(
  ({ stack, onRemoveAbove, isDarkMode, setIsDarkMode, onPreview, userName, showNameWording }, ref) => {
    const baseGlowStyle = {
      filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(220, 220, 220, 0.5))' : 'none',
      transition: 'filter 0.3s ease-in-out',
      verticalAlign: 'bottom'
    };

    // Overlay state: always show on every page load
    const [showHint, setShowHint] = useState(true);
    const handleCloseHint = () => setShowHint(false);

    return (
      <div
        className="h-full w-full flex flex-col items-center justify-center relative transition-colors duration-300"
        style={{
          background: "transparent",
        }}
      >
        {showHint && <LightHintOverlay onClose={handleCloseHint} />}
        <div className="fixed left-4 bottom-4 z-50 flex flex-col items-start">
          {/* <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start"> */}
          <button
            onClick={() => {
              setIsDarkMode(false);
              handleCloseHint();
            }}
            className={`w-12 flex items-center justify-center font-avenir-reg text-lg text-white ${!isDarkMode ? 'h-8 bg-[#333]' : 'h-14 bg-[#666]'} rounded-t transition-all duration-300`}
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            aria-label="Light mode"
          >
            i
          </button>
          <button
            onClick={() => {
              setIsDarkMode(true);
              handleCloseHint();
            }}
            className={`w-12 flex items-center justify-center font-avenir-reg text-lg text-white ${isDarkMode ? 'h-8 bg-[#333]' : 'h-14 bg-[#666]'} rounded-b transition-all duration-300`}
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            aria-label="Dark mode"
          >
            o
          </button>
        </div>

        <div
          ref={ref}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            // This logic is no longer fully supported with color selection,
            // but we'll leave the drop target for now.
            e.preventDefault();
          }}
          className="flex-grow flex flex-col items-center justify-end w-full pb-8 relative"
        >
          {showNameWording && (
            <div className="absolute top-0 left-0 w-full flex flex-col items-start justify-center pointer-events-none select-none z-0">
              {userName ? (
                <>
                  <span className={`mt-4 text-[2rem] md:text-[3rem] font-avenir-reg opacity-70 text-center w-full ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {userName}
                  </span>
                  <span className={`text-base md:text-lg font-avenir-reg opacity-70 text-center w-full ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    is ready to be your GÚD friend!
                  </span>
                </>
              ) : (
                <span className={`mt-4 text-[2rem] md:text-[3rem] font-avenir-reg opacity-70 text-center w-full ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Enter your name...
                </span>
              )}
            </div>
          )}
          <div
            id="stack-capture"
            className="inline-flex flex-col-reverse items-center pt-24 md:pt-16 z-10"
            style={{ lineHeight: 1 }}
          >
            {[...stack].reverse().map((item, index) => {
              const originalIndex = stack.length - 1 - index;
              const data = parts.find((p) => p.id === item.id);

              // Extract color from image filename (e.g., "Luna_353432.png" -> "353432")
              const colorMatch = item.img.match(/_([^.]+)\.png$/);
              const selectedColor = colorMatch ? colorMatch[1] : null;

              const dynamicGlowStyle = {
                filter: isDarkMode && selectedColor ? `drop-shadow(0 0 10px #${selectedColor}80)` : 'none',
                transition: 'filter 0.3s ease-in-out',
                verticalAlign: 'bottom'
              };

              return (
                <img
                  key={item.uid}
                  src={item.img}
                  alt={item.id}
                  className={`object-contain ${item.id === 'base' ? '' : 'cursor-pointer hover:scale-105'}`}
                  style={item.id === 'base' ? baseGlowStyle : dynamicGlowStyle}
                  onClick={item.id === 'base' ? undefined : () => onRemoveAbove(originalIndex, item.id)}
                />
              );
            })}
          </div>
        </div>

        <button
          className="bg-black text-white font-avenir-reg text-lg px-8 py-3 rounded-full hover:bg-gray-800 transition-colors mb-6"
          onClick={onPreview}
        >
          Preview & Share
        </button>
      </div>
    );
  }
);

export default StackDisplay;
