process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../app');
const expect = chai.expect;
const login = require('../login');
const User = require('../../../../server/database/model/User');
const FriendRequest = require('../../../../server/database/model/FriendRequest');
const {FriendRequestNotification, FriendRequestResponseNotification} = require('../../../../server/database/model/Notification');

const {step} = require("mocha-steps");
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);
let cookie;

const testUser1 = {
    username: "testAccount1",
    email: "testemail1@testemail.com",
    password: "password"
};
const testUser2 = {
    username: "testAccount2",
    email: "testemail2@testemail.com",
    password: "password"
};

describe('friend request operations',()=>{
    // login as testUser1 and testUser2
    before(done=>{
        Promise.all([
            User.create({
                username: testUser1.username,
                email: testUser1.email,
                password: bcrypt.hashSync(testUser1.password, Number(process.env.SALT)),
                isEmailVerified: true
            }),
            User.create({
                username: testUser2.username,
                email: testUser2.email,
                password: bcrypt.hashSync(testUser2.password, Number(process.env.SALT)),
                isEmailVerified: true
            })
        ])
            .then(()=> {
                Promise.all([login(testUser1), login(testUser2)])
                    .then(returnedCookies => {
                        cookie = returnedCookies;
                        done();
                    })
                    .catch(err => {
                        done(new Error("Login failed: " + err));
                    });
            })
            .catch(err => {
                done(new Error("Failed to create test users: " + err));
            });
    })

    let friendRequestId;
    step('User1 send friend request to User2',done=>{
        chai.request(server)
            .post('/api/user/interaction/friendRequest')
            .set('Cookie',cookie[0])
            .send({
                targetUsername: testUser2.username
            })
            .end((err,res)=>{
                expect(res).to.have.status(200);
                Promise.all([
                    User.findOne({username: testUser1.username}),
                    User.findOne({username: testUser2.username})
                ])
                    .then(users=>{
                        FriendRequest.findOne({
                            fromUser: users[0]._id,
                            toUser: users[1]._id
                        })
                            .then(friendRequest=>{
                                expect(friendRequest).to.not.be.undefined;
                                friendRequestId = friendRequest._id;
                                done();
                            })
                            .catch(err=>{
                                done(new Error("Friend request not found: " + err));
                            });
                    })
                    .catch(err=>{
                        done(new Error("Failed to find users: " + err));
                    });
            });
    })
    step('User2 accept friend request',done=>{
        chai.request(server)
            .post('/api/user/interaction/friendRequestResponse')
            .set('Cookie',cookie[1])
            .send({
                requestId: friendRequestId,
                isAccepted: true
            })
            .end((err,res)=>{
                expect(res).to.have.status(200);
                Promise.all([
                    User.findOne({username: testUser1.username}),
                    User.findOne({username: testUser2.username})
                ])
                    .then(users=>{
                        FriendRequest.findOne({
                            fromUser: users[0]._id,
                            toUser: users[1]._id
                        })
                            .then(friendRequest=>{
                                expect(friendRequest).to.be.null;
                                expect(users[0].friends).to.include(users[1]._id);
                                expect(users[1].friends).to.include(users[0]._id);
                                done();
                            })
                            .catch(err=>{
                                done(new Error("Friend request not found: " + err));
                            });
                    })
                    .catch(err=>{
                        done(new Error("Failed to find users: " + err));
                    });
            });
    })
    step('User1\'s friends include User2',done=>{
        chai.request(server)
            .get('/api/user/interaction/getFriendsList')
            .set('Cookie',cookie[0])
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body.friends[0]).to.include({username:testUser2.username});
                done();
            });
    })
    step('Unfriend',done=>{
        chai.request(server)
            .post('/api/user/interaction/unfriend')
            .set('Cookie',cookie[0])
            .send({
                targetUsername: testUser2.username
            })
            .end((err,res)=>{
                expect(res).to.have.status(200);
                Promise.all([
                    User.findOne({username: testUser1.username}),
                    User.findOne({username: testUser2.username})
                ])
                    .then(users=>{
                        expect(users[0].friends).to.not.include(users[1]._id);
                        expect(users[1].friends).to.not.include(users[0]._id);
                        done();
                    })
                    .catch(err=>{
                        done(new Error("Failed to find users: " + err));
                    });
            });
    })

    // clean up test data
    after(done=>{
        Promise.all([
            User.findOne({username: testUser1.username}),
            User.findOne({username: testUser2.username})
        ])
            .then(users=>{
                Promise.all([
                    FriendRequestResponseNotification.deleteMany({
                        owner: users[0]._id
                    }),
                    FriendRequestNotification.deleteMany({
                        owner: users[1]._id
                    }),
                    users[0].remove(),
                    users[1].remove()
                ])
                    .then(()=>{
                        done();
                    })
                    .catch(err=>{
                        done(new Error("Failed to clear data after test: " + err));
                    });
            })
            .catch(err=>{
                done(new Error("Failed to find test users after test: " + err));
            });
    })
})
