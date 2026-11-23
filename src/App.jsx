import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/molecules/Navbar';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProductsPage viewMode={viewMode} />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route
              path="/settings"
              element={<SettingsPage viewMode={viewMode} setViewMode={setViewMode} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}