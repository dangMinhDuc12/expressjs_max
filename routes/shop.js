const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../ulti/path')

//  / => GET
router.get('/',(req, res, next) => {
    //sendFile: gửi 1 file đến đường dẫn bên trong hàm, dirname: folder hiện tại
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
} )

module.exports = router