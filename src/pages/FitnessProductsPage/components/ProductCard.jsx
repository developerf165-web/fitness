import React from "react";
// Import-ҳоро барои иконкаҳо ва меню нигоҳ медорем
import { HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import DropdownMenu from "../../components/ui/DropdownMenu.jsx";

// 💡 Хосиятҳои onEdit ва onDelete-ро қабул мекунем
const ProductCard = ({ product, onEdit, onDelete }) => {
  // 1. Амалҳо (Actions) - Акнун мо танҳо функсияҳои аз props қабулшударо иҷро мекунем
  const handleEdit = () => {
    onEdit(product); // Маҳсулотро мегузаронем, то модал онро донад
  };

  const handleDelete = () => {
    onDelete(product); // Маҳсулотро мегузаронем, то модал онро донад
  };

  // 2. Маълумот барои DropdownMenu
  const menuItems = [
    {
      label: "Редактировать",
      icon: <HiPencil className="w-5 h-5" />,
      action: handleEdit,
      className: "default", 
    },
    {
      label: "Удалить",
      icon: <HiTrash className="w-5 h-5" />,
      action: handleDelete,
      className: "danger", 
    },
  ];

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-3 flex flex-col relative text-white">
      
      {/* --- Нишонаи тахфиф (дар боло) --- */}
      {product.discount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          -{product.discount}%
        </div>
      )}

      {/* --- ҚИСМИ АСОСИИ СУРАТ --- */}
      <div className="w-full h-40 mb-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* ----------------------------- */}

      <h3 className="text-sm font-semibold mb-2 flex-grow">{product.name}</h3>
      
      <div className="flex items-end justify-between">
        {/* Қисми чап: Нархҳо */}
        <div className="flex flex-row"> 
          <span className="text-base font-bold">{product.price} TJS</span>
          {product.oldPrice && (
            <span className="font-bold ml-3 text-base text-gray-500 line-through">
              {product.oldPrice} TJS
            </span>
          )}
        </div>
        
        {/* 4. DropdownMenu */}
        <DropdownMenu items={menuItems}>
          <button
            className="text-gray-400 p-1 hover:text-white rounded-full transition-colors"
            aria-label="Имконоти маҳсулот"
          >
            <HiOutlineDotsVertical className="w-5 h-5 cursor-pointer" />
          </button>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProductCard;