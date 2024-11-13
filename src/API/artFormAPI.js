const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const router = express.Router();
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const artSchema = new mongoose.Schema({
    art_photo_url: String,
    student_name: String,
})
const ArtStudent = mongoose.model('Tests', artSchema);

router.post('/', upload.single('art_photo'), async (req, res) => {
  try {
    const { student_name } = req.body;
    const formData = new FormData();
    formData.append('image', req.file.buffer, 'image.jpg');

    const response = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Authorization': 'Client-ID aca6d2502f5bfd8', 
        ...formData.getHeaders(), 
      },
    });

    const art_photo_url = response.data.data.link;
    const newArtStudent = new ArtStudent({
        student_name,
      art_photo_url,
    });

    await newArtStudent.save();
    res.status(201).json({ message: "Art student enrolled", art_photo_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
