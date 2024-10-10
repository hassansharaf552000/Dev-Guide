import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../shared/services/Account/account.service';
import { SkillService } from '../../../../shared/services/Skill/skill.service';
import { ExperienceViewModel } from '../../interfaces/UserExperance';
import { skillItem } from '../../interfaces/Profile';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css'],
})

export class StepFourComponent {
  Skills: skillItem[] = [];
  filteredSkills: skillItem[] = [];
  searchQuery: string = '';
  SelectedSkilles: skillItem[] = []
  Experiences: ExperienceViewModel[] = []
  Level = ""
  About = ""
  Title=""
  YearsOfExperience = 0

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private Account: AccountService,
    private SkillService: SkillService
  ) {

    this.Experiences = [
      { StartDate: new Date(), EndDate: null, Organization: "", FieldOfStudy: "", TillNow: null }
    ]
    // Fetch skills from the service
    this.SkillService.getAll().subscribe((res: any) => {
      console.log(res)
      this.Skills = res;
      this.filteredSkills = [...this.Skills]; // Initialize with all skills
    });
  }

  addExperience(): void {
    this.Experiences.push(
      { StartDate: new Date(), EndDate: null, Organization: "", FieldOfStudy: "", TillNow: null }
    )
  }
  removeExperience(index: number) {
    this.Experiences.splice(index, 1)
  }

  // Add skill from suggestion
  addSkillFromSuggestion(skill: skillItem): void {
    // Add to the FormArray if not already included
    if (!this.SelectedSkilles.some(val => val.Id === skill.Id)) {
      this.SelectedSkilles.push(skill);
    }
  }

  // Remove skill from the selected list
  removeSkill(skill: skillItem): void {
    const index = this.SelectedSkilles.findIndex(val => val.Id === skill.Id);
    if (index >= 0) {
      this.SelectedSkilles.splice(index, 1);
    }
  }

  // Handle input change for search and filter
  onSearchInputChange(input: string): void {
    this.searchQuery = input;
    this.filterSkills(); // Filter skills on input change
  }

  // Filter suggested skills based on input
  filterSkills(): void {
    const searchTerm = this.searchQuery.toLowerCase();

    if (searchTerm === '') {
      this.filteredSkills = [...this.Skills]; // Show all skills if no input
    } else {
      this.filteredSkills = this.Skills.filter((skill: any) =>
        skill.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  // Validate and navigate to the next step
  onNext(): void {
    if (this.Experiences.length > 0 && this.SelectedSkilles.length > 0 && this.checklist() == undefined) {
      this.Account.updateFormData("About", this.About);
      this.Account.updateFormData("Level", this.Level);
      this.Account.updateFormData("Title", this.Title);
      this.Account.updateFormData("YearsOfExperience", this.YearsOfExperience);
      this.SelectedSkilles.forEach(sk=>{

        this.Account.updateFormData("Skills", sk.Id);
      })

      this.Account.Experiences = this.Experiences;
      this.Account.skills = this.SelectedSkilles;
      //call back
      this.router.navigate(['/developer/step-five']);

    }
    else {
      console.log("error Happaned");

    }

  }
  checklist(): ExperienceViewModel | undefined {
    let res = this.Experiences.find(i => i.Organization == "" || i.FieldOfStudy == "" || i.StartDate == new Date())
    return res;
  }
  // Navigate to the previous step
  goToPreviousStep(): void {
    this.router.navigate(['/developer/step-five']);
  }

  // testbehvior():void{
  //   var tttt= this.Account.getFormData();
  //   console.log("ressssssss",tttt.get('experience'));

  // }
}

