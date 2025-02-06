"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({firstName:"",lastName:'',username:"",password:""});
  const [error, setError] = useState("");
  const [formError, setFormError] = useState<Partial<FormData>>();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const registerMutation = useMutation({
    mutationFn: register,
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
    onError: (errors) => {
      const error = JSON.parse(errors.message);
      if (error.errors) {
        setFormError(error.errors);
      } else {
        setError(error.message);
      }
      toast(error.message || "Invalid credentials", { type: "error" });
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              Firstname
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData["firstName"]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Firstname"
            />
            <p className="text-red-500 font-semibold mt-2">
              {formError?.firstName}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              Lastname
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData["lastName"]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your LastName"
            />
            <p className="text-red-500 font-semibold mt-2">
              {formError?.lastName}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData["username"]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
            <p className="text-red-500 font-semibold mt-2">
              {formError?.username}
            </p>
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
              name="password"
              value={formData["password"]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <p className="text-red-500 font-semibold mt-2">
              {formError?.password}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-red-500 font-semibold mt-5 text-center">
              {error}
            </p>
          )}

          <Link href="/login" prefetch={false}>
            <p className="text-blue-500 font-semibold mt-5 text-center">
              Already Registered? Login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
