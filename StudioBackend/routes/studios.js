const express = require("express");
const router = express.Router();
const Studio = require("../models/Studio");

// @route   GET /api/studios
// @desc    Get all studios
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { featured, status, sort } = req.query;

    let query = {};

    if (featured) query.featured = featured === "true";
    if (status) query.status = status;

    let sortOptions = { createdAt: -1 };
    if (sort === "views") sortOptions = { views: -1 };
    if (sort === "likes") sortOptions = { likes: -1 };

    const studios = await Studio.find(query).sort(sortOptions);

    res.set({
      "Access-Control-Allow-Origin": "*",
    });

    res.json({
      success: true,
      count: studios.length,
      data: studios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching studios",
      error: error.message,
    });
  }
});

// @route   GET /api/studios/:id
// @desc    Get single studio
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found",
      });
    }

    // Increment views
    studio.views += 1;
    await studio.save();

    res.set({
      "Access-Control-Allow-Origin": "*",
    });

    res.json({
      success: true,
      data: studio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching studio",
      error: error.message,
    });
  }
});

// @route   POST /api/studios
// @desc    Create new studio (images are URLs from ImageKit)
// @access  Private
router.post("/", async (req, res) => {
  try {
    // Parse JSON fields if they're strings
    const features =
      typeof req.body.features === "string"
        ? JSON.parse(req.body.features)
        : req.body.features || [];

    const amenities =
      typeof req.body.amenities === "string"
        ? JSON.parse(req.body.amenities)
        : req.body.amenities || [];

    const images =
      typeof req.body.images === "string"
        ? JSON.parse(req.body.images)
        : req.body.images || [];

    const studioData = {
      ...req.body,
      features,
      amenities,
      images,
    };

    const studio = await Studio.create(studioData);

    res.set({
      "Access-Control-Allow-Origin": "*",
    });

    res.status(201).json({
      success: true,
      message: "Studio created successfully",
      data: studio,
    });
  } catch (error) {
    console.error("Error creating studio:", error);
    res.status(400).json({
      success: false,
      message: "Error creating studio",
      error: error.message,
    });
  }
});

// @route   PUT /api/studios/:id
// @desc    Update studio
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found",
      });
    }

    // Parse JSON fields if they're strings
    const features =
      typeof req.body.features === "string"
        ? JSON.parse(req.body.features)
        : req.body.features || studio.features;

    const amenities =
      typeof req.body.amenities === "string"
        ? JSON.parse(req.body.amenities)
        : req.body.amenities || studio.amenities;

    const images =
      typeof req.body.images === "string"
        ? JSON.parse(req.body.images)
        : req.body.images || studio.images;

    const updateData = {
      ...req.body,
      features,
      amenities,
      images,
    };

    const updatedStudio = await Studio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.set({
      "Access-Control-Allow-Origin": "*",
    });

    res.json({
      success: true,
      message: "Studio updated successfully",
      data: updatedStudio,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating studio",
      error: error.message,
    });
  }
});

// @route   DELETE /api/studios/:id
// @desc    Delete studio
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found",
      });
    }

    await Studio.findByIdAndDelete(req.params.id);

    res.set({
      "Access-Control-Allow-Origin": "*",
    });

    res.json({
      success: true,
      message: "Studio deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting studio",
      error: error.message,
    });
  }
});

// @route   PUT /api/studios/:id/like
// @desc    Like/Unlike studio
// @access  Public
router.put("/:id/like", async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found",
      });
    }

    studio.likes += 1;
    await studio.save();

    res.set({
      "Access-Control-Allow-Origin": "*",
    });

    res.json({
      success: true,
      data: studio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating likes",
      error: error.message,
    });
  }
});

module.exports = router;
