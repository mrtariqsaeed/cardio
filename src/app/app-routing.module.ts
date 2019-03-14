import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PublicAuthGuard } from './auth/public-auth.guard';
import { AttendeesComponent } from './attendees/attendees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [PublicAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [PublicAuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'am', component: AmComponent, canActivate: [AmAuthGuard] },
  // { path: 'ps', component: PsComponent, canActivate: [PsAuthGuard] },
  { path: 'attendees/:id', component: AttendeesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
