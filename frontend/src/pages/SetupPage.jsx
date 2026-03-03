import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Ruler, Cpu, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SetupPage() {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(0);
  const [checks, setChecks] = useState({ camera: false, arduino: false, audio: false });
  const [checking, setChecking] = useState(false);

  // Simulate hardware initialization
  const runHardwareChecks = () => {
    setChecking(true);
    setTimeout(() => setChecks(prev => ({ ...prev, camera: true })), 1000);
    setTimeout(() => setChecks(prev => ({ ...prev, arduino: true })), 2000);
    setTimeout(() => {
      setChecks(prev => ({ ...prev, audio: true }));
      setDistance(48); // Ideal distance
      setChecking(false);
    }, 3000);
  };

  const allReady = checks.camera && checks.arduino && checks.audio && distance >= 40 && distance <= 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10 px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-nl-darkText">Prepare for Screening</h2>
        <p className="text-gray-500 mt-2">Let's ensure your environment is set up perfectly for your child.</p>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Camera Preview Box */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl flex flex-col items-center justify-center border border-gray-100 h-[400px] relative overflow-hidden">
          {checks.camera ? (
            <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center relative">
              <Camera className="w-16 h-16 text-white/30 absolute" />
              {/* Simulated Face Bounding Box */}
              <div className="w-48 h-56 border-4 border-green-400 rounded-xl relative flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                <span className="absolute -top-8 bg-green-400 text-white text-xs font-bold px-3 py-1 rounded-full">Face Detected</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-semibold">Camera Offline</p>
            </div>
          )}
        </div>

        {/* Right: Hardware Status Panel */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-nl-darkText mb-6 flex items-center justify-center gap-2">
              <Cpu className="text-nl-primaryTeal" /> System Status
            </h3>
            
            <div className="space-y-4">
              <StatusRow icon={Camera} label="Webcam Feed" active={checks.camera} />
              <StatusRow icon={Cpu} label="Arduino & LEDs Connected" active={checks.arduino} />
              <StatusRow icon={Volume2} label="Audio Stimulus Ready" active={checks.audio} />
              
              <div className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${distance >= 40 && distance <= 60 ? 'bg-green-50 border-green-200' : distance > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <Ruler className={distance >= 40 && distance <= 60 ? "text-green-500" : "text-gray-400"} />
                  <span className="font-semibold text-gray-700">Distance Sensor</span>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold ${distance >= 40 && distance <= 60 ? "text-green-600" : "text-gray-500"}`}>
                    {distance > 0 ? `${distance} cm` : '-- cm'}
                  </span>
                  {distance > 0 && <p className="text-xs text-gray-500">Ideal: 40-60cm</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {!allReady && (
              <button onClick={runHardwareChecks} disabled={checking} className="w-full py-4 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-md">
                {checking ? "Initializing Hardware..." : "Run System Check"}
              </button>
            )}
            <button 
              onClick={() => navigate('/dashboard')} 
              disabled={!allReady}
              className={`w-full py-4 rounded-full font-bold text-white transition-all shadow-xl text-lg ${allReady ? 'bg-green-500 hover:bg-green-600 hover:-translate-y-1' : 'bg-gray-300 cursor-not-allowed opacity-50'}`}>
              Start Live Screening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ icon: Icon, label, active }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
      <div className="flex items-center gap-3 text-gray-700 font-semibold">
        <Icon className="text-gray-400" /> {label}
      </div>
      {active ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-orange-300" />}
    </div>
  );
}