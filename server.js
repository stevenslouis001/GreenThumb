require('dotenv').config() 


const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectToDB = require('./mongodb')

const adminProductRoutes = require('./routes/admin-route')
const authRoutes = require('./routes/auth-route')
const orderRoutes = require('./routes/order-route')

const app = express()

connectToDB()

const allowedOrigins = [
    'https://www.cs.umb.edu',
    'http://localhost:3000',
    'http://localhost:5500'
]

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))


app.use(express.json())
app.use(cookieParser())

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
})

app.get('/', (req, res) => {
    res.send('Backend is running!')
})

app.use('/api/admin/products', adminProductRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is now listening to port ${PORT}`)
})