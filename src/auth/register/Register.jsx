import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../assets/auth1.png';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import './register.css';

// image hosting api key
const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile, user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();

  const onSubmit = async data => {
    const email = data.email;
    const password = data.password;
    const confirmPass = data.confirmPassword;
    const name = data.name;
    const formData = new FormData();
    formData.append('image', data.image[0]);

    if (password !== confirmPass) {
      return setError("password don't match");
    } else {
      setError('');
    }
    registerUser(email, password)
      .then(async Result => {
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: { 'content-type': 'multipart/form-data' },
        });

        if (res.data.success) {
          const imageUrl = res.data.data.display_url;

          updateUserProfile(name, imageUrl);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your account has been created successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          const userInfo = {
            name: name,
            email: email,
            image: imageUrl,
          };
          await axiosPublic.post('/users', userInfo);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });
  return (
    <div className="">
      <div className="hero registerBG min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-20">
          <div className="text-center lg:text-left">
            <img className="w-28" src={auth} alt="" />
            <h1 className="text-5xl font-bold">Register now</h1>
          </div>
          <div className="card registerCard shrink-0 shadow-2xl registerBG">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              {/* name field */}
              <div className="form-control">
                <label className="label block">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="Your ame"
                  {...register('name', { required: true })}
                  className="input input-bordered w-full bg-transparent"
                  required
                />
              </div>
              {/* email field */}
              <div className="form-control">
                <label className="label block">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register('email', { required: true })}
                  className="input input-bordered w-full bg-transparent"
                  required
                />
              </div>
              {/* upload photo */}
              <div className="form-control">
                <label className="label block">
                  <span className="label-text">Upload Profile</span>
                </label>
                <input
                  type="file"
                  {...register('image', { required: true })}
                  className="file-input w-full max-w-xs bg-transparent"
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
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/,
                        message:
                          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be 6-20 characters long.',
                      },
                    })}
                    className="input input-bordered w-full bg-transparent"
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
              {/* confirm password field */}
              <div className="form-control">
                <label className="label block">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  {...register('confirmPassword', { required: true })}
                  className="input input-bordered w-full bg-transparent"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {<p className="text-red-500">{error ? error : ''}</p>}
              <div className="form-control mt-6">
                <button className="btn bg-bold_red-0 border-bold_red-0 transition duration-500 ease-in-out hover:bg-white hover:text-black px-8">
                  Register
                </button>
              </div>
            </form>
            <p className="p-5">
              Already have an account?{' '}
              <Link className="text-primary" to={'/login'}>
                Login
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
