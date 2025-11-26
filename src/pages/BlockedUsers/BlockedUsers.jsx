import React, { useState, useEffect } from "react";
import BlockedUsersHeader from "./components/BlockedUsersHeader";
import SearchComponent from "/src/pages/Dashboard/components/SearchComponent";
import Table from "/src/pages/Dashboard/components/Table/Table"; 
import PaginationWithCount from "/src/pages/Dashboard/components/PaginationWithCount/PaginationWithCount";
import { useDebounce } from "/src/hooks/useDebounce"; 
import { useBlockedUsers } from "./hooks/useBlockedUsers"; 

const headers = ["ФИО", "Телефон", "Статус", "Абонемент", "Курсы", "Услуги"];
const fields = ["fullName", "username", "cards", "enrollServicesCount", "firstEnrollServiceName", "enroll_services"];

export default function BlockedUsers() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { users, pagination, currentPage, loading, error, handlePageChange } = useBlockedUsers(debouncedQuery);

  return (
    <div className="bg-black min-h-screen">
      <BlockedUsersHeader />
      
      <SearchComponent
        query={query}
        setQuery={setQuery}
      />

      <div className="transition-opacity duration-500">
        {error && <p className="text-red-500 text-center my-6">{error}</p>}

        <Table
          data={users}
          headers={headers}
          fields={fields}
          loading={loading} 
          isPageBlocked={true}
        />
        
        {pagination && pagination.last_page > 1 && (
          <PaginationWithCount
            totalUsers={pagination.total}
            totalPages={pagination.last_page}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isBlockedPage={true}
          />
        )}
      </div>
    </div>
  );
}