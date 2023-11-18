/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotal,
  clearCart,
  removeFromCart,
  setQuantity,
} from "../features/authentication/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {
  const userDetails = useSelector(state => state.userDetails);

  const dispatch = useDispatch();

  const increment = (itemId, itemQuantity) => {
    dispatch(setQuantity({ id: itemId, quantity: itemQuantity + 1 }));
  };

  const decrement = (itemId, itemQuantity) => {
    if (itemQuantity === 1) {
      return;
    } else {
      dispatch(setQuantity({ id: itemId, quantity: itemQuantity - 1 }));
    }
  };

  const HandleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(calculateTotal());
    localStorage.setItem("user", JSON.stringify(userDetails));
  }, [userDetails]);

  const loggedInUser = userDetails.find((user) => user.loginStatus === true);

  const isCartEmpty = !loggedInUser || loggedInUser.userCart.length === 0;

  return (
    <>
      {isCartEmpty ? (
        <div
          className="flex flex-col justify-center items-center gap-16 h-screen  dark:text-white dark:bg-black"
        >
          <h1 className="font-sans font-bold text-4xl text-gray-800 dark:text-white">
            You don't Have Any item's in your cart
          </h1>
          <Link to="/" className="text-gray-400 mb-20">
            <KeyboardBackspaceIcon /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div
          className="p-9 flex flex-col gap-10 font-sans dark:text-white dark:bg-black"
        >
          <div className="flex justify-between lg:justify-around">
            <h3 className="ml-8 lg:ml-10">PRODUCT</h3>
            <h3>PRICE</h3>
            <h3>QUANTITY</h3>
            <h3>TOTAL</h3>
          </div>
          <hr />

          {loggedInUser?.userCart.map((cart) => (
            <div
              key={cart.id}
              className="flex justify-between items-center lg:justify-around"
            >
              <div className="flex items-center justify-center flex-col gap-4 max-w-[140px]">
                <img
                  src={cart.image}
                  alt="image"
                  className="w-[130px] h-[130px] m-auto"
                />
                <p className="text-center text-gray-800 dark:text-white">
                  {cart.title}
                </p>

                <button onClick={() => dispatch(removeFromCart(cart.id))}>
                  <DeleteIcon />
                </button>
              </div>

              <p>${cart.price}</p>

              <div className="flex justify-center items-center gap-2">
                <button onClick={() => decrement(cart.id, cart.quantity)}>
                  <RemoveCircleIcon />
                </button>
                <div
                  className="w-6 h-7 rounded lg:appearance-none text-center border-2 border-black"
                  disabled
                >
                  {cart.quantity}
                </div>
                <button onClick={() => increment(cart.id, cart.quantity)}>
                  <AddCircleIcon />
                </button>
              </div>
              <p>${Math.round(cart.price * cart.quantity)}</p>
            </div>
          ))}

          <hr />

          <div className="flex flex-col-reverse gap-10 justify-around items-center lg:flex-row lg:gap-[30rem]">
            <button
              className="px-[65px] py-3 text-gray-800 font-semibold border-gray-400 border hover:bg-blue-700 hover:text-white rounded dark:text-white"
              onClick={HandleClearCart}
            >
              Clear Cart
            </button>

            <div className="flex flex-col space-y-3 gap-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800 text-lg dark:text-white">
                  Subtotal
                </span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  ${Math.round(loggedInUser?.totalAmount)}
                </span>
              </div>

              <div className="flex flex-col gap-3 justify-center items-center">
                <Link
                  to="/success"
                  className="text-center px-[65px] py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Check out
                </Link>
                <Link to="/" className="text-gray-400">
                  <KeyboardBackspaceIcon /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}

export default Cart;
