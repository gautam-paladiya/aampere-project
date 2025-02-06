"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicleById } from "@/app/api/vehicles";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Carousel } from "react-responsive-carousel";

export default function EVDetailPage() {
  const { id } = useParams();

  const {
    data: ev,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => await fetchVehicleById(id as string),
    queryKey: ["vehicles", id],
  });

  if (!ev) {
    return (
      <h1 className="text-3xl font-bold mb-6">No matching vehicle found</h1>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        prefetch={false}
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to list
      </Link>

      {isLoading && <LoadingSpinner />}

      {(isError || !ev) && <div>{error?.message}</div>}

      <h1 className="text-3xl font-bold mb-6">
        {ev.brand} {ev.model}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Carousel showArrows={true} showThumbs={false}>
          {ev.images.map((image) => (
            <Image
              key={image}
              src={image || "/placeholder.svg"}
              alt={`${ev.brand} ${ev.model}`}
              width={600}
              height={400}
              priority={true}
              className="rounded-lg"
            />
          ))}
        </Carousel>
        <div>
          <p className="text-2xl font-bold mb-4">${ev.price}</p>
          <p className="mb-2">
            <strong>Year:</strong> {ev.year}
          </p>
          <p className="mb-2">
            <strong>Range:</strong> {ev.rangeKm} km
          </p>
          <p className="mb-2">
            <strong>Color:</strong> {ev.color}
          </p>
          <p className="mb-2">
            <strong>Condition:</strong> {ev.condition}
          </p>
          <p className="mb-2">
            <strong>Battery Capacity:</strong> {ev.batteryCapacityKWh} kWh
          </p>
          <p className="mb-2">
            <strong>Charging Speed:</strong> {ev.chargingSpeedKW} kW
          </p>
          <p className="mb-2">
            <strong>Seats:</strong> {ev.seats}
          </p>
          <p className="mb-2">
            <strong>Drivetrain:</strong> {ev.drivetrain}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {ev.location}
          </p>
          <p className="mb-2">
            <strong>Autopilot:</strong> {ev.autopilot ? "Yes" : "No"}
          </p>
          <p className="mb-2">
            <strong>Kilometer Count:</strong> {ev.kilometerCount}
          </p>
          <p className="mb-2">
            <strong>Accidents:</strong> {ev.accidents ? "Yes" : "No"}
          </p>
          {ev.accidentsDescription && (
            <p className="mb-2">
              <strong>Accident Description:</strong> {ev.accidentsDescription}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
