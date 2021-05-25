const fetch = require('node-fetch');
const config = require('./api-config.json');
function zombieController(Zombie){
	function post(req, res) {
		const zombie = new Zombie(req.body);
		async function postEntry(){
			let status;
			const itemsApiResponse =  await fetch(`${config.itemURL}`) //get current items list
				.then((res) => { 
					status = res.status; 
					return res.json(); 
				});

			//console.log(itemsApiResponse);

			// var dataString;
			var yesterday = new Date(Date.now() - 86400000); //rates should be calculated by yesterday(today rates does not seem to always work(to be tested for next version))
			var apiExhangeRates =await fetch(`${config.exchangeRatesURL}${yesterday.toISOString().slice(0, 10)}/?format=json`)
				.then((res) => { 
					status = res.status; 
					return res.json(); 
				});
			console.log(apiExhangeRates[0].rates);
			var rateUSD = apiExhangeRates[0].rates.find( ({ code }) => code == 'USD');
			rateUSD = rateUSD.bid;
			console.log('current USD bid rate : '+rateUSD);
			var rateEUR = apiExhangeRates[0].rates.find( ({ code }) => code == 'EUR');
			rateEUR = rateEUR.bid;
			console.log('current EUR bid rate : '+rateEUR);

			if (status !== 200) { 
				
				console.log(`Error : there was an isssue with item API, ${config.itemURL} list of items is not working`);
				res.status(500); //if status not 200 then it is Internal error 500 because request cannot be processed without API
				return res.send('Error : there was an isssue with zombie API, validate \'location\' parameter value or API is not working');
			}
			else{ 
				//validate if name is in body
				if (!req.body.name ) {
					console.log('zombie was not added, There was an issue with request missing parameters of zombie name');
					res.status(400);
					return res.send('zombie was not added, There was an issue with request missing parameters of zombie name');
				}

				let zombie = new Zombie(req.body);
				let itemsPrice = 0;
				zombie.items.forEach(element =>{
					console.log(element.name);
					var found = itemsApiResponse.items.find( ({ name }) => name === element.name);
					if (typeof found != 'undefined') {
						// console.log(found);
						// console.log(itemsPrice);
						// console.log(found.price);
						itemsPrice = itemsPrice+found.price;
					}else{
						console.log('Item name : '+found+ ` was not found in ${config.itemURL}`);
					}
				} );
				zombie.valueOfItems['pln']=itemsPrice;
				zombie.valueOfItems['usd']=itemsPrice*rateUSD;
				zombie.valueOfItems['eur']=itemsPrice*rateEUR;
				console.log('item price is : '+itemsPrice+'pln');
				console.log('zombie was created');
				console.log(zombie);
				zombie.save();
				res.status(201);

				return res.json(zombie);
			}
	


		}
		postEntry();
	}
	function get(req, res) {

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
	}
	return {post, get};
}

module.exports = zombieController;