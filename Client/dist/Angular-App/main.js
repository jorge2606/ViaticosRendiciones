(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard.prototype.ifLogged = function () {
        var result = false;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            result = true;
        }
        return result;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_helpers/error.interceptor.ts":
/*!***********************************************!*\
  !*** ./src/app/_helpers/error.interceptor.ts ***!
  \***********************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(err);
        }));
    };
    ErrorInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__["AuthenticationService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/_helpers/fake-backend.ts":
/*!******************************************!*\
  !*** ./src/app/_helpers/fake-backend.ts ***!
  \******************************************/
/*! exports provided: FakeBackendInterceptor, fakeBackendProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return FakeBackendInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function() { return fakeBackendProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FakeBackendInterceptor = /** @class */ (function () {
    function FakeBackendInterceptor() {
    }
    FakeBackendInterceptor.prototype.intercept = function (request, next) {
        var testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        // wrap in delayed observable to simulate server api call
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeMap"])(function () {
            // authenticate
            if (request.url.endsWith('/api/User/Auth') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    var body = {
                        id: testUser.id,
                        username: testUser.username,
                        firstName: testUser.firstName,
                        lastName: testUser.lastName,
                        token: 'fake-jwt-token'
                    };
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]({ status: 200, body: body }));
                }
                else {
                    // else return 400 bad request
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])({ error: { message: 'Username or password is incorrect' } });
                }
            }
            // get users
            if (request.url.endsWith('/api/User/') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]({ status: 200, body: [testUser] }));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])({ error: { message: 'Unauthorised' } });
                }
            }
            // pass through any requests not handled above
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["materialize"])())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(500))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["dematerialize"])());
    };
    FakeBackendInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FakeBackendInterceptor);
    return FakeBackendInterceptor;
}());

var fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"],
    useClass: FakeBackendInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/_helpers/index.ts":
/*!***********************************!*\
  !*** ./src/app/_helpers/index.ts ***!
  \***********************************/
/*! exports provided: ErrorInterceptor, JwtInterceptor, FakeBackendInterceptor, fakeBackendProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.interceptor */ "./src/app/_helpers/error.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return _error_interceptor__WEBPACK_IMPORTED_MODULE_0__["ErrorInterceptor"]; });

/* harmony import */ var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jwt.interceptor */ "./src/app/_helpers/jwt.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return _jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__["JwtInterceptor"]; });

/* harmony import */ var _fake_backend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fake-backend */ "./src/app/_helpers/fake-backend.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return _fake_backend__WEBPACK_IMPORTED_MODULE_2__["FakeBackendInterceptor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function() { return _fake_backend__WEBPACK_IMPORTED_MODULE_2__["fakeBackendProvider"]; });






/***/ }),

/***/ "./src/app/_helpers/jwt.interceptor.ts":
/*!*********************************************!*\
  !*** ./src/app/_helpers/jwt.interceptor.ts ***!
  \*********************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/_models/notifications.ts":
/*!******************************************!*\
  !*** ./src/app/_models/notifications.ts ***!
  \******************************************/
/*! exports provided: Notifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notifications", function() { return Notifications; });
var Notifications = /** @class */ (function () {
    function Notifications() {
    }
    return Notifications;
}());



/***/ }),

/***/ "./src/app/_models/passwords.ts":
/*!**************************************!*\
  !*** ./src/app/_models/passwords.ts ***!
  \**************************************/
/*! exports provided: ForgotPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPassword", function() { return ForgotPassword; });
var ForgotPassword = /** @class */ (function () {
    function ForgotPassword() {
    }
    return ForgotPassword;
}());



/***/ }),

/***/ "./src/app/_models/register.ts":
/*!*************************************!*\
  !*** ./src/app/_models/register.ts ***!
  \*************************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
var Register = /** @class */ (function () {
    function Register() {
    }
    return Register;
}());



/***/ }),

/***/ "./src/app/_models/reset-password.ts":
/*!*******************************************!*\
  !*** ./src/app/_models/reset-password.ts ***!
  \*******************************************/
/*! exports provided: ResetPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPassword", function() { return ResetPassword; });
var ResetPassword = /** @class */ (function () {
    function ResetPassword() {
    }
    return ResetPassword;
}());



/***/ }),

/***/ "./src/app/_models/role-claim-permission.ts":
/*!**************************************************!*\
  !*** ./src/app/_models/role-claim-permission.ts ***!
  \**************************************************/
/*! exports provided: RoleClaimPermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleClaimPermission", function() { return RoleClaimPermission; });
var RoleClaimPermission = /** @class */ (function () {
    function RoleClaimPermission() {
    }
    return RoleClaimPermission;
}());



/***/ }),

/***/ "./src/app/_models/roles.ts":
/*!**********************************!*\
  !*** ./src/app/_models/roles.ts ***!
  \**********************************/
/*! exports provided: Roles, RoleUserDto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Roles", function() { return Roles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleUserDto", function() { return RoleUserDto; });
var Roles = /** @class */ (function () {
    function Roles() {
    }
    return Roles;
}());

var RoleUserDto = /** @class */ (function () {
    function RoleUserDto() {
    }
    return RoleUserDto;
}());



/***/ }),

/***/ "./src/app/_models/update-role-claim-permission.ts":
/*!*********************************************************!*\
  !*** ./src/app/_models/update-role-claim-permission.ts ***!
  \*********************************************************/
/*! exports provided: UpdateRoleClaimPermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRoleClaimPermission", function() { return UpdateRoleClaimPermission; });
var UpdateRoleClaimPermission = /** @class */ (function () {
    function UpdateRoleClaimPermission() {
    }
    return UpdateRoleClaimPermission;
}());



/***/ }),

/***/ "./src/app/_services/authentication.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/_services/authentication.service.ts ***!
  \*****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.loggedIn = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false); // {1}
        this.saveToken = function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.loggedIn.next(true);
            }
            return user;
        };
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn.next(true);
        }
    }
    AuthenticationService.prototype.login = function (user) {
        return this.http.post('http://localhost:63098/api/User/Auth', user)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.saveToken));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        this.router.navigate(['login']);
    };
    Object.defineProperty(AuthenticationService.prototype, "isLoggedIn", {
        get: function () {
            return this.loggedIn.asObservable(); // {2}
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.userId = function (key) {
        var current = localStorage.getItem('currentUser');
        if (current != null) {
            var currentUserJSON = JSON.parse(current);
            return currentUserJSON[key];
        }
    };
    AuthenticationService.prototype.urlFile = function (userId, width, height) {
        return "http://localhost:63098/api/File/" + userId + "/" + width + "/" + height;
    };
    AuthenticationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/_services/mess-between-comp.service.ts":
/*!********************************************************!*\
  !*** ./src/app/_services/mess-between-comp.service.ts ***!
  \********************************************************/
/*! exports provided: MessBetweenCompService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessBetweenCompService", function() { return MessBetweenCompService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MessBetweenCompService = /** @class */ (function () {
    function MessBetweenCompService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    MessBetweenCompService.prototype.sendMessage = function (message) {
        this.subject.next({ text: message });
    };
    MessBetweenCompService.prototype.clearMessage = function () {
        this.subject.next();
    };
    MessBetweenCompService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    MessBetweenCompService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], MessBetweenCompService);
    return MessBetweenCompService;
}());



/***/ }),

/***/ "./src/app/_services/notifications.service.ts":
/*!****************************************************!*\
  !*** ./src/app/_services/notifications.service.ts ***!
  \****************************************************/
/*! exports provided: NotificationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return NotificationsService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationsService = /** @class */ (function () {
    function NotificationsService(http) {
        this.http = http;
    }
    NotificationsService.prototype.getAllNotifications = function () {
        return this.http.get("http://localhost:63098/api/Notification/GetAllNotifications");
    };
    NotificationsService.prototype.notificationRidden = function (id) {
        return this.http.put("http://localhost:63098/api/Notification/NotificationRidden/", id);
    };
    NotificationsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], NotificationsService);
    return NotificationsService;
}());



/***/ }),

/***/ "./src/app/_services/recovery-password.service.ts":
/*!********************************************************!*\
  !*** ./src/app/_services/recovery-password.service.ts ***!
  \********************************************************/
/*! exports provided: RecoveryPasswordService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoveryPasswordService", function() { return RecoveryPasswordService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RecoveryPasswordService = /** @class */ (function () {
    function RecoveryPasswordService(http) {
        this.http = http;
    }
    RecoveryPasswordService.prototype.ForgotPassword = function (passwordObj) {
        this.http.post("http://localhost:63098/api/User/ForgotPassword/", passwordObj).subscribe(function (x) {
            return console.log(x.toString());
        });
    };
    RecoveryPasswordService.prototype.ResetPassword = function (passwordObj) {
        this.http.post("http://localhost:63098/api/User/ResetPassword/", passwordObj).subscribe(function (x) {
            return console.log(x.toString());
        });
    };
    RecoveryPasswordService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], RecoveryPasswordService);
    return RecoveryPasswordService;
}());



/***/ }),

/***/ "./src/app/_services/role.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/role.service.ts ***!
  \*******************************************/
/*! exports provided: RoleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleService", function() { return RoleService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RoleService = /** @class */ (function () {
    function RoleService(http) {
        this.http = http;
    }
    RoleService.prototype.getAll = function () {
        return this.http.get("http://localhost:63098/api/Role/getAll");
    };
    RoleService.prototype.getAllRoles = function () {
        return this.http.get("http://localhost:63098/api/Role/AllRoles");
    };
    RoleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], RoleService);
    return RoleService;
}());



