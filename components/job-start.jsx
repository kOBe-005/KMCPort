import React from "react";

const JobStart = () => {
  const handleCardClick = (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
      window?.open(`${window?.location.origin}/${username}/job`, "_blank");
    }
  };

  return (
    <div>
      <button onClick={handleCardClick}>Press</button>
    </div>
  );
};

export default JobStart;
