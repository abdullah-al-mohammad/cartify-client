import Banner from '../Banner/Banner'
import Products from '../products/Products'

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="max-w-screen-xl mx-auto">
        <Products></Products>
      </div>
    </>
  )
}

export default Home
