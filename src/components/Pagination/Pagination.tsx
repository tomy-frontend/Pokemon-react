import React from "react";
import "./Pagination.css";

interface PaginationProps {
  prevUrl: string | null;
  nextUrl: string | null;
  onPrevClick: () => Promise<void>;
  onNextClick: () => Promise<void>;
}

/**
 * Pagination component for navigating between pages of Pokemon
 */
export const Pagination: React.FC<PaginationProps> = ({
  prevUrl,
  nextUrl,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="pagination">
      <button onClick={onPrevClick} disabled={!prevUrl}>
        prev
      </button>
      <button onClick={onNextClick} disabled={!nextUrl}>
        next
      </button>
    </div>
  );
};
