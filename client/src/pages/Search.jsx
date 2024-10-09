import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const parking = urlParams.get("parking") === "true" ? true : false;
    const furnished = urlParams.get("furnished") === "true" ? true : false;
    const offer = urlParams.get("offer") === "true" ? true : false;
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";

    if (searchTerm || type || parking || furnished || offer || sort || order) {
      setSidebardata({
        searchTerm,
        type,
        parking,
        furnished,
        offer,
        sort,
        order,
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      console.log(searchQuery);
      const res = await fetch(`/api/listings/get?${searchQuery}`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setData(data);
      setLoading(false);
      console.log(data);
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  //   console.log(sidebardata);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlPrarams = new URLSearchParams(window.location.search);
    urlPrarams.set(`searchTerm`, sidebardata.searchTerm);
    urlPrarams.set("type", sidebardata.type);
    urlPrarams.set("parking", sidebardata.parking);
    urlPrarams.set("furnished", sidebardata.furnished);
    urlPrarams.set("offer", sidebardata.offer);
    urlPrarams.set("sort", sidebardata.sort);
    urlPrarams.set("order", sidebardata.order);
    const searchQuery = urlPrarams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className=" flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className=" flex flex-col gap-8 " onSubmit={handleSubmit}>
          <div className=" flex items-center g-4 p-">
            <label className=" whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className=" flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex gap-2 flex-wrap items-center ">
            <label className="font-semibold">Amenities:</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking </span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className=" flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className=" border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high to low </option>
              <option value="regularPrice_asc"> Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 text-center uppercase ">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className=" text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Result:
        </h1>
        {data &&
          data.map((d) => (
            <div
              className=" flex flex-col w-56 h-100 items-center flex-1 px-5"
              key={d._id}
            >
              <img src={d.image} alt="img" />
              <p>{}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
