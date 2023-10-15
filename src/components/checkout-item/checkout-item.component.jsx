import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import './checkout-item.styles.scss';


const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  
  const { name, imageUrl, price, quantity } = cartItem;
  
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  const increaseQuantityHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const decreaseQuantityHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={decreaseQuantityHandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={increaseQuantityHandler}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <span onClick={clearItemHandler}>&#10005;</span>
    </div>
  );
};

export default CheckoutItem;