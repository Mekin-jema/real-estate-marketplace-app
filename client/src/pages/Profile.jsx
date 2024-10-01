import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
// import { getDownloadURL } from "firebase/storage";
// import storage from "firebase/storage";
// import uploadBytestResumable from "firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
const Profile = () => {
  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setfilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(filePercentage);
  // console.log(fileUploadError);
  console.log(formData);
  // console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
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
        console.log("upload is" + progress + " % done");
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photo: downloadURL })
        );
      }
    );
  };

  //   firebae storage
  //   service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read,
  //       write: if request.resource.size<2*1024*1024 &&
  //       request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }
  return (
    <div className=" p-3 mx-auto  max-w-lg">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photo || currentUser.currentUser.photo}
          alt=" profile"
          className=" flex felx-col rounded-full h-24 w2-4 object-cover self-center "
        />
        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (imgage must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">
              {" "}
              {`uploading${filePercentage} %`}
            </span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder=" username"
          className=" rounded-lg p-3 border"
          id="username"
        />
        <input
          type="email"
          placeholder=" email"
          className=" rounded-lg p-3 border"
          id="email"
        />
        <input
          type="password"
          placeholder=" password"
          className=" rounded-lg p-3 border"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:95 disable:opacity-95">
          update Profile
        </button>
      </form>
      <div className="text-red-700 cursor-pointer flex  justify-between py-5 ">
        <span>Delete account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
