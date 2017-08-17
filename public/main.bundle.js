webpackJsonp([1,5],{

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService.prototype.checkPasswords = function (password, repassword) {
        if (password == repassword) {
            return true;
        }
        else {
            return false;
        }
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ValidateService);
    return ValidateService;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/validate.service.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.getJwt = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/getjwt', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateProfile = function (profile) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/updateprofile', profile, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.setLastLogin = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/users/setlogin', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token');
    };
    // Projects
    AuthService.prototype.addProject = function (newProject) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/addproject', newProject, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProjects = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/users/projects', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getUserProjects = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/users/userprojects', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProjectsAfterSearch = function (searchString) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/searchprojects', { searchString: searchString }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getMemberTeams = function (username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/getmemberteams', { username: username }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.sendTeamInvite = function (receiver, projectName) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/sendteaminvite', { receiver: receiver, projectName: projectName }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getTeams = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/users/getteams', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProject = function (projectName, creator) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/project', { creator: creator, projectName: projectName }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.acceptProjectInvite = function (projectName, creator) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/acceptprojectinvite', { creator: creator, projectName: projectName }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.declineProjectInvite = function (projectName, creator) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/declineprojectinvite', { creator: creator, projectName: projectName }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.removeMemberFromProject = function (projectName, member) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/removemember', { projectName: projectName, member: member }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.leaveProject = function (projectName, creator) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/leaveproject', { projectName: projectName, creator: creator }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.requestJoinProject = function (projectName, creator) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/requestjoinproject', { projectName: projectName, creator: creator }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.acceptRequestToJoinTeam = function (sender, projectName) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/acceptrequesttojointeam', { projectName: projectName, sender: sender }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.declineRequestToJoinTeam = function (sender, projectName) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/declinerequesttojointeam', { projectName: projectName, sender: sender }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Connections
    AuthService.prototype.getConnections = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.get('http://localhost:3000/users/connections', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.reqestConnection = function (receiver) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/requestconnection', { receiver: receiver }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.acceptRequest = function (sender) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/acceptrequest', { sender: sender }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.declineRequest = function (sender) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/declinerequest', { sender: sender }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.removeConnection = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/removeconnection', { user: user }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Profile
    AuthService.prototype.getUserProfile = function (username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/getuserprofile', { username: username }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfilesAfterSearch = function (searchString) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/searchprofiles', { searchString: searchString }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/auth.service.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectionsComponent = (function () {
    function ConnectionsComponent(authService, socketioService) {
        var _this = this;
        this.authService = authService;
        this.socketioService = socketioService;
        this.subscription = this.socketioService.getConnections().subscribe(function (message) {
            _this.message = message;
            // console.log(this.message);
            _this.getConnections();
        });
    }
    ConnectionsComponent.prototype.ngOnInit = function () {
        this.getConnections();
    };
    ConnectionsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ConnectionsComponent.prototype.getConnections = function () {
        var _this = this;
        this.authService.getConnections().subscribe(function (connections) {
            _this.connections = connections;
        }, function (err) {
            console.log(err);
        });
    };
    ConnectionsComponent.prototype.sendRequest = function (receiver) {
        var _this = this;
        this.authService.reqestConnection(receiver).subscribe(function (connections) {
            _this.socketioService.requestConnection(receiver);
            _this.connections = connections;
        }, function (err) {
            console.log(err);
        });
    };
    ConnectionsComponent.prototype.acceptRequest = function (sender) {
        var _this = this;
        this.authService.acceptRequest(sender).subscribe(function (connections) {
            _this.socketioService.acceptRequest(sender);
            _this.connections = connections;
        }, function (err) {
            console.log(err);
        });
    };
    ConnectionsComponent.prototype.declineRequest = function (sender) {
        var _this = this;
        this.authService.declineRequest(sender).subscribe(function (connections) {
            _this.socketioService.declineRequest(sender);
            _this.connections = connections;
        }, function (err) {
            console.log(err);
        });
    };
    ConnectionsComponent.prototype.removeConnection = function (connection) {
        var _this = this;
        this.authService.removeConnection(connection).subscribe(function (connections) {
            _this.socketioService.removeConnection(connection);
            _this.connections = connections;
        }, function (err) {
            console.log(err);
        });
    };
    ConnectionsComponent.prototype.onSearchSubmit = function () {
        var _this = this;
        if (this.searchString)
            this.authService.getProfile().subscribe(function (profile) {
                _this.username = profile.username;
                _this.authService.getProfilesAfterSearch(_this.searchString).subscribe(function (profiles) {
                    var pos = profiles.findIndex(function (element) {
                        return element.username == _this.username;
                    });
                    if (pos >= 0)
                        profiles.splice(pos, 1);
                    _this.profiles = profiles;
                }, function (err) {
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });
    };
    ConnectionsComponent.prototype.isConnected = function (username) {
        var flag = false;
        if (this.connections['connected']) {
            for (var i = 0; i < this.connections['connected'].length; i++) {
                if (this.connections['connected'][i].username == username)
                    flag = true;
            }
        }
        if (this.connections['pending']['sent']) {
            for (var i = 0; i < this.connections['pending']['sent'].length; i++) {
                if (this.connections['pending']['sent'][i].username == username)
                    flag = true;
            }
        }
        return flag;
    };
    ConnectionsComponent.prototype.isReceived = function (username) {
        var flag = false;
        if (this.connections['pending']['received']) {
            for (var i = 0; i < this.connections['pending']['received'].length; i++) {
                if (this.connections['pending']['received'][i].username == username)
                    flag = true;
            }
        }
        return flag;
    };
    ConnectionsComponent.prototype.viewProfile = function (username) {
        this.profile = this.profiles.find(function (element) {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 500);
            return element.username == username;
        });
    };
    ConnectionsComponent.prototype.getUserProfile = function (username) {
        var _this = this;
        this.authService.getUserProfile(username).subscribe(function (profile) {
            _this.profile = profile;
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 500);
        });
    };
    ConnectionsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-connections',
            template: __webpack_require__(740),
            styles: [__webpack_require__(728)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__["a" /* SocketioService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__["a" /* SocketioService */]) === 'function' && _b) || Object])
    ], ConnectionsComponent);
    return ConnectionsComponent;
    var _a, _b;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/connections.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditProfileComponent = (function () {
    function EditProfileComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    EditProfileComponent.prototype.ngOnInit = function () {
    };
    EditProfileComponent.prototype.onEditProfileSubmit = function () {
        var _this = this;
        var profile = {
            name: this.name,
            dob: this.dob,
            gender: this.gender,
            street: this.street,
            city: this.city,
            state: this.state,
            country: this.country,
            pinCode: this.pinCode
        };
        this.authService.updateProfile(profile).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('Profile updated', { cssClass: 'color-success', timeout: 3000 });
                _this.router.navigate(['/profile']);
            }
            else {
                _this.flashMessage.show('Unable to update profile', { cssClass: 'color-danger', timeout: 3000 });
            }
        });
    };
    EditProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-profile',
            template: __webpack_require__(741),
            styles: [__webpack_require__(729)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], EditProfileComponent);
    return EditProfileComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/edit-profile.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var JwtComponent = (function () {
    function JwtComponent(authService, router, flashMessage, socketioService) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.socketioService = socketioService;
    }
    JwtComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getJwt().subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                _this.socketioService.login(data.token);
                _this.flashMessage.show('Logged in', { cssClass: 'color-success', timeout: 5000 });
                if (data.user.lastlogin == 'never') {
                    _this.authService.setLastLogin().subscribe(function (success) {
                    }, function (err) {
                        console.log(err);
                    });
                    _this.router.navigate(['editprofile']);
                }
                else {
                    _this.authService.setLastLogin().subscribe(function (success) {
                    }, function (err) {
                        console.log(err);
                    });
                    _this.router.navigate(['dashboard']);
                }
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'color-danger', timeout: 5000 });
                _this.router.navigate(['login']);
            }
        });
    };
    JwtComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-jwt',
            template: __webpack_require__(742),
            styles: [__webpack_require__(730)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */]) === 'function' && _d) || Object])
    ], JwtComponent);
    return JwtComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/jwt.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessage, socketioService) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.socketioService = socketioService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                _this.socketioService.login(data.token);
                _this.flashMessage.show('Logged in', { cssClass: 'color-success', timeout: 1000 });
                if (data.user.lastlogin == 'never') {
                    _this.authService.setLastLogin().subscribe(function (success) {
                    }, function (err) {
                        console.log(err);
                    });
                    _this.router.navigate(['editprofile']);
                }
                else {
                    _this.authService.setLastLogin().subscribe(function (success) {
                    }, function (err) {
                        console.log(err);
                    });
                    _this.router.navigate(['workstation']);
                }
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'color-danger', timeout: 3000 });
                _this.router.navigate(['login']);
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(743),
            styles: [__webpack_require__(731)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/login.component.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyProjectsComponent = (function () {
    function MyProjectsComponent(authService, flashMessage, _fb, socketioService) {
        var _this = this;
        this.authService = authService;
        this.flashMessage = flashMessage;
        this._fb = _fb;
        this.socketioService = socketioService;
        this.subscription = this.socketioService.getConnections().subscribe(function (message) {
            _this.message = message;
            // console.log(this.message);
            _this.authService.getUserProjects().subscribe(function (projects) {
                _this.userProjects = projects;
            }, function (err) {
                console.log(err);
            });
            _this.authService.getTeams().subscribe(function (data) {
                _this.invites = data.invites;
                _this.teams = data.teams;
            }, function (err) {
                console.log(err);
            });
        });
    }
    MyProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUserProjects().subscribe(function (projects) {
            _this.userProjects = projects;
        }, function (err) {
            console.log(err);
        });
        this.authService.getTeams().subscribe(function (data) {
            _this.invites = data.invites;
            _this.teams = data.teams;
        }, function (err) {
            console.log(err);
        });
    };
    MyProjectsComponent.prototype.onUserSearch = function () {
        var _this = this;
        if (this.searchStringUser != '') {
            this.authService.getProfile().subscribe(function (profile) {
                _this.username = profile.username;
                _this.authService.getProfilesAfterSearch(_this.searchStringUser).subscribe(function (profiles) {
                    var pos = profiles.findIndex(function (element) {
                        return element.username == _this.username;
                    });
                    if (pos >= 0)
                        profiles.splice(pos, 1);
                    _this.profiles = profiles;
                }, function (err) {
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });
        }
    };
    MyProjectsComponent.prototype.viewProject = function (projectName, creator) {
        var _this = this;
        this.authService.getProject(projectName, creator).subscribe(function (project) {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 500);
            _this.project = project;
            _this.userIsCreator = true;
            _this.canLeave = false;
        });
    };
    MyProjectsComponent.prototype.sendTeamInvite = function (receiver, projectName) {
        var _this = this;
        this.authService.sendTeamInvite(receiver, projectName).subscribe(function (project) {
            _this.project = project;
            _this.socketioService.sendTeamInvite(receiver);
        });
    };
    MyProjectsComponent.prototype.acceptProjectInvite = function (projectName, creator) {
        var _this = this;
        this.authService.acceptProjectInvite(projectName, creator).subscribe(function (data) {
            _this.invites = data.invites;
            _this.teams = data.teams;
            _this.socketioService.acceptTeamInvite(creator);
            _this.authService.getTeams().subscribe(function (data) {
                _this.invites = data.invites;
                _this.teams = data.teams;
                _this.canLeave = true;
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyProjectsComponent.prototype.declineProjectInvite = function (projectName, creator) {
        var _this = this;
        this.authService.declineProjectInvite(projectName, creator).subscribe(function (data) {
            _this.invites = data.invites;
            _this.teams = data.teams;
            _this.socketioService.declineTeamInvite(creator);
            _this.authService.getTeams().subscribe(function (data) {
                _this.invites = data.invites;
                _this.teams = data.teams;
            }, function (err) {
                console.log(err);
            });
        });
    };
    MyProjectsComponent.prototype.getProject = function (projectName, creator) {
        var _this = this;
        this.authService.getProject(projectName, creator).subscribe(function (project) {
            _this.project = project;
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 500);
            _this.canLeave = true;
            _this.userIsCreator = false;
        });
    };
    MyProjectsComponent.prototype.getProjectFromInvite = function (projectName, creator) {
        var _this = this;
        this.authService.getProject(projectName, creator).subscribe(function (project) {
            _this.project = project;
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 500);
            _this.canLeave = false;
            _this.userIsCreator = false;
        });
    };
    MyProjectsComponent.prototype.removeMemberFromProject = function (projectName, member) {
        var _this = this;
        this.authService.removeMemberFromProject(projectName, member).subscribe(function (project) {
            _this.project = project;
            _this.socketioService.removeTeamMember(member);
        });
    };
    MyProjectsComponent.prototype.leaveProject = function (projectName, creator) {
        var _this = this;
        this.authService.leaveProject(projectName, creator).subscribe(function (data) {
            if (data.success) {
                delete _this.project;
                _this.socketioService.leaveTeam(creator);
            }
        });
        this.authService.getTeams().subscribe(function (data) {
            _this.invites = data.invites;
            _this.teams = data.teams;
        }, function (err) {
            console.log(err);
        });
    };
    MyProjectsComponent.prototype.isInTeamOrRequested = function (username) {
        var flag = false;
        for (var i = 0; i < this.project['team'].length; i++)
            if (this.project['team'][i].username == username)
                flag = true;
        for (var i = 0; i < this.project['pending'].length; i++)
            if (this.project['pending'][i].username == username)
                flag = true;
        for (var i = 0; i < this.project['requests'].length; i++)
            if (this.project['requests'][i].username == username)
                flag = true;
        return flag;
    };
    MyProjectsComponent.prototype.acceptRequestToJoinTeam = function (sender, projectName) {
        var _this = this;
        this.authService.acceptRequestToJoinTeam(sender, projectName).subscribe(function (project) {
            _this.project = project;
            _this.socketioService.acceptJoinTeam(sender);
        }, function (err) {
            console.log(err);
        });
    };
    MyProjectsComponent.prototype.declineRequestToJoinTeam = function (sender, projectName) {
        var _this = this;
        this.authService.declineRequestToJoinTeam(sender, projectName).subscribe(function (project) {
            _this.project = project;
            _this.socketioService.declineJoinTeam(sender);
        }, function (err) {
            console.log(err);
        });
    };
    MyProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-my-projects',
            template: __webpack_require__(744),
            styles: [__webpack_require__(732)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */]) === 'function' && _d) || Object])
    ], MyProjectsComponent);
    return MyProjectsComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/my-projects.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.profile = profile;
        }, function (err) {
            console.log(err);
        });
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(746),
            styles: [__webpack_require__(734)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/profile.component.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(207);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectsComponent = (function () {
    function ProjectsComponent(authService, flashMessage, _fb) {
        this.authService = authService;
        this.flashMessage = flashMessage;
        this._fb = _fb;
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getTeams().subscribe(function (data) {
            _this.teams = data.teams;
            _this.invites = data.invites;
            _this.sentTeamRequests = data.sentTeamRequests;
        }, function (err) {
            console.log(err);
        });
        this.authService.getProjects().subscribe(function (projects) {
            _this.projects = projects;
        }, function (err) {
            console.log(err);
        });
        this.projectForm = this._fb.group({
            projectName: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].maxLength(50)]],
            description: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].maxLength(300)]],
            private: Boolean,
            tags: this._fb.array([]),
            languages: this._fb.array([])
        });
    };
    ProjectsComponent.prototype.openAddProjectModal = function () {
        $('.ui.modal').modal('show');
    };
    ProjectsComponent.prototype.initTag = function () {
        return this._fb.group({
            tag: ['']
        });
    };
    ProjectsComponent.prototype.addTag = function () {
        var control = this.projectForm.controls['tags'];
        control.push(this.initTag());
    };
    ProjectsComponent.prototype.removeTag = function (i) {
        var control = this.projectForm.controls['tags'];
        control.removeAt(i);
    };
    ProjectsComponent.prototype.initLanguage = function () {
        return this._fb.group({
            language: ['']
        });
    };
    ProjectsComponent.prototype.addLanguage = function () {
        var control = this.projectForm.controls['languages'];
        control.push(this.initLanguage());
    };
    ProjectsComponent.prototype.removeLanguage = function (i) {
        var control = this.projectForm.controls['languages'];
        control.removeAt(i);
    };
    ProjectsComponent.prototype.save = function (newProject) {
        var _this = this;
        this.authService.addProject(newProject).subscribe(function (data) {
            if (data.success) {
                _this.projectForm.reset();
                _this.flashMessage.show(data.msg, { cssClass: 'color-success', timeout: 3000 });
                _this.authService.getProjects().subscribe(function (projects) {
                    _this.projects = projects;
                }, function (err) {
                    console.log(err);
                });
                _this.authService.getUserProjects().subscribe(function (projects) {
                    _this.userProjects = projects;
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'color-danger', timeout: 3000 });
            }
        });
    };
    ProjectsComponent.prototype.onSearchSubmit = function () {
        var _this = this;
        if (this.searchString == '') {
            this.authService.getProjects().subscribe(function (projects) {
                _this.projects = projects;
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.authService.getProjectsAfterSearch(this.searchString).subscribe(function (projects) {
                _this.projects = projects;
            }, function (err) {
                console.log(err);
            });
        }
    };
    ProjectsComponent.prototype.requestJoinProject = function (projectName, creator) {
        var _this = this;
        this.authService.requestJoinProject(projectName, creator).subscribe(function (data) {
            _this.authService.getTeams().subscribe(function (data) {
                _this.sentTeamRequests = data.sentTeamRequests;
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    };
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__(747),
            styles: [__webpack_require__(735)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */]) === 'function' && _c) || Object])
    ], ProjectsComponent);
    return ProjectsComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/projects.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            repassword: this.repassword
        };
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Fill all fields', { cssClass: 'color-danger', timeout: 3000 });
            return false;
        }
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Use valid email', { cssClass: 'color-danger', timeout: 3000 });
            return false;
        }
        if (!this.validateService.checkPasswords(user.password, user.repassword)) {
            this.flashMessage.show('Passwords are not same', { cssClass: 'color-danger', timeout: 3000 });
            return false;
        }
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('Registered. Login', { cssClass: 'color-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'color-danger', timeout: 3000 });
            }
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(748),
            styles: [__webpack_require__(736)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/register.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkstationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WorkstationComponent = (function () {
    function WorkstationComponent() {
    }
    WorkstationComponent.prototype.ngOnInit = function () {
    };
    WorkstationComponent.prototype.toggleSideBar = function () {
        $('.ui.labeled.icon.sidebar').sidebar('toggle');
    };
    WorkstationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-workstation',
            template: __webpack_require__(749),
            styles: [__webpack_require__(737)]
        }), 
        __metadata('design:paramtypes', [])
    ], WorkstationComponent);
    return WorkstationComponent;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/workstation.component.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 425:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 425;


