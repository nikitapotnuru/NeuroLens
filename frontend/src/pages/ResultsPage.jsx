import React from 'react';
import { Download, AlertTriangle, CheckCircle, Info, FileText, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ResultsPage() {
  
  const comparisonData =[
    { metric: 'Avg Reaction Time (ms)', subject: 650, normal: 350, autistic: 680 },
    { metric: 'Attention Span (sec)', subject: 2.1, normal: 6.5, autistic: 1.8 },
    { metric: 'Gaze Accuracy (%)', subject: 45, normal: 90, autistic: 40 },
  ];

  const autismAlignmentPercentage = 68; 
  const thresholdMet = autismAlignmentPercentage >= 50;

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white flex flex-col items-center py-12 px-4 sm:px-6 w-full font-sans">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* PDF ONLY HEADER (Visible only on PDF) */}
        <div className="hidden print:flex flex-col items-center border-b-2 border-gray-200 pb-6 mb-8 w-full text-center">
          <div className="flex items-center justify-center gap-2 text-nl-primaryTeal font-extrabold text-3xl mb-2">
            <Activity className="w-10 h-10" />
            <span>NeuroLens ASD Screening Tool</span>
          </div>
          <p className="text-gray-500 font-bold">Official AI Analysis Report</p>
          <p className="text-gray-400">Date: {new Date().toLocaleDateString()}</p>
        </div>

        {/* 🟢 CENTERED HEADER */}
        <div className="flex flex-col items-center text-center mb-10 w-full print:mb-6">
          <h1 className="text-4xl font-extrabold text-nl-darkText flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-nl-primaryTeal print:hidden" /> Session Report
          </h1>
          <p className="text-lg text-gray-600">Child: <span className="font-bold text-gray-800">Leo (18 mos)</span> • Session ID: #NL-882</p>
          <p className="text-sm text-gray-500 mt-2">References guidelines from the WHO and CDC.</p>
          
          {/* EXPLICITLY HIDDEN IN PDF */}
          <button 
            onClick={() => window.print()}
            className="mt-6 flex items-center justify-center gap-2 bg-nl-primaryTeal text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-teal-600 transition-all print:hidden"
          >
            <Download className="w-5 h-5" /> Download Report (PDF)
          </button>
        </div>

        {/* 🟢 CENTERED THRESHOLD INTERPRETATION CARD */}
        <div className={`w-full p-10 rounded-[2.5rem] shadow-sm border mb-10 flex flex-col items-center text-center print:shadow-none print:border-2 ${thresholdMet ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
          
          <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center bg-white shadow-md border-4 mb-6 print:shadow-none ${thresholdMet ? 'border-orange-400' : 'border-green-400'}`}>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-[-4px]">Alignment</span>
            <span className={`text-5xl font-extrabold ${thresholdMet ? 'text-orange-500' : 'text-green-500'}`}>{autismAlignmentPercentage}%</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Screening Feedback</h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            {thresholdMet ? <AlertTriangle className="w-7 h-7 text-orange-500" /> : <CheckCircle className="w-7 h-7 text-green-500" />}
            <span className={`text-xl font-bold ${thresholdMet ? 'text-orange-600' : 'text-green-600'}`}>
              {thresholdMet ? "Indicates Chances of Autism Traits" : "Typical Developmental Responses"}
            </span>
          </div>
          
          <div className="w-full max-w-2xl bg-white/80 p-6 rounded-3xl border border-white text-base text-gray-700 shadow-sm leading-relaxed print:shadow-none print:border-gray-300">
            <p className="font-bold mb-3 flex items-center justify-center gap-2 text-lg"><Info className="w-5 h-5 text-nl-primaryTeal" /> Clinical Context</p>
            <p>
              As per defined AI logic, subject data is compared against WHO/CDC normal datasets and clinical autistic datasets. 
              Because the subject's behavioral data aligns <b className="text-nl-darkText">{autismAlignmentPercentage}%</b> with the autistic dataset (which is &ge; 50%), there are chances the subject is exhibiting traits associated with ASD.
            </p>
            <p className="mt-4 font-semibold text-nl-darkText italic">Consult a pediatrician for formal diagnosis.</p>
          </div>
        </div>

        {/* 🟢 CENTERED BAR CHART */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10 w-full flex flex-col items-center print:shadow-none print:border-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Dataset Comparison Analysis</h3>
          <p className="text-gray-500 mb-10 text-center text-base">Subject (Leo) vs. Normal Dataset (WHO/CDC) vs. Autistic Dataset</p>
          
          <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                
                <Bar name="Neurotypical Dataset (WHO/CDC)" dataKey="normal" fill="#9ca3af" radius={[6, 6, 0, 0]} />
                <Bar name="Autistic Dataset" dataKey="autistic" fill="#FFD54F" radius={[6, 6, 0, 0]} />
                <Bar name="Subject's Data (Leo)" dataKey="subject" fill="#4DB6AC" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PDF ONLY FOOTER */}
        <div className="hidden print:block text-center text-sm text-gray-400 mt-10 border-t-2 border-gray-100 pt-6 w-full">
          NeuroLens ASD Screening Tool • This document is auto-generated • Not a medical diagnosis.
        </div>

      </div>
    </div>
  );
}