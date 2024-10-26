import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllClassCard = ({ aClass }) => {
  const [short, setShort] = useState(true);

  return (
    <div className=" w-96 mx-auto">
      <figure className="">
        <img className="w-full h-64 object-cover " src={aClass.image} />
      </figure>
      <div className="px-1 ">
        <h3 className="text-2xl font-semibold">{aClass.title}</h3>
        <p className="text-slate-400">{aClass.name}</p>
        {short ? (
          <>
            <p>
              {aClass.description.split(" ").slice(0, 10).join(" ")}{" "}
              <span
                onClick={() => {
                  setShort(!short);
                }}
                className="text-lg text-blue-500"
              >
                {" "}
                ...Show More
              </span>
            </p>
          </>
        ) : (
          <>
            <p>
              {aClass.description}{" "}
              <span
                onClick={() => {
                  setShort(!short);
                }}
                className="text-lg text-blue-500"
              >
                Show Less
              </span>
            </p>
          </>
        )}
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold">${aClass.price}</h4>
          <Link to={`/allClass/${aClass._id}`}>
            {" "}
            <Button variant="outlined" size="small">
              Enroll
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllClassCard;
