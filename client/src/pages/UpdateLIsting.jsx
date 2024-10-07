import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "../Firebase";

import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

const UpdateListing = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [files, setFiles] = useState([]);
  const [filePercentage, setfilePercentage] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    image: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // console.log(formData);
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;
      const res = await fetch(`/api/listings/get/${listingId}`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.image.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((downloadURLs) => {
          setFormData({
            ...formData,
            image: formData.image.concat(downloadURLs),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2mb) max per image");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can  upload six images per list image ");
      setUploading(false);
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setfilePercentage(Math.round(progress));
          setUploading(true);
          console.log("upload is" + filePercentage + " % done");
        },
        (error) => {
          //   setFileUploadError(true);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    });
  };
  // setUploading(false);
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      image: formData.image.filter((url, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    console.log(formData.furnished);
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    console.log("handle submit");
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listings/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: user._id }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
      }
      // setLoading();
      setFormData({
        name: "",
        description: "",
        address: "",
        type: "",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
        image: [],
      });
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <main className=" p-3 max-w-4xl mx-auto ">
      <h1 className=" text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form
        className="flex flex-col sm:flex-row gap-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text "
            placeholder="Name"
            className=" border p-3  rounded-lg "
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text "
            placeholder="Description"
            className=" border p-3  rounded-lg "
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text "
            placeholder="Address"
            className=" border p-3  rounded-lg "
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className=" flex gap-6 flex-wrap ">
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className=" w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className=" w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className=" w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className=" w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnshided</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className=" w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6 ">
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg
                 "
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg "
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="">
                <p>Regular Price</p>
                <span>($ / Month)</span>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="  ">
                <p>Discounted Price</p>
                <span>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col  flex-1 gap-4">
          <p className=" font-semibold ">Images:</p>
          <span className="font-normal text-gray-600 ml-2">
            The first Image will be the cover (max 6)
          </span>
          <div className=" flex gap-4 ">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className=" p-3  border border-gray-300 rounded w-full "
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border-green-700  border rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          <div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.image.length > 0 &&
              formData.image.map((url, index) => (
                <div
                  className="flex justify-between p-3 border items-center "
                  key={url}
                >
                  <img
                    src={url}
                    alt="listing image"
                    className=" w-20 h-20 object-contain rounded-lg "
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveImage(index);
                    }}
                    className="p-3 text-red-700 border-red-700  border rounded uppercase hover:shadow-lg disabled:opacity-80"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <button
            type="submit"
            className="p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-95"
          >
            {loading ? "Updating..." : "Update  Listing"}
          </button>
          {error && <p className=" text-red-700 text-sm "> {error}</p>}
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
