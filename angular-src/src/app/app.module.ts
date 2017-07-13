import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SocketioService } from './services/socketio.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    EditProfileComponent,
    ProjectsComponent,
    ConnectionsComponent,
    MyProjectsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    FlashMessagesModule,
    ReactiveFormsModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
