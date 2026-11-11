import React from 'react';

export default function ProductCard({ product, formatRupiah, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 block mb-1">
          ID: {product.id}
        </span>
        <h3 className="text-base font-bold text-slate-900">{product.name}</h3>
        <p className="text-lg font-bold text-blue-600 mb-4">
          {formatRupiah(product.price)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 py-1.5 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex-1 py-1.5 px-3 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}