import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../shared/services/Account/account.service';

@Component({
  selector: 'app-developer-profile',
  templateUrl: './developer-profile.component.html',
  styleUrl: './developer-profile.component.css'
})
export class DeveloperProfileComponent {
  id : string;
  // developerId: string | null = null;
// developerProfile: Ideveloper | undefined;
GetProfileByClaimURL="http://localhost:5164/api/Account/GetOneUserByClaim"
GetReviewsByClaimURL="http://localhost:5164/api/Account/GetReviewByClaim"

 //developerProfile: any;
 developerReviews: any;
 isExpanded: boolean = false;
 maxLength: number = 250; // Maximum length before "Read more" appears
 developerProfile: any = {
  //  About: "I am a skilled Full Stack Developer with over 5 years of experience specializing in .NET technologies. I have a strong background in building scalable web applications, working across both front-end and back-end development. On the front-end, I work with Angular and React to create dynamic, user-friendly interfaces, while on the back-end, I leverage the power of ASP.NET Core to develop robust APIs and services."
 };
 reviews: any[] = [];
 displayedReviews: any[] = [];
 reviewsLimit: number = 4; // Display only 4 reviews initially
 hasMoreReviews: boolean = false; 
 similarDevelopers: any[] = [];
 showAll: boolean = false;
 maxItemsToShow: number = 2;
 selectedSkills:any[]=this.developerProfile.Skills
 constructor(private route: ActivatedRoute ,private http: HttpClient,private AccService:AccountService) {
  
 }


 ngOnInit(): void {
   // Get the developer ID from the URL
   const developerId = this.route.snapshot.paramMap.get('id');
console.log("developerid",developerId)
  //  if (developerId) {
     // Fetch developer profile
     this.AccService.getProfileByClaim().subscribe(
       data => {
         this.developerProfile = data;
         console.log('Profile: ', this.developerProfile);
         console.log("experi",this.developerProfile?.Experiences?.length);
         
       },
       error => {
         console.error('Error fetching profile', error);
       }
     );

     // Fetch developer reviews
     this.AccService.getReviewsByClaim().subscribe(
       data => {
         this.developerReviews = data;
         console.log('Reviews: ', this.developerReviews);
       },
       error => {
         console.error('Error fetching reviews', error);
       }
     );
  //  }

   this.getReviews();
   this.AccService.getall('', 'Developer',this.developerProfile.title, 0, 0, null, 1, 3, this.selectedSkills,developerId).subscribe(developers => {
     this.similarDevelopers=developers.Data;
     console.log("3-developers",developers.Data);  // This will return 3 developers with the required skills and title
   });

 }
 formatDate(dateString: string): string {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
   });
 }
 canLoadLess: boolean = false;

 getReviews() {
   this.AccService.getReviewsByClaim().subscribe((reviews: any[]) => {
     // Sort the reviews by date in descending order (most recent first)
     this.reviews = reviews.sort((a, b) => new Date(b.ReviewDate).getTime() - new Date(a.ReviewDate).getTime());
     this.updateDisplayedReviews();
   });
 }


 updateDisplayedReviews() {
   this.displayedReviews = this.reviews.slice(0, this.reviewsLimit);
   this.hasMoreReviews = this.reviews?.length > this.reviewsLimit;
   this.canLoadLess = this.reviewsLimit > 4;  // Show "Load Less" if more than 4 reviews are displayed
 }

 loadMoreReviews() {
   this.reviewsLimit += 4;  // Increment the limit by 4 to load more reviews
   this.updateDisplayedReviews();
 }
 loadLessReviews() {
   this.reviewsLimit = Math.max(this.reviewsLimit - 4, 4);  // Decrease the limit but not below the initial value (4)
   this.updateDisplayedReviews();
 }

 toggleExpand() {
   this.isExpanded = !this.isExpanded;
 }

//  get displayText(): string {
//    if (this.isExpanded || this.developerProfile.About.length <= this.maxLength) {
//      return this.developerProfile.About;
//    }
//    return this.developerProfile.About.slice(0, this.maxLength) + '...';
//  }
 get displayText(): string {
  if (!this.developerProfile || !this.developerProfile.About) {
    return '';  // Return empty string if developerProfile or About is undefined
  }

  if (this.isExpanded || this.developerProfile?.About?.length <= this.maxLength) {
    return this.developerProfile.About;
  }

  return this.developerProfile.About.slice(0, this.maxLength) + '...';
}

getYearFromDate(dateString: string): number {
 const date = new Date(dateString);
 return date.getFullYear();
}
toggleShowAll() {
 this.showAll = !this.showAll;
}

getLimitedEducations(educations: any[]) {
 if (!educations) {
   return []; // Return an empty array if educations is undefined
 }
 return this.showAll ? educations : educations.slice(0, this.maxItemsToShow);
}
getLimitedExperiences(experiences: any[]) {
 if (!experiences) {
   return []; // Return an empty array if educations is undefined
 }
 return this.showAll ? experiences : experiences.slice(0, this.maxItemsToShow);
}
trackByFunction(index: number, education: any): string {
 return education.Degree; // or any unique identifier
}
}