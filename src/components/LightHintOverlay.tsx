import React, { useEffect, useState } from "react";

export default function LightHintOverlay({ onClose }: { onClose: () => void }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    let tries = 0;
    function updatePos() {
      const btn = document.querySelector('[aria-label="Light mode"]');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setPos({
          left: rect.left + 10,
          top: rect.top - 70,
        });
      }
    }
    function findBtn() {
      const btn = document.querySelector('[aria-label="Light mode"]');
      if (btn) {
        updatePos();
        window.addEventListener("scroll", updatePos, true);
        window.addEventListener("resize", updatePos, true);
      } else if (tries < 10) {
        tries++;
        setTimeout(findBtn, 100);
      }
    }
    findBtn();
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos, true);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: pos.left,
        top: pos.top,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <img
        src="/decorations/clickHere.png"
        alt="Click here hint"
        style={{
          width: 200,
          height: "auto",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
} 