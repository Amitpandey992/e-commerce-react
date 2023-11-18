import axios from "axios";
import { useEffect, useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/authentication/authSlice";

function Header() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);


  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="h-screen dark:bg-black">
      <div className="grid gap-10 text-center p-14 font-serif font-medium justify-center items-center lg:grid-cols-3 sm:grid-cols-2 dark:bg-black dark:text-gray-300">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-3 border space-y-3 h-[450px]"
          >
            <div className="flex justify-between">
              <Link to={`/singleproduct/${product.id}`}>
                <FullscreenIcon className="cursor-pointer" />
              </Link>
              <div onClick={() => addToCartHandler(product)}>
                <ShoppingBagIcon className="cursor-pointer" />
              </div>
            </div>

            <div className="space-y-4">
              <img
                className="w-[300px] h-[250px] m-auto"
                src={product.image}
                alt="image"
              />
              <p className="text-gray-600">{product.title}</p>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
