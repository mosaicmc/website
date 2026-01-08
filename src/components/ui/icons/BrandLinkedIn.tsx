import React from "react";

type Props = { className?: string };

export default function BrandLinkedIn({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="currentColor"></path>
      <rect width="4" height="12" x="2" y="9" fill="currentColor"></rect>
      <circle cx="4" cy="4" r="2" fill="currentColor"></circle>
    </svg>
  );
}
