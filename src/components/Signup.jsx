import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkUserStatus } from "../features/authentication/authSlice";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { loginUser } from "../features/authentication/authSlice";

function Signup() {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      alert("Please fill in all the required fields");
      return;
    }

    // Check if the email is already registered
    const isEmailRegistered = userDetails.some((user) => user.email === email);
    if (isEmailRegistered) {
      alert("This email is already registered. Please use a different email.");
      return;
    }
    // Create an object with the form values
    const userData = {
      id: nanoid(),
      name: userName,
      email,
      password,
      loginStatus: true,
      userCart: [],
    };
    console.log("Form Data:", userData);

    // Dispatch the action to update user details
    console.log("Dispatching checkUserStatus action");
    dispatch(checkUserStatus(userData));

    // Dispatch the action to login the user
    dispatch(loginUser(userData.name, userData.email, userData.password));
    navigate("/cart");
  };

  useEffect(() => {
    console.log(userDetails);
    if (userDetails && userDetails.length > 0) {
      localStorage.getItem("user");
    }
  }, [userDetails]);

  return (
    <div className="flex justify-center items-center dark:bg-black h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="dark:text-white">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal dark:text-white">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleForm}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 dark:text-white"
            >
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="joe rogan"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              id="name_btn"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 dark:text-white"
            >
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="rogan@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              id="email_btn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 dark:text-white"
              type="password"
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
              id="password_btn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the Terms and Conditions
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            type="submit"
            className="mt-6 hover:bg-black dark:hover:bg-white dark:hover:text-black"
            fullWidth
          >
            sign up
          </Button>
        </form>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal dark:text-white"
        >
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-gray-900 dark:hover:text-white"
          >
            Sign In
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export default Signup;
