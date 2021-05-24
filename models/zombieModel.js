const mongoose = require('mongoose');

const { Schema } = mongoose;

const zombieModel = new Schema(
	{
		name : { type: String , unique : true, required : true },
		creationDate : {type: Date, default: Date.now},
		valueOfItems: [{ 
			pln : Number,
			eu : Number,
			usd: Number }],
		items: {
			type: [{
				id : Number,
				name : String,
				price : Number
			}],
			validate: [arrayLimit, 'zombie exceeds the limit of 5 items']
		}

	}
);

function arrayLimit(val) {
	return val.length <= 5;
}

module.exports = mongoose.model('Zombie', zombieModel);