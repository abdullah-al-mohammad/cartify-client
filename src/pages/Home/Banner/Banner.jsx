import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import './banner.css';
AOS.init();

const Banner = () => {
  return (
    <div id="banner" className="bannerBg md:h-screen py-40 lg:pb-0">
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
            <Link to={'productDetails#product-section'}>
              {' '}
              <button
                type="button"
                className="btn py-5 px-5 md:px-8 md:py-7  duration-500 transition ease-in-out hover:bg-slate-300 hover:text-cyan-500"
              >
                order now
              </button>{' '}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;
