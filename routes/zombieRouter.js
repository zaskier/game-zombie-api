const express = require('express');
//const { get } = require('mongoose');
const zombieController = require('../controllers/zombieController.js');
function routes(Zombie){
	const zombieRouter= express.Router();
	const controller = zombieController(Zombie);
	zombieRouter.route('/zombie')
		.get(controller.get)
		.post(controller.post);

	zombieRouter.use('/zombie/:_id', (req, res, next) =>{
		Zombie.findById(req.params._id, (err, zombie) => {
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

	zombieRouter.route('/zombie/:_id/inventory')
		.post((req, res) => {
			const {zombie} = req;

			if(zombie.items.length<5){			
				var reqId=0, reqPrice=0, reqName='';
				reqId=req.body.id; reqPrice=req.body.price; reqName=req.body.name;
				var itemAdded = {id:reqId, name:reqName, price:reqPrice}; //todo(add code updating prices)
				req.zombie.save((err) => {
					if (err) {
						return res.json(zombie);
					}
					return res.json(zombie);
				});
				console.log(zombie.items.length);
				zombie.items.push(itemAdded);
				zombie.save();
			}
			else{
				return res.json('to many Items in Inventory, Zombie limit is 5, to add new items remove others').sendStatus(304);
			}

		
		})
		.delete((req, res) => {
			const {zombie} = req;
			console.log(zombie.items.length);
			console.log(req.body.name);
			console.log(req.body.name);
			if(zombie.items.length>1){ //todo(add code updating prices)
				let objIndex = zombie.items.findIndex((item => item.name == req.body.name));
				zombie.items = zombie.items.filter(item => item.name !== req.body.name);
				zombie.save();
				return res.json(zombie).sendStatus(204);
			}
			else{
				return res.json('Nothing to remove from inventory, it is already empty').sendStatus(304);
			}
	
		});

	zombieRouter.route('/zombie/:_id')
		.get((req, res) => {
			res.json(req.zombie);
		})
		.put((req, res) => {
			const {zombie} = req;
			console.log(req.body.name);
			zombie.name = req.body.name;
			zombie.valueOfItems.pln = req.zombie.valueOfItems.pln;
			zombie.valueOfItems.eur = req.zombie.valueOfItems.eur;
			zombie.valueOfItems.usd = req.zombie.valueOfItems.usd;
			req.zombie.save((err) => {
				if (err) {
					return res.json(zombie);
				}
				zombie.save();
				return res.json(zombie);
			});
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