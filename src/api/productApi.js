const BASE_URL = 'http://localhost:3000/products';

export const getAllProducts = async() => {
    const res = await fetch(BASE_URL);
    const json = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengambil daftar produk');
    }
    return json.data;
};

export const getProductById = async(id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    const json = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.message || 'Produk tidak ditemukan');
    }
    return json.data;
};

export const createProduct = async(payload) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal menambahkan produk');
    }
    return json.data;
};

export const updateProduct = async(id, payload) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal memperbarui produk');
    }
    return json.data;
};

export const deleteProductById = async(id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal menghapus produk');
    }
    return json;
};