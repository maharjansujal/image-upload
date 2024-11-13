const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
const artSchema = new mongoose.Schema({
    form_no: String,
    student_name: String,
    guardian_name: String,
    birthdate: String,
    address: String,
    gender: String,
    age: String,
    mobile_1: String,
    mobile_2: String,
    email_id: String,
    joining_date: String,
    school_name: String,
    school_address: String,
    preferred_time: String,
    admission_date: String,
    class_plans: String,
    number_of_days: String,
    course_type: String,
    admission_fee: String,
    subscription_fee: String
})

const ArtStudent = mongoose.model('Art', artSchema);

router.post('/', (req, res) => {
    console.log(req.body);
    const { student_name,
        guardian_name,
        birthdate,
        address,
        gender,
        age,
        mobile_1,
        mobile_2,
        email_id,
        joining_date,
        school_name,
        school_address,
        admission_date,
        preferred_time,
        class_plans,
        number_of_days,
        course_type,
        admission_fee,
        subscription_fee } = req.body;
    const newArtStudent = new ArtStudent({
        student_name,
        guardian_name,
        birthdate,
        address,
        gender,
        age,
        mobile_1,
        mobile_2,
        email_id,
        joining_date,
        school_name,
        school_address,
        admission_date,
        preferred_time,
        class_plans,
        number_of_days,
        course_type,
        admission_fee,
        subscription_fee,
    })
    newArtStudent.save()
        .then(() => { res.status(201).json({ message: "Art student enrolled" }) })
        .catch(err => {
            res.status(400).json({ error: err.message })
        })
})

router.get('/', (req, res) => {
    ArtStudent.find()
        .then(students => res.status(200).json(students))
        .catch(err => res.status(400).json({ error: err.message }))
})

module.exports = router;