/***/ }),

/***/ "./src/app/_services/roles-permissions.service.ts":
/*!********************************************************!*\
  !*** ./src/app/_services/roles-permissions.service.ts ***!
  \********************************************************/
/*! exports provided: RolesPermissionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesPermissionsService", function() { return RolesPermissionsService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RolesPermissionsService = /** @class */ (function () {
    function RolesPermissionsService(http) {
        this.http = http;
    }
    RolesPermissionsService.prototype.getAllRoleClaims = function (id) {
        return this.http.get('http://localhost:63098/api/Role/getallClaims?id=' + id);
    };
    RolesPermissionsService.prototype.saveRoleClaims = function (model) {
        this.http.put('http://localhost:63098/api/Role/UpdateClaims/', model).subscribe(function (data) {
        }, function (error) {
            console.log("Error", error);
        });
    };
    RolesPermissionsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], RolesPermissionsService);
    return RolesPermissionsService;
}());



/***/ }),

/***/ "./src/app/_services/user.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authentication.service */ "./src/app/_services/authentication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = /** @class */ (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    UserService.prototype.getAll = function () {
        return this.http.get('http://localhost:63098/api/User/getall');
    };
    UserService.prototype.getPaginator = function (page) {
        return this.http.get('http://localhost:63098/api/User/page/' + page);
    };
    UserService.prototype.getById = function (id) {
        return this.http.get('http://localhost:63098/api/User/getbyid/' + id);
    };
    UserService.prototype.updateUsers = function (user) {
        return this.http.put('http://localhost:63098/api/User/', user);
    };
    UserService.prototype.updateProfileUsers = function (user) {
        return this.http.put('http://localhost:63098/api/User/UpdateProfile', user);
    };
    UserService.prototype.createWithObjectUser = function (user) {
        var _this = this;
        return this.http.post('http://localhost:63098/api/User/', user)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.authenticationService.saveToken), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError(error); }));
    };
    UserService.prototype.deleteUser = function (id) {
        return this.http.delete('http://localhost:63098/api/User/' + id);
    };
    UserService.prototype.register = function (user) {
        var _this = this;
        return this.http.post('http://localhost:63098/api/User/register', user)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.authenticationService.saveToken), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return _this.handleError(error); }));
    };
    UserService.prototype.handleError = function (err) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(err);
    };
    UserService.prototype.SaveUserRoles = function (RoleUserDto) {
        this.http.post('http://localhost:63098/api/User/SaveRolUser/', RoleUserDto).subscribe(function (data) {
            console.log("POST Request is successful ", data);
        }, function (error) {
            console.log("Rrror", error);
        });
    };
    UserService.prototype.deleteProfilePhoto = function (id) {
        return this.http.delete('http://localhost:63098/api/File/removePhoto/' + id).subscribe(function (data) {
            console.log("POST Request is successful ", data);
        }, function (error) {
            console.log("Rrror", error);
        });
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/app-routes.module.ts":
/*!**************************************!*\
  !*** ./src/app/app-routes.module.ts ***!
  \**************************************/
/*! exports provided: AppRoutesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutesModule", function() { return AppRoutesModule; });
/* harmony import */ var _users_photo_profile_photo_profile_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users/photo-profile/photo-profile.component */ "./src/app/users/photo-profile/photo-profile.component.ts");
/* harmony import */ var _manage_password_manage_password_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manage-password/manage-password.component */ "./src/app/manage-password/manage-password.component.ts");
/* harmony import */ var _roles_roles_permissions_roles_permissions_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./roles/roles-permissions/roles-permissions.component */ "./src/app/roles/roles-permissions/roles-permissions.component.ts");
/* harmony import */ var _roles_roles_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./roles/roles.component */ "./src/app/roles/roles.component.ts");
/* harmony import */ var _users_modifyuser_modifyuser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users/modifyuser/modifyuser.component */ "./src/app/users/modifyuser/modifyuser.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _users_createuser_createuser_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users/createuser/createuser.component */ "./src/app/users/createuser/createuser.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _users_users_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./users/users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _manage_password_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./manage-password/reset-password/reset-password.component */ "./src/app/manage-password/reset-password/reset-password.component.ts");
/* harmony import */ var _users_settingofuser_settingofuser_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./users/settingofuser/settingofuser.component */ "./src/app/users/settingofuser/settingofuser.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var routes = [
    //canActivate : Interface that a class can implement to be a guard deciding if a route can be activated.
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"] },
    { path: 'register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_12__["RegisterComponent"] },
    { path: 'users', component: _users_users_component__WEBPACK_IMPORTED_MODULE_10__["UsersComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'users/create', component: _users_createuser_createuser_component__WEBPACK_IMPORTED_MODULE_6__["CreateuserComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'update/:id', component: _users_modifyuser_modifyuser_component__WEBPACK_IMPORTED_MODULE_4__["ModifyuserComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'settingUser/:id', component: _users_settingofuser_settingofuser_component__WEBPACK_IMPORTED_MODULE_14__["SettingofuserComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'photoProfile/:id', component: _users_photo_profile_photo_profile_component__WEBPACK_IMPORTED_MODULE_0__["PhotoProfileComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'roles', component: _roles_roles_component__WEBPACK_IMPORTED_MODULE_3__["RolesComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'roles/permissions/:id', component: _roles_roles_permissions_roles_permissions_component__WEBPACK_IMPORTED_MODULE_2__["RolesPermissionsComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]] },
    { path: 'RecuperarContraseña', component: _manage_password_manage_password_component__WEBPACK_IMPORTED_MODULE_1__["ManagePasswordComponent"] },
    { path: 'CambiarPassword', component: _manage_password_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_13__["ResetPasswordComponent"] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var AppRoutesModule = /** @class */ (function () {
    function AppRoutesModule() {
    }
    AppRoutesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["NgModule"])({
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"]
            ],
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forRoot(routes)
            ]
        })
    ], AppRoutesModule);
    return AppRoutesModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navarStyle {\r\n  font-size : 13px;\r\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n  padding: 8px;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-1 small\">\n    <app-navar [urlImage]=\"urlImage\"></app-navar>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/authentication.service */ "./src/app/_services/authentication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.urlImage = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.idUser = this.authService.userId('id');
        this.urlImage = this.authService.urlFile(this.idUser, 25, 25) + "r=" + (Math.random() * 100) + 1;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _users_createuser_createuser_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users/createuser/createuser.component */ "./src/app/users/createuser/createuser.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _users_users_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users/users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _app_routes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routes.module */ "./src/app/app-routes.module.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _helpers___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_helpers/ */ "./src/app/_helpers/index.ts");
/* harmony import */ var _users_modifyuser_modifyuser_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./users/modifyuser/modifyuser.component */ "./src/app/users/modifyuser/modifyuser.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _modals_modals_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modals/modals.component */ "./src/app/modals/modals.component.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _navar_navar_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./navar/navar.component */ "./src/app/navar/navar.component.ts");
/* harmony import */ var _roles_roles_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./roles/roles.component */ "./src/app/roles/roles.component.ts");
/* harmony import */ var _roles_create_create_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./roles/create/create.component */ "./src/app/roles/create/create.component.ts");
/* harmony import */ var ngx_treeview__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-treeview */ "./node_modules/ngx-treeview/src/index.js");
/* harmony import */ var _roles_roles_permissions_roles_permissions_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./roles/roles-permissions/roles-permissions.component */ "./src/app/roles/roles-permissions/roles-permissions.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _manage_password_manage_password_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./manage-password/manage-password.component */ "./src/app/manage-password/manage-password.component.ts");
/* harmony import */ var _manage_password_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./manage-password/reset-password/reset-password.component */ "./src/app/manage-password/reset-password/reset-password.component.ts");
/* harmony import */ var _users_settingofuser_settingofuser_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./users/settingofuser/settingofuser.component */ "./src/app/users/settingofuser/settingofuser.component.ts");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _users_photo_profile_photo_profile_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./users/photo-profile/photo-profile.component */ "./src/app/users/photo-profile/photo-profile.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















//Paginator















