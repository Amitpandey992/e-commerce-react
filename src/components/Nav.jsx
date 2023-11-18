import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "../features/authentication/authSlice";
import { useTheme } from "../contexts/ThemeContext";
import { Avatar } from "@mui/material";

function Nav() {
  //handling menu icon
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.documentElement.classList.toggle("nav-menu-open", !isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(true);
  };

  // handling theme
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const handleThemeToggle = () => {
    if (themeMode === "light") {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
    localStorage.setItem("themeMode", JSON.stringify(themeMode));
  }, [themeMode]);

  //handle cart items for add to cart with total quantity and ammount!
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();

  const handleCartQuantity = () => {
    const user = userDetails.find(user => user.loginStatus === true);

    if(user && user.cartItemQuantity) {
      return user.cartItemQuantity;
    }
    else {
      return 0;
    }
  };
  // const currentCartQuantity = handleCartQuantity();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [userDetails]);


  return (
    <div className="flex justify-between items-center p-8 font-sans dark:text-white dark:bg-black">
      <Link to="/" className="text-start text-2xl font-bold ml-8">
        Shopidise
      </Link>

      <div className="hidden lg:flex justify-between items-center gap-16 mr-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-purple-500" : ""} font-bold text-lg`
          }
          onClick={handleMenuItemClick}
        >
          Home
        </NavLink>
        <div onClick={handleMenuItemClick}>
         
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `${isActive ? "text-purple-500" : ""} font-bold text-lg`
              }
            >
              Sign In
            </NavLink>

        </div>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `${
              isActive ? "text-purple-500" : "text-neutral-950"
            } font-bold text-lg`
          }
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${
              isActive ? "text-purple-500" : "text-neutral-950"
            } font-bold text-lg`
          }
        >
          <ShoppingBagIcon />

          <span className="rounded-[50%] py-1 px-2 bg-black text-white text-xs text-center">
            {handleCartQuantity()}
          </span>
        </NavLink>
        <NavLink to="/myprofile">
          <Avatar />
        </NavLink>

        {themeMode === "light" ? (
          <div className="cursor-pointer" onClick={handleThemeToggle}>
            <ToggleOffIcon />
          </div>
        ) : (
          <div className="cursor-pointer" onClick={handleThemeToggle}>
            <ToggleOnOutlinedIcon />
          </div>
        )}
      </div>
      <div className="lg:hidden">
        {themeMode === "light" ? (
          <div className="cursor-pointer" onClick={handleThemeToggle}>
            <ToggleOffIcon />
          </div>
        ) : (
          <div className="cursor-pointer" onClick={handleThemeToggle}>
            <ToggleOnOutlinedIcon />
          </div>
        )}
      </div>

      {isMenuOpen ? (
        <div className="cursor-pointer lg:hidden" onClick={toggleMenu}>
          <MenuIcon />
        </div>
      ) : (
        <div className="fixed top-0 left-0 h-screen w-screen bg-white z-10 dark:text-white dark:bg-black">
          <div className="flex flex-col items-center gap-4 text-center justify-center h-full">
            <div className="fixed top-0 right-0 cursor-pointer m-6">
              <CancelSharpIcon onClick={toggleMenu} />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "text-purple-500" : "text-neutral-950"
                } font-bold text-lg`
              }
              onClick={handleMenuItemClick}
            >
              Home
            </NavLink>
            <div onClick={handleMenuItemClick}>
              
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `${isActive ? "text-purple-500" : ""} font-bold text-lg`
                  }
                >
                  Sign In
                </NavLink>
         
            </div>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${
                  isActive ? "text-purple-500" : "text-neutral-950"
                } font-bold text-lg`
              }
              onClick={handleMenuItemClick}
            >
              SignUp
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${
                  isActive ? "text-purple-500" : "text-neutral-950"
                } font-bold text-lg`
              }
              onClick={handleMenuItemClick}
            >
              <ShoppingBagIcon />

              <span className="rounded-[50%] p-1 px-2 bg-black text-white text-center text-xs">
                {handleCartQuantity()}
              </span>
            </NavLink>
            <NavLink to="/myprofile" onClick={handleMenuItemClick}>
              <Avatar />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
