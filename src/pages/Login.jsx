import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handle = (e) => {
    e.preventDefault();
    if (login(username, password)) nav("/");
    else setError("Invalid credentials");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handle} className="space-y-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border p-2"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link className="text-blue-500" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}
