import React from "react";
import LessorLayout from "@/Layouts/LessorLayout";

export default function Landing(props) {
  return (
    <LessorLayout
      lessorName={props.lessorName}
      incomeSummary={props.incomeSummary}
      upcomingReservations={props.upcomingReservations}
      reservationChartData={props.reservationChartData}
      ratingsChartData={props.ratingsChartData}
      categories={props.categories}
      rentals={props.rentals}
      isLessorRegistered={true}
    />
  );
}
