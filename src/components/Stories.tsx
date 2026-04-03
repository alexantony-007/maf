import React, { useState } from 'react';
export { } // Make it a module
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Volume2, Star, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { useKidContext } from '../hooks/useKidContext';
import { storiesData } from '../data/stories';

interface Props {
  onBack: () => void;
}

const Stories: React.FC<Props> = ({ onBack }) => {
  const { addStars } = useKidContext();
  const [storyIdx, setStoryIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [starsAwarded, setStarsAwarded] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const currentStory = storiesData[storyIdx];
  const currentLine = currentStory.lines[lineIdx];
  const words = currentLine.split(' ');

  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentLine);
    utterance.lang = 'en-US';
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIdx = event.charIndex;
        const wordIdx = currentLine.substring(0, charIdx).split(' ').length - 1;
        setHighlightIdx(wordIdx);
      }
    };

    utterance.onend = () => {
      setHighlightIdx(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback('');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const cleanOriginal = currentLine.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      const cleanTranscript = transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      
      const originalWords = cleanOriginal.split(' ');
      const transcriptWords = cleanTranscript.split(' ');
      
      let matchedCount = 0;
      transcriptWords.forEach((w: string) => {
        if (originalWords.includes(w)) matchedCount++;
      });

      const matchRatio = matchedCount / originalWords.length;

      if (matchRatio >= 0.8) {
        setStarsAwarded(5);
        addStars(10);
        setFeedback('Perfect Reading! 🌟');
      } else if (matchRatio >= 0.4) {
        setStarsAwarded(3);
        addStars(5);
        setFeedback('Good try! Almost there! ✨');
      } else {
        setStarsAwarded(1);
        setFeedback('Try reading aloud 😊');
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === 'no-speech') {
        setFeedback('Try reading aloud 😊');
      }
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const nextLine = () => {
    if (lineIdx < currentStory.lines.length - 1) {
      setLineIdx(lineIdx + 1);
      setStarsAwarded(null);
      setFeedback('');
    } else {
      // Completed story
      setFeedback('Story Completed! 🎉');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20 flex flex-col items-center">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full btn-bouncy">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 leading-tight">{currentStory.title}</h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Story Mode</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-slate-100 px-4 py-1.5 rounded-full font-black text-slate-500 text-sm">
                LEVEL {currentStory.level}
            </div>
            <div className="bg-kid-blue/10 text-kid-blue px-3 py-1.5 rounded-full font-black text-sm">
                {lineIdx + 1} / {currentStory.lines.length}
            </div>
        </div>
      </header>

      <main className="max-w-4xl w-full mt-8 flex flex-col items-center">
        {/* Story Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 w-full justify-start sm:justify-center no-scrollbar">
            {storiesData.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => {
                      setStoryIdx(i);
                      setLineIdx(0);
                      setStarsAwarded(null);
                      setFeedback('');
                  }}
                  className={`px-4 py-2 rounded-2xl font-black whitespace-nowrap transition-all ${storyIdx === i ? 'bg-kid-purple text-white shadow-lg scale-105' : 'bg-white text-slate-400 hover:bg-slate-100'}`}
                >
                    {s.title}
                </button>
            ))}
        </div>

        <motion.div 
          key={`${storyIdx}-${lineIdx}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full bg-white rounded-[4rem] p-12 shadow-2xl border-b-8 border-slate-100 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-slate-50">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${((lineIdx + 1) / currentStory.lines.length) * 100}%` }}
               className="h-full bg-kid-green"
             />
          </div>

          <div className="mb-12">
            <p className="text-slate-400 font-bold uppercase tracking-widest mb-6">Listen & Read Aloud</p>
            <h1 className="text-5xl font-black text-slate-800 leading-[1.4] transition-all">
              {words.map((word, i) => (
                <span 
                  key={i} 
                  className={`inline-block mr-3 transition-all duration-300 rounded-xl px-1 ${
                    highlightIdx === i ? 'bg-kid-yellow text-slate-900 scale-110 shadow-lg' : 'hover:text-kid-blue'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex gap-8 mb-8">
            <button 
              onClick={speak}
              disabled={isListening}
              className="w-20 h-20 bg-kid-blue text-white rounded-3xl flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 transition-all btn-bouncy"
            >
              <Volume2 size={32} />
            </button>

            <button 
              onClick={startListening}
              disabled={isListening}
              className={`w-32 h-32 ${isListening ? 'bg-kid-red animate-pulse' : 'bg-slate-800'} text-white rounded-[2.5rem] flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all btn-bouncy relative group`}
            >
              <Mic size={48} className={isListening ? 'animate-bounce' : ''} />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-black text-slate-500 uppercase tracking-widest">
                {isListening ? 'I am listening...' : 'Tap to read'}
              </div>
            </button>
          </div>

          <div className="min-h-[140px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {feedback && (
                  <motion.div 
                    key={feedback}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    {starsAwarded !== null && (
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`${i < starsAwarded ? 'text-kid-yellow fill-kid-yellow star-glow' : 'text-slate-100'}`} 
                            size={28} 
                          />
                        ))}
                      </div>
                    )}
                    <span className={`text-2xl font-black uppercase tracking-widest ${
                      starsAwarded === 5 ? 'text-kid-green' : 
                      starsAwarded === 3 ? 'text-kid-blue' : 'text-kid-red'
                    }`}>
                        {feedback}
                    </span>
                    
                    {starsAwarded !== null && starsAwarded >= 3 && (
                        <motion.button 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={nextLine}
                        className="mt-4 bg-kid-purple text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 btn-bouncy"
                        >
                        {lineIdx === currentStory.lines.length - 1 ? 'Finish Story' : 'Next Line'} <ChevronRight size={20} />
                        </motion.button>
                    )}

                    {starsAwarded === 1 && (
                         <button 
                            onClick={startListening}
                            className="text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center gap-2 mt-2"
                         >
                            <RefreshCw size={16} /> Click to try again
                         </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation Info */}
        <div className="mt-8 flex items-center justify-between w-full max-w-2xl px-6">
            <button 
               onClick={() => {
                   if (storyIdx > 0) {
                       setStoryIdx(storyIdx - 1);
                       setLineIdx(0);
                       setStarsAwarded(null);
                       setFeedback('');
                   }
               }}
               disabled={storyIdx === 0}
               className="flex items-center gap-2 text-slate-400 font-black disabled:opacity-20 hover:text-slate-800 transition-colors"
            >
                <ChevronLeft /> Prev Story
            </button>

            <div className="flex gap-2">
                {currentStory.lines.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full transition-all ${i === lineIdx ? 'bg-kid-purple w-8' : i < lineIdx ? 'bg-kid-green' : 'bg-slate-200'}`} 
                    />
                ))}
            </div>

            <button 
               onClick={() => {
                   if (storyIdx < storiesData.length - 1) {
                       setStoryIdx(storyIdx + 1);
                       setLineIdx(0);
                       setStarsAwarded(null);
                       setFeedback('');
                   }
               }}
               disabled={storyIdx === storiesData.length - 1}
               className="flex items-center gap-2 text-slate-400 font-black disabled:opacity-20 hover:text-slate-800 transition-colors"
            >
                Next Story <ChevronRight />
            </button>
        </div>
      </main>
    </div>
  );
};

export default Stories;
