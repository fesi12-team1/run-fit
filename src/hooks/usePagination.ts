import { useMemo } from 'react';
import { getDisplayedPages } from '@/lib/pagination';

export interface usePaginationProps {
  currentPage: number; // 0-indexed internally
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean; // For responsive behavior
}

/**
 * General-purpose pagination hook for managing pagination state and navigation.
 * Returns pagination state and handlers for navigation.
 *
 * @param props - Pagination configuration
 * @returns Pagination state and navigation handlers
 *
 * @example
 * ```typescript
 * const {
 *   displayedPages,
 *   canGoPrevious,
 *   canGoNext,
 *   goToPage,
 *   goToPrevious,
 *   goToNext
 * } = usePagination({
 *   currentPage: 0,
 *   totalPages: 10,
 *   onPageChange: (page) => setCurrentPage(page),
 *   isMobile: true
 * });
 * ```
 */
export function usePagination({
  currentPage,
  totalPages,
  onPageChange,
  isMobile = false,
}: usePaginationProps) {
  // Determine max elements based on screen size
  // Mobile: 5 elements (3 page numbers + 2 ellipsis potential)
  // Tablet/Desktop: 7 elements (5 page numbers + 2 ellipsis potential)
  const maxElements = isMobile ? 5 : 7;

  // Calculate displayed pages with -1 representing ellipsis
  const displayedPages = useMemo(
    () => getDisplayedPages(currentPage, totalPages, maxElements),
    [currentPage, totalPages, maxElements]
  );

  // Navigation flags
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  // Navigation handlers
  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const goToPrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return {
    displayedPages,
    canGoPrevious,
    canGoNext,
    goToPage,
    goToPrevious,
    goToNext,
  };
}
