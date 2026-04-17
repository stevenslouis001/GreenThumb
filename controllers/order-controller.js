const Order = require('../models/Order')
const Product = require('../models/Product')

const createOrder = async (req, res) => {
    try {
        const userId = req.userInfo.userId

        const {
            items,
            shippingAddress
        } = req.body

        // calculate total price and check stock
        let totalPrice = 0
        for (const item of items) {
            const product = await Product.findById(item.product)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.product}`
                })
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for product: ${product.name}`
                })
            }

            totalPrice += product.price * item.quantity

            // deduct stock
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            })
        }

        // generate order number
        const orderNumber = 'ORD-' + Date.now()

        const newOrder = new Order({
            orderNumber,
            user: userId,
            items,
            totalPrice,
            shippingAddress
        })

        await newOrder.save()

        if (newOrder) {
            return res.status(201).json({
                success: true,
                message: "order created successfully",
                data: newOrder
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "unable to create order"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong creating order, try again later"
        })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const userId = req.userInfo.userId

        const orders = await Order.find({ user: userId })
            .select('-updatedAt -__v')
            .populate({
                path: 'items.product',
                select: '_id name price images'
            })

        if (orders) {
            return res.status(200).json({
                success: true,
                data: orders
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "no orders found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to get orders"
        })
    }
}

const getOrderById = async (req, res) => {
    try {
        const userId = req.userInfo.userId
        const { orderId } = req.params

        const order = await Order.findOne({ _id: orderId, user: userId })
            .select('-updatedAt -__v')
            .populate({
                path: 'items.product',
                select: '_id name price images'
            })

        if (order) {
            return res.status(200).json({
                success: true,
                message: "order found",
                data: order
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "order not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error getting order"
        })
    }
}

// admin only
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .select('-updatedAt -__v')
            .populate({
                path: 'user',
                select: '_id name email'
            })
            .populate({
                path: 'items.product',
                select: '_id name price images'
            })

        if (orders) {
            return res.status(200).json({
                success: true,
                data: orders
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "no orders found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to get orders"
        })
    }
}

// admin only
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "order ID is required"
            })
        }

        const updateResult = await Order.findByIdAndUpdate(
            orderId,
            { $set: { status } },
            { returnDocument: "after" }
        )

        if (updateResult) {
            return res.status(200).json({
                success: true,
                message: "order status updated successfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "order not found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "could not update order status"
        })
    }
}

const cancelOrder = async (req, res) => {
    try {
        const userId = req.userInfo.userId
        const { orderId } = req.params

        const order = await Order.findOne({ _id: orderId, user: userId })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "order not found"
            })
        }

        if (order.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: "only pending orders can be cancelled"
            })
        }

        // restore stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity }
            })
        }

        order.status = 'cancelled'
        await order.save()

        return res.status(200).json({
            success: true,
            message: "order cancelled successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "could not cancel order"
        })
    }
}

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, cancelOrder }