/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(546);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/main.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(739),
            styles: [__webpack_require__(727)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/app.component.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_profile_profile_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_projects_projects_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_edit_profile_edit_profile_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_connections_connections_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_my_projects_my_projects_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_jwt_jwt_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_validate_service__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_socketio_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_workstation_workstation_component__ = __webpack_require__(354);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_projects_projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_connections_connections_component__["a" /* ConnectionsComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_my_projects_my_projects_component__["a" /* MyProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_jwt_jwt_component__["a" /* JwtComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_workstation_workstation_component__["a" /* WorkstationComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__app_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_18_angular2_flash_messages__["FlashMessagesModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_15__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_19__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_17__services_socketio_service__["a" /* SocketioService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/app.module.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_login_login_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_profile_profile_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_workstation_workstation_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_edit_profile_edit_profile_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_projects_projects_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_connections_connections_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_my_projects_my_projects_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_jwt_jwt_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__guards_auth_guard__ = __webpack_require__(355);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });











var appRoutes = [
    {
        path: 'register',
        component: __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__["a" /* RegisterComponent */]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_1__components_login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'workstation',
        component: __WEBPACK_IMPORTED_MODULE_4__components_workstation_workstation_component__["a" /* WorkstationComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'editprofile',
        component: __WEBPACK_IMPORTED_MODULE_5__components_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'projects',
        component: __WEBPACK_IMPORTED_MODULE_6__components_projects_projects_component__["a" /* ProjectsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'myprojects',
        component: __WEBPACK_IMPORTED_MODULE_8__components_my_projects_my_projects_component__["a" /* MyProjectsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'connections',
        component: __WEBPACK_IMPORTED_MODULE_7__components_connections_connections_component__["a" /* ConnectionsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'loggingin',
        component: __WEBPACK_IMPORTED_MODULE_9__components_jwt_jwt_component__["a" /* JwtComponent */],
    },
    {
        path: 'profile',
        component: __WEBPACK_IMPORTED_MODULE_3__components_profile_profile_component__["a" /* ProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/app.routing.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage, socketioService) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.socketioService = socketioService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.socketioService.logout();
        this.authService.logout();
        this.flashMessage.show('Logged Out', { cssClass: 'color-info', timeout: 1000 });
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(745),
            styles: [__webpack_require__(733)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__["a" /* SocketioService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__["a" /* SocketioService */]) === 'function' && _d) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/environment.js.map

