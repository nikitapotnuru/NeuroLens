import React from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowRight, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HistoryPage() {
  // Mock history data over several months
  const historyData =[
    { date: 'Oct 2025', age: '13 mos', riskScore: 55, category: 'Moderate Risk' },
    { date: 'Nov 2025', age: '14 mos', riskScore: 50, category: 'Moderate Risk' },
    { date: 'Dec 2025', age: '15 mos', riskScore: 48, category: 'Moderate Risk' },
    { date: 'Jan 2026', age: '16 mos', riskScore: 45, category: 'Moderate Risk' },
    { date: 'Feb 2026', age: '17 mos', riskScore: 42, category: 'Moderate Risk' },
    { date: 'Mar 2026', age: '18 mos', riskScore: 42, category: 'Moderate Risk' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="max-w-5xl w-full">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-nl-darkText flex items-center gap-3">
            <History className="w-8 h-8 text-nl-primaryTeal" /> Screening History
          </h1>
          <p className="text-gray-500 mt-1">Track Leo's developmental progression over time.</p>
        </div>

        {/* LINE CHART FIX */}
<div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-8 w-full">
  <h2 className="text-xl font-bold text-gray-800 mb-6">Behavioral Risk Trend (%)</h2>
  
  {/* Added a strict height style here */}
  <div style={{ width: '100%', height: 350 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={historyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          labelStyle={{ fontWeight: 'bold', color: '#37474F' }}
        />
        <Line 
          type="monotone" 
          dataKey="riskScore" 
          stroke="#4DB6AC" 
          strokeWidth={4}
          dot={{ r: 6, fill: '#4DB6AC', stroke: '#fff', strokeWidth: 2 }} 
          activeDot={{ r: 8, fill: '#3d948c' }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

        {/* HISTORY TABLE */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr className="text-gray-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Child Age</th>
                  <th className="px-6 py-4 font-semibold">Risk Score</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-100">
                {historyData.slice().reverse().map((session, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 font-bold text-gray-800">{session.date}</td>
                    <td className="px-6 py-5">{session.age}</td>
                    <td className="px-6 py-5 font-bold">{session.riskScore}%</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${session.riskScore < 30 ? 'bg-green-100 text-green-700' : session.riskScore < 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {session.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link to="/results" className="inline-flex items-center gap-2 text-nl-primaryTeal hover:text-teal-600 font-semibold transition-colors">
                        <FileText className="w-4 h-4" /> View <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}