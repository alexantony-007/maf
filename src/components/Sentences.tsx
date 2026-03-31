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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-slate-800">Read Aloud</h2>
        </div>
        <div className="bg-slate-100 px-4 py-2 rounded-full font-black text-slate-500">
           LEVEL {currentSentence.level}
        </div>
      </header>

      <main className="max-w-4xl w-full mt-12 bg-white rounded-[4rem] p-12 shadow-2xl border-b-8 border-slate-100 flex flex-col items-center text-center">
        <div className="mb-12">
          <p className="text-slate-400 font-bold uppercase tracking-widest mb-4">Listen and Repeat</p>
          <h1 className="text-5xl font-black text-slate-800 leading-tight">
            {currentSentence.text.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-3 hover:text-kid-blue transition-colors cursor-pointer" onClick={() => {
                const u = new SpeechSynthesisUtterance(word);
                window.speechSynthesis.speak(u);
              }}>
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex gap-8 mb-12">
          <button 
            onClick={speak}
            className="w-24 h-24 bg-kid-blue text-white rounded-3xl flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all btn-bouncy"
          >
            <Volume2 size={40} />
          </button>

          <button 
            onClick={startListening}
            className={`w-32 h-32 ${isListening ? 'bg-kid-red animate-pulse' : 'bg-slate-800'} text-white rounded-[2.5rem] flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all btn-bouncy relative`}
          >
            <Mic size={48} />
            {isListening && (
              <div className="absolute inset-x-0 -bottom-8 text-xs font-black text-kid-red animate-bounce uppercase">Listening...</div>
            )}
          </button>
        </div>

        <div className="min-h-[100px] flex flex-col items-center">
            <AnimatePresence>
                {isCorrect === true && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                     <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="text-kid-yellow fill-kid-yellow star-glow" size={32} />)}
                     </div>
                     <span className="text-2xl font-black text-kid-green uppercase tracking-widest">Perfect Reading! 🌟</span>
                     <button 
                       onClick={() => {
                          setIdx(i => (i + 1) % sentencesData.length);
                          setIsCorrect(null);
                          setResult('');
                       }}
                       className="mt-4 bg-slate-800 text-white px-8 py-3 rounded-2xl font-black btn-bouncy"
                     >
                        Next Sentence →
                     </button>
                  </motion.div>
                )}

                {isCorrect === false && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <p className="text-slate-400 font-bold mb-2">You said:</p>
                      <p className="text-2xl font-black text-kid-red mb-4 italic">"{result}"</p>
                      <button onClick={() => setIsCorrect(null)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-700 transition-colors mx-auto">
                        <RefreshCw size={20} /> Try Again
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
