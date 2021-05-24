const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express( );
if (process.env.ENV === 'Test') {
	console.log('working on test enviorment mongo');
	const db = mongoose.connect('mongodb://localhost/zombie_Test');
} else {
	console.log('working on test production mongo');
	const db = mongoose.connect('mongodb://localhost/zombie-Prod');
}
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;
const Zombie = require('./models/zombieModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const zombieRouter =require('./routes/zombieRouter')(Zombie);

app.use('/api',zombieRouter);

app.get('/', (req, res)=>{
	res.send('Zombie API');
});

app.listen(port, ()=>{
	console.log(`Running on Port : ${port}` );
});