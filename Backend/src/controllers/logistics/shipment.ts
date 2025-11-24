import { Request, Response } from "express";
import { DriverDetails } from "../../models/detailsModel";
import { Shipment } from "../../models/shipmentModel";


export async function confirmShipment(req: Request, res: Response) {
    try {
        const authUser = req.user;
        const { driverId, shipmentId} = req.body;
        const logisticClientId = authUser?._id;

        if( !driverId || !shipmentId){
            console.log("Driver ID and status are required!");
            return res.status(400).json({ message: "Driver ID and status are required!" });
        }

        const driver = await DriverDetails.findOne({ _id: driverId, logisticClientId });
        if (!driver) {
            console.log("Driver not found!");
            return res.status(404).json({ message: "Driver not found!" });
        }
        const shipment = await Shipment.findOne({ shipmentId: shipmentId });
        console.log(shipment);
        console.log(shipmentId);
        if (!shipment) {
            console.log("Shipment not found!");
            return res.status(404).json({ message: "Shipment not found!" });
        }

        shipment.status = "in-transit";
        shipment.DriverId = driver._id;
        shipment.logisticClientId = logisticClientId;
        driver.status = "on-duty";

        await shipment.save();
        await driver.save();

        console.log("Shipment status updated successfully!");
        return res.status(200).json({ message: "Shipment status updated successfully!", shipment });
    } catch (error){
        console.log("Error: Internal Server Error!", error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}
