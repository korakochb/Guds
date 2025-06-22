// src/components/CharacterCard.tsx

import React, { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { getArmPosition } from "../lib/getArmPosition";
import { useGlobalMousePosition } from "../lib/useGlobalMousePosition";

interface Props {
  part: {
    id: string;
    name: string;
    basePath: string;
    colors: string[];
    hasFace: boolean;
    hasArms: boolean;
    hasMouth: boolean;
  };
  stackRef: React.RefObject<HTMLDivElement | null>;
  onAddPart: (partId: string, imgSrc: string) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const CharacterCard: React.FC<Props> = ({ part, stackRef, onAddPart, hoveredId, setHoveredId }) => {
  const [selectedColor, setSelectedColor] = useState(
    () => part.colors[Math.floor(Math.random() * part.colors.length)]
  );
  const [isHover, setIsHover] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [dragBack, setDragBack] = useState(false);
  const [rotationState, setRotationState] = useState({ left: 0, right: 0 });
  const [clickEligible, setClickEligible] = useState(true);

  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const { x, y } = useGlobalMousePosition();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const dragControls = useDragControls();

  const isActive = hoveredId === null || hoveredId === part.id;

  useEffect(() => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !isActive) return;
    const newPos = {
      x: x - (rect.left + rect.width / 2),
      y: y - (rect.top + rect.height / 2),
    };
    setMousePos(newPos);

    const clampedX = Math.max(-60, Math.min(60, newPos.x));
    setRotationState({
      left: clampedX * 0.5,
      right: -clampedX * 0.5,
    });
  }, [x, y, isActive]);

  useEffect(() => {
    let timeout: any;
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      timeout = setTimeout(blink, Math.random() * 2000 + 2000);
    };
    blink();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      drag
      dragControls={dragControls}
      dragListener={false}
      onPointerDown={(e) => {
        setDragBack(false);
        setClickEligible(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        dragTimeout.current = setTimeout(() => setClickEligible(false), 150);
        dragControls.start(e);
      }}
      onPointerEnter={() => {
        setIsHover(true);
        setHoveredId(part.id);
      }}
      onPointerLeave={() => {
        setIsHover(false);
        setHoveredId(null);
      }}
      animate={dragBack ? { x: 0, y: 0 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ userSelect: "none", touchAction: "none" }}
      onDragEnd={(e: any) => {
        if (!(e instanceof MouseEvent)) return;
        if (!stackRef.current) return;

        const rect = stackRef.current.getBoundingClientRect();
        const inArea =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (inArea) {
          onAddPart(part.id, `${part.basePath}${selectedColor}.png`);
        }

        setDragBack(true);
        setClickEligible(false);
        if (dragTimeout.current) clearTimeout(dragTimeout.current);
      }}
      className="flex flex-col items-center cursor-grab relative z-10"
    >
      <div 
        className="relative w-28 h-28"
        onClick={() => {
          if (clickEligible) {
            onAddPart(part.id, `${part.basePath}${selectedColor}.png`);
          }
        }}
      >
        <img src={`${part.basePath}${selectedColor}.png`} alt={part.name} className="w-full h-full object-contain pointer-events-none" />

        {part.hasFace && (
          <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[52px] h-[28px] flex justify-between items-center pointer-events-none">
            <div className="relative w-[24px] h-[28px]">
              <img src="/decorations/eye-white.svg" className="absolute w-full h-full" />
              <img
                src={isBlinking ? "/decorations/eye-closed.svg" : "/decorations/eye-black.svg"}
                className="absolute w-[11px] h-[11px] left-[12px] top-[9px]"
                style={{
                  transform: `translate(${Math.max(-4, Math.min(4, mousePos.x * 0.05))}px, ${Math.max(-4, Math.min(4, mousePos.y * 0.05))}px)`,
                }}
              />
            </div>
            <div className="relative w-[24px] h-[28px]">
              <img src="/decorations/eye-white.svg" className="absolute w-full h-full" />
              <img
                src={isBlinking ? "/decorations/eye-closed.svg" : "/decorations/eye-black.svg"}
                className="absolute w-[11px] h-[11px] left-[2px] top-[9px]"
                style={{
                  transform: `translate(${Math.max(-4, Math.min(4, mousePos.x * 0.05))}px, ${Math.max(-4, Math.min(4, mousePos.y * 0.05))}px)`,
                }}
              />
            </div>
          </div>
        )}

        {part.hasMouth && (
          <img
            src="/decorations/mouth.svg"
            alt="mouth"
            className={`absolute top-[42%] left-1/2 w-[60px] h-auto transition-transform duration-200 pointer-events-none ${isHover ? "scale-110" : ""}`}
            style={{ transform: "translateX(-50%)" }}
          />
        )}

        {part.hasArms && (
          <>
            <img
              src="/decorations/arms.svg"
              alt="arm-left"
              className="absolute pointer-events-none hidden md:block"
              style={{
                ...getArmPosition(part.id, "left"),
                transformOrigin: "bottom left",
                transform: `rotate(${rotationState.left}deg)`,
                transition: "transform 0.2s ease-out",
              }}
            />
            <img
              src="/decorations/arms.svg"
              alt="arm-right"
              className="absolute pointer-events-none hidden md:block"
              style={{
                ...getArmPosition(part.id, "right"),
                transformOrigin: "bottom right",
                transform: `scaleX(-1) rotate(${rotationState.right}deg)`,
                transition: "transform 0.2s ease-out",
              }}
            />
          </>
        )}
      </div>
      <p 
        className="mt-2 text-sm font-avenir-reg"
        onClick={(e) => e.stopPropagation()}
      >
        {part.name}
      </p>
      <div className="flex space-x-2 mt-2">
        {part.colors.map((color) => (
          <div
            key={color}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColor(color);
            }}
            className={`w-4 h-4 rounded-full cursor-pointer transition-transform duration-200 ${
              selectedColor === color ? "scale-125" : "hover:scale-110"
            }`}
            style={{ backgroundColor: `#${color}` }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CharacterCard;
