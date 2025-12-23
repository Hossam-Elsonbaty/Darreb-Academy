import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import Works from "../../components/Works";
import Testimonials from "../../components/Testimonials";
import News from "../../components/News";
import Banner from "../../common/Banner";

const Home = () => {
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
