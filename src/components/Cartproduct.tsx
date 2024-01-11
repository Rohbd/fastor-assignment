import { BiSolidOffer } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";

const Cartproduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/restaurant");
  };

  return (
    <div>
      <img
        src={state?.data?.images[0].url}
        alt={`Image for ${state.restaurant_name}`}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="absolute top-0 left-0 m-4 text-white">
        <FaArrowLeft onClick={handleClick} />
      </div>
      <div>
        <div className="flex flex-row ml-10 mt-8 space-x-10 ">
          <div className="flex flex-col ">
            <h3 className="text-black-800 mb-[-5px] font-urbanist text-[30px]">
              {state?.data?.restaurant_name}
            </h3>
            <p className="text-light-gray text-[18px]">
              {state?.data?.location?.location_locality},
              {state?.data?.location?.city_name}
            </p>
            <div className="flex items-center text-lg font-medium text-orange-300 mt-2 mb-2 gap-1">
              <BiSolidOffer />
              <span>4 Offers trending</span>
            </div>
          </div>
          <span className="flex items-center w-[70px] mb-16 text-[20px] text-light-gray">
            <CiStar className="h-[auto] w-[35px]" />
            {state?.data?.rating?.restaurant_avg_rating}
          </span>
        </div>
        <div className="w-[314px] h-[51px] ml-10 mt-[14px]">
          <p className="font-urbanist text-[14px] text-md">
            Our delicate vanilla cake swirled with chocolate and filled with
            mocha chocolate chip cream and a layer of dark chocolate ganache
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cartproduct;
