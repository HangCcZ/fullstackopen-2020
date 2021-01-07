

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
  
type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

export type {CoursePart}