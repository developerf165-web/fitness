import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "http://84.54.31.36:8081/api";

function getAuthToken() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Токен не найден. Пожалуйста, войдите в систему.");
  }
  return token;
}

function transformUserData(userArray) {
  if (!userArray || !Array.isArray(userArray)) {
    return [];
  }

  return userArray.map((user, index) => {
    const localId = index + 1;
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


async function fetchPaginatedUsers(page = 1) {
  const token = getAuthToken();
  const url = `${API_BASE_URL}/user/get/paginate?page=${page}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP (paginate): ${response.status}`);
  }
  const result = await response.json();
  if (!result.data || !Array.isArray(result.data)) {
    throw new Error("Неверный формат данных (paginate)");
  }

  const users = transformUserData(result.data);

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

async function fetchSearchResultsNew(query, page = 1) {
  const token = getAuthToken();

  const params = new URLSearchParams();
  params.append("name", query);
  params.append("page", page);
  const url = `${API_BASE_URL}/user/search?${params.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Ошибка 401: Неавторизованный доступ.");
    if (response.status === 403) throw new Error("Ошибка 403: Доступ запрещён.");
    if (response.status === 422) throw new Error("Ошибка 422: Ошибка валидации (строка поиска).");
    throw new Error(`Сетевая ошибка (search): ${response.status}`);
  }

  const result = await response.json();

  if (!result.data || !Array.isArray(result.data)) {
    throw new Error("Неверный формат данных (search)");
  }

  const users = transformUserData(result.data);

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

export function useUsers(searchQuery, initialPage = 1) {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (searchQuery && searchQuery.length >= 3) {
        const { users, pagination } = await fetchSearchResultsNew(searchQuery, currentPage);
        setUsers(users);
        setPagination(pagination);
      } else if (searchQuery && searchQuery.length > 0) {
        setUsers([]);
        setPagination(null);
        setError("Для поиска введите не менее 3 символов.");
      } else {
        const { users, pagination } = await fetchPaginatedUsers(currentPage);
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
  }, [currentPage, searchQuery, refreshToggle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const refetchUsers = () => {
    setRefreshToggle(prev => prev + 1);
  };

  return { users, pagination, currentPage, loading, error, handlePageChange, refetchUsers };
}