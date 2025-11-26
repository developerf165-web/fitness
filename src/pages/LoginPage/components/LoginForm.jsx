import React, { useState } from "react";
import EyeIcon from "./LoginForm/EyeIcon";
import CustomCheckbox from "./LoginForm/CustomCheckbox";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const isFormFilled = login.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormFilled || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://84.54.31.36:8081/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Успешный вход!");
        // TODO: редирект ба dashboard, масалан:
        // window.location.href = "/admin/dashboard";
      } else if (response.status === 400) {
        setError("Неверный логин или пароль. Попробуйте еще раз.");
      } else if (response.status === 429) {
        setError("Слишком много попыток. Попробуйте позже.");
      } else {
        setError("Произошла ошибка. Попробуйте позже.");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-[#111111] flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold color-accent mb-2">Войти</h1>
        <p className="text-gray-400 mb-8">
          Пожалуйста, введите логин и пароль
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div
              className={`flex items-center bg-transparent border rounded-lg p-3 transition ${
                error ? "border-red-500" : "color-border-accent"
              }`}
            >
              <input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <div
              className={`relative flex items-center bg-transparent border rounded-lg p-3 transition ${
                error ? "border-red-500" : "color-border-accent"
              }`}
            >
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="text-gray-400 hover:text-brand-green"
              >
                <EyeIcon className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium mb-3">{error}</p>
          )}

          <CustomCheckbox
            id="remember-me"
            label="Запомнить пароль"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <button
            type="submit"
            disabled={!isFormFilled || loading}
            className={`w-full font-bold py-3 px-4 rounded-lg transition duration-300 ${
              isFormFilled && !loading
                ? "color-bg-accent text-black cursor-pointer"
                : "color-bg-mini-card bg-hover-card text-white cursor-not-allowed"
            }`}
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
