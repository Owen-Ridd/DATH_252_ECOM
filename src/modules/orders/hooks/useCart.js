import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../store/cartSlice";
export const useCart = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart);
  const addToCart = (product) => {
    dispatch(addCart(product));
  };

  const removeFromCart = (product) => {
    dispatch(delCart(product));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  
  const shipping = 30.0;
  
  const totalAmount = Math.round(subtotal + shipping);

  return {
    cartItems,
    subtotal: Math.round(subtotal),
    totalItems,
    shipping,
    totalAmount,
    addToCart,
    removeFromCart,
    isEmpty: cartItems.length === 0,
  };
};