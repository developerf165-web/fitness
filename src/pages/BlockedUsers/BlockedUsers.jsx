import React from "react";
import BlockedUsersHeader from "./components/BlockedUsersHeader";
import SearchComponent from "/src/pages/Dashboard/components/SearchComponent";
import Table from "/src/pages/Dashboard/components/Table/Table"; 
import PaginationWithCount from "/src/pages/Dashboard/components/PaginationWithCount/PaginationWithCount";

import { BlockedUsersData } from "/src/pages/Blockedusers/data/BlockedUsersData";

const headers = ["Name", "Phone", "Status", "Abonement", "Course", "Services"];
const fields = ["name", "phone", "status", "abonement", "course", "services"];
export default function BlockedUsers() {
  return (
    <div className="bg-black min-h-screen">
      <BlockedUsersHeader />
      <SearchComponent data={BlockedUsersData} />
      <Table
        data={BlockedUsersData}
        headers={["ФИО", "Телефон", "Статус", "Абонемент", "Курсы", "Услуги"]}
        fields={["name", "phone", "status", "abonement", "course", "services"]}
      />      
      <PaginationWithCount totalUsers={542} totalPages={30} isBlockedPage={true}/>
    </div>
  );
}
