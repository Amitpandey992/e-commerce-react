import { createSlice } from "@reduxjs/toolkit";

function getLocalUserDetails() {
  const localUser = localStorage.getItem("user");
  return JSON.parse(localUser) || [];
}

const initialState = {
  userDetails: getLocalUserDetails(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("Before login - userDetails:", state.userDetails);

      const updatedUserDetails = state.userDetails.map((user) =>
        user.name === action.payload &&
        user.email === action.payload &&
        user.password === action.payload
          ? { ...user, loginStatus: true }
          : user
      );
      state.userDetails = updatedUserDetails;
      localStorage.setItem("user", JSON.stringify(updatedUserDetails));
      console.log("After login - userDetails:", state.userDetails);
    },

    logOutUser: (state, action) => {
      const { name, email, password } = action.payload;
    
      const updatedUserDetails = state.userDetails.map((user) =>
        user.name === name && user.email === email && user.password === password
          ? { ...user, loginStatus: false }
          : user
      );
    
      state.userDetails = updatedUserDetails;
      localStorage.setItem("user", JSON.stringify(updatedUserDetails));
    },

    checkUserStatus: (state, action) => {
      console.log("Before update:", state.userDetails);

      const newUser = action.payload;
      const userExists = state.userDetails.some(
        (user) => user.id === newUser.id
      );

      if (!userExists) {
        state.userDetails = [...state.userDetails, newUser];
        localStorage.setItem("user", JSON.stringify(state.userDetails));

        console.log("After update:", state.userDetails);
      } else {
        alert("you already have an account please login");
        return state;
      }
    },

    addToCart: (state, action) => {
      const loggedInUser = state.userDetails.find(
        (user) => user.loginStatus === true
      );

      if (loggedInUser) {
        const itemIndex = loggedInUser.userCart.findIndex(
          (item) => item.id === action.payload.id
        );

        if (itemIndex >= 0) {
          loggedInUser.userCart[itemIndex].quantity += 1;
          alert("item added to your cart")
        } else {
          const itemQuantity = { ...action.payload, quantity: 1 };
          loggedInUser.userCart.push(itemQuantity);
          alert("item added to your cart")
        }
      } else {
        alert("you did not logged in yet");
        return;
      }

      console.log("Cart Items:", loggedInUser.userCart);
      localStorage.setItem("user", JSON.stringify(state.userDetails));
    },

    removeFromCart: (state, action) => {
      const loggedInUser = state.userDetails.find(
        (user) => user.loginStatus === true
      );

      if (loggedInUser) {
        loggedInUser.userCart = loggedInUser.userCart.filter(
          (item) => item.id !== action.payload
        );
      }
      localStorage.setItem("user", JSON.stringify(state.userDetails));
    },

    clearCart: (state) => {
      const loggedInUser = state.userDetails.find(
        (user) => user.loginStatus === true
      );

      if (loggedInUser) {
        loggedInUser.userCart = [];
      }
    },

    calculateTotal: (state) => {
      const loggedInUser = state.userDetails.find(
        (user) => user.loginStatus === true
      );

      if (loggedInUser) {
        let { total, itemQuantity } = loggedInUser.userCart.reduce(
          (acc, cartItem) => {
            const { price, quantity } = cartItem;
            const itemTotal = price * quantity;

            acc.total += itemTotal;
            acc.itemQuantity += quantity;

            return acc;
          },
          {
            total: 0,
            itemQuantity: 0,
          }
        );
        loggedInUser.totalAmount = total;
        loggedInUser.cartItemQuantity = itemQuantity;
      }
    },

    setQuantity: (state, action) => {
      const loggedInUser = state.userDetails.find(
        (user) => user.loginStatus === true
      );

      if (loggedInUser) {
        loggedInUser.userCart = loggedInUser.userCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      localStorage.setItem("user", JSON.stringify(state.userDetails));
    },
  },
});

export const {
  loginUser,
  logOutUser,
  checkUserStatus,
  addToCart,
  removeFromCart,
  clearCart,
  calculateTotal,
  setQuantity,
} = authSlice.actions;
export default authSlice.reducer;
