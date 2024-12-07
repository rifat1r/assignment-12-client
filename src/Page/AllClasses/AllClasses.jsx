import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AllClassCard from "./AllClassCard";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FilterByPrice from "../../Components/FilterByPrice";

const AllClasses = () => {
  const [countClass, setCountClass] = useState(null);
  const [size, setSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const { search, classByTeacher } = useOutletContext();
  console.log("Teacher classes from context:", classByTeacher);

  // console.log("search", search);
  const [category, setCategory] = useState("All");
  const [value, setValue] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { data: allClass = [], isPending } = useQuery({
    queryKey: [
      "class",
      category,
      search,
      size,
      currentPage,
      priceRange,
      classByTeacher,
    ],
    queryFn: async () => {
      const teacherQuery = classByTeacher ? `&teacher=${classByTeacher} ` : "";
      const res = await axiosPublic.get(
        `/class?category=${category}&search=${search}&min=${priceRange.min}&max=${priceRange.max}&page=${currentPage}&size=${size}${teacherQuery}`
      );
      // setCountClass(res.data);
      // console.log("response", res.data);
      setCountClass(res.data.classCount);
      return res.data.result;
    },
  });
  // console.log("tab", category);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCategory(event.target.textContent);
  };
  //classByTeacher
  // useEffect(() => {
  //   const getTeacherCategory = async () => {
  //     if (classByTeacher) {
  //       const res = await axiosPublic.get(`/teacherCategory/${classByTeacher}`);

  //     }
  //   };
  //   getTeacherCategory();
  // }, [classByTeacher, axiosPublic]);
  // pagination
  const numberOfPages = countClass ? Math.ceil(countClass / size) : 0;
  const pages = [...Array(numberOfPages).keys()];
  const handleClassPerPage = (e) => {
    const val = e.target.value;
    setSize(val);
    setCurrentPage(0);
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
      <div className="flex justify-between items-center">
        <h2 className="text-4xl"> All classes : {allClass.length} </h2>
        <div>
          <Button
            variant="outlined"
            onClick={() => document.getElementById("my_modal_22").showModal()}
          >
            Filter by price
          </Button>

          <FilterByPrice setPriceRange={setPriceRange}></FilterByPrice>
        </div>
      </div>
      <div className="mb-4">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
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
      {numberOfPages > 0 && (
        <div className="flex justify-center items-center my-5">
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? "btn btn-primary btn-circle btn-sm btn-info mx-2"
                  : "btn btn-circle btn-sm  mx-2 "
              }
              key={page}
            >
              {page + 1}
            </button>
          ))}
          <select
            className="ml-3 select select-bordered select-sm"
            value={size}
            onChange={handleClassPerPage}
          >
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default AllClasses;
