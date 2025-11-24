import mongoose from "mongoose"

const shipmentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true
    },
    shipmentId:{
        type: String,
        required: true,
        unique: true,
        
    },
    pickupLocation:{
        longitude:{
            type: Number,
            required: true
        },
        latitude:{
            type: Number,
            required: true
        }
    },
    deliveryLocation:{
        longitude:{
            type: Number,
            required: true
        },
        latitude:{
            type: Number,
            required: true
        }
    },
    size:{
        length:{
            type: Number,
            required: true
        },
        width:{
            type: Number,
            required: true
        },
        height:{
            type: Number,
            required: true
        }
    },
    quantity:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    netWeight:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "booked", "in-transit", "delivered", "cancelled"],
        default: "pending"
    },
    price:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Shipment = mongoose.model("SHIPMENT", shipmentSchema)
export { Shipment }