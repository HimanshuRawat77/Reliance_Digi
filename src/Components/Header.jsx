import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, ShoppingCart } from "lucide-react";
// import { useAuth } from "../Context/Authcontext";

const Header = () => {
  // const { username, setUsername } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // State to store the username
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch the username from localStorage after the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Set the username in state
    }
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear the username from localStorage
    setUsername(null); // Clear the username in the state
    setShowDropdown(false);
    navigate("/Signin"); // Make sure you're navigating to the correct route
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 w-full bg-[#E42541] text-white">
      {/* Logo */}
      <div
        onClick={() => navigate("/main")}
        className="cursor-pointer flex-shrink-0"
      >
        <img
          className="h-8 w-auto sm:h-10"
          src="https://www.reliancedigital.in/build/client/images/loaders/rd_logo.svg"
          alt="Logo"
        />
      </div>

      {/* Search box */}
      <div className="flex-1 mx-4 sm:mx-8 relative w-full md:w-auto mt-4 md:mt-0">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Find your Favourite Products"
            className="w-full md:w-[30rem] lg:w-[40rem] xl:w-[50rem] p-2 border-none rounded-full text-black placeholder-gray-300 text-sm md:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          />
        </form>
      </div>

      {/* Cart icon */}
      <div
        className="cursor-pointer flex items-center gap-2 ml-4 sm:ml-8 mt-4 md:mt-0"
        onClick={() => navigate("/cart")}
      >
        <ShoppingCart color="white" height={20} width={20} />
        <span className="hidden md:inline text-white">Cart</span>
      </div>

      {/* User Login/Dropdown */}
      <div className="relative ml-4 sm:ml-8 mt-4 md:mt-0">
        {username ? (
          <>
            {/* Hi Username button */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDropdownToggle}
            >
              <UserRound color="white" height={20} width={20} />
              <span className="hidden md:inline text-white font-bold">
                Hi {username}
              </span>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
                <ul className="p-2">
                  <li
                    className="cursor-pointer hover:bg-gray-100 p-2"
                    onClick={() => {
                      navigate("/userProfile"); // Navigate to the user profile page
                      setShowDropdown(false);
                    }}
                  >
                    My Profile
                  </li>
                  <li
                    className="cursor-pointer hover:bg-gray-100 p-2"
                    onClick={() => {
                      navigate("/orders");
                      setShowDropdown(false);
                    }}
                  >
                    My Orders
                  </li>
                  <li
                    className="cursor-pointer hover:bg-gray-100 p-2 text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          // Login button for users not logged in
          <div className="flex items-center gap-2">
            <UserRound color="white" height={20} width={20} />
            <button
              className="text-white text-sm md:text-base font-bold"
              onClick={() => navigate("/Signin")} // Ensure you're using the correct route
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
