import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

const ProductCard = ({ product }) => {
  const imageUrl = product.imageUrl
    ? `${API_URL}${product.imageUrl}`
    : null;

  const sellerName = product.seller?.name || product.seller?.email || 'Unknown Seller';

  return (
    <Card className="flex flex-col h-full overflow-hidden border border-border bg-white rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="h-56 w-full p-6 bg-gray-50 flex items-center justify-center flex-none">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-2 flex-none px-5">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          by {sellerName}
        </div>
        <CardTitle className="text-base font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[3rem]">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 px-5 pb-5">
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-end justify-between mt-auto pt-2">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
