import PlusIcon from "./PlusIcon";
import EditIcon from "./EditIcon";
import BlockIcon from "./BlockIcon";
import DeleteIcon from "./DeleteIcon";
import AddBalanceIcon from "./AddBalanceIcon";
import WithdrawIcon from "./WithdrawIcon";
// import UpgradeIcon from "./UpgradeIcon";
// import DowngradeIcon from "./DowngradeIcon";
// import PinCardIcon from "./PinCardIcon";
// import EditProfile from "../Cards/EditProfile/EditProfile";


const getMenuItems = ({ onOpenBlock, onOpenDelete, onOpenRefill, onOpenWithdraw, onOpenEditProfile}) => [
  // { label: "Добавить услугу", icon: <PlusIcon />, action: () => alert("Добавить услугу") },
  { label: "Пополнить", icon: <AddBalanceIcon />, action: onOpenRefill },
  { label: "Снять", icon: <WithdrawIcon />, action: onOpenWithdraw},
  { label: "Ред. профиль", icon: <EditIcon />, action: onOpenEditProfile }, 
  { label: "Заблокировать", icon: <BlockIcon />, action: onOpenBlock}, 
  { label: "Удалить", icon: <DeleteIcon />, action: onOpenDelete, className: "danger" }, 
  
  // { label: "Повысить карту", icon: <UpgradeIcon />, action: onOpenUpgrade },
  // { label: "Понизить карту", icon: <DowngradeIcon />, action: onOpenDowngrade },
  // { label: "Закрепить карту", icon: <PinCardIcon />, action: () => alert("Закрепить карту"), className: "highlight" },
];

export default getMenuItems;