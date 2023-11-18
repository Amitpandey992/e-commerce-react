import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="h-screen text-center flex justify-center items-center font-sans dark:bg-black dark:text-white sm:text-xl">
      <Link to="/success">
        <h1 className="font-semibold text-3xl">
           payment completed Successfully And Your Order Has been Placed.✅
        </h1>
      </Link>
    </div>
  );
}

export default Success;
