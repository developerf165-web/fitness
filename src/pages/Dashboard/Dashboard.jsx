import React, { useState, useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCards from "./components/DashboardCard/DashboardCards";
import SearchComponent from "./components/SearchComponent";
import Table from "./components/Table/Table"; 
import PaginationWithCount from "./components/PaginationWithCount/PaginationWithCount";
import AddModalWrapper from "../components/AddModalWrapper/AddModalWrapper";

import { TableData } from "/src/pages/Dashboard/data/TableData";

export default function Dashboard() {
  const [showCard, setShowCard] = useState(false);
  const clientsData = TableData.filter((user) => user.type === "client");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowCard(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="bg-black min-h-screen relative">
      <DashboardHeader pageName="Клиенты" onAdd={() => setShowCard((prev) => !prev)} />
      <DashboardCards />
      <SearchComponent underlineTitle="Заблокированные" data={clientsData} />
      <Table
        data={clientsData}
        headers={["ФИО", "Телефон", "Статус", "Абонемент", "Курсы", "Услуги"]}
        fields={["name", "phone", "status", "abonement", "course", "services"]}
      />

      <PaginationWithCount
        totalUsers={2504}
        totalPages={30}
        isBlockedPage={false}
      />

      {showCard && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
          onClick={() => setShowCard(false)}
        >
          <div
            className=" rounded-2xl shadow-lg text-white relative"
            onClick={(e) => e.stopPropagation()}
          >
            <AddModalWrapper type="user" onClose={() => setShowCard(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
