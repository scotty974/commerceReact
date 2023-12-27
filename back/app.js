import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
const port = 8000

app.get('/',(req,res)=>{
    res.send("hey")
})

app.listen(port, ()=>{
    console.log(`App running on : ${port}`)
})