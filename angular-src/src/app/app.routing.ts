import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkstationComponent } from './components/workstation/workstation.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { JwtComponent } from './components/jwt/jwt.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'workstation',
		component: WorkstationComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'editprofile',
		component: EditProfileComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'projects',
		component: ProjectsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'myprojects',
		component: MyProjectsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'connections',
		component: ConnectionsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'loggingin',
		component: JwtComponent,
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);