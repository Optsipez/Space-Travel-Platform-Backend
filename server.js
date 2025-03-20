require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Booking Schema
const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    trip: String,
    date: String,
    seatClass: String
});

const Booking = mongoose.model("Booking", BookingSchema);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Space Travel API 🚀");
});

app.post("/bookings", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: "Booking successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