_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_23__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_24__["fas"]);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _users_users_component__WEBPACK_IMPORTED_MODULE_6__["UsersComponent"],
                _users_createuser_createuser_component__WEBPACK_IMPORTED_MODULE_1__["CreateuserComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"],
                _users_modifyuser_modifyuser_component__WEBPACK_IMPORTED_MODULE_12__["ModifyuserComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_13__["RegisterComponent"],
                _modals_modals_component__WEBPACK_IMPORTED_MODULE_15__["NgbdModalContent"],
                _navar_navar_component__WEBPACK_IMPORTED_MODULE_17__["NavarComponent"],
                _roles_roles_component__WEBPACK_IMPORTED_MODULE_18__["RolesComponent"],
                _roles_create_create_component__WEBPACK_IMPORTED_MODULE_19__["CreateRolesComponent"],
                _roles_roles_permissions_roles_permissions_component__WEBPACK_IMPORTED_MODULE_21__["RolesPermissionsComponent"],
                _manage_password_manage_password_component__WEBPACK_IMPORTED_MODULE_26__["ManagePasswordComponent"],
                _manage_password_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_27__["ResetPasswordComponent"],
                _users_settingofuser_settingofuser_component__WEBPACK_IMPORTED_MODULE_28__["SettingofuserComponent"],
                _users_photo_profile_photo_profile_component__WEBPACK_IMPORTED_MODULE_30__["PhotoProfileComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _app_routes_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutesModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_8__["HttpModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_16__["NgxPaginationModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_22__["FontAwesomeModule"],
                ngx_treeview__WEBPACK_IMPORTED_MODULE_20__["TreeviewModule"].forRoot(),
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_29__["FileUploadModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__["BrowserAnimationsModule"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HTTP_INTERCEPTORS"], useClass: _helpers___WEBPACK_IMPORTED_MODULE_11__["JwtInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HTTP_INTERCEPTORS"], useClass: _helpers___WEBPACK_IMPORTED_MODULE_11__["ErrorInterceptor"], multi: true }
                // provider used to create fake backend
                //fakeBackendProvider    
            ],
            entryComponents: [_modals_modals_component__WEBPACK_IMPORTED_MODULE_15__["NgbdModalContent"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    Home\n    \n</div>\n\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, route) {
        this.userService = userService;
        this.route = route;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.login {\r\n    margin : 50px;\r\n    background-color: aliceblue;\r\n}\r\n"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\">\r\n\r\n        <form class=\"form-inline my-2 my-lg-0 ml-auto\" (ngSubmit)=\"LoginForm.form.valid && onSubmit()\" #LoginForm=\"ngForm\">\r\n\r\n            <input matInput [(ngModel)]=\"model.Usuario\" class=\"form-control mr-1\" type=\"text\" name=\"username\" #username=\"ngModel\"\r\n                placeholder=\"Usuario\">\r\n\r\n            <div *ngIf=\"username.invalid\">\r\n                Usuario Incorrecto\r\n            </div>\r\n\r\n            <input matInput [(ngModel)]=\"model.Password\" class=\"form-control mr-1\" type=\"password\" placeholder=\"Contraseña\"\r\n                name=\"Password\" #password=\"ngModel\">\r\n\r\n            <div *ngIf=\"password.invalid\">\r\n                Contraseña Incorrecta\r\n            </div>\r\n\r\n\r\n            <button mat-button [disabled]=\"LoginForm.form.invalid\" class=\"btn btn-primary mr-1\">\r\n                <fa-icon icon=\"sign-in-alt\"></fa-icon>\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-success mr-1\" href=\"\" routerLink=\"/register\">Registrar</button>\r\n            <a class=\"text-white small\" routerLink=\"/RecuperarContraseña\">olvide mi contraseña</a>\r\n            <div *ngIf=\"!LoginForm.form.valid\">\r\n                Formulario Incorrecto\r\n            </div>\r\n        </form>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login */ "./src/app/login/login.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, formBuilder, route, router, authenticationService) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.submitted = false;
        this.error = '';
        this.model = new _login__WEBPACK_IMPORTED_MODULE_4__["Login"]();
    }
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        //this.addUserPassword();
        this.submitted = true;
        // stop here if form is invalid
        //if (this.loginForm.invalid) {
        //  alert(this.loginForm.invalid);
        //    return;
        //}
        this.loading = true;
        this.authenticationService.login(this.model)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])())
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            Password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.isLogged = this.authenticationService.isLoggedIn;
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.ts":
/*!********************************!*\
  !*** ./src/app/login/login.ts ***!
  \********************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
var Login = /** @class */ (function () {
    function Login() {
    }
    return Login;
}());



/***/ }),

/***/ "./src/app/manage-password/manage-password.component.css":
/*!***************************************************************!*\
  !*** ./src/app/manage-password/manage-password.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/manage-password/manage-password.component.html":
/*!****************************************************************!*\
  !*** ./src/app/manage-password/manage-password.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container col-7\" style=\"padding-left : 30px;\">\n  <form (ngSubmit)=\"onSubmit()\" #RecoveryForm=\"ngForm\">\n    <div class=\"row\" style=\"padding : 5px;\">\n          <label style=\"padding-top : 7px;padding-right: 3px;\" for=\"\">Email</label>\n              <input style=\"width : 40%;\" class=\"form-control\" type=\"text\" [(ngModel)]=\"model.email\" name=\"email\" #email=\"ngModel\">\n              <button style=\"padding-left : 8px;\" type=\"submit\" class=\"btn btn-success navarStyle\">Recuperar</button>\n    </div>\n  </form>\n</div>\n\n"

/***/ }),

/***/ "./src/app/manage-password/manage-password.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/manage-password/manage-password.component.ts ***!
  \**************************************************************/
/*! exports provided: ManagePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagePasswordComponent", function() { return ManagePasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_passwords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_models/passwords */ "./src/app/_models/passwords.ts");
/* harmony import */ var _services_recovery_password_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/recovery-password.service */ "./src/app/_services/recovery-password.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ManagePasswordComponent = /** @class */ (function () {
    function ManagePasswordComponent(managePassword) {
        this.managePassword = managePassword;
        this.model = new _models_passwords__WEBPACK_IMPORTED_MODULE_1__["ForgotPassword"]();
    }
    ManagePasswordComponent.prototype.onSubmit = function () {
        console.log(this.model);
        this.managePassword.ForgotPassword(this.model);
    };
    ManagePasswordComponent.prototype.ngOnInit = function () {
    };
    ManagePasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-password',
            template: __webpack_require__(/*! ./manage-password.component.html */ "./src/app/manage-password/manage-password.component.html"),
            styles: [__webpack_require__(/*! ./manage-password.component.css */ "./src/app/manage-password/manage-password.component.css")]
        }),
        __metadata("design:paramtypes", [_services_recovery_password_service__WEBPACK_IMPORTED_MODULE_2__["RecoveryPasswordService"]])
    ], ManagePasswordComponent);
    return ManagePasswordComponent;
}());



/***/ }),

/***/ "./src/app/manage-password/reset-password/reset-password.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/manage-password/reset-password/reset-password.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/manage-password/reset-password/reset-password.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/manage-password/reset-password/reset-password.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container col-4\" style=\"padding-left : 30px;\">\n  <form (ngSubmit)=\"onSubmit()\" #ResetForm=\"ngForm\">\n    <label for=\"\">Nueva Contraseña</label>\n    <input class=\"form-control\" type=\"password\" [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\">\n    <label for=\"\">Confirmar Contraseña</label>\n    <input class=\"form-control\" type=\"password\" [(ngModel)]=\"model.passwordConfirm\" name=\"passwordConfirm\" #passwordConfirm=\"ngModel\">\n    <button style=\"padding-top : 6px;\" type=\"submit\" class=\"btn btn-success\">Recuperar</button>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/manage-password/reset-password/reset-password.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/manage-password/reset-password/reset-password.component.ts ***!
  \****************************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_reset_password__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_models/reset-password */ "./src/app/_models/reset-password.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_recovery_password_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/recovery-password.service */ "./src/app/_services/recovery-password.service.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../login/login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(route, resetPass, router) {
        this.route = route;
        this.resetPass = resetPass;
        this.router = router;
        this.model = new _models_reset_password__WEBPACK_IMPORTED_MODULE_1__["ResetPassword"]();
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        //le asigno el id que extraigo de la url
        this.route.queryParams.subscribe(function (x) {
            _this.idUserParam = x.userId,
                _this.codeParam = x.code;
        });
        console.log("user : " + this.idUserParam);
        console.log("code : " + this.codeParam);
    };
    ResetPasswordComponent.prototype.onSubmit = function () {
        this.model.userId = this.idUserParam;
        this.model.passwordResetToken = this.codeParam;
        this.resetPass.ResetPassword(this.model);
        this.router.navigate([_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]]);
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/manage-password/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.css */ "./src/app/manage-password/reset-password/reset-password.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _services_recovery_password_service__WEBPACK_IMPORTED_MODULE_3__["RecoveryPasswordService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/modals/modals.component.html":
/*!**********************************************!*\
  !*** ./src/app/modals/modals.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n    <h4 class=\"modal-title\">{{Encabezado}}</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <p>{{Contenido}}!</p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.dismiss('Close click')\">Close</button>\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"activeModal.close('Close click')\">{{GuardaroEliminar}}</button>\n</div>\n    \n\n"

/***/ }),

/***/ "./src/app/modals/modals.component.ts":
/*!********************************************!*\
  !*** ./src/app/modals/modals.component.ts ***!
  \********************************************/
/*! exports provided: NgbdModalContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgbdModalContent", function() { return NgbdModalContent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NgbdModalContent = /** @class */ (function () {
    function NgbdModalContent(activeModal) {
        this.activeModal = activeModal;
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NgbdModalContent.prototype, "Contenido", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NgbdModalContent.prototype, "Encabezado", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NgbdModalContent.prototype, "GuardaroEliminar", void 0);
    NgbdModalContent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngbd-modal-content',
            template: __webpack_require__(/*! ./modals.component.html */ "./src/app/modals/modals.component.html")
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], NgbdModalContent);
    return NgbdModalContent;
}());



/***/ }),

