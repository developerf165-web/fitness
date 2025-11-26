import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "http://84.54.31.36:8081/api";

function getAuthToken() {
  const token = localStorage.getItem("authToken"); 
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");
  return token;
}

function transformUserData(userArray, startIndex) {
  if (!userArray || !Array.isArray(userArray)) {
    return [];
  }
  
  return userArray.map((user, index) => {
    const localId = startIndex + index;
    return {
      ...user,
      localId: localId,
      serverId: user.id,
      fullName: `${localId}. ${user.name} ${user.surname}`,
      enrollServicesCount: user.enroll_services?.length || 0,
      firstEnrollServiceName: user.enroll_services?.[0]?.service?.name || "-",
    };
  });
}

async function fetchPaginatedUsers(isBlocked, page = 1) {
  const token = getAuthToken();
  const endpoint = isBlocked ? `/user/get/disable/paginate?page=${page}` : `/user/get/paginate?page=${page}`;
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
  const result = await response.json();
  if (!result.data || !Array.isArray(result.data)) throw new Error("Неверный формат данных");

  const startIndex = (result.current_page - 1) * result.per_page + 1;
  const users = transformUserData(result.data, startIndex);

  const pagination = {
    current_page: result.current_page,
    last_page: result.last_page,
    per_page: result.per_page,
    total: result.total,
    next_page_url: result.next_page_url,
    prev_page_url: result.prev_page_url,
    links: result.links,
  };

  return { users, pagination };
}

async function fetchSearchResults(isBlocked, query, page = 1) {
  const token = getAuthToken();
  const endpoint = isBlocked ? `/user/search/disable` : `/user/search`; 
  
  const params = new URLSearchParams();
  params.append("name", query);
  params.append("page", page);

  const response = await fetch(`${API_BASE_URL}${endpoint}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (response.status === 401) throw new Error("Ошибка 401: Неавторизованный доступ.");
  if (response.status === 403) throw new Error("Ошибка 403: Доступ запрещён.");

  if (response.status === 404 || response.status === 422) {
    const emptyPagination = { current_page: 1, last_page: 1, per_page: 20, total: 0, links: [] };
    return { users: [], pagination: emptyPagination };
  }

  if (!response.ok) throw new Error(`Сетевая ошибка (search): ${response.status}`);

  const result = await response.json(); 
  if (!result.data || !Array.isArray(result.data)) throw new Error("Неверный формат данных (search)");

  const startIndex = (result.current_page - 1) * result.per_page + 1;
  const users = transformUserData(result.data, startIndex);

  const pagination = {
    current_page: result.current_page,
    last_page: result.last_page,
    per_page: result.per_page,
    total: result.total,
    next_page_url: result.next_page_url,
    prev_page_url: result.prev_page_url,
    links: result.links,
  };

  return { users, pagination };
}


export function useUsersData(searchQuery, isBlocked, initialPage = 1) {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const refetchUsers = useCallback(() => {
    setCurrentPage(c => {
      return c === 1 ? 0 : 1; 
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  useEffect(() => {
    if (currentPage === 0) {
      setCurrentPage(1);
      return;
    }
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (searchQuery && searchQuery.length >= 3) {
          const { users, pagination } = await fetchSearchResults(isBlocked, searchQuery, currentPage);
          setUsers(users);
          setPagination(pagination); 
        } else if (searchQuery && searchQuery.length > 0) {
          setUsers([]);
          setPagination(null);
          setError("Для поиска введите не менее 3 символов.");
        } else {
          const { users, pagination } = await fetchPaginatedUsers(isBlocked, currentPage);
          setUsers(users);
          setPagination(pagination);
        }
      } catch (e) {
        setError("Ошибка: " + e.message);
        setUsers([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchQuery, isBlocked]);

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);

  return { 
    users, 
    pagination, 
    currentPage, 
    loading, 
    error, 
    handlePageChange,
    refetchUsers
  };
}