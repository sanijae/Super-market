const { getAllOrders, getOrder, addOrder, deleteOrder, updateOrder } = require('../controllers/order_controller')

const router = require('express').Router()

router.route('/').get(getAllOrders)
router.route('/:id').get(getOrder)
router.route('/addOrder/:id').post(addOrder)
router.route('/update/:id').put(updateOrder)
router.route('/delete/:id').delete(deleteOrder)

module.exports = router   