/***/ "./src/app/navar/navar.component.css":
/*!*******************************************!*\
  !*** ./src/app/navar/navar.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navar/navar.component.html":
/*!********************************************!*\
  !*** ./src/app/navar/navar.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav *ngIf=\"isLogged | async\" class=\"navbar navbar-expand-lg navbar-dark bg-dark mb-3 font-weight-light\">\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\">\r\n\r\n    <ul class=\"navbar-nav mr-auto\">\r\n\r\n      <li class=\"nav-item active\">\r\n        <a routerLink=\"/users\" class=\"nav-item text-white nav-link small\" href=\"#\">\r\n          <fa-icon icon=\"users\"></fa-icon>Usuarios\r\n        </a>\r\n      </li>\r\n\r\n      <li class=\"nav-item\">\r\n        <!--<a style=\"color: white;\" class=\"nav-item nav-link active\" href=\"#\" routerLink=\"/login\">Login</a>-->\r\n        <a class=\"nav-item text-white nav-link small\" href=\"#\" [routerLink]=\"['/roles']\">\r\n          <fa-icon icon=\"key\"></fa-icon> Roles\r\n        </a>\r\n      </li>\r\n\r\n    </ul>\r\n\r\n    <ul class=\"navbar-nav ml-auto small\">\r\n      <li class=\"nav-item dropdown\">\r\n        <div class=\"d-inline-block pull-right\" ngbDropdown #myDrop=\"ngbDropdown\">\r\n          <button class=\"btn btn-outline-danger mr-2 small\" id=\"dropdownManual\" ngbDropdownAnchor (focus)=\"myDrop.open()\">\r\n            <fa-icon icon=\"bell\"></fa-icon>\r\n          </button>\r\n          <div ngbDropdownMenu aria-labelledby=\"dropdownManual\">\r\n            <button *ngFor=\"let j of notification\" [ngClass]=\"{'dropdown-item small alert alert-light': j.read,'dropdown-item small alert alert-success' : !j.read}\" (click)=\"seeThisNotification(j.textData,j.id)\">\r\n                {{j.tittle}}\r\n            </button>\r\n            \r\n          </div>\r\n        </div>\r\n      </li>\r\n\r\n      \r\n      <li class=\"nav-item dropdown small\">\r\n          <div class=\"d-inline-block pull-right\" ngbDropdown #myDropCloseSession=\"ngbDropdown\">\r\n            <button class=\"btn btn-outline-light mr-2 small\" id=\"dropdownManual\" ngbDropdownAnchor (focus)=\"myDropCloseSession.open()\">\r\n             <!-- <fa-icon icon=\"user\"></fa-icon>-->\r\n              <img class=\"rounded-circle\" src=\"{{urlImage}}\" alt=\"\">\r\n            </button>\r\n            <div ngbDropdownMenu aria-labelledby=\"dropdownManual\">\r\n                <button routerLink=\"/settingUser/{{idUser}}\" class=\"dropdown-item small\">Mi Perfil</button>\r\n              <button (click)=\"logout()\" class=\"dropdown-item small\">Cerrar Sesión</button>\r\n            </div>\r\n          </div>\r\n        </li>      \r\n\r\n    </ul>\r\n  </div>\r\n</nav>\r\n\r\n<router-outlet class=\"small\"></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/navar/navar.component.ts":
/*!******************************************!*\
  !*** ./src/app/navar/navar.component.ts ***!
  \******************************************/
/*! exports provided: NavarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavarComponent", function() { return NavarComponent; });
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _models_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../_models/notifications */ "./src/app/_models/notifications.ts");
/* harmony import */ var _services_notifications_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../_services/notifications.service */ "./src/app/_services/notifications.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_mess_between_comp_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/mess-between-comp.service */ "./src/app/_services/mess-between-comp.service.ts");
/* harmony import */ var _modals_modals_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modals/modals.component */ "./src/app/modals/modals.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NavarComponent = /** @class */ (function () {
    function NavarComponent(notificaionServices, authService, messaBetweenComp, modalService, var_user_service) {
        this.notificaionServices = notificaionServices;
        this.authService = authService;
        this.messaBetweenComp = messaBetweenComp;
        this.modalService = modalService;
        this.var_user_service = var_user_service;
        this.notificationridden = new _models_notifications__WEBPACK_IMPORTED_MODULE_1__["Notifications"]();
    }
    NavarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notificaionServices.getAllNotifications().subscribe(function (x) { return _this.notification = x; });
        this.idUser = this.authService.userId('id');
        this.isLogged = this.authService.isLoggedIn;
        this.messaBetweenComp.getMessage().subscribe(function (x) {
            return _this.urlImage = _this.authService.urlFile(_this.idUser, 25, 25) + "r=" + (Math.random() * 100) + 1;
        });
        if (!this.urlImage) {
            this.urlImage = this.authService.urlFile(this.idUser, 25, 25) + "r=" + (Math.random() * 100) + 1;
        }
    };
    NavarComponent.prototype.logout = function () {
        this.authService.logout();
    };
    //MODALS
    NavarComponent.prototype.seeThisNotification = function (notif, id) {
        var _this = this;
        var modalRef = this.modalService.open(_modals_modals_component__WEBPACK_IMPORTED_MODULE_5__["NgbdModalContent"]);
        modalRef.componentInstance.Encabezado = "Notificación";
        modalRef.componentInstance.Contenido = notif;
        modalRef.componentInstance.GuardaroEliminar = "Entendido";
        modalRef.result.then(function () {
            _this.notificationridden.id = id,
                _this.notificationridden.read = true,
                _this.notificationridden.textData = "";
            _this.notificationridden.tittle = "";
            _this.notificaionServices.notificationRidden(_this.notificationridden).subscribe(function (x) { return _this.notificaionServices.getAllNotifications().subscribe(function (x) { return console.log(x); }); });
        }, function () {
            console.log('Backdrop click');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"])(),
        __metadata("design:type", String)
    ], NavarComponent.prototype, "urlImage", void 0);
    NavarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-navar',
            template: __webpack_require__(/*! ./navar.component.html */ "./src/app/navar/navar.component.html"),
            styles: [__webpack_require__(/*! ./navar.component.css */ "./src/app/navar/navar.component.css")]
        }),
        __metadata("design:paramtypes", [_services_notifications_service__WEBPACK_IMPORTED_MODULE_2__["NotificationsService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_0__["AuthenticationService"],
            _services_mess_between_comp_service__WEBPACK_IMPORTED_MODULE_4__["MessBetweenCompService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"]])
    ], NavarComponent);
    return NavarComponent;
}());



/***/ }),

/***/ "./src/app/register/register.component.css":
/*!*************************************************!*\
  !*** ./src/app/register/register.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container col-4\">\n    <h2>Registrar</h2>\n    <form (ngSubmit)=\"userForm.form.valid && onSubmit()\" method=\"post\" #userForm=\"ngForm\">\n        <div class=\"form-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.dni\" #dni=\"ngModel\" required name=\"dni\" id=\"dni\" type=\"number\"\n                placeholder=\"Dni\">\n            <div style=\"margin-top: 10px;\" *ngIf=\"dni.invalid && dni.dirty\" class=\"alert alert-danger\">\n                Dni Incorrecto\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.email\" required #email=\"ngModel\" name=\"email\" type=\"text\"\n                placeholder=\"email\" value=\"\">\n        </div>\n        <div style=\"margin-top: 10px;\" *ngIf=\"email.dirty && email.invalid\" class=\"alert alert-danger\">\n            Email Incorrecto\n        </div>\n        <div class=\"from-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.phoneNumber\" required #phoneNumber=\"ngModel\" name=\"phoneNumber\"\n                type=\"text\" placeholder=\"Telefóno\" value=\"\">\n        </div>\n        <div style=\"margin-top: 10px;\" *ngIf=\"phoneNumber.dirty && phoneNumber.invalid\" class=\"alert alert-danger\">\n            Telefóno Incorrecto\n        </div>\n\n        <div style=\"padding-top : 8px;\" class=\"from-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.password\" required #password=\"ngModel\" name=\"password\" type=\"password\"\n                placeholder=\"Contraseña\" value=\"\">\n        </div>\n        <div style=\"margin-top: 10px;\" *ngIf=\"password.dirty && password.invalid\" class=\"alert alert-danger\">\n            Password Incorrecto\n        </div>\n\n        <div class=\"form-group\" style=\"padding-top : 10px;\">\n            <button style=\"margin: 15px;\" class=\"btn btn-success\" [disabled]=\"!userForm.form.valid\">Save</button>\n            <a class=\"btn btn-primary\" href=\"\" routerLink=\"/login\">Login</a>\n        </div>\n        \n        <div style=\"margin-top: 10px;\" *ngIf=\"password.dirty && password.invalid\" class=\"alert alert-danger\">\n            Contraseña con caracteres invalidos\n        </div>\n    </form>\n    <div *ngIf=\"userForm.form.invalid && !userForm.form.dirty\">\n        Hay Campos erroneos en el formulario, verifiquelos\n    </div>\n    <div>\n        <ul style=\"margin-top : 15px;\" *ngIf=\"errors.length != 0\" class=\"alert alert-danger\" role=\"alert\">\n            <li *ngFor=\"let error of errors\">{{ error.value }}</li>\n        </ul>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../_models/register */ "./src/app/_models/register.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../login/login */ "./src/app/login/login.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.model = new _models_register__WEBPACK_IMPORTED_MODULE_1__["Register"]();
        this.errors = [];
        this.login = new _login_login__WEBPACK_IMPORTED_MODULE_4__["Login"]();
        this.error = '';
    }
    RegisterComponent.prototype.onSubmit = function () {
        this.errors = [];
        this.registerUser();
    };
    RegisterComponent.prototype.registerUser = function () {
        var _this = this;
        this.userService.register(this.model).subscribe(function (result) {
            _this.router.navigate(['Home']);
        }, function (error) {
            _this.errors = error.error.notifications;
        });
        console.log(this.model);
    };
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/roles/create/create.component.css":
/*!***************************************************!*\
  !*** ./src/app/roles/create/create.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/roles/create/create.component.html":
/*!****************************************************!*\
  !*** ./src/app/roles/create/create.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container col-4\">\n   <h2>Crear Rol</h2>\n    <form action=\"\">\n        <div class=\"form-group\">\n          <input class=\"form-control\" type=\"text\" placeholder=\"descripción\">\n        </div>\n        <div class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" placeholder=\"descripción\">\n          </div>\n          <div class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" placeholder=\"descripción\">\n          </div>          \n        <div class=\"form-group\">\n            <button class=\"btn btn-success\">Crear</button>\n        </div>\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/roles/create/create.component.ts":
/*!**************************************************!*\
  !*** ./src/app/roles/create/create.component.ts ***!
  \**************************************************/
