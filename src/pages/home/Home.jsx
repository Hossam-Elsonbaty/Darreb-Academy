import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import Works from "../../components/Works";
import Testimonials from "../../components/Testimonials";
import News from "../../components/News";
import Banner from "../../common/Banner";
import { useEffect } from "react";

const Home = () => {
  useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  return (
    <div>
      <Hero />
      <Categories />
      <Works />
      <Banner />
      <Testimonials />
      {/* <News /> */}
    </div>
  );
};

export default Home;
