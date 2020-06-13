const Doctor = require('../models/doctors');
const {errorHandler} = require('../helpers/dbErrorHandler');

//get doctor by Id
exports.getDoctorById = (req, res, next, id) => {
    //get doctor populate by patients inside appointments
    Doctor.findById(id).populate('appointments.patient').exec((err, doctor) => {
        if(err || !doctor){
            return res.status(400).json({
                error: "Doctor could not be found"
            });
        }

        req.doctor = doctor;
        next();
    });
};

//Return doctor from Request object
exports.readById = (req, res) => {
    return res.json(req.doctor);
};

//get all doctors
exports.getAllDoctors = (req, res) => {
    Doctor.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data);

    });
};

// Create doctor
exports.createDoctor = (req, res) => {
    const doctor = new Doctor(req.body);
    doctor.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({data});
    });
};

//add appointment to a doctor
//get the doctor and update
exports.addAppointment = (req, res) => {
    console.log(req.body);
    let updateSet = {$push: {}};  //add to set used to not to replace existing appointments
    //adding new appointment to the doctor
    if (req.body.appointments != null) {
        const appointments =  {
            "day": req.body.appointments.day,
            "patient" : req.profile._id,
            "tokenNumber" : req.body.appointments.tokenNumber,
            "addedOn": new Date()
        };

        updateSet.$push.appointments = appointments;
    }


    Doctor.findOneAndUpdate({_id: req.doctor._id}, updateSet, {new: true}, (err, doctor) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json(doctor);
    });
};

exports.getNextAvailableDateAndToken = (req, res) => {

    Doctor.find({ _id: req.doctor._id})
        .select("appointments")
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: "Doctor could not be found"
                });
            }
            let dates = [];
            data[0].appointments.forEach(appointment => {
                dates.push(appointment.day);
            });

            const dayMax = new Date(Math.max.apply(null, dates));

            let response = {};
            response._id = req.doctor._id;
            response.dayMax = dayMax ? dayMax : null;
            response.tokenMax = null;
            data[0].appointments.forEach(appointment => {
                if(appointment.day.getTime() === dayMax.getTime()){
                    response.tokenMax = appointment.tokenNumber;
                }
            });
            console.log(response);
            res.json(response);

        });

};
