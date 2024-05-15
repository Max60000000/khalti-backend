const express = require("express");
const axios = require("axios");
const cors= require ("cors");
const app = express();

app.use(express.json());
require("dotenv").config(); // Load environment variables from .env file
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/khalti-api", async (req, res) => {
    try {
        const payload = req.body;
        const khaltiResponse = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", payload, {
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            }
        });
        
        if (khaltiResponse.data) {
            res.json({
                success: true,
                data: khaltiResponse.data
            });
        } else {
            res.json({
                success: false,
                message: "Empty response from Khalti API"
            });
        }
    } catch (error) {
        console.error("Error connecting to Khalti API:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while connecting to Khalti API"
        });
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
