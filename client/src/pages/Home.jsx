import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import { Button } from '../components/ui/button';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-spin flex inset-0 shadow-xl shadow-primary/20"></div>
        <p className="mt-6 text-primary font-bold tracking-widest uppercase animate-pulse">Loading Magic...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        { /* Vibrant Storefront Hero Section */ }
        <header className="flex flex-col items-center text-center mb-24 md:mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-full pointer-events-none -z-10"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-border mb-8">
            <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
            <span className="text-sm font-semibold text-foreground">New Arrivals are Live</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight mb-8">
            Shop the <span className="gradient-text">Future</span> of <br/> Premium Goods.
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-2xl mb-12">
            Discover mind-blowing products that bring joy to your everyday life. Fast shipping. Gorgeous unboxing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl px-10 py-7 text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1">
              <Link to="/products">Start Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-10 py-7 text-lg border-2 hover:bg-surface-container-low transition-all">
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </header>

        { /* Section Break utilizing whitespace */ }
        <div className="py-12">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-extrabold tracking-tight">Trending Now 🔥</h2>
             <Link to="/trending" className="text-primary font-bold hover:underline">View All</Link>
           </div>
           
           <ProductList />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

