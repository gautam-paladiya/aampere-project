"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EVForm, EVFormData } from "../../../components/EVForm";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  createVehicle,
  deleteVehicle,
  fetchVehicleById,
  fetchVehicles,
  updateVehicle,
} from "../../api/vehicles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { usePaginationStore } from "@/utils/store/pagination-store";
import { toast } from "react-toastify";
import { SearchInput } from "@/components/SearchInput";
import { useParams } from "next/navigation";
import { EVTable } from "@/components/EVTable";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/Pagination";

export default function AdminPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [formError, setFormError] = useState<Partial<EVFormData>>();
  const { currentPage, setPaginationMeta, setCurrentPage } =
    usePaginationStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => await fetchVehicles(debouncedSearchTerm, currentPage),
    queryKey: ["vehicles", currentPage, debouncedSearchTerm],
  });

  const {
    data: initialData,
    isLoading: isLoadingInitialData,
    isError: isErrorInitialData,
    error: initialDataError,
  } = useQuery({
    queryFn: async () => await fetchVehicleById(id as string),
    queryKey: ["vehicles", id],
    enabled: !!id,
    staleTime: 0,
    retryOnMount: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onMutate: (vehicleId) => {
      setDeletingId(vehicleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      const deletedEv = data?.data.find((ev) => ev.id == deletingId);
      toast(`${deletedEv?.brand} - ${deletedEv?.model} deleted successfully`, {
        type: "success",
      });
      setFormError(undefined);
    },
    onError: (error) => {
      toast(error.message, {
        type: "error",
      });
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const createMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: (ev) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast(`${ev?.brand} - ${ev?.model} added successfully`, {
        type: "success",
      });
      setFormError(undefined);
    },
    onError: (errors) => {
      const error = JSON.parse(errors.message);
      if (error.errors) {
        setFormError(error.errors);
      } else {
        toast(error.message, { type: "error" });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast(
        `${initialData?.brand} - ${initialData?.model} updated successfully`,
        {
          type: "success",
        }
      );
      setFormError(undefined);
      router.replace(`/admin`);
    },
    onError: (errors) => {
      const error = JSON.parse(errors.message);
      if (error.errors) {
        setFormError(error.errors);
      } else {
        toast(error.message, { type: "error" });
      }
    },
  });

  useEffect(() => {
    if (data) {
      setPaginationMeta(data.meta.total);
    }
  }, [data, setPaginationMeta]);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = async (formData: EVFormData) => {
    if (id) {
      await updateMutation.mutateAsync({ formData, id: id as string });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Link
        href="/"
        className="text-blue-500 hover:underline inline-block text-xl"
      >
        &larr; Back to main page
      </Link>
      <h2 className="text-2xl font-bold mt-8 mb-4">Add New EV</h2>
      <EVForm
        onSubmit={handleSubmit}
        error={formError!}
        initialData={initialData}
      />
      <h2 className="text-2xl font-bold mt-8 mb-4">EV List</h2>
      <SearchInput
        value={searchTerm}
        onChange={(search) => {
          setSearchTerm(search);
          setCurrentPage(1);
        }}
      />
      {(isLoading || isLoadingInitialData) && <LoadingSpinner />}

      {(isError || isErrorInitialData) && (
        <div className="mt-5 text-red-500 text-lg text-center">
          {error?.message || initialDataError?.message}
        </div>
      )}

      {data?.data.length == 0 && (
        <div className="mt-5 text-lg">No matching result found</div>
      )}

      {data?.data && (
        <EVTable
          onDelete={handleDelete}
          vehicles={data.data}
          deletingId={deletingId}
        />
      )}
      <Pagination />
    </div>
  );
}
