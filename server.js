const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No image uploaded.');
    }

    const studentName = req.body.studentName;

    const formData = new FormData();
    formData.append('image', req.file.buffer, 'image.jpg');

    const response = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Authorization': 'Client-ID aca6d2502f5bfd8',
        ...formData.getHeaders(),
      },
    });

    const uploadedImageUrl = response.data.data.link;
    formData.append('studentName', studentName);
    formData.append('imageUrl', uploadedImageUrl);

    const result = {
      studentName: studentName,
      imageUrl: uploadedImageUrl
    //   imageFormData: formData.getBuffer().toString('base64')
    };

    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error uploading image to Imgur');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
