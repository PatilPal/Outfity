//import React from "react";
import HeroCard from "../components/HeroCard/HeroCard";
import heroImage from "../assets/images/daily_suggestion.png";

function Home() {
  return (
    <>
    <HeroCard
    image = {heroImage}
    label="DAILY SUGGESTION"
    title = "The  Architectural Silhouette"
    />
    </>
  );
}

export default Home;
