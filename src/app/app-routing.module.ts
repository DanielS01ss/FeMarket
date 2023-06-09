import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { PwChangesComponent } from './pages/pw-changes/pw-changes.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SuccessCardComponent } from './pages/success-card/success-card.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { AuthGuard } from './guard/auth.guard';
import { SnippetComponent } from './pages/snippet/snippet.component';
import { MachineLearningComponent } from './pages/machine-learning/machine-learning.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'sign-in', component: SignInComponent },
  {path: 'home', component: HomeComponent },
  {path:'sign-up',component:SignupComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'user-profile', component: UserProfileComponent,canActivate:[AuthGuard]},
  {path: 'upload', component:UploadComponent,canActivate:[AuthGuard]},
  {path: 'view', component:ViewPageComponent,canActivate:[AuthGuard]},
  {path: 'pw-change', component: PwChangesComponent,canActivate:[AuthGuard]},
  {path: 'success', component:SuccessCardComponent},
  {path:'graphs',component:GraphsComponent,canActivate:[AuthGuard]},
  {path:'snippet',component:SnippetComponent,canActivate:[AuthGuard]},
  {path:'machine-learning',component:MachineLearningComponent,canActivate:[AuthGuard]},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
