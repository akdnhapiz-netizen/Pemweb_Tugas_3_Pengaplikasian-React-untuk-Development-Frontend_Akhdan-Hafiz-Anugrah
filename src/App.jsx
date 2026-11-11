import React, { useState } from 'react';

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

  // Format Rupiah
  const formatRupiah = (number) => {
    return 'Rp' + Number(number).toLocaleString('id-ID');
  };

  // Filter Search
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers Modal Tambah
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

  // Handlers Modal Edit
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
        p.id === editProduct.id
          ? { ...p, name: formData.name.trim(), price: numPrice }
          : p
      )
    );
    setEditProduct(null);
  };

  // Handlers Modal Hapus
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
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {filteredProducts.length} produk
          </span>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between"
            >
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
                  onClick={() => handleOpenEdit(product)}
                  className="flex-1 py-1.5 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleOpenDelete(product)}
                  className="flex-1 py-1.5 px-3 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <p className="text-xs text-slate-500">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>

        {/* MODAL TAMBAH PRODUK */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setIsAddOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
              <h2 className="text-lg font-bold text-slate-900">Tambah Produk</h2>
              <p className="text-xs text-slate-500 mb-4">Masukkan informasi produk baru.</p>

              <form onSubmit={handleSaveAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pulpen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 5000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Harga harus lebih dari 0.</p>
                </div>

                {formError && (
                  <p className="text-xs text-red-500 font-medium">{formError}</p>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    Simpan Produk
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL EDIT PRODUK */}
        {editProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setEditProduct(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
              <h2 className="text-lg font-bold text-slate-900">Edit Produk</h2>
              <p className="text-xs text-slate-500">Perbarui informasi produk yang dipilih.</p>
              <span className="text-xs font-semibold text-slate-400 block mt-2 mb-3">
                ID: {editProduct.id}
              </span>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Harga harus lebih dari 0.</p>
                </div>

                {formError && (
                  <p className="text-xs text-red-500 font-medium">{formError}</p>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditProduct(null)}
                    className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL HAPUS PRODUK */}
        {deleteProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative text-center animate-in fade-in zoom-in-95">
              <button
                onClick={() => setDeleteProduct(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>

              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>

              <h2 className="text-lg font-bold text-slate-900">Hapus Produk?</h2>
              <p className="text-xs text-slate-500 mb-4">Produk yang dihapus tidak dapat dikembalikan.</p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-left">
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  ID: {deleteProduct.id}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{deleteProduct.name}</h4>
                <p className="text-sm font-bold text-blue-600">{formatRupiah(deleteProduct.price)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteProduct(null)}
                  className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2 px-3 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Hapus Produk
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}