/***/ }),

/***/ 727:
/***/ (function(module, exports) {

module.exports = "flash-messages {\n\tposition: fixed;\n\ttop: 120px;\n\tright: 0;\n}"

/***/ }),

/***/ 728:
/***/ (function(module, exports) {

module.exports = ".card-container {\n\tmargin: 10px 0;\n}\n\n.flex-container {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-ms-flex-wrap: wrap;\n\t    flex-wrap: wrap;\n}\n\n.button {\n\tmargin-left: 6px;\n}\n\n.half-container {\n\tpadding: 20px 8vw;\n\twidth: 50%;\n}\n\n.connections {\n\tmargin: 20px 0 20px 20px;\n}\n\n.connection-options {\n\tmargin-top: 10px;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: end;\n\t    -ms-flex-pack: end;\n\t        justify-content: flex-end;\n}\n\n@media screen and (max-width: 1110px) {\n\n\t.half-container {\n\t\tpadding: 20px 5vw;\n\t}\n\n}\n\n@media screen and (max-width: 780px) {\n\n\t.half-container {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t}\n\n\t.connections {\n\t\tmargin: 10px 0 10px 10px;\n\t}\n\n\t.connection-options {\n\t\tmargin-top: 0px;\n\t}\n\n}"

/***/ }),

