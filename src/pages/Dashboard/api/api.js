const API_BASE_URL = "http://84.54.31.36:8081/api";

export async function fetchUsersFromApi(page = 1) {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Токен не найден. Пожалуйста, войдите в систему.");

  const response = await fetch(`${API_BASE_URL}/user/get/paginate?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

  const result = await response.json();

  if (!result.data || !Array.isArray(result.data)) throw new Error("Неверный формат данных");
  if (!result.pagination) throw new Error("Нет данных пагинации");

  const usersWithFullName = result.data.map((user) => ({
  ...user,
  fullName: `${user.name} ${user.surname}`,
  enrollServicesCount: user.enroll_services.length, 
  firstEnrollServiceName: user.enroll_services[0]?.service?.name || "-", 
  }));


  return { users: usersWithFullName, pagination: result.pagination };
}
