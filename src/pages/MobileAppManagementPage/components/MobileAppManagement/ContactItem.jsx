import React from "react";
import DropdownMenu from "/src/components/ui/DropdownMenu";
import { FiMoreVertical } from "react-icons/fi";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import {
  BsTelephoneFill,
  BsTelegram,
  BsWhatsapp,
  BsLink45Deg,
} from "react-icons/bs";
// Мо то ҳол AiFillInstagram-ро истифода мебарем, зеро он иконкаи беҳтар (пурра) аст
import { AiFillInstagram } from "react-icons/ai";

const iconMap = {
  BsTelephoneFill,
  BsTelegram,
  BsWhatsapp,
  BsLink45Deg,
  BsInstagram: AiFillInstagram, // "BsInstagram"-ро ба иконкаи пурра пайваст мекунем
};

// --- ТАҒЙИРОТИ АСОСӢ ДАР ҲАМИН ҶО ---
// Мо барои Instagram заминаи гулобӣ ва матни сафед илова кардем,
// то ки он ба дигар иконкаҳо (сурх, кабуд, сабз) мувофиқат кунад.
const iconColors = {
  BsTelephoneFill: "bg-red-500 text-white",
  BsTelegram: "bg-blue-500 text-white",
  BsWhatsapp: "bg-green-500 text-white",
  BsInstagram: "bg-pink-500 text-white", // <-- ИСЛОҲ ШУД
  BsLink45Deg: "bg-gray-700 text-white",
};

export default function ContactItem({ icon, text, onEdit, onDelete }) {
  const IconComponent = iconMap[icon];
  const colorClass = iconColors[icon];

  const menuItems = [
    {
      label: "Редактировать",
      icon: <FaPencilAlt />,
      action: onEdit,
    },
    {
      label: "Удалить",
      icon: <FaTrashAlt />,
      action: onDelete,
      className: "danger", 
    },
  ];

  // --- ТАҒЙИРОТИ 2: Содда кардани Намоиш ---
  // Мо мантиқи 'isInstagram'-ро нест кардем.
  // Акнун ҳамаи иконкаҳо якхела, бо заминаи худ, нишон дода мешаванд.
  return (
    <div className="flex items-center gap-3">
      {IconComponent && (
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${colorClass}`}
        >
          <IconComponent className="text-lg" />
        </span>
      )}

      {/* Қисми боқимондаи код бе тағйир мемонад */}
      <div className="flex-1 flex items-center justify-between p-3 rounded-lg color-bg-mini-card">
        <span className="text-sm truncate">{text}</span>

        <DropdownMenu items={menuItems}>
          <button className="text-gray-400 hover:text-white">
            <FiMoreVertical className="cursor-pointer" size={18} />
          </button>
        </DropdownMenu>
      </div>
    </div>
  );
}