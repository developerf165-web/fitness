import { useState } from 'react';
import { MoreVertical, Edit, Trash2, ImageOff } from 'lucide-react';
import DropdownMenu from '/src/pages/components/ui/DropdownMenu';

export default function Cards({ item, onEdit, onDelete, isMini = false }) {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false); // <-- ҳолати хато барои сурат

  const menuItems = [
    {
      label: 'Редактировать',
      action: () => onEdit(item.id),
      icon: <Edit size={16} className="mr-2" />
    },
    {
      label: 'Удалить',
      action: () => onDelete(item),
      icon: <Trash2 size={16} className="mr-2" />,
      className: 'danger'
    },
  ];

  const showFallback = !item.imageUrl || item.imageUrl.trim() === "" || imageError;

  return (
    <div className={`relative overflow-hidden cursor-pointer text-white group aspect-[16/9] color-bg-mini-card transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${isMini ? 'rounded-lg text-xs' : 'rounded-2xl'}`}>

      {/* Агар сурат бошад ва хато надошта бошад */}
      {!showFallback ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-125 contrast-110 ${loading ? 'hidden' : ''}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setImageError(true); // <-- Агар хатогӣ дар боркунии сурат
          }}
        />
      ) : (
        /* Агар сурат набошад ё хатогӣ бошад */
        <div className="absolute inset-0 flex flex-col items-center justify-center color-bg-card text-gray-300 z-10 animate-fadeIn">
          <ImageOff size={isMini ? 24 : 36} className="opacity-60 mb-2" />
        </div>
      )}

      {/* Агар ҳанӯз пурра нагузашта бошад */}
      {loading && (
        <div className="absolute inset-0 color-bg-card animate-pulse"></div>
      )}

      {/* Градиент барои зебоӣ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent mix-blend-multiply"></div>

      {/* Матн ва нарх */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 flex items-stretch pb-1 ${isMini ? 'p-3' : 'p-5'}`}>
        <span className="block w-0.5 h-4 color-bg-accent"></span>
        <div className="pl-2">
          <h3 className={`mb-1 font-medium ${isMini ? 'line-clamp-1' : ''}`}>{item.title || item.name}</h3>
          <p className={`text-sm mb-0 color-accent ${isMini ? 'text-xs' : ''}`}>
            {Number(item.tjs || item.price).toFixed(2)} TJS {item.pos && <span className="text-gray-400">/ {item.pos}</span>}
          </p>
        </div>
      </div>

      {/* Меню бо се нуқта - Танҳо агар isMini=false бошад */}
      {!isMini && (
        <div className="absolute top-4 right-4 z-30">
          <DropdownMenu items={menuItems}>
            <button className="p-1 rounded-full text-white hover:bg-black/25 transition-colors duration-200">
              <MoreVertical size={20} />
            </button>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
