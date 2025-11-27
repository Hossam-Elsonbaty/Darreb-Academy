import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import mainLoader from "../../assets/lottiFiles/main-loader.json";
import pageLoader from "../../assets/lottiFiles/page.json";
import notFoundLoader from "../../assets/lottiFiles/notFound.json";

const LottieLoading = ({ status }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center justify-center gap-1 flex-col ">
        <Lottie
          animationData={
            status == "main"
              ? mainLoader
              : status === "page"
              ? pageLoader
              : notFoundLoader
          }
        />

        {status === "notFound" ? (
          <Link to="/" className="text-lg text-main underline">
            Go Back to Home
          </Link>
        ) : (
          <p className="text-4xl text-main font-bold">
            Loading your website ... plz wait!
          </p>
        )}
      </div>
    </div>
  );
};

export default LottieLoading;
