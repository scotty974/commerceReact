import express from 'express'
import register from './route/clients/register.js'
import login from './route/clients/login.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const port = 8000

app.use('/', register)
app.use('/', login)

app.listen(port, ()=>{
    console.log(`App running on : ${port}`)
})