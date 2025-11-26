import React from "react"; // Ҳама hook-ҳо (useState, useCallback, useEffect) нест шуданд!
import DashboardHeader from "./components/DashboardHeader";
import DashboardCards from "./components/DashboardCard/DashboardCards";
import SearchComponent from "./components/SearchComponent";
import Table from "./components/Table/Table";
import PaginationWithCount from "./components/PaginationWithCount/PaginationWithCount";
import AddModalWrapper from "../components/AddModalWrapper/AddModalWrapper";

// Танҳо ЯК hook ворид карда мешавад!
import { useClientDashboard } from "./hooks/useClientDashboard"; 

export default function Dashboard() {
  // 🚀 Тамоми мантиқ дар як сатр гирифта мешавад
  const {
    query,
    setQuery,
    users,
    pagination,
    currentPage,
    loading,
    error,
    handlePageChange,
    isModalOpen,
    closeModal,
    toggleModal,
    handleSuccess
  } = useClientDashboard();

  // Қисми боқимонда танҳо JSX (намоиш) аст
  return (
    <div className="bg-black min-h-screen relative">
      <DashboardHeader pageName="Клиенты" onAdd={toggleModal} />
      <DashboardCards />
      <div className="h-6" />
      <SearchComponent
        underlineTitle="Заблокированные"
        query={query}
        setQuery={setQuery}
      />

      <div className="transition-opacity duration-500">
        {error && <p className="text-red-500 text-center my-6">{error}</p>}

        <Table
          data={users} 
          headers={["ФИО", "Телефон", "Статус", "Абонемент", "Курсы", "Услуги"]}
          fields={["fullName", "username", "cards", "enrollServicesCount", "firstEnrollServiceName", "enroll_services"]}
          loading={loading}
          isPageBlocked={false}
        />

        {pagination && pagination.last_page >= 1 && (
          <PaginationWithCount
            totalUsers={pagination.total}
            totalPages={pagination.last_page}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isBlockedPage={false}
          />
        )}
      </div>

      {isModalOpen && (
        <AddModalWrapper 
          type="user" 
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}