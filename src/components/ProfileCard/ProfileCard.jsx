import React from "react";
import "/src/styles/ProfileCard.css";
import ProfileStats from "./ProfileStats";
import ThreeDotsMenu from "./ThreeDotsMenu";

export default function ProfileCard({ onOpenDelete, onOpenBlock, onOpenRefill, onOpenWithdraw, onOpenEditProfile }) {
  return (
    <section className="profile-card">
      <div className="profile-card-container">
        <div className="profile-info">
          <img
            src="/images/avatar.jpg"
            alt="Азиза Султанова"
            className="avatar"
          />
          <div>
            <h2 className="name">АЗИЗА СУЛТАНОВА</h2>
            <p className="phone">+992 92 000 0000</p>
          </div>
        </div>

        <ProfileStats />
      </div>
      <ThreeDotsMenu 
        onOpenDelete={onOpenDelete} 
        onOpenBlock={onOpenBlock}
        onOpenRefill={onOpenRefill}
        onOpenWithdraw={onOpenWithdraw}
        onOpenEditProfile={onOpenEditProfile}
      />
    </section>
  );
}