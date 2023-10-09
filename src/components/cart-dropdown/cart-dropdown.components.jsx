import Button from '../button/button.component';
import './cart-dropdown.styles.scss';


import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
        {!cartItems.length && <span className='empty-message'>Your cart is empty</span>}
      </div>
      <Button onClick={navigateToCheckout} >GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;