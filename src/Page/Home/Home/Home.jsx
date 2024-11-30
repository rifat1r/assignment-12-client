import Banner from "../Banner/Banner";
import FeaturedClass from "../FeaturedClass/FeaturedClass";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div className="border">
      <Banner></Banner>
      <FeaturedClass></FeaturedClass>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
