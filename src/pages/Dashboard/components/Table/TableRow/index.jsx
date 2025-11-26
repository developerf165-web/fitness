import { useNavigate } from "react-router-dom";

import AvatarCell from "./AvatarCell";
import PositionCell from "./PositionCell";
import CardsCell from "./CardsCell";
import StaffStatusCell from "./StaffStatusCell";
import FirstEnrollServiceCell from "./FirstEnrollServiceCell";
import EnrollServicesCountCell from "./EnrollServicesCountCell";
import EnrollServicesCell from "./EnrollServicesCell";
import DefaultCell from "./DefaultCell";

export default function TableRow({ user, fields, isPageBlocked }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (user && user.id) {
      navigate(`/user/${user.serverId}`);
    } else {
      console.error("User ID is missing, cannot navigate.");
    }
  };

  const renderCell = (field, i) => {
    const value = user[field];

    switch (field) {
      case "enrollServicesCount":
        return (
          <EnrollServicesCountCell
            key={i}
            user={user}
            value={value}
            isPageBlocked={isPageBlocked}
          />
        );

      case "enroll_services":
        return (
          <EnrollServicesCell
            key={i}
            user={user}
            value={value}
            isPageBlocked={isPageBlocked}
          />
        );

      case "avatar":
        return <AvatarCell key={i} user={user} value={value} />;

      case "position":
        return <PositionCell key={i} user={user} />;

      case "cards":
        return <CardsCell key={i} user={user} />;

      case "staffstatus":
        return <StaffStatusCell key={i} value={value} />;

      case "firstEnrollServiceName":
        return <FirstEnrollServiceCell key={i} value={value} />;

      default:
        return <DefaultCell key={i} value={value} />;
    }
  };

  return (
    <tr
      onClick={handleClick}
      className="border-b bottom-border-color cursor-pointer bg-hover-card"
    >
      {fields.map(renderCell)}
    </tr>
  );
}