/*! exports provided: CreateRolesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateRolesComponent", function() { return CreateRolesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CreateRolesComponent = /** @class */ (function () {
    function CreateRolesComponent() {
    }
    CreateRolesComponent.prototype.ngOnInit = function () {
    };
    CreateRolesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-roles',
            template: __webpack_require__(/*! ./create.component.html */ "./src/app/roles/create/create.component.html"),
            styles: [__webpack_require__(/*! ./create.component.css */ "./src/app/roles/create/create.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CreateRolesComponent);
    return CreateRolesComponent;
}());



/***/ }),

/***/ "./src/app/roles/roles-permissions/roles-permissions.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/roles/roles-permissions/roles-permissions.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navarStyle {\r\n    font-size : 13px;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    padding-top: 1px;\r\n  }"

/***/ }),

/***/ "./src/app/roles/roles-permissions/roles-permissions.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/roles/roles-permissions/roles-permissions.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-3\">\n  <ngx-treeview class=\"navarStyle\" [config]=\"config\" [items]=\"items\" (filterChange)=\"onFilterChange($event)\" \n  (selectedChange)=\"values = $event\">\n  </ngx-treeview>\n  <button (click)=\"save()\" style=\"margin-top: 25px;\" class=\"btn btn-success navarStyle\">Guardar</button>\n</div>\n"

/***/ }),

/***/ "./src/app/roles/roles-permissions/roles-permissions.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/roles/roles-permissions/roles-permissions.component.ts ***!
  \************************************************************************/
/*! exports provided: RolesPermissionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesPermissionsComponent", function() { return RolesPermissionsComponent; });
/* harmony import */ var _models_role_claim_permission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../_models/role-claim-permission */ "./src/app/_models/role-claim-permission.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_update_role_claim_permission__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_models/update-role-claim-permission */ "./src/app/_models/update-role-claim-permission.ts");
/* harmony import */ var node_modules_ngx_treeview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node_modules/ngx-treeview */ "./node_modules/ngx-treeview/src/index.js");
/* harmony import */ var _services_roles_permissions_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/roles-permissions.service */ "./src/app/_services/roles-permissions.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RolesPermissionsComponent = /** @class */ (function () {
    function RolesPermissionsComponent(rolesServices, route) {
        this.rolesServices = rolesServices;
        this.route = route;
        this.dropdownEnabled = true;
        this.items = [];
        this.updateRoleClaimPermission = new _models_update_role_claim_permission__WEBPACK_IMPORTED_MODULE_2__["UpdateRoleClaimPermission"]();
        this.config = node_modules_ngx_treeview__WEBPACK_IMPORTED_MODULE_3__["TreeviewConfig"].create({
            hasAllCheckBox: true,
            hasFilter: true,
            hasCollapseExpand: true,
            decoupleChildFromParent: false,
            maxHeight: 400
        });
        this.buttonClasses = [
            'btn-outline-primary',
            'btn-outline-secondary',
            'btn-outline-success',
            'btn-outline-danger',
            'btn-outline-warning',
            'btn-outline-info',
            'btn-outline-light',
            'btn-outline-dark'
        ];
        this.buttonClass = this.buttonClasses[0];
    }
    RolesPermissionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (p) { return _this.id = p.id; });
        this.rolesServices.getAllRoleClaims(this.id).subscribe(function (claims) {
            _this.items = claims.map(function (x) { return new node_modules_ngx_treeview__WEBPACK_IMPORTED_MODULE_3__["TreeviewItem"](x); });
        });
    };
    RolesPermissionsComponent.prototype.onFilterChange = function (value) {
        console.log('filter:', value);
    };
    RolesPermissionsComponent.prototype.mapToRoleClaimPermission = function (treeViewItem) {
        var _this = this;
        var roleClaim = new _models_role_claim_permission__WEBPACK_IMPORTED_MODULE_0__["RoleClaimPermission"]();
        roleClaim.checked = treeViewItem.checked;
        roleClaim.text = treeViewItem.text;
        roleClaim.value = treeViewItem.value;
        if (treeViewItem.children)
            roleClaim.children = treeViewItem.children.map(function (x) { return _this.mapToRoleClaimPermission(x); });
        return roleClaim;
    };
    RolesPermissionsComponent.prototype.save = function () {
        var _this = this;
        var childrensUpdate;
        this.updateRoleClaimPermission.id = this.id;
        this.updateRoleClaimPermission.Claims = this.items.map(function (x) { return _this.mapToRoleClaimPermission(x); });
        // this.items.forEach(function(value){
        //       value.children.forEach(function(value1){
        //          //childrensUpdate.childrens. = value1.text;
        //          //childrensUpdate.childrens = value1.value;
        //     });
        // });
        console.log(childrensUpdate);
        this.rolesServices.saveRoleClaims(this.updateRoleClaimPermission);
    };
    RolesPermissionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-roles-permissions',
            template: __webpack_require__(/*! ./roles-permissions.component.html */ "./src/app/roles/roles-permissions/roles-permissions.component.html"),
            styles: [__webpack_require__(/*! ./roles-permissions.component.css */ "./src/app/roles/roles-permissions/roles-permissions.component.css")]
        }),
        __metadata("design:paramtypes", [_services_roles_permissions_service__WEBPACK_IMPORTED_MODULE_4__["RolesPermissionsService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], RolesPermissionsComponent);
    return RolesPermissionsComponent;
}());



/***/ }),

/***/ "./src/app/roles/roles.component.css":
/*!*******************************************!*\
  !*** ./src/app/roles/roles.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/roles/roles.component.html":
/*!********************************************!*\
  !*** ./src/app/roles/roles.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table class=\"table\">\n    <thead>\n      <tr>\n        <th scope=\"col\">Roles</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let rol of modelRoles\">\n        <th scope=\"row\">{{rol.name}}</th>\n        <th scope=\"row\"><a routerLink=\"/roles/permissions/{{rol.id}}\">Permisos</a></th>\n      </tr>\n    </tbody>\n  </table>\n"

/***/ }),

/***/ "./src/app/roles/roles.component.ts":
/*!******************************************!*\
  !*** ./src/app/roles/roles.component.ts ***!
  \******************************************/
/*! exports provided: RolesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesComponent", function() { return RolesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_role_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/role.service */ "./src/app/_services/role.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RolesComponent = /** @class */ (function () {
    function RolesComponent(rolesService) {
        this.rolesService = rolesService;
    }
    RolesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rolesService.getAllRoles().subscribe(function (x) {
            return _this.modelRoles = x;
        });
    };
    RolesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-roles',
            template: __webpack_require__(/*! ./roles.component.html */ "./src/app/roles/roles.component.html"),
            styles: [__webpack_require__(/*! ./roles.component.css */ "./src/app/roles/roles.component.css")]
        }),
        __metadata("design:paramtypes", [_services_role_service__WEBPACK_IMPORTED_MODULE_1__["RoleService"]])
    ], RolesComponent);
    return RolesComponent;
}());



/***/ }),

/***/ "./src/app/users/createuser/createuser.component.css":
/*!***********************************************************!*\
  !*** ./src/app/users/createuser/createuser.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ng-valid[required], .ng-valid.required  {\r\n  border-left: 5px solid #42A948; /* green */\r\n}\r\n\r\n.ng-invalid:not(form)  {\r\n  border-left: 5px solid #a94442; /* red */\r\n}\r\n\r\n.navarStyle {\r\n  font-size : 13px;\r\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n  padding-top: 1px;\r\n}\r\n\r\ninput{\r\nfont-size : 13px;\r\nfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  \r\n}"

/***/ }),

