import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Baby, AlertCircle } from 'lucide-react';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ parentName: '', email: '', phone: '', childName: '', childAge: '', consent: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) return;
    navigate('/setup'); 
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-rose-50 w-full">
      <div className="max-w-xl w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-white flex flex-col items-center text-center transform transition-all duration-500 hover:shadow-orange-100/50">
        
        <div className="bg-rose-100 p-4 rounded-full mb-6">
          <Baby className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-nl-darkText mb-2">Welcome to NeuroLens</h2>
        <p className="text-gray-500 mb-8 w-full">Let's set up your child's secure screening profile.</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6 flex flex-col items-center">
          
          {/* Centered Inputs */}
          <div className="w-full space-y-4">
            {['parentName', 'email', 'childName'].map((field, idx) => (
              <div key={idx} className="flex items-center bg-gray-50 rounded-2xl p-3 border border-gray-100 focus-within:border-nl-primaryTeal focus-within:ring-2 focus-within:ring-teal-100 transition-all">
                <User className="text-gray-400 w-6 h-6 ml-2 mr-3" />
                <input type={field === 'email' ? 'email' : 'text'} name={field} placeholder={field.replace(/([A-Z])/g, ' $1').trim()} required
                  className="bg-transparent border-none w-full text-gray-700 py-2 px-2 focus:outline-none text-center"
                  onChange={handleChange} />
              </div>
            ))}
             <div className="flex items-center bg-gray-50 rounded-2xl p-3 border border-gray-100 focus-within:border-nl-primaryTeal focus-within:ring-2 focus-within:ring-teal-100 transition-all">
                <AlertCircle className="text-gray-400 w-6 h-6 ml-2 mr-3" />
                <input type="number" name="childAge" min="6" max="24" placeholder="Child's Age (6-24 months)" required
                  className="bg-transparent border-none w-full text-gray-700 py-2 px-2 focus:outline-none text-center"
                  onChange={handleChange} />
              </div>
          </div>

          {/* Consent Checkbox */}
          <div className="w-full mt-4 bg-orange-50/50 p-5 rounded-2xl border border-orange-100 text-left flex items-start cursor-pointer hover:bg-orange-50 transition-colors">
            <input type="checkbox" name="consent" required id="consent"
              className="w-6 h-6 text-nl-primaryTeal border-gray-300 rounded focus:ring-nl-primaryTeal mt-1 cursor-pointer"
              onChange={handleChange} />
            <div className="ml-4 text-sm cursor-pointer">
              <label htmlFor="consent" className="font-bold text-nl-darkText cursor-pointer text-base">
                I warmly consent to this screening.
              </label>
              <p className="text-gray-600 mt-1 leading-relaxed">No video is ever recorded or stored. This tool offers supportive insights, not a medical diagnosis.</p>
            </div>
          </div>

          <button type="submit" disabled={!formData.consent}
            className={`w-full py-4 px-6 rounded-full font-bold text-white shadow-lg transition-all duration-300 text-lg ${
              formData.consent ? 'bg-nl-primaryTeal hover:bg-teal-500 hover:shadow-xl hover:-translate-y-1' : 'bg-gray-300 cursor-not-allowed'
            }`}>
            Continue to Hardware Setup
          </button>
        </form>
      </div>
    </div>
  );
}