import Listing from "../model/listing.model.js";

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
