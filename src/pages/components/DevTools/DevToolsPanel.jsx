// DevToolsPanel.jsx - Панели барои экспорт кардани логҳо
import React, { useState, useEffect } from 'react';
import { apiLogger } from '@services/apiLogger';

const DevToolsPanel = () => {
  const [logsCount, setLogsCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Проверка, оё логгирование фаъол аст
    setIsEnabled(apiLogger.isEnabled);

    // Ҳар 2 сония шумораи логҳоро навсозӣ мекунем
    const interval = setInterval(() => {
      setLogsCount(apiLogger.getAllLogs().length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isEnabled) {
    return null; // Агар логгирование хомӯш бошад, ҳеҷ чиз нишон намедиҳем
  }

  const handleExportJson = () => {
    apiLogger.exportLogsAsJson();
  };

  const handleExportText = () => {
    apiLogger.exportLogsAsText();
  };

  const handleClearLogs = () => {
    if (confirm('Очистить все логи?')) {
      apiLogger.clearLogs();
      setLogsCount(0);
    }
  };

  const handleViewConsole = () => {
    console.log('=== API LOGS (ОХИРИН АВВАЛ) ===');
    console.log(`Ҳамагӣ: ${apiLogger.getAllLogs().length} логҳо`);
    console.log('');

    // Нишон додани логҳо бо нумерҳои манфӣ
    const logs = apiLogger.getAllLogs();
    logs.forEach((log, index) => {
      const logNumber = -(index + 1); // -1, -2, -3, ...
      console.log(`📋 LOG ${logNumber}:`);
      console.log(`  Вақт: ${new Date(log.timestamp).toLocaleString('ru-RU')}`);
      console.log(`  Навъ: ${log.type}`);
      console.log(`  Метод: ${log.method}`);
      console.log(`  URL: ${log.url}`);

      if (log.data) {
        console.log(`  Маълумот:`, log.data);
      }

      if (log.error) {
        console.log(`  Хатогӣ:`, log.error);
      }

      console.log('');
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl p-4 min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Dev Tools
        </h3>
        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
          {logsCount} логов
        </span>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleViewConsole}
          className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
        >
          <span>🖥️</span>
          Посмотреть в консоли
        </button>

        <button
          onClick={handleExportJson}
          className="w-full text-xs bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
        >
          <span>📥</span>
          Экспорт JSON
        </button>

        <button
          onClick={handleExportText}
          className="w-full text-xs bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
        >
          <span>📄</span>
          Экспорт TXT (для админа)
        </button>

        <button
          onClick={handleClearLogs}
          className="w-full text-xs bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
        >
          <span>🗑️</span>
          Очистить
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600">
        <p className="text-xs text-gray-400 text-center">
          Отключить в .env: <br />
          <code className="text-gray-300 bg-gray-700 px-1 rounded">
            VITE_API_LOGGING_ENABLED=false
          </code>
        </p>
      </div>
    </div>
  );
};

export default DevToolsPanel;
