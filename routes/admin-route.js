const express = require('express')
const multer = require('multer')
const router = express.Router()

// const upload = multer({ dest: 'uploads/' });



const adminMiddleware = require('../middleware/admin-middleware')
const authMiddleware = require('../middleware/auth-middleware');
const { addProduct, getProduct, getProducts, deleteProduct, updateProduct  } = require('../controllers/admin-product-controller');


router.post("/create-product", authMiddleware , adminMiddleware, addProduct)
router.get("/get-products", authMiddleware , adminMiddleware, getProducts)
router.get("/get-product/:productId", authMiddleware , adminMiddleware, getProduct)
router.put("/update-product", authMiddleware , adminMiddleware, updateProduct)
router.delete("/delete-product/:productId", authMiddleware , adminMiddleware, deleteProduct)



module.exports = router