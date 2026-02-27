import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts, fetchTopProducts } from '../services/api';

const ProductList = ({ limit, hideFilter, topOnly }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async (query = '') => {
    try {
      setLoading(true);
      const data = topOnly
        ? await fetchTopProducts()
        : await fetchProducts(query);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [topOnly]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts(search);
  };

  const displayProducts = limit ? products.slice(0, limit) : products;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[400px]">
        <div className="animate-spin h-10 w-10 border-4 border-gray-200 border-t-gray-800 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-red-500 font-medium">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {!hideFilter && (
        <form onSubmit={handleSearch} className="flex gap-3 mb-10 max-w-xl">
          <input
            type="text"
            placeholder="Search products by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Search
          </button>
        </form>
      )}

      {displayProducts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
