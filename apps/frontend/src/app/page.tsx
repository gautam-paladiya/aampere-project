import LoginButton from "@/components/LoginButton";
import { EVList } from "../components/EVList";
import { Pagination } from "../components/Pagination";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Electric Vehicles Marketplace</h1>
      <div className="flex justify-between py-2">
        <Link
          prefetch={false}
          href="/admin"
          className="text-blue-500 hover:underline mb-4 inline-block text-xl"
        >
          Admin Dashboard
        </Link>
        <LoginButton />
      </div>
      <EVList />
      <Pagination />
    </main>
  );
}
