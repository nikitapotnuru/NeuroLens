import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Activity, ShieldAlert, HeartHandshake } from 'lucide-react';

import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import SetupPage from './pages/SetupPage';
import DashboardPage from './pages/DashboardPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* 🟢 NAVIGATION BAR */}
      <header className="bg-white shadow-sm sticky top-0 z-40 print:hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-nl-primaryTeal font-extrabold text-2xl">
            <Activity className="w-8 h-8" />
            <span>NeuroLens ASD Screening Tool</span>
          </Link>
          <nav className="hidden md:flex gap-6 font-semibold text-nl-darkText">
            <Link to="/" className="hover:text-nl-primaryTeal transition-colors">Home</Link>
            <Link to="/history" className="hover:text-nl-primaryTeal transition-colors">History</Link>
          </nav>
          <Link to="/register" className="bg-nl-primaryTeal text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-teal-600 transition-all">
            Start Screening
          </Link>
        </div>
      </header>

      {/* 🟢 MAIN CONTENT AREA (Centered) */}
      <main className="flex-grow flex flex-col items-center w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>

      {/* 🟢 FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-auto relative z-30 print:hidden w-full">
        <div className="bg-nl-pastelYellow py-3 px-4 text-center flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-yellow-600" />
            <p className="text-sm font-semibold text-nl-darkText">Disclaimer: NeuroLens ASD Screening Tool is a screening support aid, NOT a medical diagnostic system. Always consult a pediatrician.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center text-center text-sm text-gray-500">
          <HeartHandshake className="w-6 h-6 text-nl-primaryTeal mb-2" />
          <span>© 2026 NeuroLens ASD Screening Tool. Designed with care for early development.</span>
        </div>
      </footer>

      {/* 🟢 THE GLOBAL CHATBOT WIDGET */}
      <div className="print:hidden">
        <Chatbot />
      </div>
      
    </div>
  );
}

export default App;