import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import ProductModals from './components/ProductModals';

const initialProducts = [
  { id: 1, name: 'Pulpen', price: 5000 },
  { id: 2, name: 'Buku Tulis', price: 12000 },
  { id: 3, name: 'Spidol', price: 8000 },
  { id: 4, name: 'Penggaris', price: 6000 },
  { id: 5, name: 'Penghapus', price: 3000 },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [formError, setFormError] = useState('');

  const formatRupiah = (number) => {
    return 'Rp' + Number(number).toLocaleString('id-ID');
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({ name: '', price: '' });
    setFormError('');
    setIsAddOpen(true);
  };

  const handleSaveAdd = (e) => {
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

    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, name: formData.name.trim(), price: numPrice }]);
    setIsAddOpen(false);
  };

  const handleOpenEdit = (product) => {
    setEditProduct(product);
    setFormData({ name: product.name, price: product.price });
    setFormError('');
  };

  const handleSaveEdit = (e) => {
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

    setProducts(
      products.map((p) =>
        p.id === editProduct.id ? { ...p, name: formData.name.trim(), price: numPrice } : p
      )
    );
    setEditProduct(null);
  };

  const handleOpenDelete = (product) => {
    setDeleteProduct(product);
  };

  const handleConfirmDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteProduct.id));
    setDeleteProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manajemen Produk</h1>
            <p className="text-sm text-slate-500">Kelola daftar produk dan harga dalam satu tempat.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
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
            {filteredProducts.length} produk
          </span>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              formatRupiah={formatRupiah}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>

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
          handleSaveAdd={handleSaveAdd}
          handleSaveEdit={handleSaveEdit}
          handleConfirmDelete={handleConfirmDelete}
          formatRupiah={formatRupiah}
        />
      </div>
    </div>
  );
}