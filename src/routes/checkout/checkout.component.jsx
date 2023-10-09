import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div>
      <h2>Checkout</h2>
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>{item.quantity}</span>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
      <div>${cartTotal}</div>
    </div>
  );
};

export default CheckoutPage;