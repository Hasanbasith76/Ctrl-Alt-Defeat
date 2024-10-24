const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path')
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const firebase = require('firebase-admin');
const { console } = require('inspector');

// Initialize Firebase Admin SDK
firebase.initializeApp({
  apiKey: "AIzaSyCpfObJB6QgSJXs0Xd7uZetakqHODvkD4I",
  authDomain: "assessment-platform-fa01f.firebaseapp.com",
  projectId: "assessment-platform-fa01f",
  storageBucket: "assessment-platform-fa01f.appspot.com",
  messagingSenderId: "427055165609",
  appId: "1:427055165609:web:e2f2a462626673485839b8",
  measurementId: "G-ES16DP91DS"
});

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String
});

const User = mongoose.model('User ', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabse', { useNewUrlParser: true, useUnifiedTopology: true });


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

// API endpoint to handle signup requests
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;

  // Validate username format
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({ error: 'Invalid username format' });
  }

  // Validate email format
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password format
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/.test(password)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  // Check for existing username or email
  const existingUser   = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser  ) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  // Create a new user
  const user = new User({ username, password, email });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  // Save the user
  try {
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// API endpoint to handle login requests
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await checkUsernamePassword(username, password);
  if ( result.error) {
    res.status(401).json({ error: result.error });
  } else {
    // Generate a Firebase token
    const user = await User.findOne({ username });
    const token = await firebase.auth().createCustomToken(user._id);
    res.json({ token });
  }
});

// Create a route to retrieve the uploaded images
app.get('/api/images', (req, res) => {
  const images = fs.readdirSync('./uploads/');
  res.json(images);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});