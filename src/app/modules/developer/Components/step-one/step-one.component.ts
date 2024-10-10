import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../../shared/services/Account/account.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent {
  CVFile: File | null = null;
  isValidationVisible: boolean = false; // Flag for validation message visibility

  constructor(private router: Router, private Account: AccountService) {}

  // Called when user selects a file
  SelectFile(event: any) {
    const file = event.target.files[0];
    this.CVFile = file;

    if (file) {
      this.isValidationVisible = false; // Hide validation if a file is selected
    }

    console.log(this.CVFile);
  }

  // Called when user submits the form
  goToNextStep() {
    if (this.CVFile) {
      this.isValidationVisible = false; // Hide validation message
      this.Account.updateFormData('CV', this.CVFile);
      this.router.navigate(['/developer/step-two']); // Navigate to step two
    } else {
      this.isValidationVisible = true; // Show validation message if no file is selected
    }
  }
}

