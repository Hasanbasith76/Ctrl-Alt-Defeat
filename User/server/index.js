const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: './uploads/' });

app.use(express.json());

// Create a route to handle image uploads
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  // req.file contains the uploaded image file
  const imageBuffer = req.file.buffer;
  const imageName = req.file.originalname;

  // You can store the image in a database or file system
  // For this example, we'll store it in a local file system
  const filePath = `./uploads/${imageName}`;
  fs.writeFileSync(filePath, imageBuffer);

  res.status(201).send(`Image uploaded successfully!`);
});

// Create a route to retrieve the uploaded images
app.get('/api/images', (req, res) => {
  const images = fs.readdirSync('./uploads/');
  res.json(images);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});