/***/ 729:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 730:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 732:
/***/ (function(module, exports) {

module.exports = ".flex-container {\n \tdisplay: -webkit-box;\n \tdisplay: -ms-flexbox;\n \tdisplay: flex;\n \t-ms-flex-wrap: wrap;\n \t    flex-wrap: wrap;\n}\n\n.half-container {\n\twidth: 50%;\n\tpadding: 20px 8vw;\n}\n\n.project-options {\n\tmargin-top: 10px;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: end;\n\t    -ms-flex-pack: end;\n\t        justify-content: flex-end;\n}\n\n.card-container {\n\tmargin: 10px 0;\n}\n\n.label {\n\tmargin: 5px 7px 5px 0px;\n}\n\n.request-buttons {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: end;\n\t    -ms-flex-pack: end;\n\t        justify-content: flex-end;\n}\n\n.invite-box {\n\tmargin-top: 10px;\n}\n\n@media screen and (max-width: 1110px) {\n\n\t.half-container {\n\t\tpadding: 20px 5vw;\n\t}\n\n}\n\n@media screen and (max-width: 780px) {\n\n\t.half-container {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t}\n\t\n}"

/***/ }),

/***/ 733:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 734:
/***/ (function(module, exports) {

module.exports = "#edit-profile {\n\tposition: absolute;\n\tright: 30px;\n\ttop: 60px;\n}"

/***/ }),

/***/ 735:
/***/ (function(module, exports) {

module.exports = "#add-button {\n\tposition: absolute;\n\tright: 30px;\n\ttop: 60px;\n}\n\n.labels {\n\tmargin: 10px 0 15px;\n}\n\n.label {\n\tmargin: 5px 7px 5px 0px;\n}\n\n.project-by {\n\ttext-align: right;\n\tfloat: right;\n\tfont-size: 13px;\n}"

/***/ }),

