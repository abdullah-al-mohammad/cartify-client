import { Link } from 'react-router-dom'
import './banner.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Banner = () => {
  return (
    <div id='banner' className='bannerBg md:h-screen pt-40 mb-40 pb-96 lg:pb-0'>
      <div className='container mx-auto md:text-start text-white text-wrap text-center p-3'>
        <h1 className='text-4xl md:text-6xl'
          data-aos="fade-in"
          data-aos-easing="ease-in-sine"
          data-aos-offset="200"
          data-aos-duration="2000"
          data-aos-once="true"
        >Join the Lifesaving Mission <br /> Become a Donor</h1>
        <p className='grid md:grid-cols-2 py-6 md:text-2xl'
          data-aos="fade-in"
          data-aos-easing="ease-in-sine"
          data-aos-offset="200"
          data-aos-duration="2000"
          data-aos-once="true"
        >Every drop of blood can make a difference. Donating blood is a simple yet powerful way to save lives. Join our mission to ensure that no one has to suffer due to a shortage of blood.</p>
        <ul
          data-aos="fade-in"
          data-aos-easing="ease-in-sine"
          data-aos-offset="200"
          data-aos-duration="2000"
          data-aos-once="true">
          <li><Link to={'/donation'}
          > <button type="button" className='btn bg-bold_red-0 border-bold_red-0 py-5 px-5 md:px-8 md:py-7 text-base text-slate-300  duration-500 transition ease-in-out hover:bg-slate-300 hover:text-bold_red-0'> Join as a donor </button> </Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Banner
