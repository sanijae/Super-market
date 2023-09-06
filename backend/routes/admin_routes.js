const { getAllAdmins, getAdmin, register, login, updateAdmin, deleteAdmin, getAdmins } = require('../controllers/admin_controller')

const router = require('express').Router()

router.route('/').get(getAllAdmins)
router.route('/:id').get(getAdmin)
router.route('/admins/:id').get(getAdmins)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/update/:id').put(updateAdmin)
router.route('/delete/:id').delete(deleteAdmin)

module.exports = router  