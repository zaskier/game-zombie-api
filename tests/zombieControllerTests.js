const { describe } = require('mocha');
const should = require('should');
const sinon = require('sinon');
const zombieController = require('../controllers/zombieController');

describe('Zombie controller Tests:', () => {
	describe('post', () => {
		it('should not allow an empty name on post', () =>{
			const Zombie = function (zombie) {
				this.save = () => {};
				const req ={
					body: {
						name: 'ZombiWojtek752', 
						items:[{name:'Diamond Sword'}] 
					}
				};

				const res ={
					status: sinon.spy(),
					send: sinon.spy(),
					json: sinon.spy()
				};
				const controller = zombieController(Zombie);
				controller.post(req, res);
				res.status.calledWith(400).should.equal(true , `Bad Status ${res.status.args[0][0]}`);
				res.send.calledWith('Name is required').should.equal(true);
			};
		});
	});
});
