"use client";

import { useEffect, useState } from "react";

export type EVFormData = {
  brand: string;
  model: string;
  year: number;
  price: number;
  rangeKm: number;
  color: string;
  condition: string;
  images: string[];
  batteryCapacityKWh: number;
  chargingSpeedKW: number;
  seats: number;
  drivetrain: string;
  location: string;
  kilometerCount: number;
};

type EVFormProps = {
  initialData?: EVFormData | null;
  onSubmit: (data: EVFormData) => Promise<void>;
  error: Partial<EVFormData>;
};

const defaultData = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  rangeKm: 0,
  color: "",
  condition: "New",
  images: [],
  batteryCapacityKWh: 0,
  chargingSpeedKW: 0,
  seats: 0,
  drivetrain: "",
  location: "",
  kilometerCount: 0,
};

export function EVForm({ initialData, onSubmit, error }: EVFormProps) {
  const [formData, setFormData] = useState<EVFormData>(
    initialData || defaultData
  );

  useEffect(() => {
    setFormData(initialData || defaultData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split("\n").map((url) => url.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let caughtError: any = null;
    try {
      e.preventDefault();
      await onSubmit(formData);
    } catch (error) {
      caughtError = error;
    } finally {
      if (!caughtError) {
        setFormData(defaultData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="brand" className="block mb-1">
          Brand
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.brand}</p>
      </div>
      <div>
        <label htmlFor="model" className="block mb-1">
          Model
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.model}</p>
      </div>
      <div>
        <label htmlFor="year" className="block mb-1">
          Year
        </label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.year}</p>
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.price}</p>
      </div>
      <div>
        <label htmlFor="rangeKm" className="block mb-1">
          Range (km)
        </label>
        <input
          type="text"
          id="rangeKm"
          name="rangeKm"
          value={formData.rangeKm}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.rangeKm}</p>
      </div>
      <div>
        <label htmlFor="color" className="block mb-1">
          Color
        </label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.color}</p>
      </div>
      <div>
        <label htmlFor="batteryCapacityKWh" className="block mb-1">
          Battery Capacity KWh
        </label>
        <input
          type="text"
          id="batteryCapacityKWh"
          name="batteryCapacityKWh"
          value={formData.batteryCapacityKWh}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">
          {error?.batteryCapacityKWh}
        </p>
      </div>
      <div>
        <label htmlFor="chargingSpeedKW" className="block mb-1">
          Charging Speed KW
        </label>
        <input
          type="text"
          id="chargingSpeedKW"
          name="chargingSpeedKW"
          value={formData.chargingSpeedKW}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">
          {error?.chargingSpeedKW}
        </p>
      </div>
      <div>
        <label htmlFor="seats" className="block mb-1">
          Seats
        </label>
        <input
          type="text"
          id="seats"
          name="seats"
          value={formData.seats}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.seats}</p>
      </div>
      <div>
        <label htmlFor="drivetrain" className="block mb-1">
          Drivetrain
        </label>
        <input
          type="text"
          id="drivetrain"
          name="drivetrain"
          value={formData.drivetrain}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.drivetrain}</p>
      </div>
      <div>
        <label htmlFor="location" className="block mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.location}</p>
      </div>
      <div>
        <label htmlFor="kilometerCount" className="block mb-1">
          Kilometer Count
        </label>
        <input
          type="text"
          id="kilometerCount"
          name="kilometerCount"
          value={formData.kilometerCount}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">
          {error?.kilometerCount}
        </p>
      </div>
      <div>
        <label htmlFor="images" className="block mb-1">
          Images
        </label>
        <textarea
          placeholder="Add image urls with new line saperated without any quotes"
          id="images"
          name="images"
          value={formData.images.join("\n")}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 font-semibold mt-2">{error?.images}</p>
      </div>
      <div>
        <label htmlFor="condition" className="block mb-1">
          Condition
        </label>
        <select
          id="condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        <p className="text-red-500 font-semibold mt-2">{error?.condition}</p>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {initialData ? "Update EV" : "Add EV"}
      </button>
    </form>
  );
}
