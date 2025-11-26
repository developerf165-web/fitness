import React from "react";

const BackgroundImage = () => {
  return (
    <div
      className="lg:block w-1/2 h-screen bg-cover bg-center filter grayscale"
      style={{ backgroundImage: "url('/images/loginBackground.jpg')" }}
    ></div>
  );
};

export default BackgroundImage;
