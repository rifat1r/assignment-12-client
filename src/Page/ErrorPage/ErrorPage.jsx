import { Link } from "react-router-dom";
import errorImg from "../../assets/404.jpg";

const ErrorPage = () => {
  return (
    <div
      className=" bg-cover bg-center  flex  justify-center"
      style={{ backgroundImage: `url(${errorImg})` }}
    >
      <Link to="/">
        <button className="btn bg-amber-500 text-white btn-wide border-0 border-b-4 border-r-4 border-y-gray-400 mt-[200px] md:mt-[500px] lg:mt-[700px]">
          {" "}
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
