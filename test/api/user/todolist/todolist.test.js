process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../app');
const expect = chai.expect;
const login = require('../login');
const User = require('../../../../server/database/model/User');
const Todolist = require('../../../../server/database/model/Todolist');
const Comment = require('../../../../server/database/model/Todolist/Comment');
const {step} = require("mocha-steps");
const bcrypt = require("bcryptjs");

chai.use(chaiHttp);
let cookie;

const testUser = {
    username: "testAccount",
    email: "testemail@testemail.com",
    password: "password"
};

describe('Todolist operations',()=>{
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
    });

    let todolistId;
    step('Create todolist',done=> {
        const testTodolist = {
            title: "Test Todolist",
            description: "This is a test todolist"
        }
        chai.request(server)
            .post('/api/user/todolist/createTodolist')
            .set('Cookie', cookie)
            .send(testTodolist)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('todolist');
                todolistId = res.body.todolist._id;
                expect(todolistId).to.be.a('string');
                Promise.all([
                    User.findOne({username: testUser.username}),
                    Todolist.findById(todolistId)
                ])
                    .then(result => {
                        expect(result[1]).to.not.be.null;
                        expect(result[0].todolists).to.include(todolistId);
                        expect(result[1].owner.toString()).to.equal(result[0]._id.toString());
                        expect(result[1].title).to.equal(testTodolist.title);
                        expect(result[1].description).to.equal(testTodolist.description);
                        done();
                    })
                    .catch(err => {
                        done(new Error("Failed to find todolist: " + err));
                    });
            });
    });
    step('Get all todolist of current user',done=>{
        chai.request(server)
            .get('/api/user/todolist/getAllTodolists')
            .set('Cookie', cookie)
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('todolists');
                expect(res.body.todolists).to.be.an('array');
                done();
            })
    })
    step('Update todolist title',done=>{
        const newTitle = "new Title";
        chai.request(server)
            .put('/api/user/todolist/updateTodolist')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                title: newTitle
            })
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('todolist');
                expect(res.body.todolist.title).to.equal(newTitle);
                done();
            })
    })
    step('Update todolist description',done=>{
        const newDescription = "new Description";
        chai.request(server)
            .put('/api/user/todolist/updateTodolist')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                description: newDescription
            })
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('todolist');
                expect(res.body.todolist.description).to.equal(newDescription);
                done();
            })
    })
    step('Inactive a todolist',done=>{
        chai.request(server)
            .put('/api/user/todolist/updateTodolist')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                isActive: false
            })
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('todolist');
                expect(res.body.todolist.isActive).to.equal(false);
                done();
            })
    })

    let CheckboxId;
    step('Create a Checkbox',done=>{
        const testCheckboxContent = "test checkbox content";
        chai.request(server)
            .post('/api/user/todolist/checkbox/createCheckbox')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                checkboxContent: testCheckboxContent
            })
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                Todolist.findById(todolistId)
                    .then(todolist=>{
                        expect(todolist.checkboxes).to.satisfy(checkboxes=>{
                            return checkboxes.some(checkbox=>{
                                if (checkbox.content === testCheckboxContent) {
                                    CheckboxId = checkbox._id;
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            })
                        });
                        done();
                    })
                    .catch(err=>{
                        done(new Error("Failed to find todolist: " + err));
                    });
            })
    })
    step('Check a checkbox',done=>{
        chai.request(server)
            .put('/api/user/todolist/checkbox/updateCheckbox')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                checkboxId: CheckboxId,
                isChecked: true
            })
            .end((err,res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                Todolist.findById(todolistId)
                    .then(todolist => {
                        const checkbox = todolist.checkboxes.id(CheckboxId);
                        expect(checkbox.isChecked).to.equal(true);
                        done();
                    })
                    .catch(err => {
                        done(new Error("Failed to find todolist: " + err));
                    });
            })
    })
    step('Update Checkbox content',done=>{
        const newCheckboxContent = "new checkbox content";
        chai.request(server)
            .put('/api/user/todolist/checkbox/updateCheckbox')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                checkboxId: CheckboxId,
                content: newCheckboxContent
            })
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                Todolist.findById(todolistId)
                    .then(todolist=>{
                        const checkbox = todolist.checkboxes.id(CheckboxId);
                        expect(checkbox.content).to.equal(newCheckboxContent);
                        done();
                    })
                    .catch(err=>{
                        done(new Error("Failed to find todolist: " + err));
                    });
            })
    })
    step('Delete a checkbox',done=>{
        chai.request(server)
            .delete('/api/user/todolist/checkbox/deleteCheckbox')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                checkboxId: CheckboxId
            })
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                Todolist.findById(todolistId)
                    .then(todolist=>{
                        expect(todolist.checkboxes).to.satisfy(checkboxes=>{
                            return checkboxes.every(checkbox=>{
                                return checkbox._id.toString() !== CheckboxId.toString();
                            })
                        });
                        done();
                    })
                    .catch(err=>{
                        done(new Error("Failed to find todolist: " + err));
                    });
            })
    })

    let CommentId;
    step('Add a comment',done=>{
        const testComment = "test comment";
        chai.request(server)
            .post('/api/user/todolist/comment/addComment')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId,
                content: testComment
            })
            .end((err,res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('comment');
                CommentId = res.body.comment._id;
                expect(res.body).to.have.property('todolist');
                Todolist.findById(todolistId)
                    .then(todolist => {
                        todolist.populate('comments')
                            .then(todolist => {
                                expect(todolist.comments).to.satisfy(comments => {
                                    return comments.some(comment => {
                                        return (comment.content === testComment && comment._id.toString() === CommentId.toString());
                                    })
                                });
                                done();
                            })
                    })
                    .catch(err => {
                        done(new Error("Failed to find todolist: " + err));
                    });
            })
    })
    step('Get Comments of a todolist',done=>{
        chai.request(server)
            .get('/api/user/todolist/getAllComments/' + todolistId)
            .set('Cookie', cookie)
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('comments');
                expect(res.body.comments).to.satisfy(comments=>{
                    return comments.some(comment=>{
                        return comment._id.toString() === CommentId.toString();
                    })
                });
                done();
            })
    })

    step('Delete a todolist',done=>{
        chai.request(server)
            .delete('/api/user/todolist/deleteTodolist')
            .set('Cookie', cookie)
            .send({
                todolistId: todolistId
            })
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                Promise.all([
                    User.findOne({username: testUser.username}),
                    Todolist.findById(todolistId)
                ])
                    .then(result => {
                        expect(result[1]).to.be.null;
                        expect(result[0].todolists).to.not.include(todolistId);
                        done();
                    })
                    .catch(err => {
                        done(new Error("Failed to find todolist: " + err));
                    });
            })
    })

    // clean up
    after(done=>{
        User.findOne({username: testUser.username})
            .then(user=>{
                Promise.all([
                    Todolist.deleteMany({owner: user._id}),
                    Comment.deleteMany({sender: user._id}),
                    user.remove()
                ])
                    .then(()=>{
                        done();
                    })
                    .catch(err=>{
                        done(new Error("Failed to clean up data after test: " + err));
                    });
            })
            .catch(err=>{
                done(new Error("Failed to find user: " + err));
            });
    })
})
