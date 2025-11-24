import { Request, Response } from "express";
import { DriverDetails } from "../../models/detailsModel";
import { LogisticDetails } from "../../models/detailsModel";

export async function addDriver(req: Request, res: Response) {
    try {
        const {
            logisticClientId,
            name,
            email,
            contactNumber,
            licenseNumber,
            vehicleNumber,
            chasisNo
        } = req.body;

        if (!logisticClientId ||
            !name ||
            !email ||
            !contactNumber ||
            !licenseNumber ||
            !vehicleNumber ||
            !chasisNo) {
            console.log("All fields are required!");
            return res.status(400).json({ message: "All fields are required!" });
        }

        const client = await LogisticDetails.findOne({userId:logisticClientId});
        if (!client) {
            console.log("Logistic client not found!");
            return res.status(404).json({ message: "Logistic client not found!" });
        }

        const existingDriver = await DriverDetails.findOne({
            $or: [
                { email },
                { contactNumber },
                { licenseNumber },
                { vehicleNumber },
                { chasisNo }
            ]
        });

        if (existingDriver) {
            console.log("Driver with provided details already exists!");
            return res.status(409).json({ message: "Driver with provided details already exists!" });
        }

        const newDriver = new DriverDetails({
            logisticClientId,
            name,
            email,
            contactNumber,
            licenseNumber,
            vehicleNumber,
            chasisNo
        });

        await newDriver.save();
        console.log("Driver added successfully!");
        return res.status(201).json({ message: "Driver added successfully!", driver: newDriver });
    } catch (error) {
        console.log("Error: Internal Server Error!", error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function getDrivers(req: Request, res: Response) {
    try {
        const drivers = await DriverDetails.find({ logisticClientId: req.user?._id });
        console.log("Drivers fetched successfully!");
        return res.status(200).json({ message: "Drivers fetched successfully!", drivers });
    } catch (error) {
        console.log("Error: Internal Server Error!", error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}
