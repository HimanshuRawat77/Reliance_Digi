// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserRound, ShoppingCart } from "lucide-react";

// const Header = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState(null); // State to store the username
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query

//   useEffect(() => {
//     // Fetch the username from localStorage after the component mounts
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleDropdownToggle = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("username"); // Clear the username from localStorage
//     setUsername(null);
//     setShowDropdown(false);
//     navigate("/Signin");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <div
//       className="flex items-end justify-between text-white ml-auto mr-auto p-[8px_16px_8px_48px] w-full"
//       style={{ backgroundColor: "#E42541" }}
//     >
//       {/* Logo */}
//       <div onClick={() => navigate("/main")} className="cursor-pointer">
//         <img
//           className="ml-[12px]"
//           src="https://www.reliancedigital.in/build/client/images/loaders/rd_logo.svg"
//           alt="Logo"
//         />
//       </div>

//       {/* Search box */}
//       <div className="search-box flex-1 mx-5 relative">
//         <form onSubmit={handleSearch}>
//           <input
//             type="search"
//             placeholder="Find your Favourite Products"
//             className="search-input ml-10 w-3/5 p-2 border-none rounded-full text-lg text-black placeholder-gray-300"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
//           />
//         </form>
//       </div>

//       {/* Cart icon */}
//       <div
//         className="cursor-pointer flex items-center gap-2"
//         onClick={() => navigate("/cart")}
//       >
//         <ShoppingCart color="white" height={20} width={20} />
//         <span className="text-white">Cart</span>
//       </div>

//       {/* User Login/Dropdown */}
//       <div className="relative ml-4">
//         {username ? (
//           <>
//             {/* Hi Username button */}
//             <div
//               className="flex items-center gap-2 cursor-pointer"
//               onClick={handleDropdownToggle}
//             >
//               <UserRound color="white" height={20} width={20} />
//               <span className="text-white font-bold">Hi {username}</span>
//             </div>

//             {/* Dropdown Menu */}
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
//                 <ul className="p-2">
//                   <li
//                     className="cursor-pointer hover:bg-gray-100 p-2"
//                     onClick={() => {
//                       navigate("/userProfile"); // Change this line to navigate to the userProfile page
//                       setShowDropdown(false);
//                     }}
//                   >
//                     My Profile
//                   </li>
//                   <li
//                     className="cursor-pointer hover:bg-gray-100 p-2"
//                     onClick={() => {
//                       navigate("/orders");
//                       setShowDropdown(false);
//                     }}
//                   >
//                     My Orders
//                   </li>
//                   <li
//                     className="cursor-pointer hover:bg-gray-100 p-2 text-red-500"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </>
//         ) : (
//           // Login button for users not logged in
//           <div className="flex justify-center items-center gap-2">
//             <UserRound color="white" height={20} width={20} />
//             <button
//               className="text-white text-[1rem] font-bold"
//               onClick={() => navigate("/Signin")}
//             >
//               Login
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, UserRound } from "lucide-react"; // Example icons, replace with your icons

const Header = ({ username, handleLogout }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search page with the search term as a query parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="flex items-end justify-between text-white ml-auto mr-auto p-[8px_16px_8px_48px] w-full"
      style={{ backgroundColor: "#E42541" }} // Red background color
    >
      {/* Logo */}
      <div onClick={() => navigate("/main")} className="cursor-pointer">
        <img
          className="ml-[12px]"
          src="https://www.reliancedigital.in/build/client/images/loaders/rd_logo.svg"
          alt="Logo"
        />
      </div>

      {/* Search box */}
      <div className="flex-1 flex justify-center items-center mx-5">
        <form
          onSubmit={handleSearchSubmit}
          className="flex justify-between items-center w-3/5 relative"
        >
          <input
            type="search"
            placeholder="Find your favorite products"
            className="pl-4 pr-10 py-2 rounded-full w-full text-lg text-black placeholder-gray-500"
            value={searchQuery}
            onChange={handleSearchInput}
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Cart icon */}
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={() => navigate("/cart")}
      >
        <ShoppingCart color="white" height={20} width={20} />
        <span className="text-white">Cart</span>
      </div>

      {/* User Login/Dropdown */}
      <div className="relative ml-4">
        {username ? (
          <>
            {/* Hi Username button */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDropdownToggle}
            >
              <UserRound color="white" height={20} width={20} />
              <span className="text-white font-bold">Hi {username}</span>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
                <ul className="p-2">
                  <li
                    className="cursor-pointer hover:bg-gray-100 p-2"
                    onClick={() => {
                      navigate("/userProfile");
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
          <div className="flex justify-center items-center gap-2">
            <UserRound color="white" height={20} width={20} />
            <button
              className="text-white text-[1rem] font-bold"
              onClick={() => navigate("/Signin")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
