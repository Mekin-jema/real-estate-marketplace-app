import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Listing = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Fetch the listing data from the server

    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listings/get/${params.id}`);
        const data = await response.json();
        console.log(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
          // Do something with the data
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, []);
  return (
    <main>
      {loading && <p className=" text-center my-7"> Loading</p>}
      {error && (
        <p className=" text-center my-7 text-red-700">
          {" "}
          Some thing went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            {listing.title}
          </h1>
          <Swiper
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
                  className=" h-[500px] "
                  style={{
                    background: `url(${image}) center no-repeat  `,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="text-xl text-center my-7">{listing.description}</p>
        </div>
      )}
    </main>
  );
};

export default Listing;
