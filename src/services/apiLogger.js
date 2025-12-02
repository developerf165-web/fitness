// apiLogger.js - Системаи логгирование барои API дархостҳо

class ApiLogger {
  constructor() {
    this.logs = [];
    this.isEnabled = import.meta.env.VITE_API_LOGGING_ENABLED === 'true';
    this.maxLogsInMemory = 100; // Максимум 100 лог дар хотира
  }

  /**
   * Формат кардани маълумот барои лог
   */
  formatLog(type, method, url, data, error = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type, // 'REQUEST' | 'RESPONSE' | 'ERROR'
      method,
      url,
      data: this.sanitizeData(data),
      error: error ? {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      } : null
    };

    return logEntry;
  }

  /**
   * Тоза кардани маълумоти сирри (токенҳо, паролҳо)
   */
  sanitizeData(data) {
    if (!data) return null;
    
    // Коркарди FormData
    if (data instanceof FormData) {
      const formObj = {};
      for (let [key, value] of data.entries()) {
        // Агар File аст, танҳо номро нишон медиҳем
        if (value instanceof File) {
          formObj[key] = `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`;
        } else {
          formObj[key] = value;
        }
      }
      return formObj;
    }
    
    const sanitized = { ...data };
    
    // Набудани токенҳо ва паролҳо дар лог
    if (sanitized.password) sanitized.password = '***';
    if (sanitized.token) sanitized.token = '***';
    if (sanitized.authToken) sanitized.authToken = '***';
    
    return sanitized;
  }

  /**
   * Сабт кардани дархост (REQUEST)
   */
  logRequest(method, url, data = null) {
    if (!this.isEnabled) return;

    const log = this.formatLog('REQUEST', method, url, data);
    this.addLog(log);
    
    // Танҳо агар logging фаъол бошад консол лог мекунем
    // console.log(`📤 API REQUEST [${method}] ${url}`, data || '');
  }

  /**
   * Сабт кардани посух (RESPONSE)
   */
  logResponse(method, url, status, data = null) {
    if (!this.isEnabled) return;

    const log = this.formatLog('RESPONSE', method, url, { status, ...data });
    this.addLog(log);
    
    // console.log(`📥 API RESPONSE [${method}] ${url} - ${status}`, data || '');
  }

  /**
   * Сабт кардани хатогӣ (ERROR)
   */
  logError(method, url, error) {
    if (!this.isEnabled) return;

    const log = this.formatLog('ERROR', method, url, null, error);
    this.addLog(log);
    
    // console.error(`❌ API ERROR [${method}] ${url}`, error);
  }

  /**
   * Илова кардани лог ба массив (бо limit)
   */
  addLog(log) {
    this.logs.push(log);
    
    // Агар зиёд шуд, қадимтаринҳоро нест мекунем
    if (this.logs.length > this.maxLogsInMemory) {
      this.logs.shift();
    }
  }

  /**
   * Гирифтани ҳамаи логҳо (бо тартиби баръакс - охирин аввал)
   */
  getAllLogs() {
    // Баръакс кардан: охирин лог дар аввал
    return [...this.logs].reverse();
  }

  /**
   * Экспорт кардани логҳо ба JSON файл
   */
  exportLogsAsJson() {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `api-logs-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  /**
   * Экспорт кардани логҳо ба TEXT файл (барои админ)
   * Логҳо бо тартиби баръакс (охирин аввал): -1, -2, -3, ...
   */
  exportLogsAsText() {
    const logs = this.getAllLogs(); // Аллакай баръакс шуда
    
    let textContent = '=== API LOGS (ОХИРИН АВВАЛ) ===\n';
    textContent += `Санаи эҷод: ${new Date().toLocaleString('ru-RU')}\n`;
    textContent += `Ҳамагӣ логҳо: ${logs.length}\n\n`;
    
    logs.forEach((log, index) => {
      const logNumber = -(index + 1); // -1, -2, -3, ...
      textContent += `--- LOG ${logNumber} ---\n`;
      textContent += `Вақт: ${new Date(log.timestamp).toLocaleString('ru-RU')}\n`;
      textContent += `Навъ: ${log.type}\n`;
      textContent += `Метод: ${log.method}\n`;
      textContent += `URL: ${log.url}\n`;
      
      if (log.data) {
        textContent += `Маълумот: ${JSON.stringify(log.data, null, 2)}\n`;
      }
      
      if (log.error) {
        textContent += `Хатогӣ: ${JSON.stringify(log.error, null, 2)}\n`;
      }
      
      textContent += '\n';
    });
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `api-logs-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Тоза кардани ҳамаи логҳо
   */
  clearLogs() {
    this.logs = [];
    console.log('🗑️ Логҳо тоза карда шуданд');
  }
}

// Singleton instance
export const apiLogger = new ApiLogger();
