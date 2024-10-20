const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const firebase = require('firebase-admin');

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
  },
  email: {
    type: String,
    required: true,
    unique: true
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

const User = mongoose.model('User', userSchema);

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
      res.send('User registered successfully!');
    }
  });
});

// API endpoint to handle login requests
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      res.status(401).send('Invalid email or password');
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // Generate a Firebase token
        const token = await firebase.auth().createCustomToken(user._id);
        res.json({ token });
      } else {
        res.status(401).send('Invalid email or password');
      }
    }
  });
});

// Create a route to handle image uploads
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (req.file) {
    const newPath = `./uploads/${req.file.originalname}`;
    fs.renameSync(req.file.path, newPath);
    res.status(201).json({ message: 'Image uploaded successfully', filename: req.file.originalname });
  } else {
    res.status(400).json({ message: 'No image file uploaded' });
  }
});

async function checkUsernamePassword(username, password) {
  // Validate username format
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: 'Invalid username format' };
  }

  // Check for existing username
  const user = await User.findOne({ username });
  if (!user) {
    return { error: 'Username does not exist' };
  }

  // Check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: 'Invalid password' };
  }

  return { success: true };
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});