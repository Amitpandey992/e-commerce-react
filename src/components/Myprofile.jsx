import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../features/authentication/authSlice";

function Myprofile() {
  const userDetails = useSelector(state => state.userDetails)
  const loggedInUser = userDetails.find(user => user.loginStatus === true);
  const dispatch = useDispatch()
  const signOut = () => {
    dispatch(logOutUser({name: loggedInUser.name, email: loggedInUser.email, password: loggedInUser.password}))
    console.log("user is signed out");
  }

  return (
    <>
      {loggedInUser ?
        (
          <div className="h-screen dark:bg-black dark:text-white p-6 pt-10 overflow-y-auto">
            <h1 className="text-2xl text-center mt-10 border-b p-3 rounded-lg">Hey {loggedInUser.name}, Here's Your order details</h1>
            {loggedInUser.userCart.map(cartItem =>
              <div key={cartItem.id} className="flex justify-between p-[10rem] items-center">
                <img src={cartItem.image} alt="img" className="h-[150px] w-[150px]" />
                <h1>{cartItem.quantity}</h1>
                <h1>${cartItem.price}</h1>
              </div>
            )}
            <div className="flex justify-center items-center">
              <button className="dark:bg-white dark:text-black px-5 py-3 rounded-lg dark:hover:bg-black dark:hover:text-white dark:hover:border dark:hover:border-gray-800" onClick={signOut}>You Can Sign Out</button>
            </div>
          </div>
        ) :
        (
          <div className="h-screen dark:bg-black dark:text-white p-6 pt-10">
            <h1 className="text-2xl text-center mt-10 border-b p-3 rounded-lg mb-10">Hey Annonymous, You Need to login First</h1>
            <Link to="/signin" className="flex justify-center items-center">
              <button className="dark:bg-white dark:text-black px-10 py-3 rounded-lg dark:hover:bg-black dark:hover:text-white dark:hover:border dark:hover:border-gray-800">sign-in</button>
            </Link>
          </div>
        )
      }
    </>
  )
}

export default Myprofile