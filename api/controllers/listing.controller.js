import Listing from "../model/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  const listing = req.body;
  try {
    const newListing = await Listing.create(listing);
    await newListing.save();
    res.status(200).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(
        errorHandler({ statusCode: 404, message: "Listing not found" })
      );
    }
    if (req.user.id !== listing.userRef) {
      return next(
        errorHandler({
          statusCode: 401,
          message: "You are not authorized to delete this listing",
        })
      );
    }

    await Listing.findByIdAndDelete(id);
    const newListing = await Listing.find({ userRef: req.user.id });
    res
      .status(200)
      .json({ message: "Listing deleted successfully", newListing });
  } catch (error) {
    console.log("Mekin Jemal");
    next(error);
  }
};
