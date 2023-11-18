import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Singleproduct from "./components/Singleproduct";
import Cart from "./components/Cart";
import Layout from "./components/Layout";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Signin from "./components/Signin";
import Success from "./components/Success";
import Myprofile from "./components/Myprofile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Header />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="singleproduct/:id" element={<Singleproduct />} />
        <Route path="success" element={<Success />} />
        <Route path="myprofile" element={<Myprofile />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
