const { model } = require("mongoose");
const Destination = require("../models/Destination");
const Package = require("../models/Package");

const { getFullImageUrl } = require("../utils/helper");


const handleCreateDestination = async (req, res) => {
  const { name, startingPrice } = req.body;

  // req.file is created by multer and has info about uploaded file
  if (!name || !startingPrice || !req.file) {
    return res.status(400).json({
      status: 400,
      message: "name, image, and startingPrice are required",
    });
  }

  try {
  
    const imageUrl = getFullImageUrl(`/uploads/${req.file.filename}`);

    const newDestination = await Destination.create({
      name,
      image: imageUrl,
      startingPrice,
    });

    return res.status(201).json({
      status: 201,
      message: "Destination created successfully",
      data: newDestination,
    });
  } catch (err) {
    console.error("Error creating destination:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const handleGetDestinations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const total = await Destination.countDocuments();
    const destinations = await Destination.find()
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: 200,
      message: "Fetched popular destinations successfully",
      data: destinations,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};



const handleCreatePackage = async (req, res) => {
  const { title, image, startingPrice, duration } = req.body;

  if (!title) {
    return res.status(400).json({
      status: 400,
      message: "title are required",
    });
  }

  try {

    const imageUrl = getFullImageUrl(`/uploads/${req.file.filename}`);
    const newPackage = await Package.create({
      title,
      image:imageUrl,
      startingPrice,
      duration,
    });

    return res.status(201).json({
      status: 201,
      message: "Tour package created successfully",
      data: newPackage,
    });
  } catch (err) {
    console.error("Error creating package:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};


const handleGetTopSellingPackages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const total = await Package.countDocuments();
    const packages = await Package.find()
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: 200,
      message: "Fetched top-selling tour packages successfully",
      data: packages,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching packages:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};




module.exports = {
  handleGetDestinations,
  handleGetTopSellingPackages,
  handleCreateDestination,
  handleCreatePackage,
};
 