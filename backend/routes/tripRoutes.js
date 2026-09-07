const express = require("express");
const Trip = require("../models/Trip");

const router = express.Router();

// CREATE - Add a new trip
router.post("/", async (req, res) => {
  try {
    const trip = await Trip.create(req.body);

    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create trip",
      error: error.message
    });
  }
});

// READ - Get all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trips",
      error: error.message
    });
  }
});

// READ - Get a trip by ID
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({
      message: "Invalid trip ID",
      error: error.message
    });
  }
});

// UPDATE - Update a trip
router.put("/:id", async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update trip",
      error: error.message
    });
  }
});

// DELETE - Delete a trip
router.delete("/:id", async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.status(200).json({
      message: "Trip deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete trip",
      error: error.message
    });
  }
});

module.exports = router;