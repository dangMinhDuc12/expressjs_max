const express = require('express')
const app = express()
const methodOverride = require('method-override')
const db = require('./ulti/database')

//Routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require("path");

async function getDb () {
    const result = await db.execute('SELECT * FROM products')
    console.log(result)
}
getDb()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

//404 not found page
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'})
})








//Tạo server để chạy code
app.listen(3000)