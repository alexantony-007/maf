import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brush, PenTool, Eraser, Trash2, Download } from 'lucide-react';
import { getStickerSVG } from '../data/stickerSVGs';

interface Props {
  stickerId: string;
  stickerName: string;
  gender: 'boy' | 'girl';
  onBack: () => void;
}

const COLORS = [
  '#FF6B6B', '#FF9F43', '#FFD93D', '#6BCB77', '#4D96FF',
  '#9B72CF', '#FF8ACE', '#00D2D3', '#A29BFE', '#FD79A8',
];

const StickerPaint: React.FC<Props> = ({ stickerId, stickerName, gender, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [tool, setTool] = useState<'brush' | 'sketch' | 'eraser'>('brush');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(22);
  const svgString = getStickerSVG(stickerId, gender);

  // Fill canvas with white on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const source = 'touches' in e ? e.touches[0] : e;
    return {
      x: (source.clientX - rect.left) * (canvas.width / rect.width),
      y: (source.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 2 : tool === 'sketch' ? brushSize / 3 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Merge: paint canvas + SVG outline → final PNG
    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    // 1. Draw the paint layer
    ctx.drawImage(canvas, 0, 0);

    // 2. Draw the SVG outline on top
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, offscreen.width, offscreen.height);
      URL.revokeObjectURL(url);
      const link = document.createElement('a');
      link.download = `${stickerName}-painting.png`;
      link.href = offscreen.toDataURL('image/png');
      link.click();
    };
    img.src = url;
  };

  // Convert SVG string to a data URL for the overlay image
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-800 leading-tight">Paint: {stickerName}</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Color it in!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={clearCanvas} title="Clear" className="p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 btn-bouncy">
            <Trash2 size={20} />
          </button>
          <button onClick={downloadArt} title="Save picture" className="p-2 bg-green-50 text-green-500 rounded-xl hover:bg-green-100 btn-bouncy">
            <Download size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 pt-20">
        {/* Tool selector */}
        <div className="flex md:flex-col gap-3 justify-center md:w-16">
          {[
            { id: 'brush', icon: <Brush size={20} />, size: 22 },
            { id: 'sketch', icon: <PenTool size={20} />, size: 8 },
            { id: 'eraser', icon: <Eraser size={20} />, size: 30 },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { setTool(t.id as any); setBrushSize(t.size); }}
              title={t.id}
              className={`w-12 h-12 md:w-full md:aspect-square rounded-2xl flex items-center justify-center transition-all ${
                tool === t.id ? 'bg-slate-800 text-white shadow-lg scale-110' : 'bg-white text-slate-400 hover:bg-slate-50'
              }`}
            >
              {t.icon}
            </button>
          ))}
        </div>

        {/* Canvas stage — paint layer below, SVG outline on top */}
        <div className="flex-1 relative rounded-[2rem] overflow-hidden bg-white shadow-2xl border-4 border-white"
             style={{ minHeight: 400 }}>
          {/* Paint canvas (bottom layer) */}
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {/* SVG outline (top layer — always visible, pointer-events none) */}
          <img
            src={svgDataUrl}
            alt={stickerName}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ zIndex: 10 }}
            draggable={false}
          />
        </div>

        {/* Color palette */}
        <div className="flex md:flex-col flex-wrap gap-3 justify-center md:w-16">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-10 h-10 rounded-full border-4 transition-all ${
                color === c && tool !== 'eraser' ? 'border-slate-800 scale-125 shadow-lg' : 'border-white shadow-md'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          {/* White (eraser color hint) */}
          <button
            onClick={() => setColor('#FFFFFF')}
            className={`w-10 h-10 rounded-full border-4 transition-all ${
              color === '#FFFFFF' && tool !== 'eraser' ? 'border-slate-800 scale-125 shadow-lg' : 'border-slate-300 shadow-md'
            }`}
            style={{ backgroundColor: '#FFFFFF' }}
          />
        </div>
      </main>

      {/* Brush size slider at bottom */}
      <div className="bg-white border-t px-6 py-3 flex items-center gap-4">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest w-16">Size</span>
        <input
          type="range" min="4" max="50" value={brushSize}
          onChange={e => setBrushSize(Number(e.target.value))}
          className="flex-1 accent-slate-800"
        />
        <div
          className="rounded-full bg-slate-800 flex-shrink-0"
          style={{ width: Math.max(8, brushSize / 2), height: Math.max(8, brushSize / 2) }}
        />
      </div>
    </div>
  );
};

export default StickerPaint;
