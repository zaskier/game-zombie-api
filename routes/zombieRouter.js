const express = require('express');

function routes(Zombie){
	const zombieRouter= express.Router();
	zombieRouter.route('/zombie')
		.get((req, res)=>{

			const query = {};
			if (req.query._id) {
				query._id = req.query._id;
			}
			Zombie.find(query, (err, zombie) =>{
				if(err){
					return res.send(err);
				}
				else{
					return res.json(zombie);
				}
			});
		})
		.post((req, res) => {
			const zombie = new Zombie(req.body);
			console.log('zombie was added');
			console.log(zombie);
			zombie.save();
			return res.status(201).json(zombie);
		});

	zombieRouter.use('/zombie/:name', (req, res, next) =>{
		Zombie.findById(req.params.name, (err, zombie) => {
			if (err) {
				return res.send(err);
			}
			if(zombie){
				req.zombie = zombie;

				return next();
			}
			return res.sendStatus(404);
		});
	});
	zombieRouter.route('/zombie/:name')
		.get((req, res) => {

			res.json(req.zombie);
		})
		.put((req, res) => {
			const {zombie} = req;
			zombie.name = req.body.name;
			zombie.valueOfItems.pln = req.body.valueOfItems.pln;
			zombie.valueOfItems.eu = req.body.valueOfItems.eu;
			zombie.valueOfItems.usd = req.body.valueOfItems.usd;
			zombie.valueOfItems = zombie.valueOfItems.find(o => o.name === req.body.valueOfItems.name);
			req.zombie.save((err) => {
				if (err) {
					return res.json(zombie);
				}
				return res.json(zombie);
			});})
		.patch((req, res) =>{
			const {zombie} = req;
			if (req.body._id){
				delete req.body._id;
			}
			Object.entries(req.body).forEach((item) =>{

				const key = item[0];
				const value = item[1];
				zombie [key] = value;
			});
			req.zombie.save((err) => {
				if (err) {
					return res.json(zombie);
				}
				return res.json(zombie);
			});
		})
		.delete((req, res) =>{
			req.zombie.remove((err)=> {
				if (err) {
					return res.send(err);
				}
				console.log(`Zombie ' ${req.params.name} ' was deleted`);
				return res.sendStatus(204);
			});  
		});
	return zombieRouter;}

module.exports = routes;