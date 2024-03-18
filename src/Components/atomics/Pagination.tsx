import React from "react";
import { ArrowLeft2Icon, ArrowRight2Icon } from "@/assets/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePagination = () => {
    const paginations = [];
    for (let i = 1; i <= totalPages; i++) {
      paginations.push({ name: i.toString(), isActive: i === currentPage });
    }
    return paginations;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="Pagination flex w-full items-center justify-between  pt-4">
      <h5 className="text-body-sm font-medium text-netral-50">
        Page {currentPage} of {totalPages}
      </h5>
      <div className="flex flex-row gap-3">
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-lg-10 bg-transparent text-body-sm font-semibold leading-none text-netral-25 transition-all duration-300 ease-out hover:bg-netral-30 ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft2Icon className="h-4 w-4 stroke-2" />
        </button>

        {generatePagination().map((pagination, index) => (
          <button
            key={index}
            className={`flex h-8 w-8 items-center justify-center rounded-lg-10 ${
              pagination.isActive
                ? "cursor-auto bg-black text-netral-25"
                : "cursor-pointer bg-white text-netral-60 hover:bg-netral-25 text-black"
            } text-body-sm font-semibold leading-none transition-all duration-300 ease-out`}
            onClick={() => handlePageChange(parseInt(pagination.name))}
          >
            {pagination.name}
          </button>
        ))}

        <button
          className={`flex h-8 w-8 items-center justify-center rounded-lg-10 bg-transparent text-body-sm font-semibold leading-none text-netral-25 transition-all duration-300 ease-out hover:bg-netral-25 ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight2Icon className="h-4 w-4 stroke-2" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
