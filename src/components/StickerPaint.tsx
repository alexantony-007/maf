import React, { useRef, useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-slate-50 flex flex-col p-4 md:p-6 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between shadow-lg border-b border-white/20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm border border-white/50 btn-bouncy">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 leading-none tracking-tight">Paint: {stickerName}</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Creative Mode</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={clearCanvas} title="Clear" className="p-3 bg-red-50/50 text-red-500 rounded-2xl hover:bg-red-50 btn-bouncy border border-red-100/50 shadow-sm">
            <Trash2 size={24} strokeWidth={3} />
          </button>
          <button onClick={downloadArt} title="Save to Gallery" className="bg-rainbow text-white px-6 py-3 rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2 btn-bouncy border-t-2 border-white/20">
            <Download size={22} strokeWidth={3} />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-6 mt-20 relative h-[calc(100vh-170px)]">
        {/* Left Toolbar */}
        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 justify-center md:justify-start md:w-20">
          {[
            { id: 'brush', icon: <Brush size={24} />, size: 22, color: 'kid-blue', label: 'Paint' },
            { id: 'sketch', icon: <PenTool size={24} />, size: 8, color: 'kid-purple', label: 'Sketch' },
            { id: 'eraser', icon: <Eraser size={24} />, size: 40, color: 'kid-red', label: 'Eraser' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { setTool(t.id as any); setBrushSize(t.size); }}
              className={`w-16 h-16 md:w-full md:aspect-square rounded-[1.5rem] flex flex-col items-center justify-center transition-all group relative overflow-hidden ${
                tool === t.id ? 'bg-slate-800 text-white shadow-2xl scale-110 z-10' : 'bg-white/50 backdrop-blur-sm text-slate-400 hover:bg-white border border-white/50 shadow-sm'
              }`}
            >
              {t.icon}
              <span className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Canvas stage — paint layer below, SVG outline on top */}
        <div className="flex-1 glass-card rounded-[3rem] p-4 shadow-2xl relative overflow-hidden flex items-center justify-center bg-white/80">
          <div className="relative w-full h-full max-w-[800px] max-h-[600px] aspect-video">
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
              <img
                src={svgDataUrl}
                alt={stickerName}
                className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-500`}
                style={{ zIndex: 10 }}
                draggable={false}
              />
          </div>
        </div>

        {/* Right Color Palette */}
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-4 no-scrollbar justify-start md:w-20 px-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => { setColor(c); if(tool === 'eraser') setTool('brush'); }}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex-shrink-0 transition-all border-4 ${
                color === c && tool !== 'eraser' ? 'border-slate-800 scale-110 shadow-xl' : 'border-white/50 shadow-sm'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </main>

      {/* Footer controls */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
          <div className="glass rounded-[2rem] px-8 py-6 shadow-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4 flex-1 w-full">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-16">Size</span>
                <input
                type="range" min="4" max="80" value={brushSize}
                onChange={e => setBrushSize(Number(e.target.value))}
                className="flex-1 h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-800"
                />
            </div>
            <div className="flex items-center gap-3 bg-white/50 px-4 py-2 rounded-2xl border border-white/20 min-w-[100px] justify-center">
                <div 
                  className="rounded-full shadow-inner" 
                  style={{ 
                    backgroundColor: tool === 'eraser' ? '#fff' : color, 
                    width: Math.min(32, 8 + brushSize / 3), 
                    height: Math.min(32, 8 + brushSize / 3),
                    border: '2px solid rgba(0,0,0,0.1)'
                  }}
                />
                <span className="text-sm font-black text-slate-600">{brushSize}px</span>
            </div>
          </div>
      </footer>
    </div>
  );
};

export default StickerPaint;
