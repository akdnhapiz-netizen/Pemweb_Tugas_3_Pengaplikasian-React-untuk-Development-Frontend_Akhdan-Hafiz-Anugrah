import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <NavLink to="/" className="text-base font-bold text-slate-900 tracking-tight">
          Manajemen<span className="text-blue-600">Produk</span>
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Produk
          </NavLink>
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </nav>
      </div>
    </header>
  );
}