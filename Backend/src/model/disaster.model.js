import mongoose from "mongoose";

const disasterAlertSchema = new mongoose.Schema(
  {
    location: {
      type: String, // e.g., "New York, USA"
      required: true,
    },
    //type ma latitude ,longitude is a way to make the cordinates as schema field that must contain latitude and logitude
    coordinates: {
      type: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
      required: true,
    },
    //normal object vayo ,with  nested object...does not include necessary confuguration for weatherdata
    weatherData: {
      temperature: { type: Number, required: true }, // e.g., 28°C
      windSpeed: { type: Number, required: true },   // e.g., 12 km/h
      precipitation: { type: Number, required: true }, // e.g., 5 mm
    },
    alert: {
      type: String, // e.g., "Tornado Warning" or "No severe weather alerts"
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "moderate", "high", "critical"], // Severity levels
      default: "low",
    },
    issuedAt: {
      type: Date,
      default: Date.now, // Timestamp for the alert
    },
    expiresAt: {
      type: Date, // Optional: When the alert will expire
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default disasterModel=mongoose.model("DisasterAlert", disasterAlertSchema);
