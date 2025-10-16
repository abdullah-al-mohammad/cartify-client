export default function Skeleton() {
  return (
    <div className="card bg-base-100 shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-300 rounded-t-lg w-full"></div>

      {/* Body placeholder */}
      <div className="card-body flex flex-col items-center gap-2">
        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

        {/* Description (2 lines) */}
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>

        {/* Price */}
        <div className="h-5 w-1/2 bg-gray-300 rounded mt-2"></div>

        {/* Quantity controls */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
          <div className="h-8 w-12 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
        </div>

        {/* Add to cart button */}
        <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );
}
