interface massHeight{
    mass:number,
    height:number
}


const calculateBmi = (height:number,mass:number):string=>{
    const bmi = mass / ( Math.pow(height/100,2))

    if(bmi>0 && bmi<=15){
        return "Very severely underweight"
    }
    else if(bmi>15 && bmi<=16){
        return "Severely underweight"
    }
    else if(bmi>16 && bmi<=18.5){
        return "Underweight"
    }
    else if(bmi>18.5 && bmi<=25){
        return "Normal (healthy weight)"
    }
    else if(bmi>25 && bmi<=30){
        return "Overweight"
    }
    else if(bmi>30 && bmi<=35){
        return "Obese Class I (Moderately obese)"
    }
    else if(bmi>35 && bmi<=40){
        return "Obese Class II (Severely obese)"
    }
    else if(bmi>40){
        return "Obese Class III (Very severely obese)"
    }
    else{
        return 'something is wrong'
    }
}

const parseBMI = (args:Array<string>):massHeight=>{
    return{
        height:Number(args[2]),
        mass:Number(args[3]),
        
    }
}

const{height,mass} = parseBMI(process.argv)
console.log(calculateBmi(height,mass))