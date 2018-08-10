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
    })
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.findOneAndUpdate(
        {username: user.username},
        {$set: {username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
            }},
        {new: true});
}


function updateUser(user) {
    return userModel.create(user);
}

function deleteUser(userId) {
    return userModel.remove(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username})
}




var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    findUserByUsername: findUserByUsername,
    deleteUser: deleteUser,
};

module.exports = api;
