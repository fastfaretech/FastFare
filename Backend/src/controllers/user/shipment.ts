import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { Shipment } from "../../models/shipmentModel";

export async function BookShipments(req: Request, res: Response) {
    try{
        const user = req.user;
        const {
            pickupLocation: {
                longitude: pickupLongitude,
                latitude: pickupLatitude
            },
            deliveryLocation: {
                longitude: deliveryLongitude,
                latitude: deliveryLatitude
            },
            size: {
                length,
                width,
                height
            },
            quantity,
            weight,
            netWeight,
            price
        } = req.body;

        if (!pickupLongitude ||
            !pickupLatitude || 
            !deliveryLongitude || 
            !deliveryLatitude || 
            !length || 
            !width || 
            !height || 
            !quantity || 
            !weight || 
            !netWeight || 
            !price) {
            console.log("All fields are required!");
            return res.status(400).json({ message: "All fields are required!" });
        }

        const shipmentId = `FFR+${nanoid(5)}`;
        const newShipment = new Shipment({
            shipmentId,
            userId: user?._id,
            pickupLocation: {
                longitude: pickupLongitude,
                latitude: pickupLatitude
            },
            deliveryLocation: {
                longitude: deliveryLongitude,
                latitude: deliveryLatitude
            },
            size: {
                length,
                width,
                height
            },
            quantity,
            weight,
            netWeight,
            price,
            status: "pending"
        })
        await newShipment.save();
        console.log("Shipment booked successfully!");
        return res.status(201).json({
            message: "Shipment booked successfully!",
            shipment: newShipment
        });
    }catch(error){
        console.log("Error:Internal Server Error!", error)
        return res.status(500).json({
            message:"Internal Server Error!",
            error
        })
    }
}


export async function GetShipments(req: Request, res: Response) {
    try{
        const user = req.user;
        const {shipmentId} = req.params;
        if (!shipmentId) {
            console.log("Shipment ID is required!");
            return res.status(400).json({ message: "Shipment ID is required!" });
        }
        const shipment = await Shipment.findOne({shipmentId, userId: user?._id});
        if(!shipment){
            console.log("Shipment not found!");
            return res.status(404).json({ message: "Shipment not found!" });
        }
        
        return res.status(200).json({
            message: "Shipment fetched!",
            shipment: shipment 
        });
        
    }catch(error){
        console.log("Error:Internal Server Error!", error)
        return res.status(500).json({
            message:"Internal Server Error!",
            error
        })
    }
}
