import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

	authToken: any;
	user: any;

  constructor(private http: Http) { }

  getJwt() {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/getjwt', {headers: headers})
    .map(res => res.json());
  }

  registerUser(user) {
  	let headers = new Headers();
  	headers.append('Content-type', 'application/json');
  	return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
  	.map(res => res.json());
  }

  authenticateUser(user) {
  	let headers = new Headers();
  	headers.append('Content-type', 'application/json');
  	return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
  	.map(res => res.json());
  }

  storeUserData(token, user) {
  	localStorage.setItem('id_token', token);
  	localStorage.setItem('user', JSON.stringify(user));
  	this.authToken = token;
  	this.user = user;
  }

  logout() {
  	this.authToken = null;
  	this.user = null;
  	localStorage.clear();
  }

  getProfile() {
  	let headers = new Headers();
  	this.loadToken();
  	headers.append('Authorization', this.authToken);
  	headers.append('Content-type', 'application/json');
  	return this.http.get('http://localhost:3000/users/profile', {headers: headers})
  	.map(res => res.json());
  }

  updateProfile(profile) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/updateprofile', profile, {headers: headers})
    .map(res => res.json());
  }

  loadToken() {
  	const token = localStorage.getItem('id_token');
  	this.authToken = token;
  }

  setLastLogin() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/setlogin', {headers: headers})
    .map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  // Projects

  addProject(newProject) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/addproject', newProject, {headers: headers})
    .map(res => res.json());  
  }

  getProjects() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/projects', {headers: headers})
    .map(res => res.json());
  }

  getUserProjects() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/userprojects', {headers: headers})
    .map(res => res.json());
  }

  getProjectsAfterSearch(searchString) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/searchprojects', {searchString: searchString}, {headers: headers})
    .map(res => res.json());
  }

  getMemberTeams(username) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/getmemberteams', {username: username}, {headers: headers})
    .map(res => res.json());
  }

  sendTeamInvite(receiver, projectName) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/sendteaminvite', {receiver: receiver, projectName: projectName}, {headers: headers})
    .map(res => res.json());
  }

  getTeams() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/getteams', {headers: headers})
    .map(res => res.json());
  }

  getProject(projectName, creator) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/project', {creator: creator, projectName: projectName}, {headers: headers})
    .map(res => res.json());
  }

  acceptProjectInvite(projectName, creator) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/acceptprojectinvite', {creator: creator, projectName: projectName}, {headers: headers})
    .map(res => res.json());
  }

  declineProjectInvite(projectName, creator) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/declineprojectinvite', {creator: creator, projectName: projectName}, {headers: headers})
    .map(res => res.json());
  }

  removeMemberFromProject(projectName, member) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/removemember', {projectName: projectName, member: member}, {headers: headers})
    .map(res => res.json());
  }

  leaveProject(projectName, creator) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/leaveproject', {projectName: projectName, creator: creator}, {headers: headers})
    .map(res => res.json());
  }


  requestJoinProject(projectName, creator) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/requestjoinproject', {projectName: projectName, creator: creator}, {headers: headers})
    .map(res => res.json());
  }

  acceptRequestToJoinTeam(sender, projectName) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/acceptrequesttojointeam', {projectName: projectName, sender: sender}, {headers: headers})
    .map(res => res.json());
  }

  declineRequestToJoinTeam(sender, projectName) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/declinerequesttojointeam', {projectName: projectName, sender: sender}, {headers: headers})
    .map(res => res.json());
  }

  // Connections

  getConnections() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/connections', {headers: headers})
    .map(res => res.json());
  }

  reqestConnection(receiver) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/requestconnection', {receiver: receiver}, {headers: headers})
    .map(res => res.json());
  }

  acceptRequest(sender) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/acceptrequest', {sender: sender}, {headers: headers})
    .map(res => res.json());
  }

  declineRequest(sender) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/declinerequest', {sender: sender}, {headers: headers})
    .map(res => res.json());
  }

  removeConnection(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/removeconnection', {user: user}, {headers: headers})
    .map(res => res.json());
  }

// Profile

  getUserProfile(username) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/getuserprofile', {username: username}, {headers: headers})
    .map(res => res.json());
  }

  getProfilesAfterSearch(searchString) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/searchprofiles', {searchString: searchString}, {headers: headers})
    .map(res => res.json());
  }

}
