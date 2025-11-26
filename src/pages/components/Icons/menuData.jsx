import PlusIcon from "./PlusIcon";
import EditIcon from "./EditIcon";
import BlockIcon from "./BlockIcon";
import DeleteIcon from "./DeleteIcon";
import AddBalanceIcon from "./AddBalanceIcon";
import WithdrawIcon from "./WithdrawIcon";
import { FiCheckCircle } from "react-icons/fi"; // ++ ИКОНКАИ НАВ БАРОИ "АЗ БЛОК БАРОВАРДАН"

// import UpgradeIcon from "./UpgradeIcon";
// import DowngradeIcon from "./DowngradeIcon";
// import PinCardIcon from "./PinCardIcon";
// import EditProfile from "../Cards/EditProfile/EditProfile";

const getMenuItems = ({
  onOpenBlock,
  onOpenDelete,
  onOpenRefill,
  onOpenWithdraw,
  onOpenEditProfile,
  onOpenUnblock, // ++ ПАРАМЕТРИ НАВ
  userStatus,     // ++ СТАТУСИ ИСТИФОДАБАР
}) => {
  // Массиви асосии меню
  const menuItems = [
    // { label: "Добавить услугу", icon: <PlusIcon />, action: () => alert("Добавить услугу") },
    { label: "Пополнить", icon: <AddBalanceIcon />, action: onOpenRefill },
    { label: "Снять", icon: <WithdrawIcon />, action: onOpenWithdraw },
    { label: "Ред. профиль", icon: <EditIcon />, action: onOpenEditProfile },
    // { label: "Повысить карту", icon: <UpgradeIcon />, action: onOpenUpgrade },
    // { label: "Понизить карту", icon: <DowngradeIcon />, action: onOpenDowngrade },
    // { label: "Закрепить карту", icon: <PinCardIcon />, action: () => alert("Закрепить карту"), className: "highlight" },
  ];

  // ++ ЛОГИКАИ ШАРТӢ ++
  // Мо тафтиш мекунем, ки оё статус 'disabled' аст (яъне "блокшуда").
  // Ин ном ("disabled") аз 'actionType="disable"' дар ConfirmationModal гирифта шудааст.
  if (userStatus === "disable") {
    menuItems.push({
      label: "Разблокировать",
      icon: <FiCheckCircle className="w-5 h-5" />, // Иконкаи нав
      action: onOpenUnblock,
      // className: "highlight", // Онро бо ранги дигар нишон медиҳад (MenuButton.jsx инро дастгирӣ мекунад)
    });
  } else {
    menuItems.push({
      label: "Заблокировать",
      icon: <BlockIcon />,
      action: onOpenBlock,
    });
  }

  // Тугмаи "Удалить" ҳамеша дар охир илова карда мешавад
  menuItems.push({
    label: "Удалить",
    icon: <DeleteIcon />,
    action: onOpenDelete,
    className: "danger",
  });

  return menuItems;
};

export default getMenuItems;