import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Activity, ShieldAlert, HeartHandshake } from 'lucide-react';

// Import Pages
import LandingPage from './pages/Landingpage';
import RegistrationPage from './pages/RegistrationPage';
import SetupPage from './pages/SetupPage';
import DashboardPage from './pages/DashboardPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';

// IMPORT THE NEW CHATBOT
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVIGATION BAR */}
      <header className="bg-nl-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-nl-primaryTeal font-extrabold text-2xl">
            <Activity className="w-8 h-8" />
            <span>NeuroLens</span>
          </Link>
          <nav className="hidden md:flex gap-6 font-semibold text-nl-darkText">
            <Link to="/" className="hover:text-nl-primaryTeal transition-colors">Home</Link>
            <Link to="/history" className="hover:text-nl-primaryTeal transition-colors">History</Link>
          </nav>
          <Link to="/register" className="bg-nl-primaryTeal text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-nl-primaryTealHover transition-all">
            Start Screening
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-auto relative z-30">
        <div className="bg-nl-pastelYellow py-3 px-4 text-center flex items-center justify-center gap-2">
          <ShieldAlert className="w-5 h-5 text-nl-modRisk" />
          <p className="text-sm font-semibold text-nl-darkText">Disclaimer: NeuroLens is a screening support tool, NOT a medical diagnostic system. Always consult a pediatrician.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <HeartHandshake className="w-5 h-5 text-nl-primaryTeal" />
            <span>© 2026 NeuroLens. Designed with care for early development.</span>
          </div>
        </div>
      </footer>

      {/* 🟢 THE GLOBAL CHATBOT WIDGET */}
      <Chatbot />
      
    </div>
  );
}

export default App;