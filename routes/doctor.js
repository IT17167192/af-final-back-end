const express = require('express');
const router = express.Router();

const {doctorValidator} = require('../validators');
const {createDoctor, getDoctorById, addAppointment, getNextAvailableDateAndToken, readById, getAllDoctors} = require('../controllers/doctor');
const { requiredSignin, isAuth, isAdmin} = require('../controllers/auth');
const { getUserById } = require("../controllers/user");


//routes
//add a doctor, sign in is required, only admins can use this route
router.post("/doctor/create/:userId", requiredSignin, doctorValidator, isAuth, isAdmin, createDoctor);
//get all doctors
router.get("/doctors", getAllDoctors);
//read doctor by id
router.get("/doctor/:doctorId", readById);
// add appointment to a doctor - put request, user sign in is required, any sign in user can add a appointment
router.put('/doctor/addAppointment/:doctorId/:userId', requiredSignin, isAuth, addAppointment);
// get next available date and token by doctor id
router.get('/doctor/:doctorId/getNextAvailableDateAndToken', getNextAvailableDateAndToken);


router.param('userId', getUserById);// Whenever userId is called, getUserById executes
router.param('doctorId', getDoctorById);// Whenever doctorId is called, getDoctorById executes


module.exports = router;