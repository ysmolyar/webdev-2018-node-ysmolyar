var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findAllUsers() {
    return userModel.find();
}

function findUserByCredentials(username, password) {
    return userModel.findOne({
        username: username,
        password: password
    });
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(user) {
    return userModel.findOneAndUpdate(
        {username: user.username},
        {$set: {firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNum: user.phone
            }},
        {new: true});
}


function createUser(user) {
    return userModel.create(user);
}

function deleteUser(userId) {
    return userModel.remove(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function register(user) {
    return userModel.create(user);
}


var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    register: register,
    findUserByUsername: findUserByUsername,
    deleteUser: deleteUser
};

module.exports = api;
