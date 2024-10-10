import { EducationViewModel } from "./UserEducation"
import { ExperienceViewModel } from "./UserExperance"

export interface Profile
{
    // Skills:number[]
    // Experiences :ExperienceViewModel[]
    // Education :EducationViewModel[]
    Country :string
    Level :string
    YearsOfExperience :number
    About:string
    PhoneNumber:string
    Image:File
    CV:File
}
export interface skillItem{
    Id:number,
    Name:string
  }