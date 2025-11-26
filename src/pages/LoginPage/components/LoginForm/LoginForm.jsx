import React, { useState } from "react";
import LoginInput from "./LoginInput";
import PasswordInput from "./PasswordInput";
import CustomCheckbox from "./CustomCheckbox";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "./ErrorMessage";
import useLogin from "./useLogin";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loginUser, loading, error, throttleTime, setError } = useLogin();

  const isFormFilled = login.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormFilled || loading || throttleTime > 0) return;

    await loginUser({ login, password });
  };

  return (
    <div className="w-full lg:w-1/2 bg-[rgba(17,17,18,1)] flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold color-accent mb-2">Войти</h1>
        <p className="text-gray-400 mb-8">
          Пожалуйста, введите логин и пароль
        </p>

        <form onSubmit={handleSubmit}>

          <LoginInput
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              if (error) setError("");
            }}
            error={!!error}
          />

          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            visible={passwordVisible}
            toggleVisible={() => setPasswordVisible(!passwordVisible)}
            error={!!error}
          />

          {(error || throttleTime > 0) && (
            <ErrorMessage 
              message={error} 
              throttleTime={throttleTime} 
            />
          )}

          {!error && throttleTime === 0 && (
            <CustomCheckbox
              id="remember-me"
              label="Запомнить пароль"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          )}

          <SubmitButton
            isFormFilled={isFormFilled}
            error={!!error}
            disabled={!isFormFilled || !!error || loading || throttleTime > 0}
            loading={loading}
          >
            {throttleTime > 0 ? `Подождите ${throttleTime}s` : "Войти"}
          </SubmitButton>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;
