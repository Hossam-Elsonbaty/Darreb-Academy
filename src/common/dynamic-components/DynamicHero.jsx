import React, { Fragment } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";
import curveImg from "../../assets/images/shape-23.png";
import doubleCurveImg from "../../assets/images/shape-24.png";

const DynamicHero = ({ links, authorImg }) => {
  const { lang } = useLanguage();
console.log(links);

  return (
    <div className="h-[40vh] flex flex-col justify-center relative px-4 md:px-15 lg:px-30 xl:px-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-4">
        <div className="flex flex-col gap-4 items-center lg:items-start ">
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink to="/">{links[lang][0]}</NavLink>
            <Typography className="text-[#309255]">{links[lang][1]}</Typography>
          </Breadcrumbs>

          {/* title */}
          <SectionTitle
            title={
              lang === "en" ? (
                <h2 className="text-4xl font-medium capitalize">
                  Our <span className="text-[#309255]">{links[lang][1]}</span>
                </h2>
              ) : (
                <h2 className="text-4xl font-medium">
                  <span className="text-[#309255]">{links[lang][1]}</span>
                </h2>
              )
            }
          />
        </div>

        {/* image */}
        <div>
          <img
            src={authorImg}
            alt="author"
            className="mx-auto md:ms-auto md:mx-0 block rounded-full"
          />
        </div>
      </div>

      <div className="hidden lg:block">
        <img
          src={curveImg}
          alt="curve img"
          className={`absolute ${
            lang === "en"
              ? "-start-40 bottom-0"
              : "-start-55 bottom-16 rotate-270"
          }`}
        />

        <img
          src={doubleCurveImg}
          alt="double-curve"
          className="absolute -top-28 end-0"
        />
      </div>
    </div>
  );
};

export default DynamicHero;
