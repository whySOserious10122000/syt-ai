import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-cover bg-center h-64 flex items-center justify-center text-white" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?travel,tourism')" }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold">Explore the World with TourMate</h1>
        <p className="mt-2">Plan your dream vacation with ease and comfort.</p>
      </div>
    </div>
  );
};

export default HeroSection;
