const express = require('express')
const fs = require('fs')
const path = require('path')
const mongose = require('mongoose')
const cors = require('cors')

 
const app  = express()
app.use(cors())
app.use(express.urlencoded({limit:'5mb',extended:true}))
app.use(express.json({limit:'5mb',extended:true}))
app.use(express.text({limit:'5mb'}))
app.use('/api/Images',express.static(path.join(__dirname,'Images')))

const URL = process.env.URL || 'mongodb://localhost:27017/sidi_grocery'
const PORT = process.env.PORT || 5000

app.use('/api/users',require('./routes/user_routes'))
app.use('/api/admins',require('./routes/admin_routes'))
app.use('/api/items',require('./routes/items_routes'))
app.use('/api/payments',require('./routes/main_routes'))
app.use('/api/orders',require('./routes/order_routes'))
app.use('/api/notes',require('./routes/note_routes'))

mongose.connect(URL,{family: 4})
.then(()=>app.listen(PORT,()=>console.log('connection successful on port: ',PORT)))
.catch((err)=>console.log('Error: ',err))