import React from "react";
import titleLine from "../../assets/images/shape-11.png";
const SectionTitle = ({ title }) => {
  return (
    <div className="relative">
      {title}

      <img
        src={titleLine}
        alt="line"
        className="absolute start-[50px] top-12"
      />
    </div>
  );
};

export default SectionTitle;
