// Файл: src/hooks/useStatistics.js

import { useState, useEffect } from "react";

export function useStatistics() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      // 1. Гирифтани токен аз localStorage
      const token = localStorage.getItem("authToken");

      // 2. Тафтиши токен
      if (!token) {
        // Матн ба забони русӣ
        setError("Токен не найден. Пожалуйста, войдите в систему.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch("http://84.54.31.36:8081/api/user/statistic", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}` // Истифодаи токен аз localStorage
          }
        });

        if (!response.ok) {
          // 3. Идоракунии хатогиҳо бо забони русӣ
          if (response.status === 401) {
            throw new Error("Ошибка авторизации (401). Ваш токен недействителен.");
          }
          if (response.status === 403) {
            throw new Error("Доступ запрещен (403). Недостаточно прав.");
          }
          throw new Error(`Ошибка при получении данных: ${response.status}`);
        }

        const result = await response.json();
        setData(result); // Маълумоти бомуваффақият гирифташударо захира мекунем

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Боркунӣ ба итмом расид
      }
    };

    fetchStatistics();
  }, []); // [] - танҳо як маротиба ҳангоми бор шудани компонент кор мекунад

  // Мо ҳолат, маълумот ва хатогиро бармегардонем
  return { data, isLoading, error };
}