"use client"; // Error components must be Client Components

import Button from "@/components/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page render error" + error);
  }, [error]);

  return (
    <div className="text-center">
      <h2 className="text-center py-52 font-gotham text-3xl">
        Something went wrong!
      </h2>
      <Button
        className="mb-5 px-2 py-1 font-gotham text-sm"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
