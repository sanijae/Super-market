const { getAllUsers, getUser,register , login, updateUser, deleteUser, addToCart, deleteCart, deleteCartAll, updateOrder, deleteOrderAll, deleteOrder, updateNote, deleteNote, deleteNoteAll, getUsers} = require('../controllers/user_controller')

const router = require('express').Router()

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/update/:id').put(updateUser)
router.route('/updateOrder/:uid').put(updateOrder)
router.route('/updateUserNote/:id').put(updateNote)
router.route('/addToCart/:id/:userId').put(addToCart)
router.route('/delete/:id').delete(deleteUser)
router.route('/deleteCat/:id/:userId').put(deleteCart)
router.route('/deleteMyOrder/:id/:userId').put(deleteOrder)
router.route('/deleteAllCat/:id').put(deleteCartAll)
router.route('/deleteAllMyOrders/:id').put(deleteOrderAll)
router.route('/deleteNote/:id').delete(deleteNote)
router.route('/deleteAllNotes/:id').delete(deleteNoteAll)

module.exports = router 