const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);


describe('Registration Testing', function () {
    it('should register user successfully', function () {
        chai.request(server)
            .post('/registration')
            .send({
                firstName : '',
                lastName : '',
                email: "shweta@gmail.com",
                password: "shweta123"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            })
    })
})

