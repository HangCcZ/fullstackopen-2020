interface Evaluation
{
    periodLength:number,
    trainingDays:number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface MultiplyValues{
    target:number,
    hourPerDay:Array<number>
}

const calculateExercises = (hourPerDay:Array<number>,target:number):Evaluation=>{
    const periodLength = hourPerDay.length;
    const validDays = hourPerDay.filter(hour=>hour>0);
    const trainingDays = validDays.length;
    const average = validDays.reduce((accumulator,currentValue)=>accumulator+currentValue) / periodLength
    const hourDiff = target - average
    let rating, ratingDescription, success

    if(hourDiff>2){
        success = false
        rating = 1
        ratingDescription = "Try your best next time"
    }
    else if(hourDiff>0){
        success = false
        rating = 2
        ratingDescription = 'Not too bad but could be better'
    }
    else{
        success = true
        rating = 3
        ratingDescription = "Awesome! Keep it up!"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const parseArguments = (args:Array<string>):MultiplyValues=>{
    let hourPerDay = []
    for(const arg of args.slice(3)){
        hourPerDay.push(Number(arg))
    }
    
    return {
        hourPerDay,target:Number(args[2])
    }
}

const {hourPerDay,target} = parseArguments(process.argv)
console.log(calculateExercises(hourPerDay,target))
