import Button from '../button/button.component';
import { useSelector } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const navigateToCheckout = () => navigate('/checkout');
  
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={navigateToCheckout} >GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;