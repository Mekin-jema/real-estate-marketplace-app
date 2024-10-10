import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    try {
      const fetchOfferListings = async () => {
        const res = await fetch("/api/listings/get?offe=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
      };
      fetchOfferListings();
    } catch (error) {
      console.log(error);
    }
    try {
      const fetchSaleListings = async () => {
        const res = await fetch("/api/listings/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      };
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }
    try {
      const fetchRentListings = async () => {
        const res = await fetch("/api/listings/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
      };
      fetchRentListings();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {/* top */}
      <div className=" flex flex-col gpa-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl py-4">
          Find Your next <span className=" text-slate-500"> Perfect </span>{" "}
          <br />
          place with ease
        </h1>
        <div className=" text-gray-400 text-xs sm:text-sm ">
          Mekin Estate is the best place to find your next perfect place to live{" "}
          <br />
          We have a wide range of houses, apartments and lands for you to choose
          from
        </div>
        <Link
          to={"/search"}
          className=" text-xs sm:text-sm text-blue-800 hover:underline"
        >
          Let us help you find your dream home
        </Link>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                className="h-[500px] "
                key={listing._id}
                style={{
                  background: `url(${listing.image[0]}) center no-repeat `,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className=" max-w-6xl  mx-auto p-3 flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div className="m">
            <div className="m">
              <h2 className=" text-2xl font-semibold ">Recent offers</h2>
              <Link
                to={"/search?offer=true"}
                className="text-blue-700 hover:underline text-sm"
              >
                {" "}
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <div className="m" key={listing._id}>
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="m">
            <div className="m">
              <h2 className=" text-2xl font-semibold ">Recent rents</h2>
              <Link
                to={"/search?offer=true"}
                className="text-blue-700 hover:underline text-sm"
              >
                {" "}
                Show more Rents
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <div className="m" key={listing._id}>
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="m">
            <div className="m">
              <h2 className=" text-2xl font-semibold ">Recent sale</h2>
              <Link
                to={"/search?offer=true"}
                className="text-blue-700 hover:underline text-sm"
              >
                {" "}
                Show more sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <div className="m" key={listing._id}>
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {listing.image.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className=" h-[500px] my-0 "
              style={{
                background: `url(${image}) center no-repeat  `,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper> */}

      {/* listing results fro offer , sale and rent */}
    </div>
  );
};

export default Home;
