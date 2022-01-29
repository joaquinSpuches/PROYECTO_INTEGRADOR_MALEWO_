const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const User = require('../models/User');


const usersController = {
	list: (req,res) => {
		
		db.Users.findAll()
			.then(users => {
				let usersNew = [];
				users.forEach(user => {
					let secureUser = {
						id: user.id,
						name: user.name,
						email: user.email,
						phone: user.phone,
						img: '/img/userImg/' + user.img
					}
					usersNew.push(secureUser);
				})
				return res.json({
				count: users.length,
				data: usersNew
			})
		})
	},
	show: (req,res) => {
		db.Users.findByPk(req.params.id)
			.then(user => {
				
				let secureUser = {
					id: user.id,
					name: user.name,
					email: user.email,
					phone: user.phone,
					img: '/img/userImg/' + user.img
				}
				
				return res.json({
				data: secureUser,
			})
		})
	},
    register : (req,res) => {
        res.render ('register')
    },
    login : (req,res) => {
        res.render ('login')
    },
	loginProcess: (req,res) => {
	 	let errors = validationResult(req);
		 db.Users.findOne({where: {email: req.body.email}}).then((userToLogin) => {
			if (errors.isEmpty()) {
				let passSi = bcrypt.compareSync(req.body.password, userToLogin.password);
				if (passSi){
					userToLogin.password = undefined;
					req.session.userLogged = userToLogin;
					req.session.cart = [];
					if(req.body.remember_user){
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
					}
					return res.redirect('profile')
				}
				
				else res.render('login', {errors: {email: {msg: 'Las credenciales son inválidas'}}})
   
			 }else res.render('login', {errors: errors.mapped(), old: req.body})
		 })
	 },
    registrateUser: (req, res) => {	
		let errors = validationResult(req);
		db.Users.findOne({where: {email: req.body.email}}).then((userToLogin) => {
			if (userToLogin) {
				res.render('register', {emailError: 'El email ya esta en uso', old: req.body});
			}else 
				if (errors.isEmpty()) {
					let password = bcrypt.hashSync(req.body.password, 12);
					db.Users.create({
						name: req.body.name,
						email: req.body.email,
						img: req.file.filename,
						phone: req.body.phone,
						password: password,
						isAdmin: 0,
					})
					res.redirect('/');
				}else 
					res.render('register', {errors: errors.mapped(), old: req.body});
		})
    },
	profile: (req,res) => {
		res.render('loginProfile', {user : req.session.userLogged})
	},
	logout:(req,res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	deleteUser: (req, res) => {
		db.Users.destroy({
			where: {id: req.params.id}
		})
		req.session.destroy();
		res.redirect('/')
	},
	edit: (req, res) => {
		db.Users.findOne({where: {id: req.params.id}}).then((user) =>{
			res.render('userEdit', {oldUser: user});
		})
	},
	update: (req, res) => {
		let errors = validationResult(req);
		let updatedUser = req.body;
		updatedUser['img'] = req.file.filename
		updatedUser['id'] = req.params.id
		updatedUser['isAdmin'] = req.session.userLogged.isAdmin
		if (errors.isEmpty()) {
			let password = bcrypt.hashSync(req.body.password, 12);
			db.Users.update({
				name:req.body.name,
				email:req.body.email,
				img:req.file.filename,
				phone:req.body.phone,
				password: password
			},
			{
				where: {id: req.params.id}
			})
			//req.session.destroy();
			req.session.userLogged = updatedUser;
			res.redirect('/profile');
		}else
			db.Users.findOne({where: {id: req.params.id}}).then((user) =>{
				res.render('userEdit', {errors: errors.mapped(), oldUser: user});
			})
	}
}

module.exports = usersController