/***/ "./src/app/users/createuser/createuser.component.html":
/*!************************************************************!*\
  !*** ./src/app/users/createuser/createuser.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container col-4 navarStyle\">\r\n        <h2>Crear</h2>\r\n        <form (ngSubmit)=\"onSubmit()\" #userForm=\"ngForm\">\r\n            \r\n            <div style=\"margin-bottom:5px;\" class=\"form-group\">\r\n                <input class=\"form-control\" [(ngModel)]=\"model.dni\" #Dni=\"ngModel\" required name=\"Dni\" id=\"Dni\" type=\"number\"\r\n                    placeholder=\"Dni\">\r\n            </div>\r\n    \r\n            <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Dni.invalid\" clas=\"alert alert-danger\">\r\n                Dni Incorrecto\r\n            </div>\r\n    \r\n            <div style=\"margin-bottom:5px;\" class=\"form-group\">\r\n                <input class=\"form-control\" [(ngModel)]=\"model.userName\" required #Usuario=\"ngModel\" name=\"Usuario\" type=\"text\"\r\n                    placeholder=\"Username\" value=\"\">\r\n            </div>\r\n    \r\n            <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Usuario.invalid\" class=\"alert alert-danger\">\r\n                Usuario Incorrecto\r\n            </div>\r\n    \r\n            <div style=\"margin-bottom:5px;\" class=\"form-group\">\r\n                <input class=\"form-control\" [(ngModel)]=\"model.password\" #Usuario=\"ngModel\" name=\"Password\" type=\"password\"\r\n                    placeholder=\"Nueva Contraseña\" value=\"\">\r\n            </div>\r\n    \r\n            <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Password.invalid\" class=\"alert alert-danger\">\r\n                Contraseña Incorrecta\r\n            </div>\r\n    \r\n            <div class=\"form-group\" style=\"margin-bottom : 0px;\">\r\n                <div class=\"row\">\r\n                    <li *ngFor=\"let rol of model.rolesUser\" style=\"list-style:none\">\r\n                        <div class=\"col\">\r\n                            <input type=\"checkbox\" name=\"{{rol.id}}\" value=\"{{rol.id}}\" [(ngModel)]=\"rol.rolBelongUser\" />\r\n                            <label class=\"navarStyle\" style=\"text-transform: capitalize; padding-left: 5px;font-size: 11px;\" for=\"exampleCheck1\">{{rol.name}}</label>\r\n                        </div>\r\n                    </li>\r\n                </div>\r\n            </div> \r\n    \r\n            <div style=\"margin-bottom:5px;\" class=\"form-group\">\r\n                <input class=\"form-control\" [(ngModel)]=\"model.phoneNumber\" required #PhoneNumber=\"ngModel\" name=\"phoneNumber\"\r\n                    type=\"text\" placeholder=\"Telefóno\" value=\"\">\r\n            </div>\r\n            \r\n            <div style=\"margin-top: 10px;\" *ngIf=\"submitted && PhoneNumber.invalid\" class=\"alert alert-danger\">\r\n                Telefóno Incorrecto\r\n            </div>\r\n    \r\n            <div style=\"margin-bottom:5px;\" class=\"form-group\">\r\n                <button class=\"btn btn-success navarStyle\" [disabled]=\"!userForm.form.valid\">Guardar</button>\r\n                <a style=\"margin-left : 5px;\" class=\"btn btn-primary navarStyle\" href=\"\" routerLink=\"/users\">atrás</a>\r\n            </div>\r\n    \r\n        </form>\r\n        <div style=\"margin-top: 10px;\" *ngIf=\"userForm.form.invalid\">\r\n            Hay Campos erroneos en el formulario, verifiquelos\r\n        </div>\r\n    </div>\r\n\r\n\r\n    \r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/users/createuser/createuser.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/users/createuser/createuser.component.ts ***!
  \**********************************************************/
/*! exports provided: CreateuserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateuserComponent", function() { return CreateuserComponent; });
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users */ "./src/app/users/users.ts");
/* harmony import */ var _services_role_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/role.service */ "./src/app/_services/role.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateuserComponent = /** @class */ (function () {
    function CreateuserComponent(UserService, rolService) {
        this.UserService = UserService;
        this.rolService = rolService;
        this.model = new _users__WEBPACK_IMPORTED_MODULE_2__["createUser"]();
        this.errors = [];
    }
    CreateuserComponent.prototype.addUser = function () {
        var _this = this;
        console.log(this.model);
        this.UserService.createWithObjectUser(this.model).subscribe(function (data) {
            console.log("POST Request is successful ", data);
        }, function (error) {
            _this.errors = error.error.notifications;
        });
        ;
    };
    CreateuserComponent.prototype.getAllRoles = function () {
        var _this = this;
        this.rolService.getAll().subscribe(function (rol) { return _this.model.rolesUser = rol; });
    };
    CreateuserComponent.prototype.onSubmit = function () {
        this.addUser();
    };
    CreateuserComponent.prototype.ngOnInit = function () {
        this.getAllRoles();
    };
    CreateuserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-createuser',
            template: __webpack_require__(/*! ./createuser.component.html */ "./src/app/users/createuser/createuser.component.html"),
            styles: [__webpack_require__(/*! ./createuser.component.css */ "./src/app/users/createuser/createuser.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_0__["UserService"], _services_role_service__WEBPACK_IMPORTED_MODULE_3__["RoleService"]])
    ], CreateuserComponent);
    return CreateuserComponent;
}());



/***/ }),

/***/ "./src/app/users/modifyuser/modifyuser.component.css":
/*!***********************************************************!*\
  !*** ./src/app/users/modifyuser/modifyuser.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ng-valid[required], .ng-valid.required  {\r\n    border-left: 5px solid #42A948; /* green */\r\n  }\r\n  \r\n.ng-invalid:not(form)  {\r\n    border-left: 5px solid #a94442; /* red */\r\n}\r\n  \r\n.navarStyle {\r\n    font-size : 13px;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    padding-top: 1px;\r\n  }\r\n  \r\ninput{\r\nfont-size : 13px;\r\nfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  \r\n}"

/***/ }),

/***/ "./src/app/users/modifyuser/modifyuser.component.html":
/*!************************************************************!*\
  !*** ./src/app/users/modifyuser/modifyuser.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container col-4 navarStyle\">\n    <h2>Modificar</h2>\n    <form (ngSubmit)=\"onSubmit()\" #userForm=\"ngForm\">\n        \n        <div style=\"margin-bottom:5px;\" class=\"form-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.dni\" #Dni=\"ngModel\" required name=\"Dni\" id=\"Dni\" type=\"number\"\n                placeholder=\"Dni\">\n        </div>\n\n        <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Dni.invalid\" clas=\"alert alert-danger\">\n            Dni Incorrecto\n        </div>\n\n        <div style=\"margin-bottom:5px;\" class=\"form-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.userName\" required #Usuario=\"ngModel\" name=\"Usuario\" type=\"text\"\n                placeholder=\"Username\" value=\"\">\n        </div>\n\n        <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Usuario.invalid\" class=\"alert alert-danger\">\n            Usuario Incorrecto\n        </div>\n\n        <div style=\"margin-bottom:5px;\" class=\"form-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.password\" #Usuario=\"ngModel\" name=\"Password\" type=\"password\"\n                placeholder=\"Nueva Contraseña\" value=\"\">\n        </div>\n\n        <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Password.invalid\" class=\"alert alert-danger\">\n            Contraseña Incorrecta\n        </div>\n\n        <div class=\"form-group\" style=\"margin-bottom : 0px;\">\n            <div class=\"row\">\n                <li *ngFor=\"let rol of model.rolesUser\" style=\"list-style:none\">\n                    <div class=\"col\">\n                        <input type=\"checkbox\" name=\"{{rol.id}}\" value=\"{{rol.id}}\" [(ngModel)]=\"rol.rolBelongUser\" />\n                        <label class=\"navarStyle\" style=\"text-transform: capitalize; padding-left: 5px;font-size: 11px;\" for=\"exampleCheck1\">{{rol.name}}</label>\n                    </div>\n                </li>\n            </div>\n        </div> \n\n        <div style=\"margin-bottom:5px;\" class=\"form-group\">\n            <input class=\"form-control\" [(ngModel)]=\"model.phoneNumber\" required #PhoneNumber=\"ngModel\" name=\"phoneNumber\"\n                type=\"text\" placeholder=\"Telefóno\" value=\"\">\n        </div>\n        \n        <div style=\"margin-top: 10px;\" *ngIf=\"submitted && PhoneNumber.invalid\" class=\"alert alert-danger\">\n            Telefóno Incorrecto\n        </div>\n\n        <div style=\"margin-bottom:5px;\" class=\"form-group\">\n            <button class=\"btn btn-success navarStyle\" [disabled]=\"!userForm.form.valid\">Guardar</button>\n            <a style=\"margin-left : 5px;\" class=\"btn btn-primary navarStyle\" href=\"\" routerLink=\"/users\">atrás</a>\n        </div>\n\n    </form>\n    <div style=\"margin-top: 10px;\" *ngIf=\"userForm.form.invalid\">\n        Hay Campos erroneos en el formulario, verifiquelos\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/users/modifyuser/modifyuser.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/users/modifyuser/modifyuser.component.ts ***!
  \**********************************************************/