/***/ 736:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 737:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 739:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div>\n\t<flash-messages></flash-messages>\n\t<router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ 740:
/***/ (function(module, exports) {

module.exports = "<br /><div class=\"ui large center aligned header\">Connections</div>\n\n<div class=\"flex-container\">\n\t<div class=\"half-container\">\n\t\t<div *ngIf=\"profile\">\n\t\t\t<div class=\"ui vertical segment\">\n\t\t\t\t<div class=\"ui huge header\">{{ profile?.name }}</div>\n\t\t\t\t<!-- <div>{{ profile?.username }}</div> -->\n\t\t\t\t<div class=\"ui sub large header\">DOB</div><div>{{ profile?.dob }}</div>\n\t\t\t\t<div class=\"ui sub large header\">Gender</div><div>{{ profile?.gender }}</div>\n\t\t\t\t<div class=\"ui sub large header\">Address</div>\n\t\t\t\t<div>\n\t\t\t\t\t<span>{{ profile?.address?.street }},</span>\n\t\t\t\t\t<span>{{ profile?.address?.city  }}</span><br />\n\t\t\t\t\t<span>{{ profile?.address?.state }},</span>\n\t\t\t\t\t<span>{{ profile?.address?.country }}</span><br />\n\t\t\t\t\t<span>{{ profile?.address?.pinCode  }}</span>\n\t\t\t\t</div>\n\t\t\t\t<br />\n\t\t\t</div>\n\t\t\t<br />\n\t\t</div>\n\t\t<div *ngIf=\"connections?.pending?.received.length > 0\">\n\t\t\t<div class=\"ui header\">Requests</div>\n\t\t\t<div class=\"connections ui segment\" *ngFor=\"let received of connections?.pending?.received\">{{received.username}}\n\t\t\t\t<div class=\"connection-options\">\n\t\t\t\t\t<button class=\"ui mini button\" (click)=\"getUserProfile(received.username)\">View Profile</button>\n\t\t\t\t\t<button class=\"ui mini positive button\" (click)=\"acceptRequest(received.username)\">Accept</button>\n\t\t\t\t\t<button class=\"ui mini negative button\" (click)=\"declineRequest(received.username)\">Decline</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<br />\n\t\t</div>\n\t\t<div *ngIf=\"connections?.pending?.sent.length > 0\">\n\t\t\t<div class=\"ui header\">Sent Requests</div>\n\t\t\t<div class=\"connections ui segment\" *ngFor=\"let sent of connections?.pending?.sent\">{{sent.username}}\n\t\t\t\t<div class=\"connection-options\">\n\t\t\t\t\t<button class=\"ui mini button\" (click)=\"getUserProfile(sent.username)\">View Profile</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<br />\n\t\t</div>\n\t\t<div *ngIf=\"connections?.connected.length > 0\">\n\t\t\t<div class=\"ui header\">Connected</div>\n\t\t\t<div class=\"connections ui segment\" *ngFor=\"let connected of connections?.connected\">{{connected.username}}\n\t\t\t\t<div class=\"connection-options\">\n\t\t\t\t\t<button class=\"ui mini button\" (click)=\"getUserProfile(connected.username)\">View Profile</button>\n\t\t\t\t\t<button class=\"ui mini negative button\" (click)=\"removeConnection(connected.username)\">Remove Connection</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<br />\n\t\t</div>\n\n\t</div>\n\t<div class=\"half-container\">\n\t\t<form (submit)=\"onSearchSubmit()\">\n\t\t    <div class=\"ui search\">\n\t\t        <div class=\"ui icon input fluid\">\n\t\t    \t\t<input type=\"text\" placeholder=\"Search Users...\" name=\"searchString\" autocomplete=\"off\" (keyup)=\"onSearchSubmit()\" [(ngModel)]=\"searchString\" />\n\t\t            <i class=\"search icon\"></i>\n\t\t        </div>\n\t\t    </div>\n\t\t</form>\n\t\t<div *ngFor=\"let profile of profiles\">\n\t\t\t<div class=\"card-container\">\n\t\t\t\t<div class=\"ui fluid card\">\n\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t<div class=\"header\">{{ profile.name }}</div>\n\t\t\t\t\t\t<div>Username: {{ profile.username }}</div>\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t<div class=\"extra content right floated\">\n\t\t\t\t\t\t\t<button class=\"ui tiny button\" (click)=\"viewProfile(profile.username)\">View Profile</button>\n\t\t\t\t\t\t\t<button class=\"ui tiny positive button\" *ngIf=\"!isConnected(profile.username) && !isReceived(profile.username)\" (click)=\"sendRequest(profile.username)\">Request Connection</button>\n\t\t\t\t\t\t\t<button class=\"ui tiny button\" *ngIf=\"isReceived(profile.username)\" (click)=\"acceptRequest(profile.username)\">Accept Request</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ 741:
/***/ (function(module, exports) {

module.exports = "<br /><br />\n<div class=\"ui text container\">\t\n\t<div class=\"ui huge center aligned header\">Edit Profile</div>\n\t<br /><br />\n\t<form class=\"ui form\" (submit)=\"onEditProfileSubmit()\">\n\n\t\t<div class=\"field\">\n\t\t\t<label>Name</label>\n\t\t\t<input placeholder=\"Name\" type=\"text\" name=\"email\" [(ngModel)]=\"name\" />\n\t\t</div>\n\t\t<div class=\"field\">\n\t\t\t<label>Date Of Birth</label>\n\t\t\t<input type=\"date\" name=\"dob\" [(ngModel)]=\"dob\" />\n\t\t</div>\n\n<!-- \t\t<div class=\"inline fields\">\n\t\t    <label for=\"fruit\">Gender</label>\n\t\t    <div class=\"field\">\n\t\t      \t<div class=\"ui radio checkbox\">\n\t\t       \t\t<input type=\"radio\" name=\"fruit\" checked=\"\" tabindex=\"0\" class=\"hidden\" />\n\t\t        \t<label>Male</label>\n\t\t      \t</div>\n\t\t    </div>\n\t\t    <div class=\"field\">\n\t\t      \t<div class=\"ui radio checkbox\">\n\t\t        \t<input type=\"radio\" name=\"fruit\" tabindex=\"0\" class=\"hidden\" />\n\t\t  \t\t    <label>Female</label>\n\t\t        </div>\n\t\t    </div>\n\t\t</div> -->\n\t\t<div class=\"field\">\n\t\t\t<label>Gender</label>\n\t\t\t<input type=\"text\" name=\"gender\" [(ngModel)]=\"gender\" />\n\t\t</div>\n\n\t\t<div class=\"field\">\n\t\t    <label>Address</label>\n\t\t    <div class=\"two fields\">\n\t\t    \t<div class=\"field\">\n\t\t        \t<input placeholder=\"Street\" type=\"text\" name=\"street\" [(ngModel)]=\"street\" />\n\t\t    \t</div>\n\t\t    \t<div class=\"field\">\n\t\t        \t<input placeholder=\"City\" type=\"text\" name=\"city\" [(ngModel)]=\"city\" />\n\t\t        </div>\n\t\t    </div>\n\t\t    <div class=\"three fields\">\n\t\t    \t<div class=\"field\">\n\t\t        \t<input placeholder=\"State\" type=\"text\" name=\"state\" [(ngModel)]=\"state\" />\n\t\t    \t</div>\n\t\t    \t<div class=\"field\">\n\t\t        \t<input placeholder=\"Country\" type=\"text\" name=\"country\" [(ngModel)]=\"country\" />\n\t\t        </div>\n\t\t        <div>\n\t\t        \t<input placeholder=\"Pin Code\" type=\"text\" name=\"pinCode\" [(ngModel)]=\"pinCode\" />\n\t\t        </div>\n\t\t    </div>\n\t\t</div>\n\n\t\t<input class=\"ui button\" type=\"submit\" />\n\t</form>\n</div>\n<br />\n<br />\n<br />\n<br />\n<br />"

/***/ }),

/***/ 742:
/***/ (function(module, exports) {

module.exports = "<p>\n  Logging you in...\n</p>\n"

/***/ }),

/***/ 743:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui text container\">\n\t<br />\n\t<div class=\"ui center aligned large header\"> Login to Platform Petal</div>\n\t<form (submit)=\"onLoginSubmit()\" class=\"ui form \">\n\t\t<div class=\"field\">\n\t\t\t<label>Username</label>\n          \t<div class=\"ui left icon input\">\n            \t<i class=\"user icon\"></i>\n\t\t\t\t<input placeholder=\"Username\" type=\"text\" name=\"username\" [(ngModel)]=\"username\" />\n\t\t\t</div>\n\t\t</div>\n\t\t<br />\n\t\t<div class=\"field\">\n\t\t\t<label>Password</label>\n          \t<div class=\"ui left icon input\">\n            \t<i class=\"lock icon\"></i>\n\t\t\t\t<input placeholder=\"Password\" type=\"password\" name=\"password\" [(ngModel)]=\"password\" />\n\t\t\t</div>\n\t\t</div>\n\t\t<br />\n\t\t<input class=\"ui large button\" type=\"submit\" value=\"Login\" />\n\t\t</form>\n\t<br /><br />\n\t<div class=\"ui stackable two column grid\">\n\t\t<div class=\"ui row header\">Login with</div>\n\t\t<div class=\"four column wide\">\n\t\t\t<a class=\"ui button blue fluid\" href=\"/auth/facebook\">Facebook</a>\n\t\t</div>\n\t\t<div class=\"four column wide\">\n\t\t\t<a class=\"ui button red fluid\" href=\"/auth/google\">G+</a>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ 744:
/***/ (function(module, exports) {

module.exports = "<br />\n<div class=\"flex-container\">\n    <div class=\"half-container\" *ngIf=\"project\">\n        <div class=\"ui large header\">{{ project.projectName }}</div>\n        <div *ngIf=\"project.private\">Private</div>\n        <div class=\"ui sub header\">Description</div>\n        <div>{{ project.description }}</div>\n        <div class=\"ui sub header\">Project by</div>\n        <div>{{ project.name }}</div>\n        <div *ngIf=\"project?.pending?.length > 0\" class=\"ui sub header\">Pending invites</div>\n        <div>\n            <span class=\"ui label\" *ngFor=\"let member of project.pending\">{{ member.username }} </span>\n        </div>\n        <div *ngIf=\"project?.team?.length > 0\" class=\"ui sub header\">Team</div>\n        <div>\n            <span *ngFor=\"let member of project.team\">{{ member.username }} \n            <button class=\"ui mini negative button\" *ngIf=\"userIsCreator\" (click)=\"removeMemberFromProject(project.projectName, member.username)\">Remove</button>\n            </span>\n        </div>\n        <div *ngIf=\"project?.languages?.length > 0\" class=\"ui sub header\">Languages</div> \n        <div>\n            <span class=\"ui label\" *ngFor=\"let language of project.languages\">{{ language }} </span>\n        </div>\n        <div *ngIf=\"project?.tags?.length > 0\" class=\"ui sub header\">Tags</div>\n        <div>\n            <span class=\"ui tag label\" *ngFor=\"let tag of project.tags\">{{ tag }} </span>\n        </div>\n        <br />\n        <button class=\"ui mini negative button\" *ngIf=\"canLeave\" (click)=\"leaveProject(project.projectName, project.username)\">Leave</button>\n    </div>\n    <div class=\"half-container\" *ngIf=\"project && userIsCreator\">\n        <div *ngIf=\"userIsCreator\">\n            <div *ngIf=\"project?.requests?.length > 0\" class=\"ui sub header\">Requests</div>\n            <br />\n            <div class=\"ui segment\" *ngFor=\"let request of project.requests\">\n            {{ request.username }} \n                <div class=\"request-buttons\">\n                    <button class=\"ui mini positive button\" (click)=\"acceptRequestToJoinTeam(request.username, project.projectName)\">Accept</button>\n                    <button class=\"ui mini negative button\" (click)=\"declineRequestToJoinTeam(request.username, project.projectName)\">Decline</button>\n                </div>\n            </div>\n            <div class=\"ui sub header\">Add team member</div>\n            <div class=\"ui small fluid input\">\n                <input type=\"text\" placeholder=\"Search Users...\" name=\"searchStringUser\" (keyup)=\"onUserSearch()\" [(ngModel)]=\"searchStringUser\" />\n            </div>\n            <div *ngFor=\"let profile of profiles\">\n                <div class=\"invite-box\">\n                    <div class=\"ui segment\" *ngIf=\"!isInTeamOrRequested(profile.username)\">\n                            <div>{{ profile.name }}</div>\n                            <!-- <div>Username: {{ profile.username }}</div> -->\n                            <div class=\"request-buttons\">\n                                <button class=\"ui mini positive button\" (click)=\"sendTeamInvite(profile.username, project.projectName)\">Invite</button>\n                            </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"half-container\" *ngIf=\"invites?.length > 0\">\n        <div class=\"ui header\">Invitations</div>\n        <div class=\"ui fluid card\" *ngFor=\"let invite of invites\">\n            <div class=\"content\">\n                <div class=\"ui header\">{{ invite.projectName }}</div>\n                Project by\n                <strong>{{ invite.creator }}</strong>\n                <div class=\"extra content right floated\">\n                    <button class=\"ui mini button\" (click)=\"getProjectFromInvite(invite.projectName, invite.creator)\">View</button>\n                    <button class=\"ui mini positive button\" (click)=\"acceptProjectInvite(invite.projectName, invite.creator)\">Accept</button>\n                    <button class=\"ui mini negative button\" (click)=\"declineProjectInvite(invite.projectName, invite.creator)\">Decline</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"flex-container\">\n    <div class=\"half-container\">\n        <div *ngIf=\"userProjects?.length > 0\">\n            <div class=\"ui header\">My Projects</div>\n            <div *ngFor=\"let project of userProjects\">\n                <div class=\"card-container\">\n                    <div class=\"ui fluid card\">\n                        <div class=\"content\">\n                            <div class=\"ui header\">{{ project.projectName }}</div>\n                            <div>{{ project.description }}</div>\n                            <div class=\"project-options\">\n                                <button class=\"ui button\" (click)=\"viewProject(project.projectName, project.username)\">View</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"half-container\">\n        <div *ngIf=\"teams?.length > 0\">\n            <div class=\"ui header\">Projects I contribute to</div>\n            <div *ngFor=\"let team of teams\">\n                <div class=\"card-container\">\n                    <div class=\"ui fluid card\">\n                        <div class=\"content\">\n                            <div class=\"ui header\">{{ team.projectName }}</div>\n                            <div>Project by {{ team.creator }}</div>\n                            <div class=\"project-options\">\n                                <button class=\"ui button\" (click)=\"getProject(team.projectName, team.creator)\">View</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 745:
/***/ (function(module, exports) {

module.exports = "<nav class=\"ui secondary pointing menu\">\n\t<div class=\"icon\"></div>\n\t<a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/login']\" *ngIf=\"!authService.loggedIn()\">Login</a>\n\t<a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/register']\" *ngIf=\"!authService.loggedIn()\">Register</a>\n\t<a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/workstation']\" *ngIf=\"authService.loggedIn()\">Workstation</a>\n\t<a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/profile']\" *ngIf=\"authService.loggedIn()\">Profile</a>\n\t<a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/projects']\" *ngIf=\"authService.loggedIn()\">Projects</a>\n\t<a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/myprojects']\" *ngIf=\"authService.loggedIn()\">My Projects</a>\n\t<a class=\"item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/connections']\" *ngIf=\"authService.loggedIn()\">Connections</a>\n\t<div class=\"right menu\">\n\t\t<a class=\"item\" (click)=\"onLogoutClick()\" href=\"#\" *ngIf=\"authService.loggedIn()\">Logout</a>\n\t</div>\n</nav>\n"

/***/ }),

/***/ 746:
/***/ (function(module, exports) {

module.exports = "<br />\n<div class=\"ui text container\">\n\t<div *ngIf=\"profile\">\n\t\n\t\t<a class=\"ui button\" id=\"edit-profile\" href=\"/editprofile\">Edit</a>\n\t\t\n\t\t<div class=\"ui huge header\" *ngIf=\"profile.name\">{{ profile.name }}</div>\n\t\t<div class=\"ui sub header\" *ngIf=\"profile.dob\">DOB</div>\n\t\t<div>{{ profile.dob }}</div>\n\t\t<div class=\"ui sub header\" *ngIf=\"profile.gender\">Gender</div>\n\t\t<div>{{ profile.gender }}</div>\n\t\t<div class=\"ui sub header\">Address</div>\n\t\t<div *ngIf=\"profile.address\">\n\t\t\t<span *ngIf=\"profile.address.street\">{{ profile.address.street }},</span>\n\t\t\t<span *ngIf=\"profile.address.city\">{{ profile.address.city }}</span><br />\n\t\t\t<span *ngIf=\"profile.address.state\">{{ profile.address.state }},</span>\n\t\t\t<span *ngIf=\"profile.address.country\">{{ profile.address.country }}</span><br />\n\t\t\t<span *ngIf=\"profile.address.pinCode\">{{ profile.address.pinCode }}</span>\n\t\t</div>\n\t\n\t</div>\n</div>"

/***/ }),

/***/ 747:
/***/ (function(module, exports) {

module.exports = "<br /><br />\n<form class=\"ui modal\" [formGroup]=\"projectForm\" (ngSubmit)=\"save(projectForm._value)\">\n   <div class=\"scrolling content\">\n        <div class=\"ui center aligned large header\">Add Project</div>\n        <div class=\"ui form text container\">\n            <div class=\"field\">\n                <label>Project Name</label>\n                <input placeholder=\"Project Name\" type=\"text\" formControlName=\"projectName\">\n                <small *ngIf=\"!projectForm.controls.projectName.valid\">\n                    Project name is required (maximum 50 characters).\n                </small>\n            </div>\n\n            <div class=\"field\">\n                <label>Description</label>\n                <textarea rows=5 placeholder=\"Description\" type=\"text\" formControlName=\"description\"></textarea>\n                <small *ngIf=\"!projectForm.controls.description.valid\">\n                    Description is required (maximum 300 characters).\n                </small>\n            </div>\n\n            <div class=\"field\">\n                <label>Private&nbsp;&nbsp;&nbsp;\n                <input class=\"ui toggle checkbox\" type=\"checkbox\" name=\"private\" formControlName=\"private\"></label>\n            </div>\n\n            <div class=\"ui stackable two column grid\">\n                <div class=\"four column wide\">\n                    <div class=\"field\" formArrayName=\"tags\">\n                        <label>Tags</label>\n                        <div *ngFor=\"let tag of projectForm.controls.tags.controls; let i=index\">\n                            <div class=\"ui mini input\" [formGroupName]=\"i\">\n                                <span *ngIf=\"projectForm.controls.tags.controls.length > 0\" \n                                    (click)=\"removeTag(i)\"><i class=\"large close icon\"></i>\n                                </span>\n                                <input type=\"text\" formControlName=\"tag\">\n                            </div>\n                        </div>\n                        <a *ngIf=\"projectForm.controls.tags.controls.length < 5\" (click)=\"addTag()\"><i class=\"plus icon\"></i></a>\n                    </div>\n                </div>\n                <div class=\"four column wide\">\n                    <div class=\"field\" formArrayName=\"languages\">\n                        <label>Languages</label>\n                        <div *ngFor=\"let language of projectForm.controls.languages.controls; let i=index\">\n                            <div class=\"ui mini input\" [formGroupName]=\"i\">\n                                <span *ngIf=\"projectForm.controls.languages.controls.length > 0\" \n                                    (click)=\"removeLanguage(i)\"><i class=\"large close icon\"></i>\n                                </span>\n                                 <input type=\"text\" formControlName=\"language\">\n                            </div>\n                        </div>\n                        <a (click)=\"addLanguage()\"><i class=\"plus icon\"></i></a>\n                    </div>\n                </div>\n\n            </div>\n            <br /><br />\n        </div>\n    </div>\n    <div class=\"actions\">\n        <div class=\"ui black deny button\" (click)=\"this.projectForm.reset()\">\n            Discard\n        </div>\n        <button class=\"ui positive right labeled icon button\" type=\"submit\" [disabled]=\"!projectForm.valid\">Submit\n        <i class=\"checkmark icon\"></i>\n        </button>\n    </div>\n</form>\n\n<button id=\"add-button\" class=\"ui button\" (click)=\"openAddProjectModal()\">Add Project</button>\n\n<div class=\"ui text container\">\n    <div class=\"ui large center aligned header\">Projects</div>\n    <div class=\"ui search\">\n        <div class=\"ui icon input fluid\">\n            <input placeholder=\"Search...\" autocomplete=\"off\" class=\"prompt\" type=\"text\" name=\"searchString\" (keyup)=\"onSearchSubmit()\" [(ngModel)]=\"searchString\" />\n            <i class=\"search icon\"></i>\n        </div>\n    </div>\n    <br />\n\n    <div class=\"ui card fluid\" *ngFor=\"let project of projects\">\n      <div class=\"content\">\n        <div class=\"header\">\n            {{ project.projectName }}\n            <span class=\"project-by\">Project by {{ project.name }}</span> \n        </div>\n      </div>\n      <div class=\"content\">\n        <div class=\"ui sub header\">\n        Description\n        </div>\n        <div class=\"ui small feed\">\n            {{ project.description }}\n        </div>\n        <div class=\"ui sub header\">Languages</div>\n        <div class=\"labels\">\n            <span class=\"ui label\" *ngFor=\"let language of project.languages\">{{ language }}</span>\n        </div>\n        <div class=\"ui sub header\">Tags</div>\n        <div class=\"labels\"><span class=\"ui tag label\" *ngFor=\"let tag of project.tags\">{{ tag }} </span>\n        </div>\n      </div>\n      <div class=\"extra right aligned content\">\n        <button (click)=\"requestJoinProject(project.projectName, project.name)\" class=\"ui button\">Join Project</button>\n      </div>\n    </div>\n\n    <br /><br /><br />\n</div>\n"

/***/ }),

/***/ 748:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui text container\">\n\t<br />\n\t<div class=\"ui center aligned large header\"> Sign up</div>\n\t<form (submit)=\"onRegisterSubmit()\" class=\"ui form\">\n\t\t<div class=\"field\">\n\t\t\t<label>Name</label>\n\t\t\t<input [(ngModel)]=\"name\" placeholder=\"Name\" name=\"name\" type=\"text\" /><br />\n\t\t</div>\n\t\t<div class=\"field\">\n\t\t\t<label>Username</label>\n\t\t\t<input [(ngModel)]=\"username\" name=\"username\" type=\"text\" placeholder=\"Username\" />\n\t\t</div>\n\t\t<div class=\"field\">\n\t\t\t<label>Email</label>\n\t\t\t<input [(ngModel)]=\"email\" name=\"email\" type=\"text\" placeholder=\"Email\" />\n\t\t</div>\n\t\t<div class=\"field\">\n\t\t\t<label>Password</label>\n\t\t\t<input [(ngModel)]=\"password\" name=\"password\" type=\"password\" placeholder=\"Password\" />\n\t\t</div>\n\t\t<div class=\"field\">\n\t\t\t<label>Confirm Password</label>\n\t\t\t<input [(ngModel)]=\"repassword\" type=\"password\" name=\"repassword\" placeholder=\"Confirm Password\" />\n\t\t</div>\n\t\t<input class=\"ui large button\" type=\"submit\" value=\"Register\"/>\n\t</form>\n</div>"

/***/ }),

/***/ 749:
/***/ (function(module, exports) {

module.exports = "<div class=\"ui bottom demo inverted sidebar labeled icon menu\">\n      <a class=\"item\">\n        <i class=\"comment icon\"></i>\n        Chat\n      </a>\n      <a class=\"item\">\n        <i class=\"mail icon\"></i>\n        Mail\n      </a>\n      <a class=\"item\">\n        <i class=\"code icon\"></i>\n        Code\n      </a>\n      <a class=\"item\">\n        <i class=\"paint brush icon\"></i>\n        Design\n      </a>\n      <a class=\"item\">\n        <i class=\"file icon\"></i>\n        Documents\n      </a>\n      <a class=\"item\">\n        <i class=\"users icon\"></i>\n        Team\n      </a>\n      <a class=\"item\">\n        <i class=\"selected radio icon\"></i>\n        Video Call\n      </a>\n      <a class=\"item\">\n        <i class=\"align left icon\"></i>\n        Progress\n      </a>\n</div>\n<div class=\"ui text center aligned container\">\n\t<br />\n\t<br />\n\t<br />\n\t<br />\n\t<br />\n\t<br />\n\t<br />\n\t<br />\n\t<br />\n\t<br />\n\t<div class=\"ui huge text header\">Workstation</div>\n\t<button (click)=\"toggleSideBar()\" class=\"ui button\">Menu</button>\n</div>"

/***/ }),

/***/ 782:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(426);


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketioService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SocketioService = (function () {
    function SocketioService(flashMessage) {
        var _this = this;
        this.flashMessage = flashMessage;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__["connect"]('http://localhost:4000');
        this.socket.on('connect', function (socket) {
            var token = localStorage.getItem('id_token');
            if (token) {
                _this.socket.emit('login', token.slice(4));
            }
        });
        this.socket.on('connectionRequested', function (data) {
            _this.flashMessage.show(data + ' sent a connection request', { cssClass: 'color-success', timeout: 5000 });
            _this.sendConnections(data);
        });
        this.socket.on('requestAccepted', function (data) {
            _this.flashMessage.show(data + ' accepted your connection request', { cssClass: 'color-success', timeout: 5000 });
            _this.sendConnections(data);
        });
        this.socket.on('requestDeclined', function (data) {
            _this.sendConnections(data);
        });
        this.socket.on('connectionRemoved', function (data) {
            _this.sendConnections(data);
        });
        this.socket.on('sendTeamInvite', function (data) {
            _this.flashMessage.show(data + ' invited you to a team', { cssClass: 'color-success', timeout: 5000 });
            _this.sendMyProjects(data);
        });
        this.socket.on('requestJoinTeam', function (data) {
            _this.flashMessage.show(data + ' wants to join your team', { cssClass: 'color-success', timeout: 5000 });
            _this.sendMyProjects(data);
        });
        this.socket.on('acceptTeamInvite', function (data) {
            _this.flashMessage.show(data + ' accepted you to the team', { cssClass: 'color-success', timeout: 5000 });
            _this.sendMyProjects(data);
        });
        this.socket.on('acceptJoinTeam', function (data) {
            _this.flashMessage.show(data + ' joined the team', { cssClass: 'color-success', timeout: 5000 });
            _this.sendMyProjects(data);
        });
        this.socket.on('declineTeamInvite', function (data) {
            _this.flashMessage.show(data + ' declined your team invite', { cssClass: 'color-danger', timeout: 5000 });
            _this.sendMyProjects(data);
        });
        this.socket.on('declineJoinTeam', function (data) {
            _this.flashMessage.show(data + ' declined your request to join the team', { cssClass: 'color-danger', timeout: 5000 });
            _this.sendMyProjects(data);
        });
        this.socket.on('removeTeamMember', function (data) {
            _this.flashMessage.show(data + ' removed you form the team', { cssClass: 'color-danger', timeout: 5000 });
            _this.sendMyProjects(data);
        });
        this.socket.on('leaveTeam', function (data) {
            _this.flashMessage.show(data + ' left the team', { cssClass: 'color-danger', timeout: 5000 });
            _this.sendMyProjects(data);
        });
    }
    // Connections
    SocketioService.prototype.requestConnection = function (receiver) {
        this.socket.emit('requestConnection', receiver);
    };
    SocketioService.prototype.acceptRequest = function (sender) {
        this.socket.emit('acceptRequest', sender);
    };
    SocketioService.prototype.declineRequest = function (sender) {
        this.socket.emit('declineRequest', sender);
    };
    SocketioService.prototype.removeConnection = function (connection) {
        this.socket.emit('removeConnection', connection);
    };
    SocketioService.prototype.getConnections = function () {
        return this.subject.asObservable();
    };
    SocketioService.prototype.sendConnections = function (message) {
        this.subject.next(message);
        this.subject.next();
    };
    // Team
    SocketioService.prototype.sendTeamInvite = function (receiver) {
        this.socket.emit('sendTeamInvite', receiver);
    };
    SocketioService.prototype.requestJoinTeam = function (receiver) {
        this.socket.emit('requestJoinTeam', receiver);
    };
    SocketioService.prototype.acceptTeamInvite = function (sender) {
        this.socket.emit('acceptTeamInvite', sender);
    };
    SocketioService.prototype.acceptJoinTeam = function (sender) {
        this.socket.emit('acceptJoinTeam', sender);
    };
    SocketioService.prototype.declineTeamInvite = function (sender) {
        this.socket.emit('declineTeamInvite', sender);
    };
    SocketioService.prototype.declineJoinTeam = function (sender) {
        this.socket.emit('declineJoinTeam', sender);
    };
    SocketioService.prototype.removeTeamMember = function (member) {
        this.socket.emit('removeTeamMember', member);
    };
    SocketioService.prototype.leaveTeam = function (member) {
        this.socket.emit('leaveTeam', member);
    };
    SocketioService.prototype.getMyProjects = function () {
        return this.subject.asObservable();
    };
    SocketioService.prototype.sendMyProjects = function (message) {
        this.subject.next(message);
        this.subject.next();
    };
    // Login logout
    SocketioService.prototype.login = function (token) {
        this.socket.emit('login', token.slice(4));
    };
    SocketioService.prototype.logout = function () {
        this.socket.emit('logout');
    };
    SocketioService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _a) || Object])
    ], SocketioService);
    return SocketioService;
    var _a;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/socketio.service.js.map

/***/ })

},[783]);
//# sourceMappingURL=main.bundle.map