import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    } else {
      try {
        const response = await fetch(
          "https://academics.newtonschool.co/api/v1/user/login",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              projectID: "bng7dtu7whwk",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              appType: "ecommerce",
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          navigate("/main");
          setEmail("");
          setPassword("");
          setError("");
        } else {
          setError(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error logging in");
      }
    }
  };

  return (
    <div className="oc">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mt-12">
          <h1 className="text-2xl mb-5">Log in</h1>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="text"
            className="w-72 p-2 mb-2 border border-gray-300 rounded-lg mt-5"
            placeholder="Email"
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
            className="w-80 p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 text-lg"
          >
            PROCEED
          </button>
          <p className="mt-5 text-sm">
            Create an account?{" "}
            <Link to="/signup" className="text-red-400 hover:underline">
              Register
            </Link>
          </p>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default Signin;
