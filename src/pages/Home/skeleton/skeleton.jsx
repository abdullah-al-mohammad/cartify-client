const Skeleton = () => {
  return (
    <div className="card bg-base-100 shadow-sm animate-pulse py-40">
      <div className="text-center mb-5">
        <h1 className="text-5xl mb-4 font-bold"></h1>
        <p className="text-gray-600">

        </p>
      </div>
      <div className="h-48 bg-gray-300 rounded-t-lg w-full"></div>
      <div className="card-body flex flex-col items-center gap-2">
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>

        <div className="h-5 w-1/2 bg-gray-300 rounded mt-2"></div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
          <div className="h-8 w-12 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
        </div>

        <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );
}

export default Skeleton;
