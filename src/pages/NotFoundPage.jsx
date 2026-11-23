import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center">
      <p className="text-6xl font-extrabold text-blue-600 mb-3">404</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        URL yang Anda tuju tidak terdaftar atau telah dipindahkan.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}