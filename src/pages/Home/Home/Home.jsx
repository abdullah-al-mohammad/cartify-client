import ProductDetails from '../../productDetails/ProductDetails'
import Banner from '../Banner/Banner'
import ProductList from '../productList/ProductList'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-screen-xl mx-auto">
        <ProductList></ProductList>
        {/* <ProductDetails></ProductDetails> */}
      </div>
    </div>
  )
}

export default Home
