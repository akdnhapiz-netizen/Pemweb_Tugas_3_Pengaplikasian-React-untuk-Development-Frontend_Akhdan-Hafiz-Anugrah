import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import { formatRupiah } from '../utils/format';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setErrorMessage(err.message || 'Produk tidak ditemukan.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 mb-6 transition"
      >
        ← Kembali ke Daftar Produk
      </Link>

      {isLoading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-sm text-slate-500">
          Memuat detail produk...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-sm text-red-600 mb-6">{errorMessage}</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition"
          >
            Kembali ke Daftar Produk
          </Link>
        </div>
      )}

      {!isLoading && product && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-100">
            <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-md">
              ID Produk: #{product.id}
            </span>
            {product.updatedAt && (
              <span className="text-xs text-slate-400">
                Terakhir diperbarui: {new Date(product.updatedAt).toLocaleString('id-ID')}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-6">
            {formatRupiah(product.price)}
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Deskripsi Produk
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.description || 'Tidak ada deskripsi untuk produk ini.'}
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition"
          >
            Kembali ke Daftar Produk
          </Link>
        </div>
      )}
    </div>
  );
}