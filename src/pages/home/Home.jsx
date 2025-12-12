import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import Works from "../../components/Works";
import Banner from "../../components/Banner";
import Testimonials from "../../components/Testimonials";
import News from "../../components/News";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Works />
      <Banner />
      <Testimonials />
      <News />
    </div>
  );
};

export default Home;
