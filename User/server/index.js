const express = require('express');
const multer = require('multer');
const app = express();
const bcrypt = require('bcrypt');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User ', userSchema);

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

async function checkUsernamePassword(username, password) {
  // Validate username format
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: 'Invalid username format' };
  }

  // Check for existing username
  const user = await User.findOne({ username });
  if (!user) {
    return { error: 'Username not found' };
  }

  // Validate password format
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/.test(password)) {
    return { error: 'Invalid password format' };
  }

  // Compare the input password with the stored hash
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword);
  if (!isValid) {
    return { error: 'Invalid password' };
  }

  return { success: true };
}

// API endpoint to handle login requests
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await checkUsernamePassword(username, password);
  if (result.error) {
    res.status(401).json({ error: result.error });
  } else {
    res.json({ success: true });
  }
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