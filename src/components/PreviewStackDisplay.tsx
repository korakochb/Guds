import React from "react";
import { parts } from '../config/parts';

export type StackItem = {
    id: string;
    uid: string;
    img: string;
};

interface PreviewStackDisplayProps {
    stack: StackItem[];
    userName?: string;
    isDarkMode: boolean;
    width: number;
    height: number;
}

const PreviewStackDisplay: React.FC<PreviewStackDisplayProps> = ({ stack, userName, isDarkMode, width, height }) => {
    // เลือกไฟล์พื้นหลังตามอัตราส่วนและโหมด
    const isPortrait = height > width;
    const bgImage = isDarkMode
        ? (isPortrait ? '/decorations/previewBackgroundDark_mobile.png' : '/decorations/previewBackgroundDark_com.png')
        : (isPortrait ? '/decorations/previewBackgroundLight_mobile.png' : '/decorations/previewBackgroundLight_com.png');
    const stackBottom = isPortrait ? 600 : 230; // px

    return (
        <div
            style={{
                width,
                height,
                position: 'relative',
                overflow: 'hidden',
                background: isDarkMode ? '#444' : '#f7f7f7',
                borderRadius: 0,
                display: 'block',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* ชื่อ userName (absolute ด้านบน) */}
            <div style={{
                position: 'absolute',
                top:  isPortrait ? 240 : 0,
                left: 0,
                width: '100%',
                textAlign: 'center',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 2,
            }}>
                {userName ? (
                    <>
                        <span style={{
                            marginTop: isPortrait ? 12 : 12,
                            fontSize: width > height ? 64 : 82,
                            fontFamily: 'Avenir Next, sans-serif',
                            opacity: 0.7,
                            color: isDarkMode ? '#fff' : '#000',
                            display: 'block',
                        }}>{userName}</span>
                        <span style={{
                            fontSize: width > height ? 32 : 41,
                            fontFamily: 'Avenir Next, sans-serif',
                            opacity: 0.7,
                            color: isDarkMode ? '#fff' : '#000',
                            display: 'block',
                        }}>is ready to be your GÚD friend!</span>
                    </>
                ) : (
                    <span style={{
                        marginTop: isPortrait ? 12 : 24,
                        fontSize: width > height ? 64 : 82,
                        fontFamily: 'Avenir Next, sans-serif',
                        opacity: 0.7,
                        color: isDarkMode ? '#fff' : '#000',
                        display: 'block',
                    }}>Enter your name...</span>
                )}
            </div>
            {/* Stack images (absolute ด้านล่าง) */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: stackBottom,
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '100%',
                    pointerEvents: 'none',
                }}
            >
                {[...stack].reverse().map((item, index) => {
                    const colorMatch = item.img.match(/_([^.]+)\.png$/);
                    const selectedColor = colorMatch ? colorMatch[1] : null;
                    const dynamicGlowStyle = {
                        filter: isDarkMode && selectedColor ? `drop-shadow(0 0 10px #${selectedColor}80)` : 'none',
                        transition: 'filter 0.3s ease-in-out',
                        verticalAlign: 'bottom',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                    };
                    return (
                        <img
                            key={item.uid}
                            src={item.img}
                            alt={item.id}
                            style={dynamicGlowStyle}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PreviewStackDisplay; 