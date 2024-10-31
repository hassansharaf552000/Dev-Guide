import { AuthService } from './../Auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ExperienceViewModel } from '../../../modules/developer/interfaces/UserExperance';
import { EducationViewModel } from '../../../modules/developer/interfaces/UserEducation';
import { Profile } from '../../profile';
import { skillItem } from '../../../modules/developer/interfaces/Profile';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  formData: BehaviorSubject<FormData>;
  CompleteProfileURL = "http://localhost:5164/api/Account/CompleteProfile"
   ExpertsListURL="http://localhost:5164/api/Account/Filter"
 //ExpertsListURL="http://localhost:5164/api/Account/GetAll"
  Experiences:ExperienceViewModel[]=[]
  Educations:EducationViewModel[]=[]
  skills:skillItem[]=[]
  AddExperienceURL = "http://localhost:5164/api/Account/AddExperience"
  AddEducationURL = "http://localhost:5164/api/Account/AddEducation"
  GetProfileURL="http://localhost:5164/api/Account/GetOneUser"
  GetProfileByClaimURL="http://localhost:5164/api/Account/GetOneUserByClaim"
  GetReviewsURL="http://localhost:5164/api/Account/GetReview"
  GetReviewsByClaimURL="http://localhost:5164/api/Account/GetReviewByClaim"
  queryUrl="http://localhost:5164/api/Account/GetOneByID"
   finduserUrl="http://localhost:5164/api/Account/GetUserByID"
  queryAnswerUrl="http://localhost:5164/api/Query/QueryAnswers"
  
  IsMentorURL = "http://localhost:5164/api/Account/IsUserMentor"
  constructor(private http: HttpClient,private authService:AuthService) {
    this.formData = new BehaviorSubject<FormData>(new FormData());
  }

//   constructor(private http: HttpClient) {
// >>>>>>> master

//   }

  updateFormData(key: string, data: any) {
    let oldData: FormData = this.formData.value
    //oldData.append(key, data)
    oldData.set(key,data)
    this.formData.next(oldData); // Update the BehaviorSubject
  }

  // Retrieve the complete form data
  getFormData() {
    return this.formData.value;
  }


  // CompleteProfile() {
  //   const token = this.authService.getToken();  // Retrieve token from cookies
  //   if (!token) {
  //     console.error("No token found, user is not authenticated.");
  //     //return;  // Exit if no token is found
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,  // Add the token to the headers
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.put(this.CompleteProfileURL, this.formData.value, { headers });
  // }
CompleteProfile() {
    const token = this.authService.getToken();
    if (!token) {
        console.error("No token found, user is not authenticated.");
        return of({ success: false });
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.put(this.CompleteProfileURL, this.formData.value, { headers })
        .pipe(
            catchError(error => {
                console.error("Error completing profile:", error);
                return of({ success: false, message: "Profile completion failed" });
            })
        );
}

  // ExpertsList(Data:any) {
  //   return this.http.get(this.ExpertsListURL,Data)
  // }
  // getFilteredMentors(name: string, role: string, department: string, minprice: number, maxprice: number, rate: number | null): Observable<any> {
  //   const params = { name, role, title: department, minprice, maxprice, rate };
  //   return this.http.get<any>(this.ExpertsListURL, { params });
  // }
  // getall(name: string = '', role: string = '', title: string = '', minprice: number = 0, maxprice: number = 0, rate: number | null = null, page:number = 1, pageSize:number ): Observable<any> {
  //   const params: any = {};

  //   if (name) params.name = name;
  //   if (role) params.role = role;
  //   if (title) params.title = title;
  //   if (minprice) params.minprice = minprice;
  //   if (maxprice) params.maxprice = maxprice;
  //   if (rate !== null) params.rate = rate;
  //   if (pageSize) params.pageSize = pageSize;
  //   if(page) params.page=page;

  //   return this.http.get<any>(this.ExpertsListURL, { params });
  // }
  getall(name: string = '', role: string = '', title: string = '', minprice: number = 0, maxprice: number = 0, rate: number | null = null, page: number = 1, pageSize: number, skills: string[] = [], mentorId: string = ''): Observable<any> {
    const params: any = {};

    if (name) params.name = name;
    if (role) params.role = role;
    if (title) params.title = title;
    if (minprice) params.minprice = minprice;
    if (maxprice) params.maxprice = maxprice;
    if (rate !== null) params.rate = rate;
    if (pageSize) params.pageSize = pageSize;
    if (page) params.page = page;
    if (skills && skills?.length > 0) params.skills = skills.join(',');
    if (mentorId) params.excludeMentorId = mentorId;  // Add mentorId to params to exclude it

    return this.http.get<any>(this.ExpertsListURL, { params });
}



  // getall(){
  //   return this.http.get(this.ExpertsListURL)
  // }

  getMentorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.queryUrl}/${id}`);
  }
  getUserById(userid: string): Observable<any> {
    return this.http.get<any>(`${this.finduserUrl}/${userid}`);
  }
  getAnswerByQueryId(id: string): Observable<any> {
    return this.http.get<any>(`${this.queryAnswerUrl}/${id}`);
  }
  AddExperience(formData:any) {
    return this.http.put(this.AddExperienceURL, formData)
  }
  AddEducation(formData:any) {
    return this.http.put(this.AddEducationURL, formData)
  }

  getProfile(id: string): Observable<any> {
    return this.http.get<any>(`${this.GetProfileURL}/${id}`);
  }
  getProfileByClaim() {
    return this.http.get<any>(this.GetProfileByClaimURL);
  }
  // Fetch reviews by user ID
  getReviews(id: string): Observable<any> {
    return this.http.get<any>(`${this.GetReviewsURL}/${id}`);
  }

  getReviewsByClaim() {
    return this.http.get<any>(this.GetReviewsByClaimURL);
  }

  IsUserMentor(id: string): Observable<any> {
    return this.http.get<any>(`${this.IsMentorURL}/${id}`);
  }


}
