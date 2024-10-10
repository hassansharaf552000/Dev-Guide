import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../../shared/services/Account/account.service';
import { Profile } from '../../interfaces/Profile';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrl: './step-five.component.css',
})
export class StepFiveComponent {
  Country: any
  Level: any
  YearsOfExperience: any
  About: any
  Title: any
  PhoneNumber: any
  Image: any
  CV: any
  constructor(private router: Router, public accountService: AccountService) {
    // Subscribe to the BehaviorSubject to get the form data from previous steps
    const formData = this.accountService.getFormData();

    // Extract data from formData and assign it to variables for rendering in the template

    this.CV = formData.get('CV')
    this.Image = formData.get('Image')
    this.Country = formData.get('Country')
    this.Title = formData.get('Title')
    this.About = formData.get('About')
    this.Level = formData.get('Level')
    this.YearsOfExperience = formData.get('YearsOfExperience')
    this.PhoneNumber = formData.get('PhoneNumber')
  }

  editSection(step: string): void {
    this.router.navigate([`/${step}`]);
  }

  goToPreviousStep(): void {
    this.router.navigate(['/developer/step-four']);
  }

  submitProfile(): void {
    // Send form data to the server via the AccountService
    this.accountService.CompleteProfile().subscribe({
      next: (res: any) => {
        console.log("CompleteProfile", res);

        this.accountService.Educations.forEach(newEducation=>{
          this.accountService.AddEducation(newEducation).subscribe({
            next:(edres)=>{
              console.log(edres);
            },
            error:(edres)=>{
              console.log(edres);
            }
          })
        })
        this.accountService.Experiences.forEach(newExperience=>{
          this.accountService.AddExperience(newExperience).subscribe({
            next:(edres)=>{
              console.log(edres);
            },
            error:(edres)=>{
              console.log(edres);
            }
          })
        })
      },
      error: (err) => {
        console.log(err);
        alert("Sorry try again leter")
      }
    }
    );
  }
}
// export class StepFiveComponent implements OnInit {
//   basicInfo: any;
//   education: any;
//   technicalSkills: any;

//   constructor(private router: Router,private Account:AccountService) {}

//   ngOnInit(): void {
//     // Retrieve the data from previous steps (using a service or directly from storage)
//     this.basicInfo = {
//       firstName: 'John',
//       lastName: 'Doe',
//       country: 'USA',
//       city: 'New York',
//       phone: '1234567890',
//     };

//     this.education = {
//       university: 'Harvard University',
//       country: 'USA',
//       degree: 'Bachelor',
//       fieldOfStudy: 'Computer Science',
//       startYear: '2015',
//       startMonth: 'September',
//       endYear: '2019',
//       endMonth: 'June',
//       currentlyStudying: false,
//     };

//     this.technicalSkills = {
//       experience: 5,
//       role: 'Developer',
//       skills: ['Angular', 'React', 'Node.js'],
//     };
//   }

//   editSection(step: string): void {
//     this.router.navigate([`/${step}`]);
//   }

//   goToPreviousStep(): void {
//     this.router.navigate(['/developer/step-four']);
//   }

//   submitProfile(): void {
//     // Handle form submission
//     console.log('Profile submitted:', {
//       basicInfo: this.basicInfo,
//       education: this.education,
//       technicalSkills: this.technicalSkills,
//     });
//     // Redirect to a success page or perform further actions
//   }
// }
