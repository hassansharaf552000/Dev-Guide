import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExperienceViewModel } from '../../../modules/developer/interfaces/UserExperance';
import { EducationViewModel } from '../../../modules/developer/interfaces/UserEducation';
import { Profile } from '../../profile';
import { skillItem } from '../../../modules/developer/interfaces/Profile';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  formData: BehaviorSubject<FormData>;
  Experiences:ExperienceViewModel[]=[]
  Educations:EducationViewModel[]=[]
  skills:skillItem[]=[]

  urlCompleteProfile = "http://localhost:5164/api/Account/CompleteProfile"
  AddExperienceURL = "http://localhost:5164/api/Account/AddExperience"
  AddEducationURL = "http://localhost:5164/api/Account/AddEducation"
  constructor(private http: HttpClient) {
    this.formData = new BehaviorSubject<FormData>(new FormData());
  }

  updateFormData(key: string, data: any) {
    let oldData: FormData = this.formData.value
    oldData.append(key, data)
    this.formData.next(oldData); // Update the BehaviorSubject
  }
  
  // Retrieve the complete form data
  getFormData() {
    return this.formData.value;
  }
  

  CompleteProfile() {
    return this.http.put(this.urlCompleteProfile, this.formData.value)
  }
  AddExperience(formData:any) {
    return this.http.put(this.AddExperienceURL, formData)
  }
  AddEducation(formData:any) {
    return this.http.put(this.AddEducationURL, formData)
  }
}
