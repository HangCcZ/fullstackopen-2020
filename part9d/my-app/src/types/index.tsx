

interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

interface CourseWithDescription extends CoursePartBase{
    description:string;
}
  
interface CoursePartOne extends CourseWithDescription {
    name: "Fundamentals";
  }
  
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
interface CoursePartThree extends CourseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseWithDescription{
  name: "2021 Full Stack Course";
  credits: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export type {CoursePart}