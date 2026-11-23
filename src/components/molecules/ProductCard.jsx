import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import { formatRupiah } from '../../utils/format';

export default function ProductCard({
  product,
  viewMode = 'grid',
  onEdit,
  onDelete,
}) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">
              ID: {product.id}
            </span>
            <Link
              to={`/products/${product.id}`}
              className="text-base font-bold text-slate-900 hover:text-blue-600 transition"
            >
              {product.name}
            </Link>
          </div>
          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
          )}
          <p className="text-base font-bold text-blue-600">
            {formatRupiah(product.price)}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/products/${product.id}`}
            className="py-1.5 px-3 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
          >
            Detail
          </Link>
          <Button variant="secondary" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="dangerOutline" onClick={() => onDelete(product)}>
            Hapus
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 block mb-1">
          ID: {product.id}
        </span>
        <Link
          to={`/products/${product.id}`}
          className="text-base font-bold text-slate-900 hover:text-blue-600 transition block"
        >
          {product.name}
        </Link>
        {product.description && (
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-lg font-bold text-blue-600 mt-2 mb-4">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="space-y-2">
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center py-1.5 px-3 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
        >
          Lihat Detail
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="dangerOutline" className="flex-1" onClick={() => onDelete(product)}>
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}