import React from "react";
import { HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import DropdownMenu from "../../components/ui/DropdownMenu.jsx";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    onDelete(product);
  };

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
    <div className="bg-[#1C1C1C] rounded-xl overflow-hidden relative text-white h-64 flex flex-col">
      
      {/* Сурат - пураи карт */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay аз поён то боло */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      {/* Тахфиф - дар боло, рост */}
      {product.discount && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          -{product.discount}%
        </div>
      )}

      {/* Мундариҷа - дар поён */}
      <div className="relative z-10 mt-auto p-4 flex flex-col gap-2">
        {/* Ном */}
        <h3 className="text-base font-semibold line-clamp-2">{product.name}</h3>
        
        {/* Қисми поён: Нархҳо ва меню */}
        <div className="flex items-center justify-between">
          {/* Нархҳо - баробар */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{product.price} TJS</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice} TJS
              </span>
            )}
          </div>
          
          {/* DropdownMenu */}
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
    </div>
  );
};

export default ProductCard;
