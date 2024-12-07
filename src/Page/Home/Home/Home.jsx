import Footer from "../../Shared/Footer";
import Banner from "../Banner/Banner";
import FeaturedClass from "../FeaturedClass/FeaturedClass";
import HomeStats from "../HomeStats/HomeStats";
import JoinAsTeacher from "../JoinAsTeacher/JoinAsTeacher";
import Reviews from "../Reviews/Reviews";
import Teachers from "../Teachers/Teachers";

const Home = () => {
  return (
    <div className="border">
      <Banner></Banner>
      <FeaturedClass></FeaturedClass>
      <Teachers></Teachers>
      <JoinAsTeacher></JoinAsTeacher>
      <Reviews></Reviews>
      <HomeStats></HomeStats>
      <Footer></Footer>
    </div>
  );
};

export default Home;
