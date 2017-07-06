webpackJsonp([1,4],{

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(69);
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
    }
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
    SocketioService.prototype.sendConnections = function (message) {
        this.subject.next(message);
        this.subject.next();
    };
    SocketioService.prototype.getConnections = function () {
        return this.subject.asObservable();
    };
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

/***/ }),

/***/ 228:
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

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__ = __webpack_require__(157);
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
            console.log(_this.message);
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
            return element.username == username;
        });
    };
    ConnectionsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-connections',
            template: __webpack_require__(728),
            styles: [__webpack_require__(718)]
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(729),
            styles: [__webpack_require__(719)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(67);
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
            template: __webpack_require__(730),
            styles: [__webpack_require__(720)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], EditProfileComponent);
    return EditProfileComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/edit-profile.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(731),
            styles: [__webpack_require__(721)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/home.component.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__ = __webpack_require__(157);
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
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(732),
            styles: [__webpack_require__(722)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_socketio_service__["a" /* SocketioService */]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/login.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(67);
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
            template: __webpack_require__(734),
            styles: [__webpack_require__(724)]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(317);
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
        this.authService.getProjects().subscribe(function (projects) {
            _this.projects = projects;
        }, function (err) {
            console.log(err);
        });
        this.projectForm = this._fb.group({
            projectName: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].maxLength(50)]],
            description: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].maxLength(300)]],
            private: Boolean,
            tags: this._fb.array([
                this.initTag(),
            ]),
            languages: this._fb.array([
                this.initLanguage(),
            ])
        });
    };
    ProjectsComponent.prototype.initTag = function () {
        return this._fb.group({
            tag: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required]
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
            language: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required]
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
                _this.flashMessage.show(data.msg, { cssClass: 'color-success', timeout: 3000 });
                _this.authService.getProjects().subscribe(function (projects) {
                    _this.projects = projects;
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
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-projects',
            template: __webpack_require__(735),
            styles: [__webpack_require__(725)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */]) === 'function' && _c) || Object])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(67);
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
            template: __webpack_require__(736),
            styles: [__webpack_require__(726)]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(42);
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

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(547);
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
    AuthService.prototype.getProjectsAfterSearch = function (searchString) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:3000/users/searchprojects', { searchString: searchString }, { headers: headers })
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

/***/ 420:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 420;


/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(538);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/main.js.map

/***/ }),

/***/ 537:
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
            template: __webpack_require__(727),
            styles: [__webpack_require__(717)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/app.component.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_profile_profile_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_projects_projects_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_validate_service__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_socketio_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_edit_profile_edit_profile_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_connections_connections_component__ = __webpack_require__(346);
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
                __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_projects_projects_component__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_connections_connections_component__["a" /* ConnectionsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__app_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__["FlashMessagesModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_13__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_15__services_socketio_service__["a" /* SocketioService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/app.module.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_login_login_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_home_home_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_profile_profile_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_dashboard_dashboard_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_edit_profile_edit_profile_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_projects_projects_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_connections_connections_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__ = __webpack_require__(354);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });










var appRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_3__components_home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'register',
        component: __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__["a" /* RegisterComponent */]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_1__components_login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_5__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'editprofile',
        component: __WEBPACK_IMPORTED_MODULE_6__components_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'projects',
        component: __WEBPACK_IMPORTED_MODULE_7__components_projects_projects_component__["a" /* ProjectsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'connections',
        component: __WEBPACK_IMPORTED_MODULE_8__components_connections_connections_component__["a" /* ConnectionsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'profile',
        component: __WEBPACK_IMPORTED_MODULE_4__components_profile_profile_component__["a" /* ProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__["a" /* AuthGuard */]]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/app.routing.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__(69);
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
        this.flashMessage.show('Logged Out', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(733),
            styles: [__webpack_require__(723)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__["a" /* SocketioService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_socketio_service__["a" /* SocketioService */]) === 'function' && _d) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/media/pranav/5474469E7446832A/Coding/Platform Petal/GIT/PP-MEAN-Login-Register/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 541:
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

