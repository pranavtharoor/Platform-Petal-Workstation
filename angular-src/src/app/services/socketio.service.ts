import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class SocketioService {

	private socket: SocketIOClient.Socket;
	private subject = new Subject<any>();

	constructor(
  		private flashMessage: FlashMessagesService,
		) {

		this.socket = io.connect('http://localhost:4000');
		this.socket.on('connect', (socket) => {
			const token = localStorage.getItem('id_token');
			if(token) {
		  		this.socket.emit('login', token.slice(4));
			}
		});

		this.socket.on('connectionRequested', data => {
			this.flashMessage.show(data + ' sent a connection request', {cssClass: 'color-success', timeout: 5000});
			this.sendConnections(data);
		});

		this.socket.on('requestAccepted', data => {
			this.flashMessage.show(data + ' accepted your connection request', {cssClass: 'color-success', timeout: 5000});
			this.sendConnections(data);
		});

		this.socket.on('requestDeclined', data => {
			this.sendConnections(data);
		});

		this.socket.on('connectionRemoved', data => {
			this.sendConnections(data);
		});

		this.socket.on('sendTeamInvite', data => {
			this.flashMessage.show(data + ' invited you to a team', {cssClass: 'color-success', timeout: 5000});
			this.sendMyProjects(data);
		});		

		this.socket.on('requestJoinTeam', data => {
			this.flashMessage.show(data + ' wants to join your team', {cssClass: 'color-success', timeout: 5000});
			this.sendMyProjects(data);
		});		

		this.socket.on('acceptTeamInvite', data => {
			this.flashMessage.show(data + ' accepted you to the team', {cssClass: 'color-success', timeout: 5000});
			this.sendMyProjects(data);
		});		

		this.socket.on('acceptJoinTeam', data => {
			this.flashMessage.show(data + ' joined the team', {cssClass: 'color-success', timeout: 5000});
			this.sendMyProjects(data);
		});		

		this.socket.on('declineTeamInvite', data => {
			this.flashMessage.show(data + ' declined your team invite', {cssClass: 'color-danger', timeout: 5000});
			this.sendMyProjects(data);
		});		

		this.socket.on('declineJoinTeam', data => {
			this.flashMessage.show(data + ' declined your request to join the team', {cssClass: 'color-danger', timeout: 5000});
			this.sendMyProjects(data);
		});		

		this.socket.on('removeTeamMember', data => {
			this.flashMessage.show(data + ' removed you form the team', {cssClass: 'color-danger', timeout: 5000});
			this.sendMyProjects(data);
		});		

		this.socket.on('leaveTeam', data => {
			this.flashMessage.show(data + ' left the team', {cssClass: 'color-danger', timeout: 5000});
			this.sendMyProjects(data);
		});		

	}

// Connections

	requestConnection(receiver) {
		this.socket.emit('requestConnection', receiver);
	}

	acceptRequest(sender) {
		this.socket.emit('acceptRequest', sender);
	}

	declineRequest(sender) {
		this.socket.emit('declineRequest', sender);
	}

	removeConnection(connection) {
		this.socket.emit('removeConnection', connection);
	}

    getConnections(): Observable<any> {
        return this.subject.asObservable();
    }

    private sendConnections(message) {
        this.subject.next(message);
        this.subject.next();
    }

// Team

	sendTeamInvite(receiver) {
		this.socket.emit('sendTeamInvite', receiver);
	}

	requestJoinTeam(receiver) {
		this.socket.emit('requestJoinTeam', receiver);
	}

	acceptTeamInvite(sender) {
		this.socket.emit('acceptTeamInvite', sender);
	}

	acceptJoinTeam(sender) {
		this.socket.emit('acceptJoinTeam', sender);
	}

	declineTeamInvite(sender) {
		this.socket.emit('declineTeamInvite', sender);
	}

	declineJoinTeam(sender) {
		this.socket.emit('declineJoinTeam', sender);
	}

	removeTeamMember(member) {
		this.socket.emit('removeTeamMember', member);
	}

	leaveTeam(member) {
		this.socket.emit('leaveTeam', member);
	}

    getMyProjects(): Observable<any> {
        return this.subject.asObservable();
    }

    private sendMyProjects(message) {
        this.subject.next(message);
        this.subject.next();
    }

// Login logout

    login(token) {
			this.socket.emit('login', token.slice(4));
    }

    logout() {
    	this.socket.emit('logout');
    }

}
