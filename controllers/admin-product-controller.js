const Product = require('../models/Product')

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
            images
        } = req.body

        const checkExistingProduct = await Product.findOne({ name: name })
        if (checkExistingProduct) {
            return res.status(400).json({
                success: false,
                message: "A product already exists with the same name"
            })
        }

        const newlyCreatedProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        })

        await newlyCreatedProduct.save()

        if (newlyCreatedProduct) {
            res.status(201).json({
                success: true,
                message: "product created successfully"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "unable to create product"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong creating product, try again later"
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .select('-createdAt -updatedAt -__v')

        if (products) {
            return res.status(200).json({
                success: true,
                data: products
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "no products found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to get products"
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await Product.findById(productId)
            .select('-createdAt -updatedAt -__v')

        if (product) {
            return res.status(200).json({
                success: true,
                message: "product found",
                data: product
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error getting product"
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const {
            _id,
            name,
            description,
            price,
            category,
            stock,
            images
        } = req.body

        const updateFields = {
            name,
            description,
            price,
            category,
            stock,
            images
        }

        const updateResult = await Product.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { returnDocument: "after" }
        )

        if (updateResult) {
            res.status(200).json({
                success: true,
                message: "product updated successfully"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "unable to update product"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "unable to update product"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "product ID is required"
            })
        }

        const deleteResult = await Product.deleteOne({ _id: productId })

        if (deleteResult.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                message: "product successfully deleted"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "product not found (no matching ID)"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "could not delete product"
        })
    }
}

module.exports = { addProduct, getProducts, getProduct, updateProduct, deleteProduct }