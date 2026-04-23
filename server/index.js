const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT), 
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

sql.connect(dbConfig)
  .then(() => console.log('Connected'))
  .catch(err => console.log(err));

app.post('/submit-form', async (req, res) => {
    try {
        const { firstname, lastname, email, contact, gender, dob, about } = req.body;
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('fn', firstname)
            .input('ln', lastname)
            .input('em', email)
            .input('ct', contact)
            .input('gn', gender)
            .input('db', dob)
            .input('ab', about)
            .query('INSERT INTO Users (firstname, lastname, email, contact, gender, dob, about) VALUES (@fn, @ln, @em, @ct, @gn, @db, @ab)');
        res.status(200).send("Data saved successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/get-users', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Users');
        res.status(200).json(result.recordset); // Sends the data back as an array
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));