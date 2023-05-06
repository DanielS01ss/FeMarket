import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserProfileTableComponent } from './pages/user-profile-table/user-profile-table.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SuccessCardComponent } from './pages/success-card/success-card.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'sign-in', component: SignInComponent },
  {path:'sign-up',component:SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'user-profile-table', component: UserProfileTableComponent},
  {path: 'upload', component:UploadComponent},
  {path: 'success', component:SuccessCardComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
