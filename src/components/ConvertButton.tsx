"use client";

import { useState } from "react";

export default function ConvertButton() {
  const [isConverting, setIsConverting] = useState(false);
  const handleConversionToSound = async () => {};
  return (
    <button
      disabled={isConverting}
      onClick={handleConversionToSound}
      className={
        " text-white p-5 rounded-xl " +
        (isConverting
          ? "bg-gray-600 opacity-50 cursor-not-allowed"
          : "bg-blue-500")
      }
    >
      {isConverting ? "Converting..." : "Convert to sound"}
    </button>
  );
}
