import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Clock, Focus, Activity, ActivitySquare, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [metrics, setMetrics] = useState({ eyeTracking: 85, reactionTime: 450, fixation: 2.1, attention: 78 });
  const [events, setEvents] = useState([{ time: '00:00', text: 'Screening Started' }]);

  // Simulated WebSocket connection
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
      
      setMetrics(prev => ({
        eyeTracking: Math.max(50, Math.min(100, prev.eyeTracking + (Math.random() * 6 - 3))),
        reactionTime: Math.max(200, Math.min(800, prev.reactionTime + (Math.random() * 40 - 20))),
        fixation: Math.max(0.5, Math.min(3.5, prev.fixation + (Math.random() * 0.4 - 0.2))),
        attention: Math.max(40, Math.min(100, prev.attention + (Math.random() * 8 - 4))),
      }));

      if (Math.random() > 0.8) {
        const newEventsList = ["Gaze Shifted", "LED Stimulus Triggered", "Audio Played", "Child Smiled", "Attention Drift"];
        setEvents(prev => [...prev.slice(-4), { 
          time: new Date().toISOString().substring(14, 19), 
          text: newEventsList[Math.floor(Math.random() * newEventsList.length)] 
        }]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const riskScore = 100 - ((metrics.eyeTracking * 0.3) + ((800 - metrics.reactionTime) / 8 * 0.25) + (metrics.fixation / 3.5 * 100 * 0.25) + (metrics.attention * 0.20));
  const normalizedRisk = Math.max(0, Math.min(100, riskScore));

  const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8 font-sans">
      
      {/* 🟢 TOP BAR */}
      <header className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between mb-8 border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Live Screening Session</h1>
          <p className="text-gray-500">Child: <span className="font-bold text-gray-700">Leo (18 mos)</span> • ID: #NL-882</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-6">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold">
            <Clock className="w-5 h-5" /> {formatTime(timer)}
          </div>
          <button onClick={() => navigate('/results')} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition-all">
            End Session
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto flex-grow">
        
        {/* 🟢 CENTER GRID: Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MetricCard title="Eye Tracking Accuracy" value={`${metrics.eyeTracking.toFixed(1)}%`} icon={Eye} progress={metrics.eyeTracking} color="bg-blue-500" />
          <MetricCard title="Reaction Time" value={`${Math.round(metrics.reactionTime)} ms`} icon={Activity} progress={100 - (metrics.reactionTime/8)} color="bg-orange-400" />
          <MetricCard title="Face Fixation" value={`${metrics.fixation.toFixed(1)} s`} icon={Focus} progress={(metrics.fixation/3.5)*100} color="bg-purple-500" />
          <MetricCard title="Attention Consistency" value={`${metrics.attention.toFixed(1)}%`} icon={ActivitySquare} progress={metrics.attention} color="bg-teal-500" />
        </div>

        {/* 🟢 RIGHT SIDEBAR: Risk Gauge & Event Log */}
        <div className="flex flex-col gap-6">
          
          {/* Risk Gauge Panel */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <h3 className="text-lg font-bold text-gray-700 mb-6">Real-Time Risk Index</h3>
            
            <div className="relative w-48 h-24 mb-6">
              <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f3f4f6" strokeWidth="12" strokeLinecap="round" />
                <path 
                  d="M 10 50 A 40 40 0 0 1 90 50" 
                  fill="none" 
                  stroke={normalizedRisk < 30 ? "#4ade80" : normalizedRisk < 60 ? "#fbbf24" : "#f87171"} 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  strokeDasharray={`${(normalizedRisk / 100) * 125} 125`} 
                  className="transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute bottom-0 left-0 w-full text-center">
                <span className="text-3xl font-extrabold text-gray-800">{normalizedRisk.toFixed(0)}%</span>
              </div>
            </div>

            <p className={`font-bold px-4 py-1 rounded-full text-sm ${normalizedRisk < 30 ? "bg-green-100 text-green-700" : normalizedRisk < 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
              {normalizedRisk < 30 ? "Low Risk" : normalizedRisk < 60 ? "Moderate Risk" : "High Risk"}
            </p>
          </div>

          {/* Event Log */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-grow flex flex-col">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-teal-500"/> Live Event Log
            </h3>
            <div className="flex-grow bg-gray-50 rounded-2xl p-4 overflow-hidden flex flex-col justify-end space-y-2 font-mono text-sm">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-3 text-gray-600">
                  <span className="text-gray-400">[{ev.time}]</span>
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

function MetricCard({ title, value, icon: Icon, progress, color }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-gray-50 p-3 rounded-2xl"><Icon className="w-6 h-6 text-gray-500" /></div>
        <span className="text-2xl font-extrabold text-gray-800">{value}</span>
      </div>
      <div>
        <h4 className="text-gray-500 font-semibold mb-3">{title}</h4>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
        </div>
      </div>
    </div>
  );
}