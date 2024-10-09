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

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(
        errorHandler({ statusCode: 404, message: "Listing not found" })
      );
    }
    if (req.user.id !== listing.userRef) {
      return next(
        errorHandler({
          statusCode: 401,
          message: "You are not authorized to update this listing",
        })
      );
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return the new listing
      }
    );
    res.status(200).json(updatedListing);
  } catch (error) {}
};

export const getListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  try {
    if (!listing) {
      return next(errorHandler(404, "Listing is not found"));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = {
        $in: [false, true],
      };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = {
        $in: [false, true],
      };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = {
        $in: [false, true],
      };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = {
        $in: ["sale", "rent"],
      };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
