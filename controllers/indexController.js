
const path = require('path')
const db = require('../database/models')

const indexController = {
    home: async (req, res) => {
    let productRooster = await db.Products.findAll({limit: 3});
      res.render("index", {rooster: productRooster});

    },
    productos : (req,res) => {
        // res.render ('products')
        res.render('loginProfile', {user : req.session.userLogged})
            
    },
    info: (req, res) => {
        res.render('quienes-somos');
    },
    blog : (req, res) => {
        res.render('blog');
    },
    dashboard: (req, res) => {
        res.sendFile(path.join(__dirname, '../react-dashboard/build/index.html'));
    }
}

module.exports = indexController