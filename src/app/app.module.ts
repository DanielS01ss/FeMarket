import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserProfileTableComponent } from './pages/user-profile-table/user-profile-table.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LeftNavbarComponent } from './pages/left-navbar/left-navbar.component'
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@coreui/angular';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HomeComponent,
    SignInComponent,
    DashboardComponent,
    UserProfileComponent,
    UserProfileTableComponent,
    UploadComponent,
    LeftNavbarComponent,
    LandingPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
