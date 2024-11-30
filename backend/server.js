const client = require('./connection');
const cors = require('cors');
const express = require('express');
const app = express();
const moment = require('moment-timezone');
require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log("Server is now listening at port");
})

client.connect();

app.get('/api/expenses', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM EXPETRACK;');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

app.post('/api/insert/expenses', async (req, res) => {
    const { type, value } = req.body;
    try {
        const dateInPH = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
        // Insert the date into your database
        const query = 'INSERT INTO EXPETRACK (type, value, date) VALUES ($1, $2, $3)';
        const values = [type, value, dateInPH];
        await client.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data");
    }
});
