module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user/:username/username', findUserByUsername);
    app.post('/api/register', createUser);
    app.put('/api/profile', updateUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.delete('/api/profile', deleteUser);

    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.params['username'];
        userModel.findUserByCredentials({username:username})
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        if(req.session.currentUser) {
            var userId = req.session.currentUser._id;
            userModel.findUserById(userId)
                .then(function (user) {
                    res.send(user);
                })
        } else {
            res.send(null);
        }
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.session.currentUser._id;
        userModel.updateUser(user, userId)
            .then(function (user) {
                res.send(user);
            })
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function deleteUser(req, res) {
        var id = req.session['currentUser']._id;
        return userModel.deleteUser(id)
            .then(function (response) {
                res.send(response);
            })
    }
}