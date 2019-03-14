import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { UsersService } from './services/users.service';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent, DialogOverviewExampleDialog } from './home/home.component';
import { MatVideoModule } from 'mat-video';
import { ContactComponent } from './contact/contact.component';
import { AgmCoreModule } from '@agm/core';
import { AmComponent } from './am/am.component';
// import { DashboardComponent, ViewSpeakersDialog } from './ps/ps.component';
import { EventsService } from './services/events.service';
import { AttendeesComponent, ViewDialog, EditDialog, DeleteDialog, ApproveDialog } from './attendees/attendees.component';
import { SpeakersService } from './services/speakers.service';
import { DashboardComponent, ViewSpeakersDialog } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DialogOverviewExampleDialog,
    ContactComponent,
    AmComponent,
    DashboardComponent,
    AttendeesComponent,
    ViewDialog,
    EditDialog,
    DeleteDialog,
    ApproveDialog,
    ViewSpeakersDialog,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatVideoModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBl110wcCH9yQfpPkNNJBkmBog7TYlUzj4'}),
    HttpClientModule
  ],
  entryComponents: [HomeComponent, DialogOverviewExampleDialog, AttendeesComponent, ViewDialog, EditDialog, DeleteDialog, ApproveDialog, DashboardComponent, ViewSpeakersDialog],
  providers: [
    UsersService,
    EventsService,
    SpeakersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
