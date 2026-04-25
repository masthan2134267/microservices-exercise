import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCartMessage } from "../features/cart/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();

  const {
    cartItems,
    loading,
    error,
    successMessage
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearCartMessage());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const handleAddToCart = (product) => {
    if (!product.stock || Number(product.stock) <= 0) {
      alert("No stock available");
      return;
    }

    dispatch(
      addToCart({
        cartId: 1,
        productId: product.id,
        quantity: 1
      })
    );
  };

  return {
    cartItems,
    cartLoading: loading,
    cartError: error,
    cartSuccessMessage: successMessage,
    handleAddToCart
  };
};