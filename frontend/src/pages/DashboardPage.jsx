import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Activity, Power, Bell, Eye, Focus } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  
  // App States: 'waiting' -> 'gaze_tracking' -> 'attention_span' -> 'complete'
  const [phase, setPhase] = useState('waiting');
  const [timer, setTimer] = useState(0);
  const [activeLED, setActiveLED] = useState(null); // 0:TL, 1:TR, 2:BL, 3:BR
  const [events, setEvents] = useState([{ time: '00:00', text: 'Waiting for push button to start...' }]);
  
  // Metrics
  const [reactionTime, setReactionTime] = useState(0);
  const[attentionSpan, setAttentionSpan] = useState(0);

  // Formatting Time
  const formatTime = (seconds) => `00:${seconds.toString().padStart(2, '0')}`;
  const addEvent = (text) => setEvents(prev =>[...prev.slice(-4), { time: new Date().toISOString().substring(14, 19), text }]);

  // Master Test Controller
  useEffect(() => {
    let interval, ledInterval;

    if (phase === 'gaze_tracking') {
      // Timer
      interval = setInterval(() => setTimer(t => t + 1), 1000);
      
      // Random LED Blinking Logic (Allows 2-3 times in a row inherently by using random)
      ledInterval = setInterval(() => {
        const nextLED = Math.floor(Math.random() * 4);
        setActiveLED(nextLED);
        const directions = ["Top-Left", "Top-Right", "Bottom-Left", "Bottom-Right"];
        addEvent(`LED Blinked: ${directions[nextLED]}`);
        
        // Simulate reaction time capture (e.g., 300ms - 700ms)
        setReactionTime(Math.floor(Math.random() * 400) + 300);
      }, 2000); // Every 2 seconds an LED blinks

      // Switch to Phase 2 after 14 seconds
      setTimeout(() => {
        clearInterval(ledInterval);
        addEvent("🔊 BUZZER SOUNDED!");
        setPhase('attention_span');
      }, 14000);

    } else if (phase === 'attention_span') {
      interval = setInterval(() => {
        setTimer(t => t + 1);
        // Simulate attention span capture increasing
        setAttentionSpan(prev => prev + 1.2);
      }, 1000);

      // Finish test after 10 seconds of attention phase
      setTimeout(() => {
        setPhase('complete');
        addEvent("✅ Test Completed. Generating Report...");
        setTimeout(() => navigate('/results'), 2000); // Auto-redirect to results
      }, 10000);
    }

    return () => { clearInterval(interval); clearInterval(ledInterval); };
  },[phase, navigate]);

  const startTest = () => {
    setPhase('gaze_tracking');
    addEvent("Test Started: Gaze Tracking Phase");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8 font-sans">
      
      {/* 🟢 TOP BAR */}
      <header className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between mb-8 border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-nl-darkText">Active Screening Session</h1>
          <p className="text-gray-500">Child: <span className="font-bold text-gray-700">Leo (18 mos)</span></p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-4 py-2 rounded-full font-bold text-sm ${phase === 'gaze_tracking' ? 'bg-blue-100 text-blue-700' : phase === 'attention_span' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
            {phase === 'waiting' ? 'Ready' : phase === 'gaze_tracking' ? 'Phase 1: Gaze Tracking' : phase === 'attention_span' ? 'Phase 2: Attention Span' : 'Processing...'}
          </span>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold">
            <Clock className="w-5 h-5" /> {formatTime(timer)}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto flex-grow">
        
        {/* 🟢 LEFT: INTERACTIVE HARDWARE SIMULATOR */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center relative min-h-[400px]">
          
          {phase === 'waiting' && (
            <button onClick={startTest} className="bg-green-500 hover:bg-green-600 text-white w-48 h-48 rounded-full shadow-2xl flex flex-col items-center justify-center border-8 border-green-200 hover:scale-105 transition-all">
              <Power className="w-16 h-16 mb-2" />
              <span className="font-bold text-xl">PUSH TO START</span>
            </button>
          )}

          {phase === 'gaze_tracking' && (
            <div className="w-full h-full flex items-center justify-center relative">
              {/* Webcam Feed */}
              <div className="w-3/4 h-3/4 bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
                 <Eye className="text-white/20 w-24 h-24 absolute" />
                 <div className="border-2 border-green-400 w-32 h-40 absolute animate-pulse rounded-lg"></div>
                 <span className="absolute bottom-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">Live Webcam Feed Active</span>
              </div>
              
              {/* 4 Directional LEDs */}
              <div className={`absolute top-4 left-4 w-12 h-12 rounded-full ${activeLED === 0 ? 'bg-yellow-400 shadow-[0_0_30px_#facc15]' : 'bg-gray-200'}`} />
              <div className={`absolute top-4 right-4 w-12 h-12 rounded-full ${activeLED === 1 ? 'bg-yellow-400 shadow-[0_0_30px_#facc15]' : 'bg-gray-200'}`} />
              <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-full ${activeLED === 2 ? 'bg-yellow-400 shadow-[0_0_30px_#facc15]' : 'bg-gray-200'}`} />
              <div className={`absolute bottom-4 right-4 w-12 h-12 rounded-full ${activeLED === 3 ? 'bg-yellow-400 shadow-[0_0_30px_#facc15]' : 'bg-gray-200'}`} />
            </div>
          )}

          {phase === 'attention_span' && (
            <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 rounded-3xl relative">
               {/* Hidden Webcam indicator */}
               <span className="absolute top-4 right-4 bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs flex items-center gap-1"><Focus className="w-3 h-3"/> Webcam tracking silently</span>
               
               {/* Engaging Emoji */}
               <div className="text-[8rem] animate-bounce drop-shadow-2xl">
                 🌟
               </div>
               <p className="text-gray-400 font-bold mt-8 tracking-widest uppercase">Measuring Attention Span...</p>
            </div>
          )}

        </div>

        {/* 🟢 RIGHT: LIVE METRICS & EVENTS */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-grow">
            <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-2">Live Telemetry</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1 flex justify-between">Latest Reaction Time <span>{reactionTime > 0 ? `${reactionTime}ms` : '--'}</span></p>
                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-orange-400 h-2 rounded-full transition-all" style={{ width: reactionTime > 0 ? '70%' : '0%' }}></div></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1 flex justify-between">Attention Duration <span>{attentionSpan > 0 ? `${attentionSpan.toFixed(1)}s` : '--'}</span></p>
                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (attentionSpan/10)*100)}%` }}></div></div>
              </div>
            </div>
          </div>

          {/* Event Log */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-64 flex flex-col">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-nl-primaryTeal"/> Event Log</h3>
            <div className="flex-grow bg-gray-50 rounded-2xl p-4 overflow-hidden flex flex-col justify-end space-y-2 font-mono text-xs">
              {events.map((ev, i) => (
                <div key={i} className={`flex gap-3 animate-fade-in-up ${ev.text.includes('BUZZER') ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                  <span className="text-gray-400 shrink-0">[{ev.time}]</span>
                  <span>{ev.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}