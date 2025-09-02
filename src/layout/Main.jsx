
import { Outlet } from 'react-router-dom'
// import Navbar from '../../pages/Shared/Navbar/Navbar'
// import Footer from '../../pages/Shared/Footer/Footer'
import Navbar from '../pages/Shared/Navbar/Navbar'
import Footer from '../pages/Shared/Footer/Footer'

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-screen'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Main