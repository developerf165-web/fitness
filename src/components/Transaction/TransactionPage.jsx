import React, { useState, useEffect } from "react";
import { fetchUserTransactions } from "/src/services/apiClientPageTransaction";
import TransactionItem from "./TransactionItem";
import PaginationWithCount from "@/Dashboard/components/PaginationWithCount/PaginationWithCount";

const DEFAULT_USER_ID = 1;

export default function TransactionPage({
  userId = DEFAULT_USER_ID,
}) {
  const [page, setPage] = useState(1);
  const [transactionsData, setTransactionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchUserTransactions(userId, page);

        setTransactionsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [userId, page]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-[var(--color-text-main)]">
        Загрузка транзакций...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center red">
        <strong>Ошибка:</strong> {error}
        <p className="text-sm text-[var(--color-text-muted)]">
          (Убедитесь, что вы авторизованы и ID пользователя верен.)
        </p>
      </div>
    );
  }

  if (!transactionsData || transactionsData.data.length === 0) {
    return (
      <div className="p-8 text-center text-[var(--color-text-main)]">
        Транзакции не найдены.
      </div>
    );
  }

  return (
    // === ИСЛОҲИ 1: ===
    // 'flex flex-col' - Барои сохтани контейнери амудӣ
    // 'min-h-[calc(100vh-150px)]' - Баландии минималӣ (экрани пурра минуси header)
    // Шумо метавонед 150px-ро ба баландии аниқи header-и худ иваз кунед.
    <div className="color-bg-main flex flex-col min-h-[calc(100vh-150px)]">

      {/* === ИСЛОҲИ 2: === */}
      {/* 'flex-grow' - Ин блок ҳамаи ҷои холиро пур мекунад ва пагинатсияро ба поён тела медиҳад */}
      {/* 'items-start' - Ин пешигирии ҷаҳиши картаҳои ҳамсояро (дар оянда) мегирад */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start flex-grow">
        {transactionsData.data.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {/* Ин компонент ҳоло ҳамеша дар поён мемонад ва намеҷаҳад */}
      <PaginationWithCount
        totalPages={transactionsData.last_page}
        currentPage={transactionsData.current_page}
        onPageChange={setPage}
        totalUsers={transactionsData.total}
        isBlockedPage={false}
      />
    </div>
  );
}