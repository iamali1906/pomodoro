import React from "react";

interface CircularProgressProps {
  time: number;
  totalTime: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  time,
  totalTime,
}) => {
  const radius = 50;
  const strokeWidth = 10; // Increased stroke width for smoother edges
  const circumference = 2 * Math.PI * radius;
  const progress = (time / totalTime) * circumference;

  return (
    <svg
      width="120"
      height="120"
      className="mb-8 relative"
      style={{ shapeRendering: "geometricPrecision" }} // Improves rendering quality
    >
      {/* Background circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="transparent"
        stroke="#e5e7eb" // Light gray (Tailwind color "gray-300")
        strokeWidth={strokeWidth}
      />

      {/* Progress circle with gradient */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="transparent"
        stroke="url(#gradient)" // Gradient fill
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />{" "}
          {/* Indigo (Tailwind color "indigo-600") */}
          <stop offset="100%" stopColor="#3b82f6" />{" "}
          {/* Blue (Tailwind color "blue-500") */}
        </linearGradient>
      </defs>
    </svg>
  );
};
