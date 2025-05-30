// src/components/StackDisplay.tsx

import React, { forwardRef } from "react";

export type StackItem = {
  id: string;
  uid: string;
};

interface Props {
  stack: StackItem[];
  parts: any[];
  onRemoveAbove: (index: number, id: string) => void;
  onAddPart: (partId: string) => void;
}

const StackDisplay = forwardRef<HTMLDivElement, Props>(({ stack, parts, onRemoveAbove, onAddPart }, ref) => {
  return (
    <div
      ref={ref}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const partId = e.dataTransfer.getData("partId");
        if (partId) {
          onAddPart(partId);
        }
      }}
      className="flex flex-col items-center justify-end h-screen max-h-screen overflow-y-auto bg-white border border-black rounded p-4 relative"
    >
      <div id="stack-capture" className="inline-flex flex-col items-center justify-end">
        <img
          src="/decorations/base.png"
          alt="base"
          className="absolute bottom-0 w-56 h-auto pointer-events-none z-0"
        />

        {stack
          .filter((item) => item.id !== "base")
          .reverse()
          .map((item, index, arr) => {
            const reversedIndex = arr.length - 1 - index;
            const offset = 71.5 + index * 120;
            const data = parts.find((p) => p.id === item.id);

            return (
              <img
                key={item.uid}
                src={data?.img}
                alt={item.id}
                className="object-contain cursor-pointer hover:scale-105 z-10"
                style={{
                  position: "absolute",
                  bottom: `${offset}px`,
                }}
                onClick={() => onRemoveAbove(reversedIndex, item.id)}
              />
            );
          })}
      </div>
    </div>
  );
});

export default StackDisplay;
