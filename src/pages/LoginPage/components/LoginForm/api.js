export const loginAdmin = async ({ login, password }) => {
  const response = await fetch("http://84.54.31.36:8081/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  } else if (response.status === 400) {
    throw new Error("Неверный логин или пароль");
  } else if (response.status === 429) {
    const retryAfter = data.retry_after || 60; 
    const error = new Error("Превышено количество попыток");
    error.retryAfter = retryAfter;
    throw error;
  } else {
    throw new Error(data?.message || "Ошибка при выполнении запроса");
  }
};
