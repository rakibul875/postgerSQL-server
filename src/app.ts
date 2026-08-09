import express from 'express'
import cors from 'cors'
import router from './services/products'
const app=express()
app.use(cors())
app.use(express.json())
app.use(router)
app.get('/',(req,res)=>{
    res.json({
        success: true,
        message: "Welcome to the API"
    })
})

export default app