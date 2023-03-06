const express = require('express');
const userModel = require('../models/userModel');

//const userService = require('../services/userService');



// exports.getUsers = ((req, res) => {
//     res.send('Get all users');
// });


exports.getUsers = (req, res)=> {
    //console.log('here all employees list');
    userModel.getallUsers((err, users) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('USERS -', users);
        res.send(users);
    })
}


exports.getIndUser = ((req, res) => {
    res.send('Getting user ' + req.params.id);
})


exports.createUser = ((req, res) => {
    res.send('A user is successfully created!');
});


exports.updateUser = async (req, res, next) => {
    await res.send('Updated user');
}

exports.deleteUser = ((req, res) => {
    res.send('This user is updated!');
});