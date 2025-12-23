import React from "react";
import titleLine from "../../assets/images/shape11.png";
const SectionTitle = ({ title, status }) => {
  return (
    <div className="relative inline-block w-fit">
      {title}

      <img
        src={titleLine}
        alt="line"
        className={` absolute right-0 top-12 w-32`}
        // className={`${status ? "start-1/2" : "start-[50px]"} absolute  top-12 `}
      />
    </div>
  );
};

export default SectionTitle;
