import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Volume2, Star, RefreshCw } from 'lucide-react';
import { useKidContext } from '../hooks/useKidContext';
import { sentencesData } from '../data/sentences';

interface Props {
  onBack: () => void;
}

const Sentences: React.FC<Props> = ({ onBack }) => {
  const { addStars } = useKidContext();
  const [idx, setIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentSentence = sentencesData[idx];

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(currentSentence.text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setResult(transcript);
      const cleanOriginal = currentSentence.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      const cleanTranscript = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      
      if (cleanTranscript === cleanOriginal) {
        setIsCorrect(true);
        addStars(10);
      } else {
        setIsCorrect(false);
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20 flex flex-col items-center">
      <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between shadow-lg border-b border-white/20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm border border-white/50 btn-bouncy">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 leading-none tracking-tight">Read Aloud</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Speak & Learn</span>
          </div>
        </div>
        <div className="bg-slate-200/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/50 font-black text-slate-500 text-sm shadow-sm">
           LEVEL {currentSentence.level}
        </div>
      </header>

      <main className="max-w-4xl w-full mt-12 glass-card rounded-[4rem] p-16 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100/30">
           <div className="h-full bg-rainbow w-1/3" />
        </div>

        <div className="mb-16">
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] mb-8 text-[10px]">Listen and Repeat</p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 leading-tight tracking-tight">
            {currentSentence.text.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4 hover:text-kid-blue transition-colors cursor-pointer rounded-2xl px-2 hover:bg-slate-50" onClick={() => {
                const u = new SpeechSynthesisUtterance(word);
                window.speechSynthesis.speak(u);
              }}>
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex gap-10 mb-16 justify-center">
          <button 
            onClick={speak}
            className="w-24 h-24 bg-kid-blue text-white rounded-[2rem] flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all btn-bouncy border-4 border-white/20"
          >
            <Volume2 size={40} strokeWidth={3} />
          </button>

          <button 
            onClick={startListening}
            className={`w-36 h-36 border-4 border-white/20 ${isListening ? 'bg-kid-red animate-pulse' : 'bg-slate-800'} text-white rounded-[3rem] flex items-center justify-center shadow-2xl hover:scale-110 transition-all btn-bouncy relative group`}
          >
            <Mic size={56} strokeWidth={3} />
            {isListening && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-black text-kid-red animate-bounce uppercase tracking-[0.2em] whitespace-nowrap">Listening...</div>
            )}
          </button>
        </div>

        <div className="min-h-[140px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {isCorrect === true && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 20 }} 
                    animate={{ scale: 1, opacity: 1, y: 0 }} 
                    exit={{ scale: 0.8, opacity: 0, y: -20 }}
                    className="flex flex-col items-center gap-4"
                  >
                     <div className="flex gap-2 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className="text-kid-yellow fill-kid-yellow star-glow" size={36} />)}
                     </div>
                     <span className="text-3xl font-black text-kid-green uppercase tracking-[0.2em] drop-shadow-sm">Perfect Reading! 🌟</span>
                     <button 
                       onClick={() => {
                          setIdx(i => (i + 1) % sentencesData.length);
                          setIsCorrect(null);
                          setResult('');
                       }}
                       className="mt-6 bg-rainbow text-white px-12 py-5 rounded-[2rem] font-black shadow-2xl hover:scale-105 transition-all text-xl btn-bouncy border-t-4 border-white/20"
                     >
                        Next Sentence ➔
                     </button>
                  </motion.div>
                )}

                {isCorrect === false && (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-center"
                   >
                      <p className="text-slate-400 font-bold mb-3 uppercase tracking-widest text-[10px]">You said:</p>
                      <p className="text-3xl font-black text-kid-red mb-6 italic tracking-tight">"{result}"</p>
                      <button onClick={() => setIsCorrect(null)} className="flex items-center gap-2 bg-white px-8 py-3 rounded-2xl text-slate-400 font-black hover:text-slate-600 transition-all shadow-sm border border-slate-100">
                        <RefreshCw size={20} strokeWidth={3} /> Try Again
                      </button>
                   </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Sentences;
