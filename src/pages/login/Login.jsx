import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './login.css';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loginUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  // if (loading) {
  //   return <span>loading....</span>;
  // }

  const onSubmit = async data => {
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then(async result => {
        if (result.user) {
          reset();
          navigate(from, { replace: true });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen pt-20">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-bold_red-0">Login now</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl loginBG">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              {/* email field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register('email')}
                  className="input input-bordered"
                  required
                />
              </div>
              {/* password field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="password"
                    {...register('password', {
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/,
                    })}
                    className="input input-bordered"
                    required
                  />
                  <p
                    className="absolute right-7 bottom-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </p>
                </div>
                {errors.password?.type === 'required' && (
                  <span className="text-red-500">password is required</span>
                )}
                {errors.password?.type === 'minLength' && (
                  <span className="text-red-500">password must be 6 characters</span>
                )}
                {errors.password?.type === 'maxLength' && (
                  <span className="text-red-500">password must be less than 20 characters</span>
                )}
                {errors.password?.type === 'pattern' && (
                  <span className="text-red-500">
                    Password must contain at least one uppercase letter, one lowercase letter, one
                    number, and one special character.
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-bold_red-0 border-bold_red-0 text-white transition duration-500 ease-in-out hover:bg-white hover:text-bold_red-0 px-8">
                  Login
                </button>
              </div>
            </form>
            <p className="p-5">
              Don't have an account?{' '}
              <Link className="text-success" to={'/register'}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
