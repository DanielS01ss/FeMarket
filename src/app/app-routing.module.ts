import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserProfileTableComponent } from './pages/user-profile-table/user-profile-table.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { PwChangesComponent } from './pages/pw-changes/pw-changes.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SuccessCardComponent } from './pages/success-card/success-card.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'sign-in', component: SignInComponent },
  {path:'sign-up',component:SignupComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'user-profile', component: UserProfileComponent,canActivate:[AuthGuard]},
  {path: 'user-profile-table', component: UserProfileTableComponent,canActivate:[AuthGuard]},
  {path: 'upload', component:UploadComponent,canActivate:[AuthGuard]},
  {path: 'view', component:ViewPageComponent,canActivate:[AuthGuard]},
  {path: 'pw-change', component: PwChangesComponent,canActivate:[AuthGuard]},
  {path: 'success', component:SuccessCardComponent,canActivate:[AuthGuard]},
  {path: 'confirmation',component:ConfirmationComponent},
  {path:'graphs',component:GraphsComponent,canActivate:[AuthGuard]},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
