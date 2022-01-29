const express = require("express");
const path = require('path');
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require('multer');

const storage = multer.diskStorage({ 
  destination: 'public/img/productos', 
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
  
const upload = multer({ storage: storage })

router.get('/', productController.index);

router.get('/list', productController.list)
router.get('/list/:id', productController.show)

router.get('/create', productController.create);
router.post('/', upload.single('Image'), productController.createProduct);

router.get('/managment', productController.managment);
router.post('/managment', productController.managmentResponse);

router.get('/product/:id', productController.product);

router.get('/product/:id/edit', productController.edit);
router.put('/:id', upload.single('Image'), productController.editProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
