"use client";

import { useState, useEffect } from "react";
import { EVCard } from "./EVCard";
import Link from "next/link";
import { fetchVehicles } from "../app/api/vehicles";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "./LoadingSpinner";
import { usePaginationStore } from "@/utils/store/pagination-store";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchInput } from "./SearchInput";

export function EVList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentPage, setPaginationMeta, setCurrentPage } =
    usePaginationStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => await fetchVehicles(debouncedSearchTerm, currentPage),
    queryKey: ["vehicles", currentPage, debouncedSearchTerm],
  });

  useEffect(() => {
    if (data) {
      setPaginationMeta(data.meta.total);
    }
  }, [data]);

  return (
    <div className="w-full">
      <SearchInput
        value={searchTerm}
        onChange={(search) => {
          setSearchTerm(search);
          setCurrentPage(1);
        }}
      />
      {isLoading && <LoadingSpinner />}

      {isError && (
        <div className="mt-5 text-red-500 text-lg text-center">
          {error.message}
        </div>
      )}

      {data?.data.length == 0 && (
        <div className="mt-5 text-lg">No matching result found</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data &&
          data.data.map((ev) => (
            <Link prefetch={false} href={`/ev/${ev.id}`} key={ev.id}>
              <EVCard ev={ev} />
            </Link>
          ))}
      </div>
    </div>
  );
}
