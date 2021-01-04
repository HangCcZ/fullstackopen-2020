import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import {calculateBmi} from './calculateBmi';
import {calculateExercises} from './exerciseCalculator'
const app = express();
app.use(bodyParser.json());

app.get('/',(_req,res)=>{
    res.send("hello");
});

app.get('/bmi',(req,res)=>{
    const {height,weight} = req.query;

    if(!Number(height) || !Number(weight)){
        res.send({ error: "malformatted parameters"});
    }
    else{
        const bmiResult = calculateBmi(Number(height),Number(weight))
        const result = {
            weight:Number(weight),
            height:Number(height),
            bmi:bmiResult
        };
        res.send(result);
    }
   
});

app.post('/exercise',(req:Request,res:Response)=>{
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hourPerDay:any = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target:any = req.body.target;
    

    if(!hourPerDay || !target){
        console.log('some error');
        res.send({
            error: "parameters missing"
          }
          );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
   else if(!Number(target) || !Array.isArray(hourPerDay) || hourPerDay.filter((val:any)=> typeof val==='string').length>0)
   {
    res.send({
        error: "malformatted parameters"
      });
   }
   else{
      
       res.send(calculateExercises(hourPerDay,Number(target)));
   }
   
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});