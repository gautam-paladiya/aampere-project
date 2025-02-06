import { EVFormData } from "@/components/EVForm";
import { Vehicle } from "@/types";
import Cookies from "js-cookie";

type FetchVehiclesResponse = {
  data: Vehicle[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let errorData: any = { message: "Unknown error occurred" };

export async function fetchVehicles(
  search: string = "",
  page: number = 1
): Promise<FetchVehiclesResponse | null> {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicles?page=${page}`;
  if (search) {
    url = `${url}&&search=${encodeURIComponent(search)}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    try {
      errorData = await response.json();
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }

    throw new Error(errorData.message);
  }

  return response.json();
}

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicles/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    try {
      errorData = await response.json();
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }

    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data.data as Vehicle;
}

export async function deleteVehicle(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicles/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function createVehicle(
  formData: EVFormData
): Promise<Vehicle | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicles`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  if (!response.ok) {
    try {
      errorData = await response.json();
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }

    throw new Error(JSON.stringify(errorData));
  }

  const responseJson = await response.json();
  return responseJson.data;
}

export async function updateVehicle({
  formData,
  id,
}: {
  formData: EVFormData;
  id: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vehicles/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  if (!response.ok) {
    try {
      errorData = await response.json();
    } catch (error) {
      console.error("Failed to parse error response:", error);
    }

    throw new Error(JSON.stringify(errorData));
  }
  const responseJson = await response.json();
  return responseJson.data;
}
