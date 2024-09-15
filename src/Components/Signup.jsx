import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Uncomment this if using toast notifications

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            projectID: "bng7dtu7whwk",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            appType: "ecommerce",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store user details in localStorage to auto-fill the profile later
        localStorage.setItem("username", name);
        localStorage.setItem("useremail", email);
        localStorage.setItem("userpassword", password);

        // Uncomment if using toast notifications
        // toast.success("SignUp Successful! Redirecting to the main page...");

        // Navigate to the main page ("/") after a successful signup
        navigate("/main");

        // Reset form fields and error state
        setName("");
        setEmail("");
        setPassword("");
        setError("");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error signing up");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center mt-12">
        <h1 className="text-2xl mb-5">Register</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          className="w-72 p-2 mb-2 border border-gray-300 rounded-lg mt-5"
          placeholder="Enter your Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          className="w-72 p-2 mb-2 border border-gray-300 rounded-lg"
          placeholder="Enter your E-mail"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          className="w-72 p-2 mb-5 border border-gray-300 rounded-lg"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-80 p-2 bg-red-600 text-white rounded-lg hover:bg-red-800 text-lg"
        >
          Proceed
        </button>
        <p className="mt-5 text-sm">
          <a
            onClick={() => navigate("/login")}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Already have an account?
          </a>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};

export default Signup;
