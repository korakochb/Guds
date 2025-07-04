import { useRef, useState, useEffect } from "react";
import React from "react";
import domtoimage from 'dom-to-image-more';
import { parts } from "../config/parts";
import StackDisplay from "../components/StackDisplay";
import CharacterCard from "../components/CharacterCard";
import { MAX_STACK_ITEMS } from "../config/layout";
import PreviewModal from "../components/PreviewModal";
import InfinitePartStrip from "../components/InfinitePartStrip";
import PreviewStackDisplay from "../components/PreviewStackDisplay";
import { generateStackImageWithCanvas } from '../lib/canvasStack';

interface HomeProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

// ฟังก์ชัน preload images
function preloadImages(urls) {
  return Promise.all(
    urls.map(
      url =>
        new Promise(resolve => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        })
    )
  );
}

export default function Home({ isDarkMode, setIsDarkMode }: HomeProps) {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [stack, setStack] = useState([{ id: "base", uid: "base", img: "/decorations/base.png" }]);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalOverlay, setShowModalOverlay] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [showNameWording, setShowNameWording] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isShareConfirming, setIsShareConfirming] = useState(false);

  // Responsive preview size (16:9 desktop, 9:16 mobile)
  const [previewSize, setPreviewSize] = useState({ width: 1920, height: 1080 });
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setPreviewSize({ width: 1080, height: 1920 }); // mobile 9:16
      } else {
        setPreviewSize({ width: 1920, height: 1080 }); // desktop 16:9
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    const assets = [
      '/decorations/previewBackgroundDark_mobile.jpg',
      '/decorations/previewBackgroundDark_com.jpg',
      '/decorations/previewBackgroundLight_mobile.jpg',
      '/decorations/previewBackgroundLight_com.jpg',
      // preload รูปอื่นๆ ที่จำเป็น เช่น parts
      ...parts.flatMap(part => [
        `/characters/${part.id}/${part.id}_353432.png`,
        `/characters/${part.id}/${part.id}_9fd6ff.png`,
        `/characters/${part.id}/${part.id}_aa9e92.png`,
        `/characters/${part.id}/${part.id}_fee98e.png`,
        `/characters/${part.id}/${part.id}_ff953f.png`,
      ])
    ];
    preloadImages(assets).then(() => setAssetsLoaded(true));
  }, []);

  useEffect(() => {
    if (showModal) {
      setPreviewReady(false);
      setTimeout(() => setPreviewReady(true), 1000); // รอ 1 วินาทีหลัง modal เปิด
    } else {
      setPreviewReady(false);
    }
  }, [showModal]);

  useEffect(() => {
    if (showModalOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModalOverlay]);

  const handleAddPart = (partId: string, imgSrc: string) => {
    if (stack.length >= MAX_STACK_ITEMS) return;
    const uid = `${partId}-${Date.now()}`;
    setStack((prev) => [{ id: partId, uid, img: imgSrc }, ...prev]);
  };

  const handleRemoveAbove = (index: number, id: string) => {
    if (id === "base") return;
    setStack((prev) => prev.slice(index + 1));
  };

  // เปิด modal preview
  const handlePreview = () => {
    if (assetsLoaded) {
      setShowNameWording(true);
      setShowModal(true);
    } else {
      alert('Loading assets, please wait...');
    }
  };

  const handleConfirmCanvas = async () => {
    setShowModalOverlay(true);
    try {
      const dataUrl = await generateStackImageWithCanvas({
        stack,
        userName,
        isDarkMode,
        width: previewSize.width,
        height: previewSize.height,
        parts,
      });
      setGeneratedImg(dataUrl);
    } catch (error) {
      console.error("Canvas error:", error);
    } finally {
      setShowModalOverlay(false);
    }
  };

  // กด Share เพื่อ share รูปที่ generate ไว้แล้ว
  const handleShareGenerated = async () => {
    if (!generatedImg) return;
    setShowModalOverlay(true);
    try {
      if (navigator.share) {
        const response = await fetch(generatedImg);
        const blob = await response.blob();
        const file = new File([blob], 'my-gud-stack.jpg', { type: blob.type });
        await navigator.share({ files: [file], title: 'My GÚD Stack', text: 'Check out the GÚD friend I created!' });
      } else {
        alert('Sharing is not supported on this browser.');
      }
    } catch (error) {
      console.error("An error occurred while sharing:", error);
    } finally {
      setShowModalOverlay(false);
    }
  };

  // ปุ่ม Save Image
  const handleSaveImage = () => {
    if (!generatedImg) return;
    const link = document.createElement('a');
    link.href = generatedImg;
    link.download = 'my-gud-stack.jpg';
    link.click();
  };

  const handleBackToPreview = () => {
    setGeneratedImg(null); // กลับไปหน้า preview เดิม
  };

  useEffect(() => {
    if (showModal) {
      setShowNameWording(true);
    }
  }, [userName, showModal]);

  return (
    <div style={{ background: "transparent" }}>
      {/* --- Section 1: Hero Image --- */}
      <section className="flex items-center justify-center px-8 pt-8 pb-8 md:min-h-screen md:p-8">
        <div className="w-full max-w-screen-xl">
          <img
            src={isDarkMode ? "/decorations/GudsPreviewDark.png" : "/decorations/GudsPreviewLight.jpg"}
            alt="Guds Preview"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* --- Section 2: Main Interaction --- */}
      <section className="min-h-screen flex flex-col justify-center items-center p-8">
        <h2 className={`text-4xl font-avenir-demi font-semibold mb-8 tracking-wide text-center ${isDarkMode ? 'text-white' : 'text-black'}`}
          style={{ marginBottom: '2rem' }}>
          Choose your own gud friends
        </h2>
        <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-0">
          {/* --- Left Side: Stack Display --- */}
          <div className="h-full flex flex-col justify-between">
            <StackDisplay
              ref={stackRef}
              stack={stack}
              onRemoveAbove={handleRemoveAbove}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              onPreview={handlePreview}
              userName={userName}
              showNameWording={showNameWording}
            />
          </div>

          {/* --- Right Side: Character Selection --- */}
          <div className="h-full flex flex-col justify-start items-center p-8 rounded-lg" style={{ background: '#d9d1c8' }}>
            <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-16 gap-x-6 place-content-center">
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
          </div>
        </div>
      </section>

      {/* --- Section 3: Note from Guds Friends --- */}
      <section className="min-h-screen flex flex-col p-8">
        <div className="w-full max-w-screen-lg mx-auto flex-1 flex flex-col text-center px-4">
          <div className="flex-grow flex flex-col justify-center">
            <h3 className={`text-2xl font-avenir-demi tracking-widest ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-24`}>
              NOTE FROM YOUR GUDS FRIENDS
            </h3>
            <p className={`text-3xl font-avenir-reg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed max-w-3xl mx-auto`}>
              If you think about stuff that happened when you were young, it stays with you forever
            </p>
          </div>

          <div className="flex-shrink-0">
            <p className={`text-xs font-avenir-reg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} tracking-wider mb-4`}>
              instagram: gudsstudio | gudscompany@gmail.com | GUDS Bangkok +66 83133 3839
            </p>
            <InfinitePartStrip parts={parts} />
          </div>
        </div>
      </section>

      {/* Offscreen preview for capture (not scaled, real size) */}
      {showModal && (
        <div style={{ position: 'absolute', left: '-99999px', top: 0, width: previewSize.width, height: previewSize.height }}>
          <div id="preview-capture">
            <PreviewStackDisplay
              stack={stack}
              userName={userName}
              isDarkMode={isDarkMode}
              width={previewSize.width}
              height={previewSize.height}
            />
          </div>
        </div>
      )}

      <PreviewModal
        show={showModal}
        image={generatedImg}
        onClose={() => {
          setShowModal(false);
          setShowModalOverlay(false);
          setShowNameWording(false);
          setUserName("");
          setIsShareConfirming(false);
          setGeneratedImg(null);
        }}
        onShare={handleShareGenerated}
        userName={userName}
        setUserName={setUserName}
        previewContent={
          !generatedImg ? (
            <div
              style={{
                width: '100%',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f7f7f7',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: previewSize.width,
                  height: previewSize.height,
                  transform: `scale(${Math.min(
                    (window.innerWidth * 0.9) / previewSize.width,
                    (window.innerHeight * 0.7) / previewSize.height,
                    1
                  )})`,
                  transformOrigin: 'center center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                id="preview-capture"
              >
                <PreviewStackDisplay
                  stack={stack}
                  userName={userName}
                  isDarkMode={isDarkMode}
                  width={previewSize.width}
                  height={previewSize.height}
                />
              </div>
            </div>
          ) : (
            <img src={generatedImg} alt="Preview" className="max-w-full h-auto rounded" />
          )
        }
        confirmButton={!generatedImg && (
          <>
            <button
              className="w-full bg-blue-500 text-white font-avenir-reg text-lg px-8 py-3 rounded-full hover:bg-blue-600 transition-colors mb-3"
              onClick={handleConfirmCanvas}
              disabled={!assetsLoaded || !previewReady}
            >
              Confirm
            </button>
          </>
        )}
        backButton={generatedImg && (
          <button
            className="w-full bg-gray-300 text-black font-avenir-reg text-lg px-8 py-3 rounded-full hover:bg-gray-400 transition-colors mb-3"
            onClick={handleBackToPreview}
          >
            Back
          </button>
        )}
        shareDisabled={!generatedImg}
        showOverlay={showModalOverlay}
      />
    </div>
  );
}
