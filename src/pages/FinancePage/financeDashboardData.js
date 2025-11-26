/**
 * Маълумоти фейкӣ барои FinancePage (variant="dashboard")
 * Барои истифода дар <StatsDashboard variant="dashboard" data={financeDashboardData} />
 */

export const financeDashboardData = {
  // 2-то карточкаи калон (StatsCard)
  statsData: [
    {
      title: "Общая выручка",
      value: "24 800",
      change: "+12%",
      isMoney: true,
      period: "за текущий месяц",
    },
    {
      title: "Количество клиентов",
      value: "1 560",
      change: "+7%",
      isMoney: false,
      period: "по сравнению с прошлым месяцем",
    },
  ],

  // 4-то карточкаи хурд (DashboardCard)
  dashboardData: [
    {
      title: "Продажи курсов",
      value: "12 400",
      change: +8,
      description: "за последний месяц",
    },
    {
      title: "Индивидуальные занятия",
      value: "6 200",
      change: +5,
      description: "рост по сравнению с октябрем",
    },
    {
      title: "Возвраты",
      value: "15",
      change: -2,
      description: "меньше, чем в прошлом месяце",
    },
    {
      title: "Средний чек",
      value: "410",
      change: +3,
      description: "увеличение по сравнению с прошлым месяцем",
    },
    {
      title: "Тренеры",
      value: "15",
      change: -6,
      description: "меньше, чем в прошлом месяце",
    },
    {
      title: "Новые пользователи",
      value: "410",
      change: -14,
      description: "увеличение по сравнению с прошлым месяцем",
    },
        {
      title: "Курсы индивидуальные",
      value: "152",
      change: -20,
      description: "меньше, чем в прошлом месяце",
    },
    {
      title: "Курсы групповые",
      value: "454",
      change: +22,
      description: "увеличение по сравнению с прошлым месяцем",
    },
  ],
};
