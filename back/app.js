import express from 'express'
import register from './route/clients/register.js'
import login from './route/clients/login.js'
import category from "./route/category/category.js"
import products from './route/products/products.js'
import orderDetail from './route/orders/orderDetail.js'
import order from './route/orders/order.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const port = 8000

app.use('/', register)
app.use('/', login)
app.use('/', category)
app.use('/', products)
app.use('/', orderDetail)
app.use('/', order)

app.listen(port, ()=>{
    console.log(`App running on : ${port}`)
})