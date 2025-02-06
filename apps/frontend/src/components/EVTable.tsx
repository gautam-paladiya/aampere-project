import { Vehicle } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function EVTable({
  vehicles,
  onDelete,
  deletingId,
}: {
  vehicles: Vehicle[];
  onDelete: (id: string) => void;
  deletingId: string | null;
}) {
  return (
    <table className="w-full mt-5">
      <thead>
        <tr>
          <th className="text-left"></th>
          <th className="text-left">Brand</th>
          <th className="text-left">Model</th>
          <th className="text-left">Year</th>
          <th className="text-left">Price</th>
          <th className="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((ev) => (
          <tr key={ev.id} className="divide-y-2">
            <td>
              <Link
                href={`/ev/${ev.id}`}
                className="text-blue-500 hover:underline"
              >
                <Image
                  src={ev.images[0] || "/placeholder.svg"}
                  alt={`${ev.brand} ${ev.model}`}
                  width={80}
                  height={80}
                  className="rounded-lg w-auto h-auto max-h-24"
                  priority={true}
                />
              </Link>
            </td>
            <td>{ev.brand}</td>
            <td>{ev.model}</td>
            <td>{ev.year}</td>
            <td>${ev.price}</td>
            <td>
              <Link
                href={`/admin/${ev.id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </Link>
              <button
                disabled={deletingId === ev.id}
                onClick={() => onDelete(ev.id)}
                className="text-red-500 hover:underline"
              >
                {deletingId === ev.id ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
