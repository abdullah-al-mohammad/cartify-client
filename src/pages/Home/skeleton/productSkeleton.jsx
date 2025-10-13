// src/components/Skeleton/ProductGridSkeleton.jsx

import ProductSkeleton from './skeleton';

export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
    </div>
  );
}
