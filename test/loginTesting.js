const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

describe('Login Testing', function () {
    it('should login user successfully', function (done) {
        chai.request(server)
            .post('/login')
            .send({
                email: "shweta12@gmail.com",
                password: "shweta123"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })
})
