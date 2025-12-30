import Pagination from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';

interface ReviewPaginationProps {
  currentPage: number; // 0-indexed internally
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean; // For responsive behavior
  isLoading?: boolean; // For disabling during loading
}

/**
 * ReviewPagination component for displaying paginated reviews.
 * Handles responsive behavior and loading states.
 *
 * @example
 * ```tsx
 * <ReviewPagination
 *   currentPage={0}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 *   isMobile={false}
 *   isLoading={false}
 * />
 * ```
 */
export default function ReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
  isMobile = false,
  isLoading = false,
}: ReviewPaginationProps) {
  const {
    displayedPages,
    canGoPrevious,
    canGoNext,
    goToPage,
    goToPrevious,
    goToNext,
  } = usePagination({
    currentPage,
    totalPages,
    onPageChange,
    isMobile,
  });

  return (
    <div className="tablet:mt-4 mt-3 flex justify-center">
      <Pagination>
        <Pagination.Content>
          {/* Previous */}
          <Pagination.Item>
            <Pagination.Previous
              href="#review"
              scroll={false}
              onClick={(e) => {
                e.preventDefault();
                if (!isLoading) goToPrevious();
              }}
              className={cn(
                !canGoPrevious || isLoading
                  ? 'pointer-events-none cursor-not-allowed opacity-50'
                  : ''
              )}
              isActive={canGoPrevious}
            />
          </Pagination.Item>

          {/* Page Numbers with Ellipsis (-1 represents ellipsis) */}
          {displayedPages.map((pageNum, index) =>
            pageNum === -1 ? (
              <Pagination.Item key={`ellipsis-${index}`}>
                <Pagination.Ellipsis />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={pageNum}>
                <Pagination.Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isLoading) goToPage(pageNum);
                  }}
                  isActive={pageNum === currentPage}
                  className={cn(
                    isLoading
                      ? 'pointer-events-none cursor-not-allowed opacity-50'
                      : ''
                  )}
                >
                  {pageNum + 1}
                </Pagination.Link>
              </Pagination.Item>
            )
          )}

          {/* Next */}
          <Pagination.Item>
            <Pagination.Next
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!isLoading) goToNext();
              }}
              className={cn(
                !canGoNext || isLoading ? 'pointer-events-none opacity-50' : ''
              )}
              isActive={canGoNext}
            />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}
