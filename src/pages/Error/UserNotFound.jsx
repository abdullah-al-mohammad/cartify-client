import { Link } from "react-router-dom";

export default function UserNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-4xl font-semibold text-gray-800">User Not Found</h1>

      <img
        className="w-64 mt-6"
        src="https://cdni.iconscout.com/illustration/premium/thumb/user-not-found-illustration-download-in-svg-png-gif-file-formats--missing-profile-avatar-login-pack-people-illustrations-7894813.png"
        alt="user not found"
      />

      <p className="text-gray-500 mt-3">
        We couldn’t find the user you are looking for.
      </p>
      <p className="text-gray-500 mt-3">
       {error.message}
      </p>

      <Link
        to="/login"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
}
