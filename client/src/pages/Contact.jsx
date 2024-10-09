import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  console.log(listing);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const response = await fetch(`/api/user/${listing.userRef}`);
        const data = await response.json();
        setLandlord(data);
        console.log(data);
        console.log(listing.userRef);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className=" flex flex-col gap-2">
          Contact <span className=" font-semibold ">{landlord.username}</span>{" "}
          for{" "}
          <span className="font-semibold">{listing.name.toLowerCase()}</span>
          <textarea
            name="message"
            id=" message"
            rows="2"
            value={message}
            onChange={handleChange}
            placeholder="Type your message here"
            className=" w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            {" "}
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
