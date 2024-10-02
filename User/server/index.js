const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const upload = multer({ dest: './uploads/' });

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User model
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String
});

const User = mongoose.model('User ', userSchema);

app.use(express.json());

// Create a route to handle user registration
app.post('/api/register', (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, username, password: hashedPassword });
  user.save((err, user) => {
    if (err) {
      res.status(400).send('Registration failed');
    } else {
      res.send('User  registered successfully!');
    }
  });
});

// Create a route to handle user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(401).send('Invalid email or password');
    } else {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        res.send('Login successful!');
      } else {
        res.status(401).send('Invalid email or password');
      }
    }
  });
});

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