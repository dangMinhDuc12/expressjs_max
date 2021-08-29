const express = require('express')
const app = express()
const methodOverride = require('method-override')
const Product = require('./models/productsSQL')
const User = require('./models/user')
const Cart = require('./models/cartSQL')
const CartItem = require('./models/cartItemSQL')
const Order = require('./models/orderSQL')
const OrderItem = require('./models/orderItemSQL')
const sequelize = require('./ulti/database')
//Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require("path");


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

//Taọ middleware để mọi request tương ứng với user hiện tại
app.use(async (req, res, next) => {
    const userFind = await User.findAll({
        where: {
            id: 1
        }
    })
    req.user = userFind[0]
    next()
})

app.use('/admin',adminRoutes)
app.use(shopRoutes)



//404 not found page
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'})
})

//Tạo Relationship
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })

//Khởi tạo table ở db
;(async () => {
    //Nhúng các model đã gọi để dùng đc lệnh dưới
    await sequelize.sync()
    let userCreate = await User.findAll({
        where: {
            id: 1
        }
    })
    if (!userCreate.length) {
        userCreate = await User.create({
            name: 'Duc Dang',
            email: 'ducdang@gmail.com'
        })
    }
    const cartUser = await userCreate[0].getCart()
    if (!cartUser) {
        userCreate[0].createCart()
    }
    
    //Tạo server để chạy code
    app.listen(3000)
})()


