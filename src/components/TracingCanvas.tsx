import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Star } from 'lucide-react';

interface Props {
  char: string;
  langCode: string;
  onComplete: (stars: number) => void;
}

const TracingCanvas: React.FC<Props> = ({ char, langCode, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [tooFarOutside, setTooFarOutside] = useState(false);

  useEffect(() => {
    drawGuide();
  }, [char, langCode]);

  const drawGuide = () => {
    const canvas = guideCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 300px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#F1F5F9'; // slate-100
    ctx.fillText(char, canvas.width / 2, canvas.height / 2);
    
    // Clear drawing canvas too
    const dCanvas = canvasRef.current;
    if (dCanvas) {
      const dCtx = dCanvas.getContext('2d');
      dCtx?.clearRect(0, 0, dCanvas.width, dCanvas.height);
    }
    setPoints([]);
    setScore(null);
    setTooFarOutside(false);
  };

  const isPointInChar = (x: number, y: number) => {
    const canvas = guideCanvasRef.current;
    if (!canvas) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return pixel[3] > 0; // Alpha > 0 means inside
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getPos(e);
    addPoint(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    
    if (!isPointInChar(pos.x, pos.y)) {
       // Allow small margin of error, but if too far outside, warn
       // For now, let's just track it
    }
    
    addPoint(pos.x, pos.y);
    renderPath();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    calculateScore();
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const addPoint = (x: number, y: number) => {
    setPoints(prev => [...prev, { x, y }]);
  };

  const renderPath = () => {
    const canvas = canvasRef.current;
    if (!canvas || points.length < 2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // UI: Incomplete -> light (blue), Completed (if score exists) -> dark bold
    ctx.strokeStyle = score !== null ? '#1E293B' : '#4D96FF'; 
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  };

  const calculateScore = () => {
    if (points.length < 10) return;
    
    let inside = 0;
    points.forEach(p => {
      if (isPointInChar(p.x, p.y)) inside++;
    });
    
    const ratio = inside / points.length;
    
    // DEV NOTE: If >=70% match -> success
    let stars = 0;
    if (ratio >= 0.7) {
      if (ratio > 0.9) stars = 5;
      else if (ratio > 0.8) stars = 4;
      else stars = 3;
    } else {
      stars = 1;
    }
    
    setScore(stars);
    renderPath(); // Re-render with new color
    setTimeout(() => onComplete(stars), 1500);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-[350px] h-[450px] bg-white rounded-[2rem] shadow-inner overflow-hidden border-4 border-slate-100">
        <canvas 
          ref={guideCanvasRef} 
          width={350} 
          height={450} 
          className="absolute inset-0 z-0 pointer-events-none"
        />
        <canvas 
          ref={canvasRef} 
          width={350} 
          height={450} 
          className="absolute inset-0 z-10 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="mt-8 flex gap-4 items-center">
        <button onClick={drawGuide} className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 btn-bouncy">
          <RefreshCw size={24} />
        </button>
        
        <AnimatePresence>
          {score !== null && (
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex gap-1"
            >
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={32} 
                  className={i < score ? "text-kid-yellow fill-kid-yellow star-glow" : "text-slate-200"} 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {tooFarOutside && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4 text-kid-red font-black"
        >
          Oops! Try to stay inside the lines! ✨
        </motion.div>
      )}
    </div>
  );
};

export default TracingCanvas;
