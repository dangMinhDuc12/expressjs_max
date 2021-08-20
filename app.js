const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))


app.use('/add-product',(req, res, next) => {
    res.send('<form action="/product" method="post"><input type="text" name="title"><button type="submit">Add product</button></form>')
} )

app.post('/product',(req, res, next) => {
    console.log(req.body)
    res.redirect('/')
} )

app.use('/',(req, res, next) => {
    res.send('<h1>Hello</h1>')
} )



//Tạo server để chạy code
app.listen(3000)