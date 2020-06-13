const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },
    specialization:{
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },
    maxPatientsPerDay:{
        type: Number,
        required: true
    },
    availableWeekDay: {
        type: String,
        required: true
    },
    availableTime: {
        type: String,
        required: true
    },
    roomNo:{
        type: String,
        required: true
    },
    appointments: [{
        day: {
            type: Date,
            required: true
        },
        patient: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        tokenNumber: {
            type: Number,
            required: true
        },
        addedOn: {
            type: Date,
            required: true
        }
    }]
}, {timestamps: true});

module.exports = mongoose.model("Doctor", doctorSchema);