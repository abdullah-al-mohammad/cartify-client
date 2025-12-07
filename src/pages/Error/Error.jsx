export default function Error({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/755/755014.png"
        className="w-40"
      />

      <h2 className="text-3xl font-semibold mt-4">Something went wrong</h2>
      
      <p className="text-gray-500 mt-2 max-w-md">
        {message || "We couldn't load this page. Please try again."}
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
      >
        Go Home
      </a>
    </div>
  );
}
