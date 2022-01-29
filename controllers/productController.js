const fs = require('fs');
const path = require('path');
const db = require('../database/models')

// const productsFilePath = path.join(__dirname, '../data/Products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
	index: async (req, res) => {	
		let products;
		let user;
		if (req.query.cat == 1) {
			products = await db.Products.findAll({where: {
				categoryId: 1
			}})
		}else if (req.query.cat == 2) {
			products = await db.Products.findAll({where: {
				categoryId: 2
			}})
		}else if (req.query.cat == 3) {
			products = await db.Products.findAll({where: {
				categoryId: 3
			}})
		}else {
			products = await db.Products.findAll({
				include:[{association:'category'}]
			})
		}
		if(req.session.userLogged){
			if (req.session.userLogged.isAdmin == 1) {
				res.render('products', {productList: products, confirmation: true})
			}else {
				res.render('products', {productList: products, confirmation: false})
			}
			
		}else{
			res.render('products',{productList: products, confirmation: false} )		
		}
	},
	list: async (req,res) => {
		
		let categories = await db.Categories.findAll();
		db.Products.findAll({
			include:[{association:'category'}]
		})
			.then(products => {

				var exterior = products.filter((task) => task.categoryId == 1 );
				var interior = products.filter((task) => task.categoryId == 2 );
				var accesorios = products.filter((task) => task.categoryId == 3 );
				let producto = []
				products.forEach(product=> {
					let productoLindo = {  
						name: product.name,
						description: product.description,
						detail: 'localhost:3050/products/list/'+ product.id,
						category: product.category.name

					}
					producto.push(productoLindo)
				})
				
				let respuesta ={
					count: products.length,
					countCategories: categories.length,
					categories: categories,
					countByCategory: {EXTERIOR: exterior.length,
						INTERIOR: interior.length,
						ACCESORIOS: accesorios.length
					},
					data: producto
				}
				return res.json(respuesta)
		})
	},
	show: (req,res) => {
		db.Products.findByPk(req.params.id)
			.then(product => {return res.json({
				
				data: product,	

			
			})
		})
	},
    product: async (req,res) => { 
		
        let wantedProduct = await db.Products.findByPk(req.params.id, {
			include:[{association:'category'}]
		})
		let productRooster = await db.Products.findAll({limit: 4});
		res.render ('product-detail', {prod: wantedProduct, productRooster: productRooster});
		
		
    },
    create: (req,res) => {
		console.log(db.Categories)
        db.Categories.findAll()
				.then(function(categories){ 
					return res.render('new-product', {categories: categories});
				}).catch(error => {
					console.log(error)
				})

				
    },
    edit: (req, res) => {
		
		let wantedProduct = db.Products.findByPk(req.params.id)
		let productCategory =db.Categories.findAll()
		Promise.all([wantedProduct,productCategory])
		.then(([wantedProduct,categories])=>{
			res.render('modify-product', {wantedProduct: wantedProduct, categories: categories})
		});
    },
    createProduct: (req, res) => {
        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// let newProduct = req.body
		// newProduct['Image'] = req.file.filename;
		// if (products.length === 0) {
		// 	newProduct['id'] = 1;
		// 	products.push(newProduct);
		// }else {
		// 	let lastProduct = products[products.length -1];
		// 	newProduct['id'] = lastProduct.id + 1;
		// 	products.push(newProduct);
		// }
		// let changeProduct = JSON.stringify(products, null, '  ');
		// fs.writeFileSync(productsFilePath, changeProduct);
		db.Products.create({
			name: req.body.Nombre,
			description: req.body.Descripcion,
			img: req.file.filename,
			categoryId: req.body.category,
			Price: req.body.Precio , 


		})
		res.redirect('/');
    },
    editProduct: async (req, res) => {
		// let errors = validationResult(req);
		// let updatedProduct = req.body;
		// updatedProduct['img'] = req.file.filename
		await db.Products.update({
			name: req.body.Nombre,
			description: req.body.Descripcion,
			img: req.file.filename,
		
		
			categoryId: req.body.category,
			Price: req.body.Price , 


		},{
			where: {
				id:req.params.id
			}
		})
		res.redirect('/products/product/'+ req.params.id);
    },
		// let idProduct = parseInt(req.params.id);
        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// products.forEach(obj => {
		// 	if(obj.id === idProduct) {
		// 		obj.Nombre = req.body.Nombre;
		// 		obj.Precio = req.body.Precio;				
		// 		obj.Descripcion = req.body.Descripcion;
		// 		obj.Category = req.body.Category;
				// if (req.file) {
				// 	let indexProduct = products.findIndex(obj => obj.id === idProduct);
				// 	let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
				// 	fs.unlink(imagePath, function (err) {
				// 		if (err) throw err;
				// 	});
				// 	product.image = req.file.filename;
				// 	}
				// }
		// 	}
		// );
		// let changeProduct = JSON.stringify(products, null, '  ');
		// fs.writeFileSync(productsFilePath, changeProduct);
		// res.redirect('/products/');
    // },
	managment: async (req, res) => {
		const products = await db.Products.findAll()
		res.render('productManagment', {products: products});
	},
	managmentResponse: async (req, res) => {
		if (req.body.action == 'edit') {
			res.redirect('/products/product/' + req.body.id + '/edit');
		} else if (req.body.action == 'delete') {
			 await db.Products.destroy({
 				where: {
					id: req.body.id
				}
			})
			res.redirect('/products')
		} else {
			res.send('error')
		}
	},
    deleteProduct: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products = products.filter(obj => (obj.id == req.params.id)? false : true);
		let changeProduct = JSON.stringify(products, null, '  ');
		fs.writeFileSync(productsFilePath, changeProduct);
		res.redirect('/products');
    }
}
module.exports = productController;