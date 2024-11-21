import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AllClassCard from "./AllClassCard";
import { Box, Slider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const AllClasses = () => {
  const min = 0;
  const max = 1000;
  const { search } = useOutletContext();
  console.log("search", search);
  const [category, setCategory] = useState("All");
  const [value, setValue] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { data: allClass = [], isPending } = useQuery({
    queryKey: ["class", category, search],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/class?category=${category}&search=${search}&min=${min}&max=${max}`
      );
      console.log("response", res.data);
      return res.data;
    },
  });
  console.log("tab", category);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCategory(event.target.textContent);
  };

  if (isPending) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div>
        <h2 className="text-4xl"> All classes : {allClass.length} </h2>
        {/* <div>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={value}
            />
          </Box>
        </div> */}
      </div>
      <div className="mb-4">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="All" />
            <Tab label="Web development" />
            <Tab label="DevOps" />
            <Tab label="Data science" />
            <Tab label="Crypto" />
            <Tab label="Digital marketing" />
          </Tabs>
        </Box>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
        {allClass.map((aClass) => (
          <AllClassCard key={aClass._id} aClass={aClass}></AllClassCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
