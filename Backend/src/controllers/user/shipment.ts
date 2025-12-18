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
            status: "booked"
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
    try {
      const user = req.user;
      const { shipmentId } = req.params;
  
      if (!shipmentId) {
        return res.status(400).json({ message: "shipmentId is required" });
      }
  
      // use the same userId and shipmentId pattern as your list endpoint
      const shipment = await Shipment.findOne({
        shipmentId,
        userId: user?._id,
      });
  
      if (!shipment) {
        console.log("Shipment not found for", { shipmentId, userId: user?._id });
        return res.status(404).json({ message: "Shipment not found!" });
      }
  
      console.log("Shipment fetched successfully!");
      return res.status(200).json({ shipment });
    } catch (error) {
      console.log("Error:Internal Server Error!", error);
      return res.status(500).json({
        message: "Internal Server Error!",
        error,
      });
    }
  }



// nishant change for testing
export async function ListShipments(req: Request, res: Response) {
    try {
      const user = req.user;
  
      if (!user?._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const shipments = await Shipment.find({ userId: user._id })
        .sort({ createdAt: -1 });
  
      console.log(
        "ListShipments for user:",
        user._id,
        "count:",
        shipments.length
      );
  
      return res.status(200).json({ shipments });
    } catch (error) {
      console.log("Error:Internal Server Error!", error);
      return res.status(500).json({
        message: "Internal Server Error!",
        error,
      });
    }
  }