/* eslint-disable react/no-unescaped-entities */
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/authentication/authSlice";

function Signin() {
  const navigate = useNavigate(true);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const user = userDetails.find(
      (userDetail) =>
        userDetail.email === email && userDetail.password === password
    );

    if (user) {
      if (user.loginStatus === true) {
        alert("you are already logged in");
      } else {
        alert(`Welcome ${user.name}`);
        dispatch(loginUser(user.name, user.email, user.password));
        // localStorage.setItem("currLoggedUserId", user.id);
        navigate("/cart");
      }
    } else {
      alert(
        "You don't have any account with these details, please create new account"
      );
      navigate("/signup");
    }
    setEmail("");
    setPassword("");
  };

  return (

    <div className="flex justify-center items-center dark:bg-black h-screen">
      <Card color="transparent" shadow={false} className="mb-[8rem]">
        <Typography variant="h4" color="blue-gray" className="dark:text-white">
          Sign in
        </Typography>

        <form
          className="mt-16 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleForm}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 dark:text-white"
            >
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 dark:text-white"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Typography
            variant="small"
            color="gray"
            className="flex items-center font-normal dark:text-white"
          >
            <a
              href="#"
              className="font-medium transition-colors hover:text-gray-900 mt-3"
            >
              Forgot your password?
            </a>
          </Typography>

          <Button type="submit" className="mt-6  hover:bg-black" fullWidth>
            sign in
          </Button>
        </form>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal dark:text-white"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-gray-900 dark:hover:text-white"
          >
            Sign up
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export default Signin;
