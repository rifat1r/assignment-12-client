import Marquee from "react-fast-marquee";
import img1 from "../../../../src/assets/1.png";
import img2 from "../../../../src/assets/2.png";
import img3 from "../../../../src/assets/3.png";
import img4 from "../../../../src/assets/4.png";
import img5 from "../../../../src/assets/5.png";
import img6 from "../../../../src/assets/6.png";
import img7 from "../../../../src/assets/7.png";
import img8 from "../../../../src/assets/8.png";

const Partners = () => {
  return (
    <Marquee pauseOnHover className="bg-white ">
      <div>
        <img src={img1} alt="" />
      </div>
      <div>
        <img src={img2} alt="" />
      </div>
      <div>
        <img src={img3} alt="" />
      </div>
      <div>
        <img src={img4} alt="" />
      </div>
      <div>
        <img src={img5} alt="" />
      </div>
      <div>
        <img src={img6} alt="" />
      </div>
      <div>
        <img src={img7} alt="" />
      </div>
      <div>
        <img src={img8} alt="" />
      </div>
    </Marquee>
  );
};

export default Partners;
