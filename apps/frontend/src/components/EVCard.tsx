"use client";
import { Vehicle } from "@/types";
import Image from "next/image";

type EVProps = {
  ev: Vehicle;
};

export function EVCard({ ev }: EVProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div>
            <h2 className="text-xl font-semibold">
              {ev.brand} {ev.model}
            </h2>
            <p className="text-gray-600">{ev.year}</p>
          </div>
        </div>
        <Image
          src={ev.images[0] || "/placeholder.svg"}
          alt={`${ev.brand} ${ev.model}`}
          width={160}
          height={160}
          className="rounded-lg w-auto h-auto"
          priority={true}
        />
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-600">Range</p>
          <p className="font-semibold">{ev.rangeKm} km</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div>
          <p className="text-gray-600">Color: {ev.color}</p>
          <p className="text-gray-600">Condition: {ev.condition}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-600 ">Price</p>
          <p className="font-bold text-lg">${ev.price}</p>
        </div>
      </div>
    </div>
  );
}
