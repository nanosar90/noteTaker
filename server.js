const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./Develop/db/db.json')
const router = require('express').Router();
const routes = require('./develop/public/routes/api.js')

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'Develop/public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

//use router for notes
app.use('/api/notes', routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}.`);
});