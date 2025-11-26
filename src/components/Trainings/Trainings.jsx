import React from "react";
import { trainingsList } from "/src/data/data";
import TrainingCard from "./TrainingCard";
import CaloriesCircle from "./CaloriesCircle";
import MembershipCards from "/src/components/Trainings/MembershipCards/MembershipCards";
import WorkoutCalendar from "/src/components/Trainings/WorkoutCalendar/WorkoutCalendar";

import "/src/styles/Trainings.css";

export default function Trainings({ mainCard, additionalCards, userName }) {
  return (
    <section className="trainings">
      <MembershipCards
        mainCard={mainCard}
        additionalCards={additionalCards}
        userName={userName}
      />
      {/* <WorkoutCalendar />
      <div className="trainings-layout">
        <CaloriesCircle /> 
 

        <div className="trainings-cards">
          {trainingsList.map((t, i) => {
            return <TrainingCard key={i} text={t} />;
          })}
        </div>
      </div>       */}
    </section>
  );
}
