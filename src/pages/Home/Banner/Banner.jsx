import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowDown } from 'react-icons/fa';
import './banner.css';
AOS.init();

const Banner = ({ ordernow }) => {
  return (
    <div id="banner" className="bannerBg h-screen py-40 lg:pb-0">
      <div className="container mx-auto md:text-start text-white text-wrap text-center p-10">
        <h1
          className="text-4xl md:text-6xl"
          data-aos="fade-in"
          data-aos-easing="ease-in-sine"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-once="true"
        >
          Your Favorite Products,
          <br /> Just a Click Away
        </h1>
        <p
          className="grid md:grid-cols-2 py-6 md:text-2xl"
          data-aos="fade-in"
          data-aos-easing="ease-in-sine"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-once="true"
        >
          From fashion to electronics, we’ve got you covered
        </p>
        <ul
          data-aos="fade-in"
          data-aos-easing="ease-in-sine"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-once="true"
        >
          <li>
            <button
              onClick={ordernow}
              type="button"
              className="flex items-center gap-2 py-5 px-5 md:px-10 md:py-5 md:text-xl 
                  rounded-xl font-semibold
                  bg-white text-black
                  dark:bg-black dark:text-white
                  transition-all duration-500
                  hover:bg-slate-300 hover:text-green-400
                  dark:hover:bg-gray-800 dark:hover:text-green-500  "
            >
              Order Now
              <FaArrowDown />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;
