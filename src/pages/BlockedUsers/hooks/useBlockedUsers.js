
import { useUsersData } from "/src/hooks/useUsersData"; // HOOK-И УМУМӢ
import { useCallback } from "react";

export function useBlockedUsers(searchQuery, initialPage = 1) {
  const usersData = useUsersData(searchQuery, true, initialPage);
  
  return usersData;
}