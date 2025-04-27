import { useEffect, useRef, useState } from "react";
import React from "react";
import { motion, useDragControls } from "framer-motion";
import html2canvas from "html2canvas";

export default function Home() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [stack, setStack] = useState([{ id: "base", uid: "base" }]);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const parts = [
    {
      id: "luna", name: "LUNA", img: "/characters/luna.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "spike", name: "SPIKE", img: "/characters/spike.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "nox", name: "NOX", img: "/characters/nox.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "dime", name: "DIME", img: "/characters/dime.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "rocky", name: "ROCKY", img: "/characters/rocky.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "worm", name: "WORM", img: "/characters/worm.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "sunny", name: "SUNNY", img: "/characters/sunny.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "muff", name: "MUFF", img: "/characters/muff.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "bruno", name: "BRUNO", img: "/characters/bruno.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "bob", name: "BOB", img: "/characters/bob.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "willy", name: "WILLY", img: "/characters/willy.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
    {
      id: "pooh", name: "POOH", img: "/characters/pooh.png",
      hasFace: true,
      hasArms: true,
      hasMouth: true,
    },
  ];

  const handleAddPart = (partId) => {
    if (stack.length >= 7) return; // ✅ จำกัดสูงสุด 7 ชิ้นรวมฐาน
    const uid = `${partId}-${Date.now()}`;
    setStack((prev) => [{ id: partId, uid }, ...prev]);
  };

  const handleRemoveAbove = (index, id) => {
    if (id === "base") return;
    setStack((prev) => prev.slice(index + 1));
  };

  const getArmPosition = (partId: string, side: "left" | "right") => {
    const common = {
      width: "60px",
      height: "auto",
    };

    const configs = {
      luna: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      spike: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      nox: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      dime: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      rocky: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      worm: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      sunny: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      muff: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      bruno: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      bob: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      willy: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
      pooh: {
        left: { top: "-15px", left: "-30px", ...common },
        right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
      },
    };

    return configs[partId]?.[side] || {};
  };

  // const getArmRotation = (side: "left" | "right", mouseX: number, mouseY: number) => {
  //   const xFactor = side === "left" ? -1 : 1;
  //   const angle = (mouseX * 0.25 * xFactor) + (mouseY * 0.1); // ปรับแรงขึ้น
  //   return `${angle}deg`;
  // };

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
      <div
        ref={stackRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const partId = e.dataTransfer.getData("partId");
          if (partId) {
            handleAddPart(partId);
          }
        }}
        className="flex flex-col items-center justify-end h-screen max-h-screen overflow-y-auto bg-white border border-black rounded p-4 relative"
      >
        {/* base image ไว้ล่างสุด */}
        <img
          src="/decorations/base.png"
          alt="base"
          className="absolute bottom-0 w-56 h-auto pointer-events-none z-0"
        />

        {/* วาดตัวประกอบจากล่างขึ้นบน */}
        {stack
          .filter(item => item.id !== "base")
          .reverse()
          .map((item, index, arr) => {
            const reversedIndex = arr.length - 1 - index // 👈 คำนวณ index จากลำดับจริงใน stack
            const offset = 71.5 + index * 120; // 72 คือ offset ชิ้นแรกที่อยู่บน base
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
                onClick={() => handleRemoveAbove(reversedIndex, item.id)}
              />
            );
          })}

      </div>


      {/* ฝั่งขวา */}
      <div className="text-center self-center" >
        <h2 className="text-xl font-bold mb-4 tracking-wide">
          CHOOSE YOUR GÚD FRIEND SHAPE
        </h2>
        <div className="grid grid-cols-4 gap-y-12 gap-x-8">
          {parts.map((part) => {
            const [isHover, setIsHover] = useState(false);
            const [isBlinking, setIsBlinking] = useState(false);
            const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
            const [dragBack, setDragBack] = useState(false);

            const dragControls = useDragControls();

            // 👁 กระพริบตา
            useEffect(() => {
              let timeout: any;
              const blink = () => {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150); // ปิดตาแค่ 150ms
                timeout = setTimeout(blink, Math.random() * 2000 + 2000); // กระพริบอีกใน 2-4 วิ
              };
              blink();
              return () => clearTimeout(timeout);
            }, []);

            return (
              <motion.div
                drag
                dragControls={dragControls}
                dragListener={false}
                onPointerDown={(e) => {
                  setDragBack(false);
                  dragControls.start(e);
                }}
                onPointerEnter={() => setIsHover(true)}
                onPointerLeave={() => {
                  setIsHover(false);
                  setMousePos({ x: 0, y: 0 });
                }}
                onPointerMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMousePos({
                    x: e.clientX - rect.left - rect.width / 2,
                    y: e.clientY - rect.top - rect.height / 2,
                  });
                }}
                animate={dragBack ? { x: 0, y: 0 } : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ userSelect: "none", touchAction: "none" }}
                onDragEnd={(e) => {
                  if (!(e instanceof MouseEvent)) return;
                  if (!stackRef.current) return;

                  const rect = stackRef.current.getBoundingClientRect();
                  const x = e.clientX;
                  const y = e.clientY;

                  const inArea =
                    x >= rect.left &&
                    x <= rect.right &&
                    y >= rect.top &&
                    y <= rect.bottom;

                  if (inArea) handleAddPart(part.id);
                  setDragBack(true); // กลับที่เดิม
                }}
                className="flex flex-col items-center cursor-grab relative z-10"
              >

                <div className="relative w-24 h-24">
                  {/* รูปหลัก */}
                  <img
                    src={part.img}
                    alt={part.name}
                    className="w-full h-full object-contain pointer-events-none"
                  />

                  {part.hasFace && (
                    <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[52px] h-[28px] flex justify-between items-center pointer-events-none">
                      {/* ตาซ้าย */}
                      <div className="relative w-[24px] h-[28px]">
                        <img src="/decorations/eye-white.svg" className="absolute w-full h-full" />
                        <img
                          src={
                            isBlinking
                              ? "/decorations/eye-closed.svg"
                              : "/decorations/eye-black.svg"
                          }
                          className="absolute w-[11px] h-[11px] left-[12px] top-[9px]"
                          style={{
                            transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                          }}
                        />
                      </div>

                      {/* ตาขวา */}
                      <div className="relative w-[24px] h-[28px]">
                        <img src="/decorations/eye-white.svg" className="absolute w-full h-full" />
                        <img
                          src={
                            isBlinking
                              ? "/decorations/eye-closed.svg"
                              : "/decorations/eye-black.svg"
                          }
                          className="absolute w-[11px] h-[11px] left-[2px] top-[9px]"
                          style={{
                            transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* ปาก 😁 */}
                  {part.hasMouth && (
                    <img
                      src="/decorations/mouth.svg"
                      alt="mouth"
                      className={`absolute top-[42%] left-1/2 w-[60px] h-auto transition-transform duration-200 pointer-events-none ${isHover ? "scale-110" : ""}`}
                      style={{ transform: "translateX(-50%)" }}
                    />
                  )}

                  {/* แขน 💪 */}
                  {part.hasArms && (
                    <>
                      {/* แขนซ้าย */}
                      <img
                        src="/decorations/arms.svg"
                        alt="arm-left"
                        className="absolute pointer-events-none"
                        style={{
                          ...getArmPosition(part.id, "left"),
                          transformOrigin: "bottom left",
                          animation: isHover ? "wave-lift-arm 0.6s ease-in-out infinite" : "none",
                        }}
                      />

                      {/* แขนขวา */}
                      <img
                        src="/decorations/arms.svg"
                        alt="arm-right"
                        className="absolute pointer-events-none"
                        style={{
                          ...getArmPosition(part.id, "right"),
                          transformOrigin: "bottom right",
                          animation: isHover ? "wave-lift-arm-flip 0.6s ease-in-out infinite" : "none",
                        }}
                      />
                    </>
                  )}
                </div>

                <p className="mt-3 text-base font-bold tracking-wider">{part.name}</p>
              </motion.div>
            );
          })}
        </div>
        <br></br>
        <button
          className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={handlePreview}
        >
          Preview & Share
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">YOUR GÚD</h3>
            {capturedImg && <img src={capturedImg} alt="Stack Preview" className="mx-auto mb-4 max-h-[500px]" />}
            <div className="flex justify-center gap-4">
              <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded">
                Download Image
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
