import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "./api";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [throttleTime, setThrottleTime] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (throttleTime > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setThrottleTime(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [throttleTime]);

  const loginUser = async ({ login, password }) => {
    if (throttleTime > 0) return;

    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin({ login, password });

      if (data?.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/glavnaya");
      }

      return data;
    } catch (err) {
      if (err.retryAfter) {
        // Ҳама вақт танҳо аз сервер меоем
        setThrottleTime(err.retryAfter);
        setError(`Превышено количество попыток. Повторите через ${err.retryAfter} секунд.`);
      } else {
        setError(err.message || "Ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, throttleTime, setError };
};

export default useLogin;
