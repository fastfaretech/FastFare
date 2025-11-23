import mongoose from "mongoose"

const userDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
        unique: true
    },
    contactNumber: {
        type: String
    },
    age: {
        type: Number
    },
    companyDetails: {
        companyName: {
            type: String
        },
        gstin: {
            type: String
        },
        address: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserDetails = mongoose.model("USER_DETAILS", userDetailsSchema)

const logisticDetailsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    companyName: {
        type: String
    },

    gstin: {
        type: String
    },

    address: {
        type: String
    },

    drivers: [{
        name: {
            type: String
        },
        licenseNumber: {
            type: String,
            unique: true
        },
        contactNumber: {
            type: Number
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const LogisticDetails = mongoose.model("LOGISTIC_DETAILS", logisticDetailsSchema)

const adminDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    contactNumber: {
        type: String
    },
    age:{
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const AdminDetails = mongoose.model("ADMIN_DETAILS", adminDetailsSchema)

export {
    UserDetails,
    LogisticDetails,
    AdminDetails
}
