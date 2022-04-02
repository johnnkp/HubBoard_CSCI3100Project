process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const expect = chai.expect;
const User = require('../../../server/database/model/User');


chai.use(chaiHttp);

describe('User Register', function () {
    describe('Success',()=>{
        const testUser = {
            username: 'testUsername',
            password: 'testPassword',
            email: 'testemail@testemail.com'
        };
        let verificationToken;
        step('Register',done=>{
            chai.request(server)
                .post('/api/auth/register')
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(202);
                    User.findOne({username: testUser.username})
                        .then(user=>{
                            if(user){
                                verificationToken = user.verificationToken;
                                done();
                            }
                            else {
                                throw new Error('User not found');
                            }
                        })
                        .catch(err=>{
                            throw err;
                        });
                });
        })

        step('Email Verification',done=>{
            chai.request(server)
                .get('/api/auth/emailVerify/'+verificationToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    User.findOne({username: testUser.username})
                        .then(user=>{
                            if(user){
                                expect(user.isEmailVerified).to.be.true;
                                done();
                            }
                            else {
                                throw new Error('User not found');
                            }
                        })
                        .catch(err=>{
                            throw err;
                        });
                });
        })

        after(function (done) {
            User.deleteOne({username: testUser.username}, function (err) {
                if (err) {
                    console.log(err);
                }
                done();
            });
        });
    })
});