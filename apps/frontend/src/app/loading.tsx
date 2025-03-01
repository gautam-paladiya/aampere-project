import { LoadingSpinner } from "../components/LoadingSpinner"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <LoadingSpinner />
    </div>
  )
}
