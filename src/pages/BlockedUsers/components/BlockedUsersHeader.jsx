import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Hook-ро import мекунем

export default function BlockedUsersHeader() {
  const navigate = useNavigate(); // 2. Hook-ро истифода мебарем

  // 3. Функсия барои ба саҳифаи қаблӣ баргаштан
  const handleGoBack = () => {
    navigate(-1); // -1 маънои як саҳифа ақиб рафтанро дорад
  };

  return (
    <div className="flex justify-start items-center space-x-4 py-12">
      {/* 4. onClick-ро ба SVG илова мекунем */}
      <svg
        onClick={handleGoBack} // <- Илова шуд
        className="cursor-pointer"
        width="18"
        height="28"
        viewBox="0 0 18 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.4394 1.18136C17.2231 1.92773 17.2231 3.13783 16.4394 3.8842L5.81788 14L16.4394 24.1157C17.2231 24.8621 17.2231 26.0722 16.4394 26.8186C15.6557 27.5649 14.3851 27.5649 13.6014 26.8186L1.56091 15.3514C0.777221 14.605 0.777221 13.3949 1.56091 12.6485L13.6015 1.18136C14.3851 0.43499 15.6557 0.43499 16.4394 1.18136Z"
          fill="white"
        />
      </svg>

      {/* Ман onClick-ро ба матн ҳам илова кардам,
        чунки он ҳам 'cursor-pointer' дошт 
      */}
      <h1
        onClick={handleGoBack} // <- Илова шуд
        className="text-white cursor-pointer font-medium text-3xl"
      >
        Заблокированные
      </h1>
    </div>
  );
}