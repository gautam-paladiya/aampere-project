"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response.data.access_token;
      const decodedToken = jwtDecode(token); // Decode the token
      if (!decodedToken.exp) {
        const message = "Invalid login token";
        toast(message, { type: "error" });
        setError(message);
        return;
      }
      const expiryDate = new Date(decodedToken.exp * 1000);
      Cookies.set("token", token, { expires: expiryDate });
      router.push("/admin");
      toast(response.data.message, { type: "success" });
    },
    onError: (error) => {
      toast(error.message || "Invalid credentials", { type: "error" });
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password" // Add placeholder
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loginMutation.isPending} // Disable button while loading
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}{" "}
            {/* Show loading indicator */}
          </button>

          {error && (
            <p className="text-red-500 font-semibold mt-5 text-center">
              {error}
            </p>
          )}

          <Link href="/register" prefetch={false}>
            <p className="text-blue-500 font-semibold mt-5 text-center">
              Not account? Register
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
