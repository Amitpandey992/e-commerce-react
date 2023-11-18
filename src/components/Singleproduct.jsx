import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../features/authentication/authSlice";
import { useDispatch } from "react-redux";

function Singleproduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product) => {
    console.log("Adding to Cart:", product);
    dispatch(addToCart(product));
    alert("Item added successfully in Cart");
    navigate("/cart");
  };

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="w-full h-screen mx-auto flex flex-col items-center justify-center font-sans  gap-7 text-gray-800  p-10 pt-[10rem] dark:bg-black dark:text-white overflow-y-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-[350px] h-[450px]"
      />
      <h2 className="font-semibold text-center dark:text-white">{product.title}</h2>
      <p className="text-center dark:text-white">{product.description}</p>
      <p>
        <span className="text-black text-lg mr-1 dark:text-white">Price</span>: $
        {product.price}
      </p>
      <p>
        <span className="text-black dark:text-white text-lg mr-1">Category</span>:{" "}
        {product.category}
      </p>
      <button
        className="border border-gray-800 p-3 px-8 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white"
        onClick={() => addToCartHandler(product)}
        type="button"
      >
        Add To Cart
      </button>
    </div>
  );
}

export default Singleproduct;
