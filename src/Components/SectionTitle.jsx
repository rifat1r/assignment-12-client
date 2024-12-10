const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className=" mx-auto text-center md:w-4/12 my-8">
      {subHeading && (
        <p className="text-yellow-600 text-xl mb-2 pb-2 border-b-4">
          ---{subHeading}---
        </p>
      )}
      {heading && (
        <h3 className="text-3xl uppercase border-b-4 pb-4">{heading}</h3>
      )}
    </div>
  );
};

export default SectionTitle;
