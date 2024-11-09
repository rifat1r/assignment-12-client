import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AllClassCard from "./AllClassCard";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const AllClasses = () => {
  const [category, setCategory] = useState("All");
  const [value, setValue] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { data: allClass = [] } = useQuery({
    queryKey: ["class", category],
    queryFn: async () => {
      const res = await axiosPublic.get(`/class?category=${category}`);
      console.log("response", res.data);
      return res.data;
    },
  });
  console.log("tab", category);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCategory(event.target.textContent);
  };
  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-4xl"> All classes : {allClass.length} </h2>
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
