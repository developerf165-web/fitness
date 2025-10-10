import React from "react";
import "/src/styles/MembershipCards.css";

export default function MembershipCard({ type, amount, name, number, style }) {
  return (
    <div className={`card ${style}`}>
      <div className="card-content">
        <div className="card-text">
          <h2>{type}</h2>
          {amount && <p className="amount">{amount}</p>}
        </div>
      </div>
      <div className="card-footer">
        <p className="name">{name}</p>
        <p className="number">{number}</p>
      </div>
    </div>
  );
}