/***/ 717:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 718:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 719:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 720:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 721:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 722:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 723:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 724:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 725:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 726:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 727:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<hr />\n<div>\n\t<flash-messages></flash-messages>\n\t<router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ 728:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"profile\">\n\tProfile: \n<div>{{ profile?.username }}</div>\n<div>{{ profile?.name }}</div>\n<div>{{ profile?.dob }}</div>\n<div>{{ profile?.gender }}</div>\n<div>{{ profile?.address?.street }}</div>\n<div>{{ profile?.address?.city  }}</div>\n<div>{{ profile?.address?.state }}</div>\n<div>{{ profile?.address?.country }}</div>\n<div>{{ profile?.address?.pinCode  }}</div>\n</div>\n\nConnected:\n<div *ngFor=\"let connected of connections?.connected\">{{connected.username}}<button (click)=\"removeConnection(connected.username)\">Remove Connection</button></div>\n<br />\nRequests:\n<div *ngFor=\"let received of connections?.pending?.received\">{{received.username}}<button (click)=\"acceptRequest(received.username)\">Accept</button><button (click)=\"declineRequest(received.username)\">Decline</button></div>\n<br />\nSent requests:\n<div *ngFor=\"let sent of connections?.pending?.sent\">{{sent.username}}</div>\n<br /><br />\n<form (submit)=\"onSearchSubmit()\">\n    Search: <input type=\"text\" name=\"searchString\" (keyup)=\"onSearchSubmit()\" [(ngModel)]=\"searchString\" />\n</form>\n<br /><br />\nUsers:\n<br /><br />\n<div *ngFor=\"let profile of profiles\">\n\t<div>Username: {{ profile.username }}</div>\n\t<div>Name: {{ profile.name }}</div>\n\t<div>\n\t\t<button (click)=\"viewProfile(profile.username)\">View Profile</button>\n\t\t<button *ngIf=\"!isConnected(profile.username) && !isReceived(profile.username)\" (click)=\"sendRequest(profile.username)\">Request Connection</button>\n\t\t<button *ngIf=\"isReceived(profile.username)\" (click)=\"acceptRequest(profile.username)\">Accept Request</button>\n\t</div>\n\t<br />\n</div>\n"

/***/ }),

/***/ 729:
/***/ (function(module, exports) {

module.exports = "<p>\n  dashboard works!\n</p>\n"

/***/ }),

/***/ 730:
/***/ (function(module, exports) {

module.exports = "Edit Profile<br />\n<form (submit)=\"onEditProfileSubmit()\">\n\tName: <input type=\"text\" name=\"email\" [(ngModel)]=\"name\" /><br />\n\tDOB: <input type=\"text\" name=\"dob\" [(ngModel)]=\"dob\" /><br />\n\tGender: <input type=\"text\" name=\"gender\" [(ngModel)]=\"gender\" /><br />\n\tAddress: <br />\n\tStreet: <input type=\"text\" name=\"street\" [(ngModel)]=\"street\" /><br />\n\tCity: <input type=\"text\" name=\"city\" [(ngModel)]=\"city\" /><br />\n\tState: <input type=\"text\" name=\"state\" [(ngModel)]=\"state\" /><br />\n\tCountry: <input type=\"text\" name=\"country\" [(ngModel)]=\"country\" /><br />\n\tPin Code: <input type=\"text\" name=\"pinCode\" [(ngModel)]=\"pinCode\" /><br />\n\t<input type=\"submit\" />\n</form>"

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

module.exports = "\n<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/login']\">Login</a>\n<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/register']\">Register</a>"

/***/ }),

/***/ 732:
/***/ (function(module, exports) {

module.exports = "<form (submit)=\"onLoginSubmit()\">\n\tUsername: <input type=\"text\" name=\"username\" [(ngModel)]=\"username\" /><br />\n\tPassword: <input type=\"password\" name=\"password\" [(ngModel)]=\"password\" /><br />\n\t<input type=\"submit\" />\n</form>\n<a href=\"/auth/facebook\">FB</a><br />\n<a href=\"/auth/google\">G+</a>"

/***/ }),

/***/ 733:
/***/ (function(module, exports) {

module.exports = "<nav>\n\t<div class=\"icon\"></div>\n\t<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/']\">Home</a>\n\t<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/login']\" *ngIf=\"!authService.loggedIn()\">Login</a>\n\t<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/register']\" *ngIf=\"!authService.loggedIn()\">Register</a>\n\t<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/dashboard']\" *ngIf=\"authService.loggedIn()\">Dashboard</a>\n\t<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/profile']\" *ngIf=\"authService.loggedIn()\">Profile</a>\n\t<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/projects']\" *ngIf=\"authService.loggedIn()\">Projects</a>\n\t<a [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact: true}\" [routerLink]=\"['/connections']\" *ngIf=\"authService.loggedIn()\">Connections</a>\n\t<a (click)=\"onLogoutClick()\" href=\"#\" *ngIf=\"authService.loggedIn()\">Logout</a>\n</nav>"

/***/ }),

