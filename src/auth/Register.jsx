import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import authLogo from '../assets/auth.png';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import './register.css';

const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile, user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const onSubmit = async data => {
    const { name, email, password, confirmPassword, image } = data;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError('');

    try {
      const result = await registerUser(email, password);
      const formData = new FormData();
      formData.append('image', image[0]);
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;
        await updateUserProfile(name, imageUrl);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account created successfully',
          showConfirmButton: false,
          timer: 1500,
        });

        await axiosPublic.post('/users', { name, email, image: imageUrl });
      }
    } catch (err) {
      setError('Registration failed. Please try again.', err);
    }
  };

  return (
    <div className="hero registerBG min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        <div className="text-center lg:text-left">
          <img className="w-28 mb-4" src={authLogo} alt="authLogo" />
          <h1 className="text-5xl font-bold">Register now</h1>
        </div>
        <div className="card registerCard shrink-0 shadow-2xl registerBG">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                {...register('name', { required: true })}
                className="input input-bordered w-full bg-transparent"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
                className="input input-bordered w-full bg-transparent"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Profile</span>
              </label>
              <input
                type="file"
                {...register('image', { required: true })}
                className="file-input w-full max-w-xs bg-transparent"
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/,
                    message:
                      'Password must contain uppercase, lowercase, number, and special character.',
                  },
                })}
                className="input input-bordered w-full bg-transparent"
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', { required: true })}
                className="input input-bordered w-full bg-transparent"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="form-control mt-6">
              <button className="btn bg-bold_red-0 border-bold_red-0 transition duration-500 hover:bg-white hover:text-black w-full">
                Register
              </button>
            </div>
          </form>
          <p className="p-5 text-center">
            Already have an account?{' '}
            <Link className="text-primary font-semibold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
