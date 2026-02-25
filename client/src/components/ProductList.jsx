import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);
        
        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

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
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            selectedCategory === '' 
              ? 'bg-gray-900 text-white shadow-md' 
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-colors ${
              selectedCategory === category 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
