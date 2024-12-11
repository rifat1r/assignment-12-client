import SectionTitle from "../../../Components/SectionTitle";
import Footer from "../../Shared/Footer";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import FeaturedClass from "../FeaturedClass/FeaturedClass";
import HomeStats from "../HomeStats/HomeStats";
import JoinAsTeacher from "../JoinAsTeacher/JoinAsTeacher";
import Partners from "../Partners/Partners";
import Reviews from "../Reviews/Reviews";
import Teachers from "../Teachers/Teachers";

const Home = () => {
  return (
    <div className="border">
      <Banner></Banner>
      <SectionTitle
        subHeading="Top-Rated Classes "
        heading={"Elite Learning Experience"}
      ></SectionTitle>
      <FeaturedClass></FeaturedClass>
      <SectionTitle
        subHeading={"Explore Categories"}
        heading={"Classes for everyone."}
      ></SectionTitle>
      <Categories></Categories>
      <SectionTitle subHeading={"Expert educators await"}></SectionTitle>
      <Teachers></Teachers>
      <JoinAsTeacher></JoinAsTeacher>
      <SectionTitle
        subHeading={"Hear from learners"}
        heading={"What Our Students Say"}
      ></SectionTitle>
      <Reviews></Reviews>
      <HomeStats></HomeStats>
      <SectionTitle subHeading={"Our Partners"}></SectionTitle>
      <Partners></Partners>
      <Footer></Footer>
    </div>
  );
};

export default Home;
