import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { BiSolidOffer } from "react-icons/bi";
import { IoWallet } from "react-icons/io5";
import { TiStar } from "react-icons/ti";
import { MdLocationPin } from "react-icons/md";

interface RestaurantItem {
  restaurant_id: number;
  restaurant_name: string;
  images: { url: string }[];
  cuisines: { cuisine_name: string }[];
  location: { location_locality: string; state_name: string };
  rating: { restaurant_avg_rating: number };
  avg_cost_for_two: number;
  currency: { symbol: string };
}

const Restaurant = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [data, setData] = useState<RestaurantItem[]>([]);
  const [clickedData, setClickedData] = useState<RestaurantItem | undefined>();

  const allImages = data.map(({ images }) => images).flat(1);

  const fetchRestaurants = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://staging.fastor.in/v1/m/restaurant?city_id=118&null=null&=null",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  };

  // const handleClick = (restaurantData) => {
  //   setClickedData(restaurantData);
  // };

  useEffect(() => {
    fetchRestaurants();
    if (clickedData) {
      navigate(`/cart`, { state: { data: clickedData } });
    }
  }, [clickedData]);

  return (
    <div className="flex flex-col w-full overflow-auto pt-24">
      <div className="flex flex-col py-3 px-5 shadow-lg fixed top-0 w-full bg-white">
        <span className="flex items-center text-sm text-light-gray">
          Pre Order From <MdLocationPin />
        </span>
        <span className="text-base text-dark-gray">Connaught Place</span>
      </div>

      <div className="flex items-center gap-10 px-5 mb-10">
        <div className="aspect-square grow rounded-2xl flex flex-col gap-1 justify-center p-5 bg-gray-100">
          <span className="text-light-gray font-bold text-lg">
            {state?.data?.user_name}
          </span>
          <span className="text-dark-gray font-bold text-base">
            Let's explore this evening
          </span>
        </div>

        <div className="w-20 text-3xl text-white aspect-square rounded-2xl flex justify-center items-center bg-gradient-to-r from-yellow-300 to-orange-600">
          <BiSolidOffer />
        </div>
        <div className="w-20 text-3xl text-white aspect-square rounded-2xl flex justify-center items-center bg-gradient-to-r from-cyan-200 to-cyan-600">
          <IoWallet />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 mb-10">
        <span className="text-base text-dark-gray font-bold">Your taste</span>

        <div className="flex flex-row gap-5 overflow-y-scroll">
          {data.map(({ restaurant_id, restaurant_name, images, location }) => (
            <div
              key={restaurant_id}
              className="w-40 shrink-0 bg-gray-100 rounded-2xl overflow-hidden"
            >
              <div className="aspect-[5_/_4]">
                {images?.[0]?.url && (
                  <img
                    alt=""
                    src={images?.[0]?.url}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col p-3">
                <span className="text-dark-gray text-base font-semibold">
                  {restaurant_name}
                </span>

                <div className="flex flex-col text-light-gray text-sm">
                  <span>{location?.location_locality}</span>
                  <span>{location?.state_name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mb-10">
        <img
          src={allImages[0]?.url}
          alt=""
          className="rounded-xl aspect-video"
        />
      </div>

      <div className="flex flex-col gap-5 px-5">
        <span className="text-base text-dark-gray font-bold">Popular Ones</span>

        <div className="flex flex-col gap-5">
          {data.map((restaurant) => (
            <div
              key={restaurant.restaurant_id}
              className="grid grid-cols-3 gap-5 w-full"
            >
              <div
                className="aspect-square rounded-xl bg-gray-100 col-span-1 overflow-hidden"
                onClick={() => setClickedData(restaurant)}
              >
                {restaurant.images?.[0]?.url && (
                  <img
                    alt=""
                    src={restaurant.images?.[0]?.url}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <span className="text-dark-gray text-base font-semibold">
                  {restaurant.restaurant_name}
                </span>

                <div className="flex flex-col text-light-gray text-sm mb-1">
                  <span>
                    {(restaurant.cuisines || [])
                      .map(({ cuisine_name }) => cuisine_name)
                      .join(", ")}
                  </span>
                  <span>
                    {restaurant.location?.location_locality},{" "}
                    {restaurant.location?.state_name}
                  </span>
                </div>

                <div className="flex items-center text-sm font-medium text-orange-300 mb-2 gap-1">
                  <BiSolidOffer />
                  <span>4 Offers trending</span>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col text-xs">
                    <span className="flex items-center text-dark-gray">
                      <TiStar />
                      {restaurant.rating?.restaurant_avg_rating}
                    </span>
                    <span className="text-light-gray">Popularity</span>
                  </div>

                  <div className="flex flex-col text-xs">
                    <span className="text-dark-gray">
                      {restaurant.currency?.symbol}{" "}
                      {restaurant.avg_cost_for_two}
                    </span>
                    <span className="text-light-gray">Cost for two</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
