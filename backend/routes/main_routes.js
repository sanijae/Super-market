const { getAllMain, addMain, updateMain, deleteMain, getMain } = require('../controllers/main_controller')


const router = require('express').Router()

router.route('/').get(getAllMain)
router.route('/:id').get(getMain)
router.route('/addMain').post(addMain)
router.route('/update/:id').put(updateMain)
router.route('/delete/:id').delete(deleteMain)

module.exports = router  