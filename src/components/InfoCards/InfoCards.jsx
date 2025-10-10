import React from "react";
import { infoCardData } from "/src/data/infoCardData";
import InfoCard from "./InfoCard";

import "/src/styles/InfoCard.css";

export default function InfoCards() {
  return (
      <div className="grid grid-cols-2 gap-6 justify-center w-full mb-12">
        {infoCardData.map((item, index) => {
          return <InfoCard key={index} {...item} index={index} />;
        })}
      </div>
      
  );
}
 