
const Database = require("../Models/PackagesDatabase");
const { validationResult } = require("express-validator");

const UpdatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ message: "id is required" });
    }

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).json({ message: "validation error", error: error.array() });
    }

    const updates = {};
    if (req.body.Title) updates.Title = req.body.Title;
    if (req.body.Slots) updates.Slots = req.body.Slots;
    if (req.body.BasePrice) updates.BasePrice = req.body.BasePrice;
    if (req.body.Description) updates.Description = req.body.Description;
    if(req.body.TravelTimes)    updates.TravelTimes=req.body.TravelTimes


    const existingPackage = await Database.findById(id);
    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    updates.Image = existingPackage.Image || [];

    // Handle new images
    if (req.files && Object.keys(req.files).length > 0) {
      Object.keys(req.files).forEach((fieldName) => {
        const match = fieldName.match(/Image\[(\d+)\]/);
        if (match) {
          const index = parseInt(match[1], 10);
          updates.Image[index] = req.files[fieldName][0].path; // Cloudinary URL
        }
      });
    }

    // Handle existing images
    Object.keys(req.body).forEach((key) => {
      const match = key.match(/ExistingImage\[(\d+)\]/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (!updates.Image[index]) {
          updates.Image[index] = req.body[key]; // Keep existing image
        }
      }
    });

    // Remove undefined slots and validate
    updates.Image = updates.Image.filter((img) => img);
    if (updates.Image.length < 2) {
      return res.status(400).json({ message: "At least 2 images are required" });
    }
    if (updates.Image.length > 5) {
      return res.status(400).json({ message: "Maximum 5 images allowed" });
    }

    const updatedDestination = await Database.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedDestination) {
      return res.status(404).json({ message: "Data not updated" });
    }
    res.status(200).json({ message: "Package is updated", updatedDestination });
  } catch (error) {
    console.error("Internal error:", error);
    return res.status(500).json({ message: "Internal error", error: error.message });
  }
};

module.exports = UpdatePackage;