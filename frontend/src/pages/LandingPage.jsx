import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Video, Baby } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full font-sans">
      
      {/* 🌟 WARM HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-orange-50 via-rose-50 to-white py-24 px-6 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="bg-white/60 px-4 py-1.5 rounded-full text-nl-primaryTeal font-bold text-sm tracking-wide mb-6 shadow-sm border border-white/50 backdrop-blur-sm">
            AI-Assisted Early Detection
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-nl-darkText mb-6 tracking-tight leading-tight">
            Nurturing Their Future with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nl-primaryTeal to-teal-400">
              Gentle & Smart Screening
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl text-center leading-relaxed">
            A comforting, non-invasive tool helping parents understand their child’s beautiful developmental journey between 6 and 24 months.
          </p>
          
          {/* 🟢 BUTTONS STACKED VERTICALLY */}
          <div className="flex flex-col items-center gap-5 w-full mt-4">
            <Link to="/register" className="w-full sm:w-80 bg-nl-primaryTeal text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-teal-500 transition-all duration-300 text-lg">
              Start Screening Now
            </Link>
            
            <a href="#how-it-works" className="w-full sm:w-80 bg-white text-nl-darkText border-2 border-gray-100 hover:border-orange-200 px-10 py-4 rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg">
              Learn How It Works
            </a>
          </div>

        </div>
      </section>

      {/* ✨ FEATURES SECTION */}
      <section id="how-it-works" className="w-full py-20 px-6 bg-white flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-nl-darkText mb-12 text-center">Gentle Care, Powered by AI</h2>
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {[
            { icon: Brain, title: "Smart Analysis", desc: "Gentle observation of eye tracking and attention span.", color: "bg-blue-50" },
            { icon: Video, title: "No Touch Required", desc: "Uses your standard webcam and warm, soft lights.", color: "bg-orange-50" },
            { icon: Baby, title: "Made for Toddlers", desc: "Tailored to engage little ones without overwhelming them.", color: "bg-rose-50" }
          ].map((feature, idx) => (
            <div key={idx} className={`${feature.color} p-10 rounded-[2.5rem] text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center`}>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <feature.icon className="w-10 h-10 text-nl-primaryTeal" />
              </div>
              <h3 className="text-2xl font-bold text-nl-darkText mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-center">{feature.desc}</p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}