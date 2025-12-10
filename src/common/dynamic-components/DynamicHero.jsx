import React, { Fragment } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";
import curveImg from "../../assets/images/shape-23.png";
import doubleCurveImg from "../../assets/images/shape-24.png";

const DynamicHero = ({ links, authorImg }) => {
  const { lang } = useLanguage();

  return (
    <div className="h-[70vh] flex flex-col justify-center relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-4">
        <div className="flex flex-col gap-4 items-center lg:items-start ">
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink to="/">{links[lang][0]}</NavLink>
            <Typography className="text-main">{links[lang][1]}</Typography>
          </Breadcrumbs>

          {/* title */}
          <SectionTitle
            title={
              lang === "en" ? (
                <h2 className="text-4xl font-medium capitalize">
                  Our <span className="text-main">Blogs</span>
                </h2>
              ) : (
                <h2 className="text-4xl font-medium">
                  <span className="text-main">المدونة</span>
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

        <img src={doubleCurveImg} alt="double-curve" className="absolute -top-17 -end-40" />
      </div>
    </div>
  );
};

export default DynamicHero;