/*! exports provided: ModifyuserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifyuserComponent", function() { return ModifyuserComponent; });
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../users */ "./src/app/users/users.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ModifyuserComponent = /** @class */ (function () {
    function ModifyuserComponent(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.model = new _users__WEBPACK_IMPORTED_MODULE_4__["modifyUser"];
    }
    ModifyuserComponent.prototype.onChange = function (rol) {
        console.log(rol.rolBelongUser);
    };
    ModifyuserComponent.prototype.onSubmit = function () {
        var _this = this;
        this.model.id = this.id;
        this.userService.updateUsers(this.model).subscribe(function (result) {
            _this.router.navigate(['/users']);
        }, function (error) {
            // this.errors = error.error.notifications;
        });
        this.router.navigate([_users_component__WEBPACK_IMPORTED_MODULE_0__["UsersComponent"]]);
    };
    ModifyuserComponent.prototype.ngOnInit = function () {
        var _this = this;
        //le asigno el id que extraigo de la url
        this.route.params.subscribe(function (p) { return _this.id = p.id; });
        this.userService.getById(this.id).subscribe(function (i) {
            _this.model.dni = i.dni,
                _this.model.userName = i.userName,
                _this.model.id = i.id,
                _this.model.phoneNumber = i.phoneNumber,
                _this.model.rolesUser = i.rolesUser;
        });
    };
    ModifyuserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-modifyuser',
            template: __webpack_require__(/*! ./modifyuser.component.html */ "./src/app/users/modifyuser/modifyuser.component.html"),
            styles: [__webpack_require__(/*! ./modifyuser.component.css */ "./src/app/users/modifyuser/modifyuser.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], ModifyuserComponent);
    return ModifyuserComponent;
}());



/***/ }),

/***/ "./src/app/users/photo-profile/photo-profile.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/users/photo-profile/photo-profile.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".my-drop-zone { border: dotted 3px lightgray; }\r\n.nv-file-over { border: dotted 3px red; }\r\n/* Default class applied to drop zones on over */\r\n.another-file-over-class { border: dotted 3px green; }\r\nhtml, body { height: 100%; }\r\n.image {\r\n    opacity: 1;\r\n    display: block;\r\n    width: 50;\r\n    height: auto;\r\n    transition: .5s ease;\r\n    -webkit-backface-visibility: hidden;\r\n            backface-visibility: hidden;\r\n}\r\n.imageUrl {\r\n    opacity: 1;\r\n    display: block;\r\n    width: 200px;\r\n    height: 200px;\r\n    transition: .5s ease;\r\n    -webkit-backface-visibility: hidden;\r\n            backface-visibility: hidden;\r\n}\r\n.text {\r\n    background-color: #4CAF50;\r\n    color: white;\r\n    font-size: 16px;\r\n    padding: 16px 32px;\r\n}\r\n.textDanger {\r\n    background-color: #FF0A0A;\r\n    color: white;\r\n    font-size: 16px;\r\n    padding: 16px 32px;\r\n}\r\n.container-image {\r\n    position: relative;\r\n    width: 25;\r\n    height: 25;\r\n}\r\n.container-image-url {\r\n    position: relative;\r\n    width: 15;\r\n    height: 15;\r\n}\r\n.middle {\r\n    transition: .5s ease;\r\n    opacity: 0;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    -ms-transform: translate(-50%, -50%);\r\n    text-align: center;\r\n  }\r\n.middle-url {\r\n    transition: .5s ease;\r\n    opacity: 0;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 32%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    -ms-transform: translate(-50%, -50%);\r\n    text-align: center;\r\n  }\r\n.container:hover .image {\r\n    opacity: 0.3;\r\n  }\r\n.container:hover .middle {\r\n    opacity: 1;\r\n  }\r\n.container:hover .middle-url {\r\n    opacity: 1;\r\n  }\r\n.btn-file {\r\n    position: relative;\r\n    overflow: hidden;\r\n}\r\n.btn-file input[type=file] {\r\n    top: 0;\r\n    right: 0;\r\n    min-width: 100%;\r\n    min-height: 100%;\r\n    font-size: 10px;\r\n    text-align: right;\r\n    filter: alpha(opacity=0);\r\n    outline: none;\r\n    background: transparent;\r\n    cursor: inherit;\r\n    display: block;\r\n}"

/***/ }),

/***/ "./src/app/users/photo-profile/photo-profile.component.html":
/*!******************************************************************!*\
  !*** ./src/app/users/photo-profile/photo-profile.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <div class=\"navbar navbar-default\">\n        <div class=\"navbar-header\">\n            <h3>Imagen de Perfil</h3>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <div *ngIf=\"!url\" class=\"container-image col-md-6\">\n            <img src=\"{{urlImage}}\" class=\"image\" height=\"25\" with=\"25\">\n            <div class=\"middle\">\n                <span class=\"btn btn-default btn-file\">\n                    <input class=\"text\" type=\"file\" id=\"fileUpload\" (change)=\"onSelectFile($event)\" ng2FileSelect\n                        [uploader]=\"uploader\" value=\"Cambiar\" />\n                </span>\n            </div>\n            <br>\n            <button type=\"button\" class=\"btn btn-danger btn-xs\" (click)=\"eliminarPerfil()\">\n                    <fa-icon icon=\"trash\"></fa-icon>\n            </button>\n        </div>\n</div>\n\n<div *ngIf=\"url\" class=\"container-image-url col-md-6\">\n        <img [src]=\"url\" class=\"imageUrl\" height=\"25\" with=\"25\">\n\n        <ul *ngFor=\"let item of uploader.queue\">\n            <div class=\"middle-url\">\n                <span class=\"btn btn-default btn-file ml-3\">\n                    <button type=\"button\" class=\"btn text\" (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\n                        <fa-icon icon=\"upload\"></fa-icon>\n                    </button>\n                    <button type=\"button\" class=\"btn textDanger\" (click)=\"removePreview()\">\n                        <fa-icon icon=\"trash\"></fa-icon>\n                    </button>\n                </span>\n            </div>\n\n        </ul>\n</div>\n    <br>\n    <!--<div class=\"col-md-9\" style=\"margin-bottom: 40px\" *ngIf=\"uploader?.queue?.length\">\n        <div class=\"col-md-3\">\n\n            <div ng2FileDrop [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\" (fileOver)=\"fileOverBase($event)\"\n                [uploader]=\"uploader\" class=\"card bg-faded p-3 text-center mb-3 my-drop-zone\">\n                <fa-icon icon=\"upload\"></fa-icon>\n                <b>Arrastre su imagen aqui</b>\n            </div>\n            <br>\n        </div>\n         <h3>Upload queue</h3>\n        <p>Queue length: {{ uploader?.queue?.length }}</p>\n    </div>-->\n\n</div>"

/***/ }),

/***/ "./src/app/users/photo-profile/photo-profile.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/users/photo-profile/photo-profile.component.ts ***!
  \****************************************************************/
/*! exports provided: PhotoProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoProfileComponent", function() { return PhotoProfileComponent; });
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_mess_between_comp_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_services/mess-between-comp.service */ "./src/app/_services/mess-between-comp.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PhotoProfileComponent = /** @class */ (function () {
    function PhotoProfileComponent(authService, messaBetweenComp, userService) {
        this.authService = authService;
        this.messaBetweenComp = messaBetweenComp;
        this.userService = userService;
        this.hasBaseDropZoneOver = false;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.url = '';
    }
    PhotoProfileComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    PhotoProfileComponent.prototype.initializeUploader = function () {
        var _this = this;
        this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_3__["FileUploader"]({
            url: this.baseUrl + this.authService.userId('id'),
            authToken: 'Bearer ' + this.authService.userId('token'),
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            if (response) {
                _this.urlImage = _this.authService.urlFile(_this.idUser, 200, 200) + "r=" + (Math.random() * 100) + 1;
                _this.messaBetweenComp.sendMessage(_this.urlImage);
            }
        };
    };
    PhotoProfileComponent.prototype.onSelectFile = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = function (event) {
                _this.url = event.target.result;
            };
        }
    };
    PhotoProfileComponent.prototype.ngOnInit = function () {
        //image
        this.initializeUploader();
        this.idUser = this.authService.userId('id');
        this.urlImage = this.authService.urlFile(this.idUser, 200, 200);
    };
    PhotoProfileComponent.prototype.removePreview = function () {
        this.url = '';
        this.uploader.cancelAll();
        this.uploader.clearQueue();
    };
    PhotoProfileComponent.prototype.eliminarPerfil = function () {
        this.userService.deleteProfilePhoto(this.idUser);
        this.urlImage = this.authService.urlFile(this.idUser, 200, 200);
        this.url = '';
    };
    PhotoProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-photo-profile',
            template: __webpack_require__(/*! ./photo-profile.component.html */ "./src/app/users/photo-profile/photo-profile.component.html"),
            styles: [__webpack_require__(/*! ./photo-profile.component.css */ "./src/app/users/photo-profile/photo-profile.component.css")]
        }),
        __metadata("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"],
            _services_mess_between_comp_service__WEBPACK_IMPORTED_MODULE_6__["MessBetweenCompService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_0__["UserService"]])
    ], PhotoProfileComponent);
    return PhotoProfileComponent;
}());



/***/ }),

