import React, { useEffect, useState } from 'react';
import ProductCard from '../components/molecules/ProductCard';
import ProductModals from '../components/organisms/ProductModals';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from '../api/productApi';

export default function ProductsPage({ viewMode }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [formError, setFormError] = useState('');

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setApiError('');
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setApiError(err.message || 'Gagal memuat data dari server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({ name: '', price: '', description: '' });
    setFormError('');
    setIsAddOpen(true);
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Nama produk tidak boleh kosong.');
      return;
    }
    const numPrice = Number(formData.price);
    if (!numPrice || numPrice <= 0) {
      setFormError('Harga harus lebih dari 0.');
      return;
    }

    try {
      setIsSubmitting(true);
      const created = await createProduct({
        name: formData.name.trim(),
        price: numPrice,
        description: formData.description.trim() || null,
      });
      setProducts([...products, created]);
      setIsAddOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
    });
    setFormError('');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Nama produk tidak boleh kosong.');
      return;
    }
    const numPrice = Number(formData.price);
    if (!numPrice || numPrice <= 0) {
      setFormError('Harga harus lebih dari 0.');
      return;
    }

    try {
      setIsSubmitting(true);
      const updated = await updateProduct(editProduct.id, {
        name: formData.name.trim(),
        price: numPrice,
        description: formData.description.trim() || null,
      });
      setProducts(products.map((p) => (p.id === editProduct.id ? updated : p)));
      setEditProduct(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDelete = (product) => {
    setDeleteProduct(product);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteProductById(deleteProduct.id);
      setProducts(products.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daftar Produk</h1>
          <p className="text-sm text-slate-500">
            Kelola daftar produk yang terhubung langsung dengan database Prisma.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-xs transition cursor-pointer"
        >
          <span className="text-lg leading-none">+</span> Tambah Produk
        </button>
      </div>

      {/* Search Bar & Counter */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {filteredProducts.length} produk ({viewMode === 'grid' ? 'Grid' : 'List'})
        </span>
      </div>

      {/* State Loading / Error */}
      {isLoading && (
        <div className="text-center py-12 text-sm text-slate-500">
          Memuat data produk dari server...
        </div>
      )}

      {!isLoading && apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm flex items-center justify-between">
          <span>{apiError}</span>
          <button
            onClick={fetchProducts}
            className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Daftar Produk (Grid atau List sesuai Settings) */}
      {!isLoading && !apiError && filteredProducts.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500 mb-6">
          Belum ada produk yang sesuai. Silakan tambah produk baru.
        </div>
      )}

      {!isLoading && !apiError && filteredProducts.length > 0 && (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6'
              : 'flex flex-col gap-3 mb-6'
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      {/* Footer Info */}
      <p className="text-xs text-slate-500">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {/* Modals Component */}
      <ProductModals
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        deleteProduct={deleteProduct}
        setDeleteProduct={setDeleteProduct}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        isSubmitting={isSubmitting}
        handleSaveAdd={handleSaveAdd}
        handleSaveEdit={handleSaveEdit}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}