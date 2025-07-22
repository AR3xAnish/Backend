require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/x',(req,res)=>{
    res.send("Twitter")
})

app.get('/anish',(req,res)=>{
    res.send("<h1>Hello ANish</h1>")
})

app.listen(port,()=>{
    console.log(`Anish on port ${port}`);
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})