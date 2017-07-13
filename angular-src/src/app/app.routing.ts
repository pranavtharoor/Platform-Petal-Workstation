import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
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
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard]
	// },
	// {
	// 	path: '**',
	// 	redirectTo: ''
	}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);