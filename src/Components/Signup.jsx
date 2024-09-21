import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulating a signup process by storing user details in localStorage
    try {
      // Store user details in localStorage with consistent keys
      localStorage.setItem("username", name);
      localStorage.setItem("useremail", email);
      localStorage.setItem("userpassword", password);

      // Navigate to the login page after signup
      navigate("/login");

      // Clear form fields and error state
      setName("");
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Signup failed. Please try again.");
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
            Already have an account? Log in here.
          </a>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};

export default Signup;
