const express = require('express');
const zombieController = require('../controllers/zombieController.js');
function routes(Zombie){
	const zombieRouter= express.Router();
	const controller = zombieController(Zombie);
	zombieRouter.route('/zombie')
		.get(controller.get)
		.post(controller.post)
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
			req.zombie.save((err) => {
				if (err) {
					return res.json(zombie);
				}
				return res.json(zombie);
			});
			const {zombie} = req;
			zombie.name = req.body.name;
			zombie.valueOfItems.pln = req.body.valueOfItems.pln;
			zombie.valueOfItems.eu = req.body.valueOfItems.eu;
			zombie.valueOfItems.usd = req.body.valueOfItems.usd;
			zombie.valueOfItems = zombie.valueOfItems.find(o => o.name === req.body.valueOfItems.name);
		})
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
					return res.json(err);
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