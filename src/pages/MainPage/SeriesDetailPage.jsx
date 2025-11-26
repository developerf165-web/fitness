import React, { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProfileHeader from '../components/trainer/ProfileHeader';
import StatsDashboard from '../components/trainer/StatsDashboard/StatsDashboard.jsx';
import ActivityChart from '../components/trainer/ActivityChart';
import ClientCoursesTable from '@/components/trainer/ClientCoursesTable/ClientCoursesTable';
import { newChartData } from './chartData';

const seriesMap = {
    'abonement': 'Абонемент',
    'kursy-gruppovye': 'Курсы (групповые)',
    'kursy-individualnye': 'Курсы (индивидуальные)',
    'novye-polzovateli': 'Новые пользователи',
    'uslugi': 'Услуги',
};

const fakeDataMap = {
    'abonement': {
        statsData: [
            { title: "Активные абонементы", value: "348", change: "+12%", isMoney: false, period: "с прошлой недели" },
            { title: "Доход (Абонементы)", value: "12 500 TJS", change: "+10%", isMoney: true, period: "с прошлой недели" },
        ],
    },
    'kursy-gruppovye': {
        statsData: [
            { title: "Групповые курсы", value: "12", change: "+5%", isMoney: false, period: "с прошлого месяца" },
            { title: "Доход (Групповые)", value: "4 800 TJS", change: "+8%", isMoney: true, period: "с прошлого месяца" },
        ],
        dashboardData: [
            { title: "Дополнительные занятия", value: "5", change: +2, description: "эта неделя" },
            { title: "Общая оплата", value: "4 800 TJS", change: +8, description: "прошлый месяц" },
            { title: "Отмены", value: "2", change: -1, description: "прошлый месяц" },
            { title: "Эффективность курса", value: "85%", change: +5, description: "в сравнении" },
        ]
    },
    'kursy-individualnye': {
        statsData: [
            { title: "Индивидуальные курсы", value: "40", change: "+25%", isMoney: false, period: "с прошлого месяца" },
            { title: "Доход (Индивидуальные)", value: "8 200 TJS", change: "+20%", isMoney: true, period: "с прошлого месяца" },
        ],
        dashboardData: [
            { title: "Оплата индивидуальных", value: "8 200 TJS", change: +20, description: "прошлый месяц" },
            { title: "Новые клиенты", value: "15", change: +5, description: "прошлый месяц" },
            { title: "Часы обучения", value: "120", change: +10, description: "прошлый месяц" },
            { title: "Использование материалов", value: "90%", change: +2, description: "в сравнении" },
        ]
    },
    'novye-polzovateli': {
        statsData: [
            { title: "Новые регистрации", value: "78", change: "+30%", isMoney: false, period: "с прошлой недели" },
            { title: "Первый платеж", value: "58", change: "+15%", isMoney: false, period: "с прошлой недели" },
        ],
        dashboardData: [
            { title: "Активные дни", value: "78", change: +30, description: "прошлая неделя" },
            { title: "Оплачено", value: "5 000 TJS", change: +15, description: "прошлая неделя" },
            { title: "Повторные регистрации", value: "8", change: +3, description: "прошлая неделя" },
            { title: "Возврат пользователей", value: "10%", change: -2, description: "в сравнении" },
        ]
    },
    'uslugi': {
        statsData: [
            { title: "Проданные услуги", value: "156", change: "+7%", isMoney: false, period: "с прошлого месяца" },
            { title: "Доход (Услуги)", value: "9 100 TJS", change: "+11%", isMoney: true, period: "с прошлого месяца" },
        ],
        dashboardData: [
            { title: "Продажи услуг", value: "9 100 TJS", change: +11, description: "прошлый месяц" },
            { title: "Количество", value: "156", change: +7, description: "прошлый месяц" },
            { title: "Повторные клиенты", value: "80%", change: +5, description: "в сравнении" },
            { title: "Повторные клиент", value: "70%", change: +9, description: "в сравнении" },
            { title: "Оценка качества", value: "4.9", change: +0.1, description: "прошлый месяц" },
        ]
    },
};

function SeriesDetailPage() {
    const { seriesSlug } = useParams();
    const seriesName = seriesMap[seriesSlug];
    
    const seriesStatsData = fakeDataMap[seriesSlug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [seriesSlug]);

    const filteredData = useMemo(() => {
        if (!seriesName) return null;

        const selectedSeries = newChartData.series.find(s => s.name === seriesName);
        
        if (!selectedSeries) return null;

        return {
            title: null,
            xLabels: newChartData.xLabels,
            yLabels: newChartData.yLabels,
            series: [selectedSeries]
        };
    }, [seriesName]);

    if (!seriesName) {
        return <div className="text-white text-center py-10 text-xl font-bold">Ошибка 404: Серия `{seriesSlug}` не найдена.</div>;
    }

    if (!filteredData) {
        return <div className="text-white text-center py-10">Данные для "{seriesName}" не найдены в `newChartData`.</div>;
    }

    const handleShare = () => {
        console.log(`Поделиться страницей ${seriesName}...`);
    };

    return (
        <div className="flex flex-col items-center my-4 space-y-8">
            <ProfileHeader
                title={seriesName}
                onShareClick={handleShare}
                showBackButton={true}
            />
            
            <StatsDashboard 
                data={seriesStatsData} 
                variant="dashboard"
            />

            <ActivityChart data={filteredData} />

            {seriesSlug === 'kursy-gruppovye' ? (
            <ClientCoursesTable 
            initialTab="group" 
            showTabs={false} 
            />
            ) : (
            <ClientCoursesTable 
            initialTab="individual" 
            showTabs={false} 
            />
            )}

        </div>
    );
}

export default SeriesDetailPage;
