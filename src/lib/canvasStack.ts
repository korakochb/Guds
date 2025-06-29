export async function generateStackImageWithCanvas({ stack, userName, isDarkMode, width, height, parts }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // 1. วาดพื้นหลัง
  const isPortrait = height > width;
  const bgUrl = isDarkMode
    ? (isPortrait ? '/decorations/previewBackgroundDark_mobile.jpg' : '/decorations/previewBackgroundDark_com.jpg')
    : (isPortrait ? '/decorations/previewBackgroundLight_mobile.jpg' : '/decorations/previewBackgroundLight_com.jpg');
  await drawImageToCanvas(ctx, bgUrl, 0, 0, width, height);

  // 2. เตรียม stack ที่จะวาด (ไม่เอา base)
  const stackParts = stack.filter(part => part && part.id && part.img && part.id !== 'base');

  // 3. คำนวณความสูงรวมของ stack (รวม base)
  const baseWidth = 210, baseHeight = 34;
  const totalStackHeight = stackParts.reduce((sum, part) => {
    const partConfig = parts.find(p => p.id === part.id);
    return sum + (partConfig?.height || 80);
  }, 0) + baseHeight;

  // 4. กำหนด y เริ่มต้น (marginBottom)
  const marginBottom = isPortrait ? 580 : 300;
  const yStart = height - marginBottom - totalStackHeight;

  // 5. วาด base
  const baseX = (width - baseWidth) / 2;
  const baseY = yStart + totalStackHeight - baseHeight;
  await drawImageToCanvas(ctx, '/decorations/base.png', baseX, baseY, baseWidth, baseHeight);

  // 6. วาด stack (จากล่างขึ้นบน)
  let partY = yStart + totalStackHeight - baseHeight;
  for (let i = stackParts.length - 1; i >= 0; i--) {
    const part = stackParts[i];
    const partConfig = parts.find(p => p.id === part.id);
    const partWidth = partConfig?.width || 120;
    const partHeight = partConfig?.height || 80;
    partY -= partHeight;
    const x = (width - partWidth) / 2;
    // ดึงสีจากชื่อไฟล์ เช่น ..._9fd6ff.png
    let shadowColor = 'transparent';
    if (isDarkMode && part.img) {
      const colorMatch = part.img.match(/_([^.]+)\.png$/);
      const selectedColor = colorMatch ? colorMatch[1] : null;
      if (selectedColor) {
        shadowColor = `#${selectedColor}80`;
      }
    }
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = isDarkMode && shadowColor !== 'transparent' ? 10 : 0;
    await drawImageToCanvas(ctx, part.img, x, partY, partWidth, partHeight);
    // reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  // 7. วาดข้อความ userName และข้อความรอง (เหนือ stack)
  if (userName) {
    const marginTop = isPortrait ? 300 : 120;
    ctx.font = isPortrait ? '82px Avenir Next, sans-serif' : '64px Avenir Next, sans-serif';
    ctx.fillStyle = isDarkMode ? '#fff' : '#000';
    ctx.textAlign = 'center';
    ctx.globalAlpha = 1;
    ctx.fillText(userName, width / 2, marginTop);

    ctx.font = isPortrait ? '41px Avenir Next, sans-serif' : '32px Avenir Next, sans-serif';
    ctx.globalAlpha = 0.7;
    ctx.fillText('is ready to be your GÚD friend!', width / 2, marginTop + (isPortrait ? 60 : 40));
    ctx.globalAlpha = 1;
  }

  return canvas.toDataURL('image/jpeg', 1.0);
}

export function drawImageToCanvas(ctx, src, x, y, w, h): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
} 