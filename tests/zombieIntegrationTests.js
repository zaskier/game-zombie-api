require('should');
const request = require('supertest');
const mongoose = require('mongoose');
process.env.ENV = 'Test';
const app = require('../app.js');
const Zombie = mongoose.model('Zombie');
const agent = request.agent(app);

describe('Zombie Crud Test', () => {
	it('should allow a zombie to be posted and return location and _id', (done) => {
		const zombiePost = { name: 'ZombiWojtek357', items:[{name:'Diamond Sword'}] };
		
		agent.post('/api/zombie')
			.send(zombiePost)
			.expect(200)
			.end((err, results) => {
				//console.log(results); //comment for clear test results
				//results.body.name.should.not.equal('Not Wojtek');
				results.body.should.have.property('_id');
				done();
			});
	});

	afterEach((done) => {
		Zombie.deleteMany({}).exec();
		done();
	});

	after((done) => {
		mongoose.connection.close();
		app.server.close(done());
	});
});