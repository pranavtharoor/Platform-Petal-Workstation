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

	}

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

    private sendConnections(message) {
        this.subject.next(message);
        this.subject.next();
    }

    getConnections(): Observable<any> {
        return this.subject.asObservable();
    }

    login(token) {
			this.socket.emit('login', token.slice(4));
    }

    logout() {
    	this.socket.emit('logout');
    }

}
