import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, Brush, PenTool, PaintBucket, Eraser, Trash2, Download } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const Coloring: React.FC<Props> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#FF6B6B');
  const [tool, setTool] = useState<'brush' | 'sketch' | 'bucket' | 'eraser'>('brush');
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    '#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77', '#9B72CF', 
    '#FF8ACE', '#FF9F43', '#00D2D3', '#F8FAFC', '#2D3436'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e: any) => {
    if (tool === 'bucket') {
      floodFill();
      return;
    }
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
      ctx.lineWidth = tool === 'brush' ? 20 : tool === 'sketch' ? 5 : 40;
    }
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const floodFill = () => {
     // Simple flood fill implementation would go here
     // For now, let's just clear or fill the whole thing for demo
     const canvas = canvasRef.current;
     if (canvas) {
       const ctx = canvas.getContext('2d');
       if (ctx) {
         ctx.fillStyle = color;
         ctx.fillRect(0, 0, canvas.width, canvas.height);
       }
     }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-slate-800">Magic Coloring</h2>
        </div>
        <div className="flex gap-2">
           <button onClick={clear} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 btn-bouncy">
             <Trash2 size={24} />
           </button>
           <button className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 btn-bouncy">
             <Download size={24} />
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
        {/* Tools Palette */}
        <div className="md:w-24 flex md:flex-col gap-4 justify-center">
            {[
              { id: 'brush', icon: <Brush /> },
              { id: 'sketch', icon: <PenTool /> },
              { id: 'bucket', icon: <PaintBucket /> },
              { id: 'eraser', icon: <Eraser /> }
            ].map(t => (
              <button 
                key={t.id} 
                onClick={() => setTool(t.id as any)}
                className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${tool === t.id ? 'bg-slate-800 text-white shadow-xl scale-110' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
              >
                {t.icon}
              </button>
            ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-white rounded-[3rem] shadow-2xl relative overflow-hidden border-8 border-white p-4">
          <canvas 
            ref={canvasRef}
            width={1200}
            height={800}
            className="w-full h-full cursor-crosshair touch-none rounded-[2rem]"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={() => setIsDrawing(false)}
          />
        </div>

        {/* Color Palette */}
        <div className="md:w-24 grid grid-cols-5 md:grid-cols-1 gap-3 justify-center">
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-12 h-12 rounded-full border-4 transition-all ${color === c ? 'border-slate-800 scale-125' : 'border-white shadow-md'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Coloring;
