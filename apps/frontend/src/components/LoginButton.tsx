"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(Cookies.get("token") || null);
  }, []);

  const handleLogin = async () => {
    router.push("/login");
  };

  const handleLogout = () => {
    Cookies.remove("token"); // Clear token cookie
    setToken(null);
  };

  return (
    <button
      onClick={token ? handleLogout : handleLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      {token ? "Logout" : "Login"}
    </button>
  );
}
