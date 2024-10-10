import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './shared/services/loader/loader.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finalproject';
  isLoading: boolean = false

  constructor(loaderServ: LoaderService){
    loaderServ.isLoading.subscribe(val=>{
      this.isLoading = val
    });
  }
}
