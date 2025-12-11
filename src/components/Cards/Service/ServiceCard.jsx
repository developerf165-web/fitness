import React from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import DropdownMenu from '@components/ui/DropdownMenu';
import ShimmerImage from '/src/components/ui/ShimmerImage';

export default function ServiceCard({ item, onEdit, onDelete, isMini = false }) {

    const menuItems = [
        {
            label: 'Редактировать',
            action: () => onEdit(item),
            icon: <Edit size={16} className="mr-2" />
        },
        {
            label: 'Удалить',
            action: () => onDelete(item),
            icon: <Trash2 size={16} className="mr-2" />,
            className: 'danger'
        },
    ];

    const discount = Number(item.discount || 0);
    const visitCount = Number(item.visit_count || 0);

    return (
        <div className={`relative overflow-hidden cursor-pointer text-white group aspect-[16/9] color-bg-mini-card card-hover-effect ${isMini ? 'rounded-lg text-xs' : 'rounded-2xl'}`}>

            <ShimmerImage
                src={item.imageUrl}
                alt={item.title}
                className="brightness-125 contrast-110 image-hover-zoom"
                errorIconSize={isMini ? 24 : 36}
                showShimmerOnError={false}
                showShimmerOnEmpty={false}
            />

            {/* Градиент барои зебоӣ - Танҳо агар расм бошад */}
            {item.imageUrl && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent mix-blend-multiply"></div>
            )}

            {/* Badges: Discount ва Visit Count - (Removed course type check) */}
            {!isMini && (
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    {discount > 0 && (
                        <div className="px-2 py-1 rounded-md bg-red-500/90 text-white text-xs font-semibold">
                            -{discount}%
                        </div>
                    )}
                </div>
            )}

            {/* Матн ва нарх */}
            <div className={`absolute bottom-0 left-0 right-0 z-20 flex items-stretch pb-1 ${isMini ? 'p-3' : 'p-5'}`}>
                <span className="block w-0.5 h-4 color-bg-accent"></span>
                <div className="pl-2 flex-1">
                    <h3 className={`mb-1 font-medium ${isMini ? 'line-clamp-1' : ''}`}>{item.title || item.name}</h3>

                    <p className={`text-sm mb-0 color-accent ${isMini ? 'text-xs' : ''}`}>
                        {visitCount > 0 ? (
                            <>
                                {Number(item.price).toFixed(2)} TJS
                                <span className="text-gray-400"> / {visitCount} {isMini ? 'пос.' : 'посещений'}</span>
                            </>
                        ) : (
                            <>
                                {Number(item.tjs || item.price).toFixed(2)} TJS
                                <span className="text-gray-400"> / {isMini ? 'пос.' : 'посещение'}</span>
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Меню бо се нуқта - Танҳо агар isMini=false бошад */}
            {!isMini && (
                <div className="absolute top-4 right-4 z-30">
                    <DropdownMenu items={menuItems}>
                        <button className="menu-dots-button">
                            <MoreVertical size={18} />
                        </button>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}
