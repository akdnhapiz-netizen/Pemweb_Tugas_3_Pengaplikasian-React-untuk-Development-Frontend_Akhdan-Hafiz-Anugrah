import React from 'react';
import { Link } from 'react-router-dom';

export default function SettingsPage({ viewMode, setViewMode }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Tampilan</h1>
        <p className="text-sm text-slate-500">
          Atur mode tampilan daftar produk sesuai preferensi Anda.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Mode Tata Letak Produk</h2>
          <p className="text-xs text-slate-500">
            Pilih antara tampilan kartu Grid atau daftar memanjang List.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer ${
              viewMode === 'grid'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <p className="text-sm font-bold text-slate-900">Tampilan Grid</p>
            <p className="text-xs text-slate-500 mt-1">
              Menampilkan produk dalam kartu multi-kolom.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer ${
              viewMode === 'list'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <p className="text-sm font-bold text-slate-900">Tampilan List</p>
            <p className="text-xs text-slate-500 mt-1">
              Menampilkan produk dalam baris vertikal ringkas.
            </p>
          </button>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
          >
            Simpan & Lihat Daftar Produk
          </Link>
        </div>
      </div>
    </div>
  );
}