// /src/pages/Blockedusers/hooks/useBlockedUsers.js
import { useUsersData } from "/src/hooks/useUsersData"; // HOOK-И УМУМӢ
import { useCallback } from "react";

export function useBlockedUsers(searchQuery, initialPage = 1) {
  // isBlocked = true (Истифодабарандагони блокшуда)
  const usersData = useUsersData(searchQuery, true, initialPage);
  
  // Азбаски мантиқи hook-и useUsersData пурра аст, мо танҳо натиҷаро бармегардонем
  return usersData;
}