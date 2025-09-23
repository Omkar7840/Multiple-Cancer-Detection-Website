import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CancerDetection from './pages/CancerDetection';
import Header from './components/Header';
import Footer from './components/Footer';

const cancerTypes = [
  {
    id: 'all',
    name: 'Acute Lymphoblastic Leukemia (ALL)',
    description: 'Blood cancer affecting white blood cells',
    color: 'bg-red-500'
  },
  {
    id: 'brain',
    name: 'Brain Cancer',
    description: 'Tumors in brain tissue and nervous system',
    color: 'bg-purple-500'
  },
  {
    id: 'breast',
    name: 'Breast Cancer',
    description: 'Cancer in breast tissue cells',
    color: 'bg-pink-500'
  },
  {
    id: 'cervical',
    name: 'Cervical Cancer',
    description: 'Cancer of the cervix in women',
    color: 'bg-teal-500'
  },
  {
    id: 'kidney',
    name: 'Kidney Cancer',
    description: 'Cancer in kidney cells and tissues',
    color: 'bg-orange-500'
  },
  {
    id: 'lung-colon',
    name: 'Lung and Colon Cancer',
    description: 'Respiratory and digestive system cancers',
    color: 'bg-blue-500'
  },
  {
    id: 'lymphoma',
    name: 'Lymphoma',
    description: 'Cancer of the lymphatic system',
    color: 'bg-green-500'
  },
  {
    id: 'oral',
    name: 'Oral Cancer',
    description: 'Cancer in mouth, tongue, and throat',
    color: 'bg-yellow-500'
  }
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage cancerTypes={cancerTypes} />} />
            <Route path="/detect/:cancerType" element={<CancerDetection cancerTypes={cancerTypes} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;