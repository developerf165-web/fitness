import React from "react";
import Pagination from "./Pagination";
import UserCount from "./UserCount";

export default function PaginationWithCount({
  totalUsers,
  totalPages,
  currentPage,
  onPageChange,
  isBlockedPage
}) {
  return (
    <div className="flex items-center justify-between mb-15 mt-6 bg-black rounded-lg">
      <UserCount total={totalUsers} isBlockedPage={isBlockedPage} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
