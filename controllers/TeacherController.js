const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Teacher = require('../model/Teacher');
const Exam = require('../model/Exam');


//create a new user
const createStudent = async (req, res) => {
    try {
        const { name, admission, stream, password} = req.body;

        const existingUser = await User.findOne({ admission });

        //check if user already existing
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                admission,
                stream,
                password: hashedPass,
                
            })

            res.status(200).json(user);
            console.log("User Account created Successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error creating new user' });

    }
}


//create a new teacher
const createTeacher = async (req, res) => {
    try {
        const { name, phone, stream,email, password,unit} = req.body;

        const existingUser = await Teacher.findOne({ email });

        //check if user already existing
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            const teacher = await Teacher.create({
                name,
                phone,
                email,
                password: hashedPass,
                phone,
                unit,
                stream
            })

            res.status(200).json(teacher);
            console.log("Teacher Account created Successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error creating new teacher' });

    }
}

const gradeStudent = async (req, res) => {
    try {
        const { admission, unit,marks, lecturer} = req.body;

        const existingUser = await User.findOne({ admission,unit });

        //check if user already existing
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
        } else {
            // const hashedPass = await bcrypt.hash(password, 10);
            const exam = await Exam.create({
                admission,
                unit,
                marks,
                lecturer
            })

            res.status(200).json(exam);
            console.log("Grade created Successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error creating new grade' });

    }
}



//get all the users
const getAllUsers = async (req, res) => {
    try {
        const students = await User.find({});
        res.status(200).json(students);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}
//get all the riders
const getAllGrades = async (req, res) => {
    try {
        const exam = await Exam.find({});
        res.status(200).json(exam);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}









//login users
const StudentLogin = async (req, res) => {
    try {
        const { admission, password } = req.body;

        const student = await User.findOne({ admission });

        if (!student) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const validPassword = await bcrypt.compare(password, student.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If authentication is successful, you can generate a token and send it to the client
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("user logged in successfully");

        // If authentication is successful, you can generate a token and send it to the client

        return res.status(200).json(student); // Send the user object as a response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
}
//login users
const TeacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const validPassword = await bcrypt.compare(password, teacher.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If authentication is successful, you can generate a token and send it to the client
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("user logged in successfully");


        return res.status(200).json( teacher); // Send the user object as a response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
}


//get user by ADM
const getAllStudentsByAdmission = async (req, res) => {
    try {
        const {admission} = req.params;
        const admitteduser = await User.findOne({admission});
        if(!admitteduser){
            return res.status(404).json({message:'user with that email does not exist'});
        }

        return res.status(200).json(admitteduser);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "data not located" })

    }
}
//get user by STREAM
const getAllStudentsByStream = async (req, res) => {
    try {
        const {stream} = req.params;
        const streamuser = await User.findOne({stream});
        if(!streamuser){
            return res.status(404).json({message:'user with that email does not exist'});
        }

        return res.status(200).json(streamuser);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "data not located" })

    }
}





module.exports = {
    createStudent,
    createTeacher,
    getAllGrades,
    getAllUsers,
    TeacherLogin,
    StudentLogin,
    getAllStudentsByAdmission,
    getAllStudentsByStream,
    gradeStudent

}