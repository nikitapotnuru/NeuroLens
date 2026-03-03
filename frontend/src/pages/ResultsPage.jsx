import React from 'react';
import { Download, Mail, AlertTriangle, CheckCircle, Info, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ResultsPage() {
  
  // 3-Way Comparison Mock Data based on your logic
  // RT = Reaction Time (ms), AS = Attention Span (sec)
  const comparisonData =[
    { metric: 'Avg Reaction Time (ms)', subject: 650, normal: 350, autistic: 680 },
    { metric: 'Attention Span (sec)', subject: 2.1, normal: 6.5, autistic: 1.8 },
    { metric: 'Gaze Accuracy (%)', subject: 45, normal: 90, autistic: 40 },
  ];

  // AI Logic: Calculate alignment with autistic dataset
  // For prototype, we mock the calculated alignment percentage
  const autismAlignmentPercentage = 68; // e.g., aligns 68% with autistic dataset
  const thresholdMet = autismAlignmentPercentage >= 50;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl w-full">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-nl-darkText flex items-center gap-3">
              <FileText className="w-8 h-8 text-nl-primaryTeal" /> AI Analysis Report
            </h1>
            <p className="text-gray-500 mt-1">References guidelines from the WHO and CDC.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-nl-primaryTeal text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-teal-600 transition-all">
              <Download className="w-5 h-5" /> Download Report
            </button>
          </div>
        </div>

        {/* 🟢 THE 50% THRESHOLD INTERPRETATION CARD */}
        <div className={`w-full p-8 rounded-[2rem] shadow-sm border mb-8 flex flex-col md:flex-row items-center justify-between ${thresholdMet ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center bg-white shadow-md border-4 ${thresholdMet ? 'border-orange-400' : 'border-green-400'}`}>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-[-4px]">Alignment</span>
              <span className={`text-4xl font-extrabold ${thresholdMet ? 'text-orange-500' : 'text-green-500'}`}>{autismAlignmentPercentage}%</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Screening Feedback</h2>
              <div className="flex items-center gap-2 mt-2">
                {thresholdMet ? <AlertTriangle className="w-6 h-6 text-orange-500" /> : <CheckCircle className="w-6 h-6 text-green-500" />}
                <span className={`text-lg font-bold ${thresholdMet ? 'text-orange-600' : 'text-green-600'}`}>
                  {thresholdMet ? "Indicates Chances of Autism Traits" : "Typical Developmental Responses"}
                </span>
              </div>
            </div>
          </div>
          <div className="max-w-md bg-white/70 p-5 rounded-2xl border border-white text-sm text-gray-700 shadow-sm leading-relaxed">
            <p className="font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4 text-nl-primaryTeal" /> Clinical Context:</p>
            As per defined AI logic, subject data is compared against WHO/CDC normal datasets and clinical autistic datasets. 
            Because the subject's behavioral data aligns <b>{autismAlignmentPercentage}%</b> with the autistic dataset (which is &ge; 50%), there are chances the subject is exhibiting traits associated with autism. <i>Consult a pediatrician for formal diagnosis.</i>
          </div>
        </div>

        {/* 🟢 3-WAY DATA COMPARISON VISUALIZATION */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-8 w-full flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Dataset Comparison Analysis</h3>
          <p className="text-gray-500 mb-8 text-center text-sm">Subject (Leo) vs. Normal Dataset (WHO/CDC) vs. Autistic Dataset</p>
          
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                
                {/* The 3 Bars */}
                <Bar name="Neurotypical Dataset (WHO/CDC)" dataKey="normal" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                <Bar name="Autistic Dataset" dataKey="autistic" fill="#FFD54F" radius={[4, 4, 0, 0]} />
                <Bar name="Subject's Data (Leo)" dataKey="subject" fill="#4DB6AC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}