/***/ 734:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"profile\">\n\t<div *ngIf=\"profile.name\">Name:{{ profile.name }}</div>\n\t<div *ngIf=\"profile.dob\">DOB:{{ profile.dob }}</div>\n\t<div *ngIf=\"profile.gender\">Gender:{{ profile.gender }}</div>\n\t<div *ngIf=\"profile.address\">\n\t\tAddress:\n\t\t<div *ngIf=\"profile.address.street\">{{ profile.address.street }}</div>\n\t\t<div *ngIf=\"profile.address.city\">{{ profile.address.city }}</div>\n\t\t<div *ngIf=\"profile.address.state\">{{ profile.address.state }}</div>\n\t\t<div *ngIf=\"profile.address.country\">{{ profile.address.country }}</div>\n\t\t<div *ngIf=\"profile.address.pinCode\">{{ profile.address.state }}</div>\n\t</div>\n</div>\n<a href=\"/editprofile\">Edit</a>"

/***/ }),

/***/ 735:
/***/ (function(module, exports) {

module.exports = "Add project:<br />\n\n<form [formGroup]=\"projectForm\" novalidate (ngSubmit)=\"save(projectForm._value)\">\n\n    <div>\n        <label>Project Name</label>\n        <input type=\"text\" formControlName=\"projectName\">\n        <small *ngIf=\"!projectForm.controls.projectName.valid\">\n            Project name is required (maximum 50 characters).\n        </small>\n    </div>\n\n    <div>\n        <label>Description</label>\n        <input type=\"text\" formControlName=\"description\">\n        <small *ngIf=\"!projectForm.controls.description.valid\">\n            Description is required (maximum 300 characters).\n        </small>\n    </div>\n\n    <div>\n        <label>Private</label>\n        <input type=\"checkbox\" name=\"private\" formControlName=\"private\">\n    </div>\n\n    <div formArrayName=\"tags\">\n    Tags\n        <div *ngFor=\"let tag of projectForm.controls.tags.controls; let i=index\">\n            <span>\n                <span *ngIf=\"projectForm.controls.tags.controls.length > 1\" \n                    (click)=\"removeTag(i)\">X\n                </span>\n            </span>\n\n            <span [formGroupName]=\"i\">\n                 <input type=\"text\" formControlName=\"tag\">\n            </span>\n        </div>\n        <a *ngIf=\"projectForm.controls.tags.controls.length < 5\" (click)=\"addTag()\">+</a>\n    </div>\n\n    <div formArrayName=\"languages\">\n    Languages\n        <div *ngFor=\"let language of projectForm.controls.languages.controls; let i=index\">\n            <span>\n                <span *ngIf=\"projectForm.controls.languages.controls.length > 1\" \n                    (click)=\"removeLanguage(i)\">X\n                </span>\n            </span>\n\n            <span [formGroupName]=\"i\">\n                 <input type=\"text\" formControlName=\"language\">\n            </span>\n        </div>\n        <a (click)=\"addLanguage()\">+</a>\n    </div>\n    <button type=\"submit\" [disabled]=\"!projectForm.valid\">Submit</button>\n</form>\n\n<br /><br />\n<form (submit)=\"onSearchSubmit()\">\n    Search: <input type=\"text\" name=\"searchString\" (keyup)=\"onSearchSubmit()\" [(ngModel)]=\"searchString\" />\n    <!-- <input type=\"submit\" /> -->\n</form>\n<br /><br />\nProjects:\n<br /><br />\n<div *ngFor=\"let project of projects\">\n\t<div>Project Name: {{ project.projectName }}</div>\n\t<div>Description: {{ project.description }}</div>\n\t<div>Project by: {{ project.name }}</div>\n\t<div>Languages: \n        <span *ngFor=\"let language of project.languages\">{{ language }} </span>\n    </div>\n\t<div>Tags:\n        <span *ngFor=\"let tag of project.tags\">{{ tag }} </span>\n    </div>\n\t<br />\n</div>\n"

/***/ }),

/***/ 736:
/***/ (function(module, exports) {

module.exports = "<form (submit)=\"onRegisterSubmit()\">\n\tName: <input [(ngModel)]=\"name\" name=\"name\" type=\"text\" /><br />\n\tUsername: <input [(ngModel)]=\"username\" name=\"username\" type=\"text\" /><br />\n\tEmail: <input [(ngModel)]=\"email\" name=\"email\" type=\"text\" /><br />\n\tPassword: <input [(ngModel)]=\"password\" name=\"password\" type=\"password\" /><br />\n\tConfirm Password: <input [(ngModel)]=\"repassword\" type=\"password\" name=\"repassword\" /><br />\n\t<input type=\"submit\" value=\"Register\"/>\n</form>"

/***/ }),

/***/ 766:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(421);


/***/ })

},[767]);
//# sourceMappingURL=main.bundle.map