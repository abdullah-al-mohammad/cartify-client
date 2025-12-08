import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import auth from '../../assets/auth1.png';
import useAuth from '../../hooks/useAuth';
import './login.css';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { loginUser, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await loginUser(email, password);
      if (result.user) {
        reset();
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="hero loginBG min-h-screen pt-20">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">

        {/* Left Side: Logo and Title */}
        <div className="text-center lg:text-left">
          <img className="w-28 mb-4" src={auth} alt="Auth" />
          <h1 className="text-5xl font-bold text-bold_red-0">Login now</h1>
        </div>

        {/* Login Form */}
        <div className="card border-8 border-rose-900 loginCard w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className="input input-bordered bg-transparent border border-green-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  maxLength: { value: 20, message: 'Password must be less than 20 characters' },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/,
                    message:
                      'Password must contain uppercase, lowercase, number, and special character',
                  },
                })}
                className="input input-bordered w-full bg-transparent border-green-400"
              />
              <span
                className="absolute right-5 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn text-white transition duration-500 ease-in-out hover:bg-white hover:text-black w-full">
                Login
              </button>
            </div>
          </form>

          {/* Redirect to Register */}
          <p className="p-5 text-center">
            Don't have an account?{' '}
            <Link className="text-primary font-semibold" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
