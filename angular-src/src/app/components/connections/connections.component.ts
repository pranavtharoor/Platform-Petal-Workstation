import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

	connections: Object;
  receiver: String;
  message: String;
  subscription: Subscription;

  constructor(private authService: AuthService, private socketioService: SocketioService) {

    this.subscription = this.socketioService.getConnections().subscribe(message => {
      this.message = message;
      console.log(this.message);
      this.getConnections();
    });

  }

  ngOnInit() {
    this.getConnections();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getConnections() {
  	this.authService.getConnections().subscribe(connections => {
  		this.connections = connections;
  	}, err => {
  		console.log(err);
  	});
  }

  sendRequest() {
    this.authService.reqestConnection(this.receiver).subscribe(connections => {
      this.socketioService.requestConnection(this.receiver);
      this.connections = connections;    
    }, err => {
      console.log(err);
    });
  }

  acceptRequest(sender) {
    this.authService.acceptRequest(sender).subscribe(connections => {
      this.socketioService.acceptRequest(sender);
      this.connections = connections;    
    }, err => {
      console.log(err);
    });
  }

  declineRequest(sender) {
    this.authService.declineRequest(sender).subscribe(connections => {
      this.socketioService.declineRequest(sender);
      this.connections = connections;    
    }, err => {
      console.log(err);
    });
  }

  removeConnection(connection) {
    this.authService.removeConnection(connection).subscribe(connections => {
      this.socketioService.removeConnection(connection);
      this.connections = connections;    
    }, err => {
      console.log(err);
    });
  }

}