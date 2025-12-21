import { useState } from 'react';
import shopping from '../../../assets/shoppingcart.png';
import { useCart } from '../../../provider/CartProvider';
import CartModal from '../../CartModal/CartModal';

const Button = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  return (
    <>
      <button onClick={() => setIsCartOpen(true)}>
        <div className="float-right indicator fixed right-7 bottom-40 bg-slate-100 p-2 rounded-full">
          <img className="max-w-5" src={shopping} alt="" />
          <span className="indicator-item badge bg-red-600">{cart.length}</span>
        </div>
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Button;
