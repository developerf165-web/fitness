import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import DropdownMenu from '@components/ui/DropdownMenu';
import ShimmerImage from '/src/components/ui/ShimmerImage';

export default function Cards({ item, onEdit, onDelete, isMini = false }) {

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

      {/* Badges: Discount ва Visit Count */}
      {(!isMini || item.type === 'course') && (
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

          {/* Conditional Layout: Course vs Others */}
          {item.type === 'course' ? (
            <div className="flex justify-between items-center mt-1">
              {/* Left: User Max (Capacity) - Custom UsersIcon */}
              <div className="flex items-center gap-2">
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 scale-75 origin-left">
                  <path d="M2.71071 4.77154C2.71061 3.98075 2.91186 3.20234 3.29636 2.50632C3.68086 1.81029 4.23655 1.21849 4.91346 0.784134C5.59036 0.349777 6.36724 0.0864896 7.17423 0.0179533C7.98122 -0.0505831 8.79301 0.0777807 9.53657 0.391499C10.2801 0.705218 10.9322 1.19445 11.434 1.8152C11.9359 2.43595 12.2718 3.16874 12.4116 3.94766C12.5513 4.72659 12.4906 5.52722 12.2348 6.27754C11.979 7.02787 11.5362 7.70435 10.9461 8.24616C12.0587 8.77322 13.0247 9.55443 13.7622 10.5235C14.4997 11.4927 14.9869 12.6211 15.1825 13.8132C15.2041 13.9458 15.1987 14.0813 15.1666 14.2119C15.1345 14.3425 15.0763 14.4657 14.9955 14.5743C14.9147 14.683 14.8127 14.775 14.6954 14.8452C14.5781 14.9154 14.4478 14.9624 14.3119 14.9834C14.1761 15.0045 14.0373 14.9992 13.9035 14.9678C13.7697 14.9365 13.6436 14.8798 13.5323 14.8008C13.421 14.7219 13.3267 14.6224 13.2548 14.5079C13.1829 14.3934 13.1348 14.2662 13.1132 14.1335C12.9038 12.8526 12.2334 11.6865 11.2226 10.8447C10.2117 10.0029 8.9265 9.54041 7.59779 9.54041C6.26908 9.54041 4.98389 10.0029 3.97301 10.8447C2.96214 11.6865 2.2918 12.8526 2.08237 14.1335C2.06073 14.2662 2.01254 14.3933 1.94055 14.5078C1.86857 14.6223 1.77419 14.7218 1.66281 14.8006C1.55144 14.8795 1.42524 14.9362 1.29143 14.9674C1.15762 14.9987 1.01881 15.0039 0.882937 14.9827C0.747063 14.9616 0.616781 14.9146 0.49953 14.8443C0.382279 14.774 0.280355 14.6819 0.199577 14.5732C0.118799 14.4644 0.06075 14.3412 0.0287433 14.2106C-0.00326331 14.08 -0.00860039 13.9445 0.0130368 13.8118C0.208988 12.6202 0.696356 11.4923 1.43383 10.5236C2.1713 9.55499 3.13713 8.77423 4.24944 8.24752C3.76306 7.80168 3.37556 7.26317 3.11089 6.66528C2.84622 6.0674 2.71002 5.42286 2.71071 4.77154ZM15.2775 2.72685C16.0888 2.7274 16.8824 2.95785 17.5621 3.39021C18.2419 3.82258 18.7784 4.43827 19.1066 5.16255C19.4348 5.88683 19.5406 6.68856 19.4112 7.4704C19.2817 8.25225 18.9226 8.98059 18.3773 9.56703C19.2272 9.97895 19.9824 10.5554 20.5969 11.2612C21.2114 11.967 21.6724 12.7875 21.9518 13.6728C22.0072 13.8446 22.015 14.0277 21.9744 14.2034C21.9339 14.3792 21.8464 14.5413 21.7209 14.6734C21.5954 14.8055 21.4363 14.9028 21.2599 14.9554C21.0834 15.0081 20.8958 15.0142 20.7161 14.9732C20.5366 14.9324 20.3712 14.8461 20.2367 14.7231C20.1021 14.6002 20.0031 14.4447 19.9495 14.2725C19.6993 13.4822 19.2432 12.7688 18.626 12.2021C18.0087 11.6353 17.2514 11.2346 16.428 11.0392C16.1994 10.9853 15.996 10.8578 15.8506 10.6773C15.7052 10.4968 15.6263 10.2738 15.6266 10.0441V9.5643C15.6264 9.37396 15.6807 9.18737 15.7834 9.02554C15.886 8.8637 16.0329 8.73304 16.2074 8.64828C16.6307 8.44347 16.9707 8.10497 17.1721 7.68775C17.3734 7.27052 17.4244 6.79909 17.3167 6.35003C17.2089 5.90096 16.9489 5.50064 16.5787 5.21408C16.2085 4.92752 15.7499 4.77156 15.2775 4.77154C14.9997 4.77154 14.7334 4.66383 14.537 4.4721C14.3406 4.28037 14.2303 4.02034 14.2303 3.74919C14.2303 3.47805 14.3406 3.21801 14.537 3.02628C14.7334 2.83456 14.9997 2.72685 15.2775 2.72685ZM7.59779 2.04528C7.2259 2.03707 6.85607 2.10148 6.51003 2.23472C6.16398 2.36796 5.8487 2.56735 5.58267 2.82118C5.31665 3.07501 5.10525 3.37817 4.96089 3.71286C4.81654 4.04755 4.74213 4.40701 4.74203 4.77016C4.74194 5.13331 4.81617 5.49282 4.96035 5.82757C5.10454 6.16233 5.31578 6.46559 5.58167 6.71955C5.84757 6.97352 6.16275 7.17306 6.50873 7.30647C6.8547 7.43988 7.2245 7.50446 7.59639 7.49644C8.32605 7.48068 9.0204 7.1867 9.5308 6.67741C10.0412 6.16813 10.3271 5.48402 10.3273 4.77153C10.3275 4.05903 10.0419 3.37478 9.53177 2.86525C9.02163 2.35571 8.32744 2.06139 7.59779 2.04528Z" fill="white" />
                </svg>
                <span className="text-white font-semibold text-xs">{item.user_max || 0}</span>
              </div>

              {/* Right: Price - Custom TicketIcon */}
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-90 origin-right">
                  <path d="M16.026 4.457L12.847 0L1.158 9.338L0.51 9.331V9.341H0V21.341H21V9.341H20.038L18.124 3.742L16.026 4.457ZM17.925 9.341H7.897L15.366 6.795L16.888 6.308L17.925 9.341ZM14.05 5.131L6.34 7.759L12.446 2.881L14.05 5.131ZM2 17.51V13.17C2.4219 13.0205 2.80511 12.7787 3.1217 12.4623C3.43828 12.1459 3.68027 11.7628 3.83 11.341H17.17C17.3197 11.763 17.5616 12.1462 17.8782 12.4628C18.1948 12.7794 18.578 13.0213 19 13.171V17.511C18.578 17.6607 18.1948 17.9026 17.8782 18.2192C17.5616 18.5358 17.3197 18.919 17.17 19.341H3.832C3.68218 18.9187 3.43996 18.5351 3.12302 18.2184C2.80607 17.9016 2.4224 17.6596 2 17.51Z" fill="white" />
                </svg>
                <span className={`text-white font-bold text-sm ${isMini ? 'text-xs' : ''}`}>
                  {Number(item.price).toFixed(0)}
                </span>
              </div>
            </div>
          ) : (
            <p className={`text-sm mb-0 color-accent ${isMini ? 'text-xs' : ''}`}>
              {visitCount > 0 ? (
                <>
                  {Number(item.price).toFixed(2)} TJS
                  {!item.hideUnit && <span className="text-gray-400"> / {visitCount} {isMini ? 'пос.' : 'посещений'}</span>}
                </>
              ) : (
                <>
                  {Number(item.tjs || item.price).toFixed(2)} TJS
                  {!item.hideUnit && <span className="text-gray-400"> / {isMini ? 'пос.' : 'посещение'}</span>}
                </>
              )}
            </p>
          )}
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
