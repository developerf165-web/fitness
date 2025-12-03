import React from 'react';

export default function UserLoyaltyCard({
    userData = {
        avatar: '/images/avatar.jpg',
        name: 'АЗИЗА СУЛТАНОВА',
        phone: '+992 92 000 0000',
        balance: '500 TJS',
        tier: 'Bronze',
        points: '20 баллов'
    },
    priceData = {
        price: '333 c',
        bonus: '20',
        total: '313 c'
    }
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] pr-6 gap-4">

            {/* Бахши чап */}
            <div className="color-bg-card rounded-2xl p-4">
                <div className="flex items-start gap-3">

                    {/* Аватар */}
                    <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-16 h-16 rounded-full object-cover border-2 color-border-accent"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold color-text-main mb-1">
                            {userData.name}
                        </h3>

                        <div className="flex items-center justify-between mb-1">
                            <p className="text-md text-white">
                                {userData.phone}
                            </p>
                            <p className="text-md text-white">
                                {userData.balance}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-md font-medium color-accent">
                                {userData.tier}
                            </p>
                            <p className="text-md text-white">
                                {userData.points}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Бахши рост */}
            <div className="color-bg-card rounded-2xl p-4 flex flex-col justify-center space-y-2">

                <div className="flex items-center justify-between">
                    <span className="text-md text-white">Цена:</span>
                    <span className="text-md font-medium text-white">
                        {priceData.price}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-md text-white">Бонус:</span>
                    <span className="text-md font-medium text-white">
                        {priceData.bonus}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-md font-medium text-white">Итого:</span>
                    <span className="text-md font-medium text-white">
                        {priceData.total}
                    </span>
                </div>

            </div>
        </div>
    );
}
