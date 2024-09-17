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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, UserRound } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // State to store the username
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    // Fetch the username from localStorage after the component mounts
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
    setUsername(null);
    setShowDropdown(false);
    navigate("/Signin");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div
      className="flex items-end justify-between text-white ml-auto mr-auto p-[8px_16px_8px_48px] w-full"
      style={{ backgroundColor: "#E42541" }}
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
      <div className="search-box flex-1 mx-5 relative">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Find your Favourite Products"
            className="search-input ml-10 w-3/5 p-2 border-none rounded-full text-lg text-black placeholder-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          />
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
