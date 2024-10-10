import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o'; // Correct import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Needed for animations
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    CarouselModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    CookieService,
    provideClientHydration(), 
    provideHttpClient(withFetch(), withInterceptors([authInterceptor,loaderInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
