import React, { Fragment } from "react";

import Video from "../../components/enroll/Video";
import AccordionComp from "../../components/enroll/AccordionComp";
import CourseCate from "../../components/enroll/CourseCate";
import Banner from "../../common/Banner";

const Enroll = () => {
  return (
    <Fragment>
      <div className="bg-white px-4 md:px-15 lg:px-30 xl:px-40 py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* left video  */}
          <div>
            <Video />

            {/* Course filter  */}
            <div className="mt-10">
              <CourseCate />
            </div>
          </div>

          {/* right Accordion */}
          <div>
            <AccordionComp />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <Banner />
      </div>
    </Fragment>
  );
};

export default Enroll;
