const express = require("express");
const Trip = require("../models/Trip");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

const normalizeTripPayload = (payload) => {
  const destination = String(payload.destination || "").trim();
  const startDate = String(payload.startDate || "").trim();
  const endDate = String(payload.endDate || "").trim();
  const travellers = Number(payload.travellers);
  const budget = Number(payload.budget);
  const description = String(payload.description || "").trim();

  if (!destination) {
    throw new Error("Destination is required");
  }

  if (!startDate || !endDate) {
    throw new Error("Trip dates are required");
  }

  if (new Date(startDate) > new Date(endDate)) {
    throw new Error("Start date cannot be later than end date");
  }

  if (!Number.isInteger(travellers) || travellers < 1) {
    throw new Error("Traveller count must be at least 1");
  }

  if (!Number.isFinite(budget) || budget < 0) {
    throw new Error("Budget must be zero or a positive number");
  }

  return {
    destination,
    startDate,
    endDate,
    travellers,
    budget,
    description
  };
};

router.use(authMiddleware);

// CREATE - Add a new trip
router.post("/", async (req, res) => {
  try {
    const tripData = normalizeTripPayload(req.body);

    const trip = await Trip.create({
      ...tripData,
      userId: req.user.id
    });

    res.status(201).json({
      ...trip.toObject(),
      travellers: trip.travellers,
      budget: trip.budget
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to create trip"
    });
  }
});

// READ - Get all trips for current user
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({
      createdAt: -1
    });

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
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

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
    const tripData = normalizeTripPayload(req.body);

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      tripData,
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
      message: error.message || "Failed to update trip"
    });
  }
});

// DELETE - Delete a trip
router.delete("/:id", async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

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