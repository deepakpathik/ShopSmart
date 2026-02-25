import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <Link to="/" className="text-2xl font-extrabold tracking-tighter gradient-text hover:opacity-80 transition-opacity">
          ShopSmart
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-foreground hover:text-primary font-bold text-sm transition-colors">
            Login
          </Link>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all rounded-full px-6">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col pt-8">
        {children}
      </main>

      <footer className="mt-auto py-8 text-center text-muted-foreground text-sm font-medium border-t border-border/30 bg-surface-container-low/50">
        &copy; {new Date().getFullYear()} ShopSmart Inc. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;
