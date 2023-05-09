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
import { ViewPageComponent } from './pages/view-page/view-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PwChangesComponent } from './pages/pw-changes/pw-changes.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SuccessCardComponent } from './pages/success-card/success-card.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';


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
    NotFoundComponent,
    ViewPageComponent,
    PwChangesComponent,
    SignupComponent,
    SuccessCardComponent,
    ConfirmationComponent,
    GraphsComponent
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    NgxChartsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
