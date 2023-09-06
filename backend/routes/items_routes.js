const multer = require('multer')
const { getAllItems, getItem, addItem, updateItem, deleteItem, updateItemImages, filterItem, searchItem } = require('../controllers/items_controller')
const routers = require('express').Router()
const fs = require('fs')
const path = require('path')

const multers = multer.diskStorage({
    destination:(req,file,cb)=>{
        const dir = path.join(__dirname,`../Images/${req.params.id}/`)
        if(fs.existsSync(dir)){
            cb(null, dir)
        }else{
            fs.mkdirSync(dir)
            cb(null,dir)
        }
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
}) 

const upload = multer({storage:multers}).array('files')
routers.route('/').get(getAllItems)
routers.route('/:id').get(getItem)
routers.route('/filter/:key').get(filterItem)
routers.route('/search/:key').get(searchItem)
routers.route('/addItem/:id').post(upload,addItem)
routers.route('/updateItem/:id').put(updateItem)
routers.route('/updatePictures/:id').put(upload,updateItemImages)
routers.route('/deleteItem/:id').delete(deleteItem)


module.exports = routers
