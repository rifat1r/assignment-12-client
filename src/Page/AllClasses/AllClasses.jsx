import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AllClassCard from "./AllClassCard";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import FilterByPrice from "../../Components/FilterByPrice";
import { IoSearch } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const [countClass, setCountClass] = useState(null);
  const [size, setSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const { search, setSearch, category, setCategory, value, setValue } =
    useOutletContext();

  // console.log("search", search);

  const axiosPublic = useAxiosPublic();
  const { data: allClass = [], isPending } = useQuery({
    queryKey: ["class", category, search, size, currentPage, priceRange],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/class?category=${category}&search=${search}&min=${priceRange.min}&max=${priceRange.max}&page=${currentPage}&size=${size}`
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
    // console.log("new tab value", newValue);
    setCategory(event.target.textContent);
  };

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
      <Helmet>
        <title>EduManage | All Classes</title>
      </Helmet>
      <div className="flex md:hidden p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload on form submit
            setSearch(e.target.search.value); // Access value from the input field by name
          }}
        >
          <label className="input input-bordered h-9 rounded-lg flex items-center gap-2 ">
            <input
              type="text"
              name="search"
              required
              placeholder="Search  for class"
            />
            <button type="submit">
              <IoSearch type="submit" className="text-2xl " />
            </button>
          </label>
        </form>
      </div>
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