/***/ "./src/app/users/settingofuser/settingofuser.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/users/settingofuser/settingofuser.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/users/settingofuser/settingofuser.component.html":
/*!******************************************************************!*\
  !*** ./src/app/users/settingofuser/settingofuser.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngb-tabset type=\"pills\">\n    <ngb-tab title=\"Perfil\">\n        <ng-template ngbTabContent>\n            <div class=\"container col-4\">\n                <h2>Mi Perfil</h2>\n                <form (ngSubmit)=\"onSubmit()\" #userForm=\"ngForm\">\n                    \n                    <div style=\"margin-bottom:5px;\" class=\"form-group\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.dni\" #Dni=\"ngModel\" required name=\"Dni\" id=\"Dni\" type=\"number\"\n                            placeholder=\"Dni\">\n                    </div>\n                \n                    <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Dni.invalid\" clas=\"alert alert-danger\">\n                        Dni Incorrecto\n                    </div>\n                \n                    <div style=\"margin-bottom:5px;\" class=\"form-group\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.userName\" required #Usuario=\"ngModel\" name=\"Usuario\" type=\"text\"\n                            placeholder=\"Username\" value=\"\">\n                    </div>\n                \n                    <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Usuario.invalid\" class=\"alert alert-danger\">\n                        Usuario Incorrecto\n                    </div>\n                \n                    <div style=\"margin-bottom:5px;\" class=\"form-group\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.password\" #Usuario=\"ngModel\" name=\"Password\" type=\"password\"\n                            placeholder=\"Nueva Contraseña\" value=\"\">\n                    </div>\n                \n                    <div style=\"margin-top: 10px;\" *ngIf=\"submitted && Password.invalid\" class=\"alert alert-danger\">\n                        Contraseña Incorrecta\n                    </div>\n                \n                    <div class=\"form-group\" style=\"margin-bottom : 0px;\">\n                        <div class=\"row\">\n                            <li *ngFor=\"let rol of model.rolesUser\" style=\"list-style:none\">\n                                <div class=\"col\">\n                                    <input type=\"checkbox\" name=\"{{rol.id}}\" value=\"{{rol.id}}\" [(ngModel)]=\"rol.rolBelongUser\" />\n                                    <label class=\"navarStyle\" style=\"text-transform: capitalize; padding-left: 5px;font-size: 11px;\" for=\"exampleCheck1\">{{rol.name}}</label>\n                                </div>\n                            </li>\n                        </div>\n                    </div> \n                \n                    <div style=\"margin-bottom:5px;\" class=\"form-group\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.phoneNumber\" required #PhoneNumber=\"ngModel\" name=\"phoneNumber\"\n                            type=\"text\" placeholder=\"Telefóno\" value=\"\">\n                    </div>\n                    \n                    <div style=\"margin-top: 10px;\" *ngIf=\"submitted && PhoneNumber.invalid\" class=\"alert alert-danger\">\n                        Telefóno Incorrecto\n                    </div>\n                \n                    <div style=\"margin-bottom:5px;\" class=\"form-group\">\n                        <button class=\"btn btn-success navarStyle\" [disabled]=\"!userForm.form.valid\">Guardar</button>\n                        <a style=\"margin-left : 5px;\" class=\"btn btn-primary navarStyle\" href=\"\" routerLink=\"/users\">atrás</a>\n                    </div>\n                \n                \n                </form>\n                <div style=\"margin-top: 10px;\" *ngIf=\"userForm.form.invalid\">\n                    Hay Campos erroneos en el formulario, verifiquelos\n                </div>\n            </div>\n        </ng-template>\n    </ngb-tab>\n    <ngb-tab>\n        <ng-template ngbTabTitle>Imagen</ng-template>\n        <ng-template ngbTabContent>\n            <div class=\"container col-8 \">\n                <app-photo-profile></app-photo-profile>\n            </div>\n        </ng-template>\n    </ngb-tab>\n</ngb-tabset>\n\n\n"

/***/ }),

/***/ "./src/app/users/settingofuser/settingofuser.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/users/settingofuser/settingofuser.component.ts ***!
  \****************************************************************/
/*! exports provided: SettingofuserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingofuserComponent", function() { return SettingofuserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../users */ "./src/app/users/users.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingofuserComponent = /** @class */ (function () {
    function SettingofuserComponent(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.model = new _users__WEBPACK_IMPORTED_MODULE_4__["modifyUser"];
        this.id = 0;
    }
    SettingofuserComponent.prototype.onChange = function (rol) {
        console.log(rol.rolBelongUser);
    };
    SettingofuserComponent.prototype.onSubmit = function () {
        var _this = this;
        this.model.id = this.id;
        this.userService.updateProfileUsers(this.model).subscribe(function (result) {
            _this.router.navigate(['/users']);
        }, function (error) {
            // this.errors = error.error.notifications;
        });
        this.router.navigate([_users_component__WEBPACK_IMPORTED_MODULE_1__["UsersComponent"]]);
    };
    SettingofuserComponent.prototype.ngOnInit = function () {
        var _this = this;
        //le asigno el id que extraigo de la url
        this.route.params.subscribe(function (p) { return _this.id = p.id; });
        this.userService.getById(this.id).subscribe(function (i) {
            _this.model.dni = i.dni,
                _this.model.userName = i.userName,
                _this.model.id = i.id,
                _this.model.phoneNumber = i.phoneNumber,
                _this.model.rolesUser = i.rolesUser;
        });
    };
    SettingofuserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settingofuser',
            template: __webpack_require__(/*! ./settingofuser.component.html */ "./src/app/users/settingofuser/settingofuser.component.html"),
            styles: [__webpack_require__(/*! ./settingofuser.component.css */ "./src/app/users/settingofuser/settingofuser.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], SettingofuserComponent);
    return SettingofuserComponent;
}());



/***/ }),

/***/ "./src/app/users/users.component.css":
/*!*******************************************!*\
  !*** ./src/app/users/users.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');\r\n.navarStyle {\r\n    font-size : 13px;\r\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    padding-top: 1px;\r\n  }"

/***/ }),

/***/ "./src/app/users/users.component.html":
/*!********************************************!*\
  !*** ./src/app/users/users.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a href=\"\" class=\"btn btn-success mb-3\" routerLink=\"create\">\r\n\t<fa-icon icon=\"user-plus\"></fa-icon>\r\n</a>\r\n<table class=\"table table-hover\">\r\n\t<thead>\r\n\t\t<tr style=\"font-weight: bold;\">\r\n\t\t\t<td>Dni</td>\r\n\t\t\t<td>Usuario</td>\r\n\t\t\t<td>Accción<td>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody>\r\n\t\t<tr *ngFor=\"let user of user_list\">\r\n\t\t\t<td>{{user.dni}}</td>\r\n\t\t\t<td>{{user.userName}}</td>\r\n\t\t\t<td>\r\n\t\t\t\t<div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\r\n\t\t\t\t\t<button type=\"button\" routerLink=\"/update/{{user.id}}\" class=\"btn btn-default\">\r\n\t\t\t\t\t\t<fa-icon icon=\"edit\"></fa-icon>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t\t<button type=\"button\" routerLink=\"/users\" (click)=\"openEliminar(user.id,user.dni,user.userName)\" class=\"btn btn-danger\">\r\n\t\t\t\t\t\t<fa-icon icon=\"trash\"></fa-icon>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n\r\n<ngb-pagination (pageChange)=\"loadPage($event)\" [collectionSize]=\"col_size\" [pageSize]=\"itemsPerPage\" [(page)]=\"page\"\r\n aria-label=\"Default pagination\"></ngb-pagination>"

/***/ }),

/***/ "./src/app/users/users.component.ts":
/*!******************************************!*\
  !*** ./src/app/users/users.component.ts ***!
  \******************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _models_roles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../_models/roles */ "./src/app/_models/roles.ts");
/* harmony import */ var _modals_modals_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../modals/modals.component */ "./src/app/modals/modals.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersComponent = /** @class */ (function () {
    function UsersComponent(var_user_service, modalService) {
        this.var_user_service = var_user_service;
        this.modalService = modalService;
        this.page = 0;
        this.itemsPerPage = 10;
        this.displayedColumns = ['dni', 'userName'];
        this.changeRolDto = new _models_roles__WEBPACK_IMPORTED_MODULE_0__["RoleUserDto"]();
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getAllUsers(this.page);
    };
    UsersComponent.prototype.loadPage = function (page) {
        if (page != 0) {
            this.getAllUsers(page - 1);
        }
    };
    UsersComponent.prototype.getAllUsers = function (page) {
        var _this = this;
        this.var_user_service.getPaginator(page).subscribe(function (result) {
            _this.user_list = result.list;
            _this.col_size = result.totalRecords;
        });
    };
    //MODALS
    UsersComponent.prototype.openEliminar = function (id, dni, usuario) {
        var _this = this;
        var modalRef = this.modalService.open(_modals_modals_component__WEBPACK_IMPORTED_MODULE_1__["NgbdModalContent"]);
        modalRef.componentInstance.Encabezado = "Eliminar";
        modalRef.componentInstance.Contenido = "¿Desea eliminar a " + dni + " " + usuario + "?";
        modalRef.componentInstance.GuardaroEliminar = "Eliminar";
        modalRef.result.then(function () {
            _this.var_user_service.deleteUser(id).subscribe(function (data) {
                _this.getAllUsers(_this.page);
            }, function (error) {
                console.log("error", error);
            });
        }, function () {
            console.log('Backdrop click');
        });
    };
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.css */ "./src/app/users/users.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/users/users.ts":
/*!********************************!*\
  !*** ./src/app/users/users.ts ***!
  \********************************/
/*! exports provided: User, rolesBelongUser, modifyUser, createUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rolesBelongUser", function() { return rolesBelongUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifyUser", function() { return modifyUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUser", function() { return createUser; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());

var rolesBelongUser = /** @class */ (function () {
    function rolesBelongUser() {
    }
    return rolesBelongUser;
}());

var modifyUser = /** @class */ (function (_super) {
    __extends(modifyUser, _super);
    function modifyUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return modifyUser;
}(User));

var createUser = /** @class */ (function (_super) {
    __extends(createUser, _super);
    function createUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return createUser;
}(modifyUser));



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'http://localhost:63098/api/File/'
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Dev\Devlights\BaseProject\Client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map