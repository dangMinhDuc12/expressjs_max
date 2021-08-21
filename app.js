const express = require('express')
const app = express()

//Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require("path");

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

//404 not found page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})








//Tạo server để chạy code
app.listen(3000)