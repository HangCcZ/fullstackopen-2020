import express from 'express'
import {calculateBmi} from './calculateBmi'
const app = express()

app.get('/',(_req,res)=>{
    res.send("hello")
})

app.get('/bmi',(req,res)=>{
    const {height,weight} = req.query

    if(!Number(height) || !Number(weight)){
        res.send({ error: "malformatted parameters"})
    }
    else{
        const bmiResult = calculateBmi(Number(height),Number(weight))
        const result = {
            weight:Number(weight),
            height:Number(height),
            bmi:bmiResult
        }
        res.send(result)
    }
   
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})