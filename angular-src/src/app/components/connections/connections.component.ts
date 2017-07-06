import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import { Subscription } from 'rxjs/Subscription';

interface Address {
  street: String,
  city:  String,
  state: String,
  country: String,
  pinCode:  String
}

interface Profile {
  username: String;
  name: String;
  dob: String,
  gender:  String,
  address: Address
}

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  profile: Profile;
  profiles: Profile[];  
	connections: Object;
  message: String;
  subscription: Subscription;
  searchString: String;
  username: String;

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

  sendRequest(receiver) {
    this.authService.reqestConnection(receiver).subscribe(connections => {
      this.socketioService.requestConnection(receiver);
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

  onSearchSubmit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.username;
      this.authService.getProfilesAfterSearch(this.searchString).subscribe(profiles => {
        var pos = profiles.findIndex((element) => {
         return element.username == this.username;
        });
        if (pos >= 0)
          profiles.splice(pos, 1);
        this.profiles = profiles;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });

  }

  isConnected(username) {
    var flag = false;
    if(this.connections['connected']) {
      for(var i = 0; i < this.connections['connected'].length; i++) {
        if(this.connections['connected'][i].username == username)
          flag = true;
      }
    }
    if(this.connections['pending']['sent']) {
      for(var i = 0; i < this.connections['pending']['sent'].length; i++) {
        if(this.connections['pending']['sent'][i].username == username)
          flag = true;
      }
    }
    return flag;
  }

  isReceived(username) {
    var flag = false;
    if(this.connections['pending']['received']) {
      for(var i = 0; i < this.connections['pending']['received'].length; i++) {
        if(this.connections['pending']['received'][i].username == username)
          flag = true;
      }
    }
    return flag;
  }

  viewProfile(username) {
    this.profile = this.profiles.find((element) => {
         return element.username == username;
    });
  }

}