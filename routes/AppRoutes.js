const mongoose = require('mongoose');
const express = require('express');
const { createTeacher, createStudent, getAllGrades, getAllStudentsByAdmission, getAllUsers, StudentLogin, TeacherLogin, getAllStudentsByStream, gradeStudent } = require('../controllers/TeacherController');


const router = express.Router();
router.use(express.json());


//allow url encoded
router.use(express.urlencoded({extended:false}));


//get all users
// router.get('/users',)

//register a new user
router.post('/register',createTeacher);


//add new rider
router.post('/addstudent',createStudent);

//login route
router.get('/getgrades',getAllGrades);

//grade
router.post('/gradestudent',gradeStudent)

//get user by email
router.get('/studentdata/:admission',getAllStudentsByAdmission);

//update user subscription
// router.put('/subscription/:email',updateUserSubscriptionByEmail);


//get all the users
router.get('/allstudents',getAllUsers)

//get srudent by stream
router.get('/allstudentsbystream',getAllStudentsByStream)

//get all the users
router.post('/studentlogin',StudentLogin)
//get all the users
router.post('/teacherlogin',TeacherLogin)






module.exports = router;