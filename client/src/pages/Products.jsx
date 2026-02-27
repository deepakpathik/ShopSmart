import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">All Products</h1>
          <p className="text-lg text-muted-foreground w-full max-w-2xl">
            Browse products from all our verified sellers. Use search to find exactly what you need.
          </p>
        </div>
        <ProductList />
      </div>
    </Layout>
  );
};

export default Products;
