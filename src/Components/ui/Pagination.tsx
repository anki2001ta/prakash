// PaginationComponent.tsx
'use client'
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log("pagnmber", pageNumbers)

  return (
    <nav className="flex w-full justify-center mt-6">
        
      <ul className="flex space-x-2">
        {pageNumbers?.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer px-3 py-1 rounded-lg ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-300"
            }`}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
