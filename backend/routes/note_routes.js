const { getAllNotes, getNote, addNote, updateNote, deleteNote, updateUserNote } = require('../controllers/note_controller')

const router = require('express').Router()

router.route('/').get(getAllNotes)
router.route('/:id').get(getNote)
router.route('/addNote/:id').post(addNote)
router.route('/update/:id').put(updateNote)
router.route('/updateNote/:id').put(updateUserNote) 
router.route('/delete/:id').delete(deleteNote)

module.exports = router   