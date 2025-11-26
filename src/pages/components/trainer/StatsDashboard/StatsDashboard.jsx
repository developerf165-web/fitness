import React from "react";
import StatsCard from "./StatsCard";
import StatsSmallCard from "./StatsSmallCard";
import DashboardCard from "../../../Dashboard/components/DashboardCard/DashboardCard";

// Маълумоти намунавӣ (Mock Data)
const MOCK_DASHBOARD_DATA = [
    { title: "Продажи", value: "12 400 TJS", change: +8, description: "за последний месяц" },
    { title: "Клиенты", value: "1 248", change: +4, description: "новые пользователи" },
    { title: "Возвраты", value: "12", change: -3, description: "от предыдущего месяца" },
    { title: "Средний чек", value: "386 TJS", change: +2, description: "рост по сравнению с прошлым месяцем" },
];

const MOCK_STATS_DATA = [
    { title: "Количество курсов", value: "18", change: "+15%", isMoney: false, period: "от предыдущего периода" },
    { title: "Выручка", value: "4800 TJS", change: "+15%", isMoney: true, period: "от предыдущего периода" },
    { title: "Опыт работы", value: "2 года", color: "yellow" },
    { title: "Курсы индивидуальные", value: "40", color: "yellow" },
    { title: "Курсы групповые", value: "25", color: "lime" },
    { title: "Средняя оценка", value: "4.8", color: "lime" },
    { title: "Преподаватели", value: "15", color: "lime" },
];

export default function StatsDashboard({ variant = "default", data }) {
    
    let statsSource = [];
    let dashboardSource = [];

    // Логикаи муайян кардани манбаи маълумот
    if (data) {
        // Агар `data` объект бошад (барои variant="dashboard" ё detail)
        if (typeof data === 'object' && !Array.isArray(data)) {
            // Агар data.statsData мавҷуд набошад, массиви холӣ истифода баред
            statsSource = data.statsData || []; 
            // Агар data.dashboardData мавҷуд набошад, массиви холӣ истифода баред
            dashboardSource = data.dashboardData || [];
        } 
        // Агар `data` массив бошад (барои истифодаи пешинаи 'default')
        else if (Array.isArray(data)) {
            statsSource = data;
            // dashboardSource аллакай [] аст, ки дуруст аст
        }
    } else {
        // Агар 'data' умуман дода нашуда бошад, маълумоти намунавиро истифода баред
        statsSource = MOCK_STATS_DATA;
        dashboardSource = MOCK_DASHBOARD_DATA;
    }

    // Маълумотро ба сатрҳои боло (StatsCard) ва поён (StatsSmallCard) тақсим мекунем
    // Санҷиш илова карда шудааст, то ки аз 'slice' дар 'undefined' пешгирӣ карда шавад
    const topRow = statsSource.length ? statsSource.slice(0, 2) : [];
    const bottomRow = statsSource.length > 2 ? statsSource.slice(2) : [];

    if (variant === "dashboard") {
        return (
            <div className="w-full mx-auto space-y-4">
                
                { /* Танҳо агар topRow маълумот дошта бошад, нишон диҳед */ }
                {topRow.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                        {topRow.map((stat, i) => (
                            <StatsCard key={i} {...stat} />
                        ))}
                    </div>
                )}

                { /* Танҳо агар dashboardSource маълумот дошта бошад, нишон диҳед */ }
                {dashboardSource.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                        {dashboardSource.map((item, i) => (
                            <DashboardCard key={i} {...item} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Варианти "default" ё истифодаи пешина
    return (
        <div className="w-full mx-auto space-y-4">

            { /* Танҳо агар topRow маълумот дошта бошад, нишон диҳед */ }
            {topRow.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {topRow.map((stat, i) => (
                        <StatsCard key={i} {...stat} />
                    ))}
                </div>
            )}

            { /* Танҳо агар bottomRow маълумот дошта бошад, нишон диҳед */ }
            {bottomRow.length > 0 && (
                <div className="grid grid-cols-6 gap-4">
                    {bottomRow.map((stat, i) => (
                        <StatsSmallCard key={i} {...stat} />
                    ))}
                </div>
            )}
        </div>
    );
}