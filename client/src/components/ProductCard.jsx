import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const ProductCard = ({ product }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden border border-border bg-white rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="h-56 w-full p-6 bg-white flex items-center justify-center flex-none">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain" 
        />
      </div>
      
      <CardHeader className="pb-2 flex-none px-5">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          {product.category}
        </div>
        <CardTitle className="text-base font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[3rem]">
          {product.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 px-5 pb-5">
        <div className="flex items-end justify-between mt-auto pt-4">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-amber-400 text-base">★</span>
              <span className="text-gray-600">{product.rating.rate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
