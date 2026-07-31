//import React from "react";
import HeroCard from "../components/HeroCard/HeroCard";
import heroImage from "../assets/images/daily_suggestion.png";
import Header from "../components/Header/Header"

function Home() {
  return (
    <>
    <Header/>
    <HeroCard
    image = {heroImage}
    label="DAILY SUGGESTION"
    title = "The  Architectural Silhouette"
    />
    </>
  );
}

export default Home;
