import React, { useState, useEffect } from "react";
import "/src/styles/ProfileCard.css";
import ProfileStats from "./ProfileStats";
import ThreeDotsMenu from "./ThreeDotsMenu";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileCard({
  userData,
  onOpenDelete,
  onOpenBlock,
  onOpenRefill,
  onOpenWithdraw,
  onOpenEditProfile,
  onOpenUnblock,
}) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = userData.img;

  useEffect(() => {
    setImgError(false);
  }, [imgSrc]);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <section className="profile-card">
      <div className="profile-card-container">
        <div className="profile-info">
          {!imgSrc || imgError ? (
            <FaUserCircle 
              className="avatar" 
              style={{ color: "#444" }} 
            />
          ) : (
            <img
              src={imgSrc}
              alt={`${userData.name} ${userData.surname}`}
              className="avatar"
              onError={handleImageError}
            />
          )}

          <div>
            <h2 className="name">
              {`${userData.name} ${userData.surname}`.toUpperCase()}
            </h2>
            <p className="phone">{userData.username}</p>
          </div>
        </div>

        <ProfileStats
          age={userData.age}
          height={userData.height}
          weight={userData.weight}
        />
      </div>
      <ThreeDotsMenu
        onOpenDelete={onOpenDelete}
        onOpenBlock={onOpenBlock}
        onOpenRefill={onOpenRefill}
        onOpenWithdraw={onOpenWithdraw}
        onOpenEditProfile={onOpenEditProfile}
        onOpenUnblock={onOpenUnblock}
        userStatus={userData.status}
      />
    </section>
  );
}