import React from "react";
import titleLine from "../../assets/images/shape-11.png";

const SectionTitle = ({ title }) => {
  return (
    <div className="relative inline-block">
      {title}

      <img
        src={titleLine}
        alt="line"
        className="
          absolute 
          left-1/2 
          -translate-x-1/2 
          -bottom-2
          w-[120px]
        "
      />
    </div>
  );
};

export default SectionTitle;
