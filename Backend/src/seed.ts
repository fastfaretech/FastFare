import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { config } from "./utils/envConfig";
import User from "./models/userModel";
import { AdminDetails, LogisticDetails, UserDetails } from "./models/detailsModel";
import { Shipment } from "./models/shipmentModel";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    await mongoose.connect(config.MONGO_URI!);
    console.log("✅ MongoDB connected");

    // 🔥 Clear existing data
    await Promise.all([
      User.deleteMany({}),
      AdminDetails.deleteMany({}),
      LogisticDetails.deleteMany({}),
      UserDetails.deleteMany({}),
      Shipment.deleteMany({})
    ]);

    const pwdhash = await bcrypt.hash("Password@123", 10);

    // =====================
    // 👤 USERS
    // =====================

    const admin = await User.create({
      name: "Admin One",
      email: "admin@fastfare.com",
      pwdhash,
      role: "admin"
    });

    const logistic = await User.create({
      name: "Logistic One",
      email: "logistic@fastfare.com",
      pwdhash,
      role: "logistic"
    });

    const user1 = await User.create({
      name: "User One",
      email: "user1@fastfare.com",
      pwdhash,
      role: "user"
    });

    const user2 = await User.create({
      name: "User Two",
      email: "user2@fastfare.com",
      pwdhash,
      role: "user"
    });

    // =====================
    // 📄 DETAILS
    // =====================

    await AdminDetails.create({
      userId: admin._id,
      name: "Admin One",
      contactNumber: "9999999999",
      age: 35
    });

    await LogisticDetails.create({
      userId: logistic._id,
      name: "Logistic One",
      companyName: "Fast Logistics Pvt Ltd",
      gstin: "27ABCDE1234F1Z5",
      address: "Mumbai, Maharashtra",
      drivers: [
        {
          name: "Driver One",
          licenseNumber: "MH12DL1234",
          contactNumber: 9876543210
        }
      ]
    });

    await UserDetails.create({
      userId: user1._id,
      contactNumber: "8888888888",
      age: 25,
      companyDetails: {
        companyName: "User Company",
        gstin: "29ABCDE1234F1Z5",
        address: "Bangalore, Karnataka"
      }
    });

    await UserDetails.create({
      userId: user2._id,
      contactNumber: "7777777777",
      age: 28
    });

    // =====================
    // 📦 SHIPMENTS
    // =====================

    await Shipment.create([
      {
        shipmentId: `FFR-${nanoid(5)}`,
        userId: user1._id,
        pickupLocation: {
          latitude: 28.6139,
          longitude: 77.2090
        },
        deliveryLocation: {
          latitude: 19.0760,
          longitude: 72.8777
        },
        size: {
          length: 10,
          width: 5,
          height: 4
        },
        quantity: 2,
        weight: 50,
        netWeight: 48,
        price: 1500,
        status: "booked"
      },
      {
        shipmentId: `FFR-${nanoid(5)}`,
        userId: user1._id,
        pickupLocation: {
          latitude: 12.9716,
          longitude: 77.5946
        },
        deliveryLocation: {
          latitude: 13.0827,
          longitude: 80.2707
        },
        size: {
          length: 6,
          width: 4,
          height: 3
        },
        quantity: 1,
        weight: 20,
        netWeight: 18,
        price: 800,
        status: "in-transit"
      }
    ]);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
