import React from 'react';
import { Download, Mail, AlertTriangle, CheckCircle, Info, HeartPulse } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function ResultsPage() {
  // Mock Data: Result of the screening session
  const riskScore = 42;
  const riskCategory = "Moderate Risk";
  const riskColor = riskScore < 30 ? "text-green-500" : riskScore < 60 ? "text-yellow-500" : "text-red-500";
  const bgRiskColor = riskScore < 30 ? "bg-green-50" : riskScore < 60 ? "bg-yellow-50" : "bg-red-50";

  // Radar Chart Data (Child vs. Typical Baseline)
  const chartData =[
    { subject: 'Eye Tracking', baseline: 90, child: 68 },
    { subject: 'Reaction Speed', baseline: 85, child: 50 },
    { subject: 'Face Fixation', baseline: 80, child: 60 },
    { subject: 'Attention', baseline: 85, child: 55 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="max-w-5xl w-full">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-nl-darkText flex items-center gap-3">
              <HeartPulse className="w-8 h-8 text-nl-primaryTeal" /> Session Results
            </h1>
            <p className="text-gray-500 mt-1">Child: <span className="font-bold">Leo (18 mos)</span> • Session: #NL-882</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-all">
              <Mail className="w-5 h-5" /> Email to Pediatrician
            </button>
            <button className="flex items-center gap-2 bg-nl-primaryTeal text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-teal-600 transition-all">
              <Download className="w-5 h-5" /> Download PDF
            </button>
          </div>
        </div>

        {/* MAIN SCORE CARD */}
        <div className={`w-full p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between ${bgRiskColor}`}>
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-md border-4 ${riskScore < 30 ? 'border-green-400' : riskScore < 60 ? 'border-yellow-400' : 'border-red-400'}`}>
              <span className={`text-3xl font-extrabold ${riskColor}`}>{riskScore}%</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Overall Behavioral Index</h2>
              <div className="flex items-center gap-2 mt-2">
                {riskScore < 30 ? <CheckCircle className="w-6 h-6 text-green-500" /> : <AlertTriangle className="w-6 h-6 text-yellow-500" />}
                <span className={`text-lg font-bold ${riskColor}`}>{riskCategory}</span>
              </div>
            </div>
          </div>
          <div className="max-w-sm bg-white/60 p-5 rounded-2xl backdrop-blur-sm border border-white/50 text-sm text-gray-700 shadow-sm">
            <p className="font-semibold mb-1 flex items-center gap-2"><Info className="w-4 h-4 text-nl-primaryTeal" /> Interpretation:</p>
            This screening indicates moderate behavioral markers. This is <b>not a diagnosis</b>. We recommend discussing this report with a pediatric specialist.
          </div>
        </div>

        {/* DATA VISUALIZATION & TABLE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Radar Chart FIX */}
<div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center w-full">
  <h3 className="text-lg font-bold text-gray-800 mb-2">Behavioral Profile vs Baseline</h3>
  <p className="text-sm text-gray-500 mb-6 text-center">Comparing Leo's responses to typical markers.</p>
  
  {/* Added a strict height style here to prevent collapsing */}
  <div style={{ width: '100%', height: 350 }} className="flex justify-center">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 600 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar name="Typical Baseline" dataKey="baseline" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.2} />
        <Radar name="Leo's Results" dataKey="child" stroke="#4DB6AC" fill="#4DB6AC" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
  
  <div className="flex gap-6 mt-4 text-sm font-semibold">
    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-300 rounded-full"></div> Baseline</div>
    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-nl-primaryTeal rounded-full"></div> Leo's Results</div>
  </div>
</div>

          {/* Breakdown Table */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Parameter Breakdown</h3>
            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-gray-500">
                    <th className="pb-3 font-semibold">Parameter</th>
                    <th className="pb-3 font-semibold">Measured</th>
                    <th className="pb-3 font-semibold">Expected</th>
                    <th className="pb-3 font-semibold">Weight</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-50">
                    <td className="py-4 font-semibold">Eye Tracking</td>
                    <td className="py-4 text-orange-500 font-bold">68.5%</td>
                    <td className="py-4 text-gray-500">&gt; 80%</td>
                    <td className="py-4 text-gray-400">30%</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-4 font-semibold">Reaction Time</td>
                    <td className="py-4 text-orange-500 font-bold">650 ms</td>
                    <td className="py-4 text-gray-500">&lt; 400 ms</td>
                    <td className="py-4 text-gray-400">25%</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-4 font-semibold">Face Fixation</td>
                    <td className="py-4 text-orange-500 font-bold">1.2 sec</td>
                    <td className="py-4 text-gray-500">&gt; 2.0 sec</td>
                    <td className="py-4 text-gray-400">25%</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold">Attention Score</td>
                    <td className="py-4 text-orange-500 font-bold">55%</td>
                    <td className="py-4 text-gray-500">&gt; 75%</td>
                    <td className="py-4 text-gray-400">20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}