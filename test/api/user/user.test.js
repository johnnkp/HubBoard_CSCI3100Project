process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const expect = chai.expect;
const login = require('./login');
const User = require("../../../server/database/model/User");
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);
let cookie;

const testUser = {
    username: "testAccount",
    email: "testemail@testemail.com",
    password: "password"
};



describe("User Operations",()=>{
    // create testUser and login as testUser
    before(done=>{
        User.create({
            username: testUser.username,
            email: testUser.email,
            password: bcrypt.hashSync(testUser.password, Number(process.env.SALT)),
            isEmailVerified: true
        })
            .then(()=>{
                login(testUser)
                    .then(returnedCookie=>{
                        cookie = returnedCookie;
                        done();
                    })
                    .catch(err=>{
                        done(new Error("Login failed: " + err));
                    });
            })
            .catch(err=>{
                done(new Error("Could not create test user before test: " + err));
            });
    })

    describe('Auth Verify', ()=>{
        it('Success',done=>{
            chai.request(server)
                .get('/api/user/authVerify')
                .set('Cookie',cookie)
                .then(res=>{
                    expect(res).to.have.status(200);
                    done();
                })
                .catch(err=>{
                    throw err;
                })
        })
    })

    describe('Get current user info', ()=>{
        it('Success', done=>{
            chai.request(server)
                .get('/api/user/info')
                .set('Cookie',cookie)
                .then(res=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('username',testUser.username);
                    expect(res.body).to.have.property('email');
                    done();
                })
                .catch(err=>{
                    throw err;
                })
        })
    })

    describe('Get current user profile photo', ()=>{
        it('Success', done=>{
            chai.request(server)
                .get('/api/user/profilePhoto/')
                .set('Cookie',cookie)
                .then(res=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.instanceof(Buffer);
                    done();
                })
                .catch(err=>{
                    throw err;
                })
        })
    })

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
