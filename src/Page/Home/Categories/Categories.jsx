import { useQuery } from "@tanstack/react-query";
import Category from "../../Shared/Category";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useOutletContext } from "react-router-dom";

const Categories = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  const {
    categories = [],
    developmentClasses,
    dataScienceClasses,
    cryptoClasses,
    devopsClasses,
    marketingClasses,
  } = data || {};
  const { setCategory, setValue } = useOutletContext();

  const dataScience = categories.find((cat) => cat._id === "Data science");
  const marketing = categories.find((cat) => cat._id === "Digital marketing");
  const devops = categories.find((cat) => cat._id === "DevOps");
  const crypto = categories.find((cat) => cat._id === "Crypto");
  const development = categories.find((cat) => cat._id === "Web development");

  if (isPending) {
    return (
      <div className="flex justify-center mt-36">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto  grid grid-cols-1 lg:grid-cols-2 justify-center gap-4">
      <Category
        catName={"Data science"}
        image={"https://i.ibb.co.com/9bg07Js/Data-Science-vs-Big-Data-vs.jpg"}
        title={"Turning Complex Data into Meaningful Insights"}
        classCount={dataScienceClasses}
        category={dataScience?.classes}
        setCategory={setCategory}
        setValue={setValue}
      />
      <Category
        catName={"DevOps"}
        image={"https://i.ibb.co/WkT4twL/hq720.jpg"}
        title={"Infrastructure as Code and Deployment Strategies"}
        classCount={devopsClasses}
        category={devops?.classes}
        setCategory={setCategory}
        setValue={setValue}
      />

      <Category
        catName={"Web development"}
        image={"https://i.ibb.co.com/287kSxG/1698039213268.jpg"}
        title={"Designing the Web of Tomorrow Today"}
        classCount={developmentClasses}
        category={development?.classes}
        setCategory={setCategory}
        setValue={setValue}
      />

      <Category
        catName={"Crypto"}
        image={"https://i.ibb.co.com/4TG4snY/Untitled.png"}
        title={"Understanding Blockchain for Future Innovations"}
        classCount={cryptoClasses}
        category={crypto?.classes}
        setCategory={setCategory}
        setValue={setValue}
      />
      <Category
        catName={"Digital marketing"}
        image={
          "https://i.ibb.co.com/c69mCgd/360-F-317830022-t2c7-Zhv-Wlp68eumsn-I4q4-Bnw267b-Pw-B9.jpg"
        }
        title={"Digital Marketing Strategies for Online Growth"}
        classCount={marketingClasses}
        category={marketing?.classes}
        setCategory={setCategory}
        setValue={setValue}
      />
    </div>
  );
};

export default Categories;
