const express = require("express");
const router = express.Router(); // ✅ use express.Router(), not router.express()

const {
  handleCreateDestination,
  handleCreatePackage,
  handleGetDestinations,
  handleGetTopSellingPackages,
} = require("../controller/destinationPakageAPI");
const { uploadImageSingle } = require("../fileuploader");

// POST Routes
router.post(
  "/destinations",
  uploadImageSingle("image"),
  handleCreateDestination
);
router.post(
  "/packages/top-selling",
  uploadImageSingle("image"),
  handleCreatePackage
);

// GET Routes
router.get("/destinations", handleGetDestinations);
router.get("/packages/top-selling", handleGetTopSellingPackages);

module.exports = router;
