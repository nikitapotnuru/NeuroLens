import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Video, Baby, ShieldCheck, Lock, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full font-sans bg-white">
      
      {/* 🌟 WARM HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-orange-50 via-rose-50 to-white py-24 px-6 text-center flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="bg-white/60 px-4 py-1.5 rounded-full text-nl-primaryTeal font-bold text-sm tracking-wide mb-6 shadow-sm border border-white/50 backdrop-blur-sm">
            AI-Assisted Early Detection
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-nl-darkText mb-6 tracking-tight leading-tight">
            Nurturing Their Future with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nl-primaryTeal to-teal-400">
              Gentle & Smart Screening
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            A comforting, non-invasive tool helping parents understand their child’s beautiful developmental journey between 6 and 24 months.
          </p>

          {/* Buttons stacked vertically as requested */}
          <div className="flex flex-col gap-4 justify-center w-full max-w-xs mx-auto">
            <Link to="/register" className="bg-nl-primaryTeal text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-teal-500 transition-all duration-300 text-lg text-center">
              Start Screening Now
            </Link>
            <a href="#how-it-works" className="bg-white text-nl-darkText border-2 border-gray-100 px-10 py-4 rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg text-center">
              Learn How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ✨ FEATURES SECTION (Flashcard Style) */}
      <section id="how-it-works" className="w-full py-20 px-6 bg-gray-50/50 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-nl-darkText mb-16 text-center">Gentle Care, Powered by AI</h2>
        
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {[
            { icon: Brain, title: "Smart Analysis", desc: "Gentle observation of eye tracking and attention span.", color: "border-blue-200" },
            { icon: Video, title: "No Touch Required", desc: "Uses your standard webcam and warm, soft lights.", color: "border-orange-200" },
            { icon: Baby, title: "Made for Toddlers", desc: "Tailored to engage little ones without overwhelming them.", color: "border-rose-200" }
          ].map((feature, idx) => (
            /* Flashcard Styling: White background, defined borders, and deep shadows */
            <div key={idx} className={`bg-white p-10 rounded-[2rem] text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b-4 ${feature.color} hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col items-center`}>
              <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 rotate-3">
                <feature.icon className="w-10 h-10 text-nl-primaryTeal -rotate-3" />
              </div>
              <h3 className="text-2xl font-bold text-nl-darkText mb-4">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}