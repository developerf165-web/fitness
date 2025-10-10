import React from "react";
import MembershipCard from "./MembershipCard";
import membershipData from "/src/data/membershipData";
import "/src/styles/MembershipCards.css";

export default function MembershipCards() {
  return (
    <div>
        <p style={{ color: "white", fontWeight: "500", fontStyle: "SemiBold", fontSize: "30px", marginTop: "70px", marginBottom: "15px" }}>
            Карты
        </p>
        <div className="cards-container">
        {membershipData.map((card) => (
            <MembershipCard key={card.id} {...card} />
        ))}
        </div>
    </div>
  );
} 
