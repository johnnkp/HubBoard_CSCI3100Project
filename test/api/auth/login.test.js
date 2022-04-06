process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const expect = chai.expect;
const User = require('../../../server/database/model/User');
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);

const testUser = {
    username: "testAccount",
    email: "testemail@testemail.com",
    password: "password"
};


describe('User Login', ()=>{
    before(done=>{
        User.create({
            username: testUser.username,
            email: testUser.email,
            password: bcrypt.hashSync(testUser.password, Number(process.env.SALT)),
            isEmailVerified: true
        })
            .then(()=>{
                done();
            })
            .catch(err=>{
                done(new Error("Could not create test user before test: " + err));
            });
    })

    describe('Success',()=>{
        it('Case: correct password', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success').to.be.true;
                    expect(res.header).to.have.property('set-cookie');
                    done();
                });
        });
    });

    describe('Failure',()=>{
        it('Case: invalid username', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: "1", // invalid username
                    password: "Password"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success',false);
                    expect(res.body).to.have.property('error_code',1);
                    done();
                });
        });

        it("Case: invalid password", function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: "testAccount",
                    password: "1" // invalid password
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success',false);
                    expect(res.body).to.have.property('error_code',1);
                    done();
                });
        });

        it("Case: user's email is not verified", function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: "testAccount00", // testAccount00 's email is not verified
                    password: "password"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success',false);
                    expect(res.body).to.have.property('error_code',2);
                    done();
                });
        });

        it('Case: incorrect password', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: "testAccount",
                    password: "incorrectPassword" // incorrect password
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success',false);
                    expect(res.body).to.have.property('error_code',3);
                    done();
                });
        });

        it("Case: user not found", function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    username: "notFound", // there is no such user
                    password: "password"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success',false);
                    expect(res.body).to.have.property('error_code',4);
                    done();
                });
        });
    });

    after(done=>{
        User.deleteOne({username: testUser.username})
            .then(()=>{
                done();
            })
            .catch(err=>{
                done(new Error("Cannot remove test user after the test: " + err));
            })
    })
})

