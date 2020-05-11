(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/api/src/app/app.controller.ts":
/*!********************************************!*\
  !*** ./apps/api/src/app/app.controller.ts ***!
  \********************************************/
/*! exports provided: AppController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppController", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.service */ "./apps/api/src/app/app.service.ts");
var _a;



let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
};
AppController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"] !== "undefined" && _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]) === "function" ? _a : Object])
], AppController);



/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/*!****************************************!*\
  !*** ./apps/api/src/app/app.module.ts ***!
  \****************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.controller */ "./apps/api/src/app/app.controller.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.service */ "./apps/api/src/app/app.service.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/auth.module */ "./apps/api/src/app/auth/auth.module.ts");
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./users/users.module */ "./apps/api/src/app/users/users.module.ts");
/* harmony import */ var _documents_documents_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./documents/documents.module */ "./apps/api/src/app/documents/documents.module.ts");
/* harmony import */ var _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sockets/sockets.module */ "./apps/api/src/app/sockets/sockets.module.ts");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../environments/environment */ "./apps/api/src/environments/environment.ts");












let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__["ServeStaticModule"].forRoot({
                rootPath: Object(path__WEBPACK_IMPORTED_MODULE_5__["join"])(__dirname, '..', 'doc-collab'),
                exclude: ['/api*']
            }),
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__["MongooseModule"].forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_11__["environment"].dbURI, { useNewUrlParser: true, useUnifiedTopology: true }),
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__["AuthModule"],
            _users_users_module__WEBPACK_IMPORTED_MODULE_7__["UsersModule"],
            _documents_documents_module__WEBPACK_IMPORTED_MODULE_8__["DocumentsModule"],
            _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_9__["SocketsModule"]
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_3__["AppController"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"]]
    })
], AppModule);



/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/*!*****************************************!*\
  !*** ./apps/api/src/app/app.service.ts ***!
  \*****************************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppService = class AppService {
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AppService);



/***/ }),

/***/ "./apps/api/src/app/auth/auth.controller.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/auth/auth.controller.ts ***!
  \**************************************************/
/*! exports provided: AuthController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthController", function() { return AuthController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _local_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local-auth.guard */ "./apps/api/src/app/auth/local-auth.guard.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./apps/api/src/app/auth/auth.service.ts");
var _a;




let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.authService.login(req.user);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_local_auth_guard__WEBPACK_IMPORTED_MODULE_2__["LocalAuthGuard"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('login'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Request"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('auth'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]) === "function" ? _a : Object])
], AuthController);



/***/ }),

/***/ "./apps/api/src/app/auth/auth.module.ts":
/*!**********************************************!*\
  !*** ./apps/api/src/app/auth/auth.module.ts ***!
  \**********************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./apps/api/src/app/auth/auth.service.ts");
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../users/users.module */ "./apps/api/src/app/users/users.module.ts");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _local_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./local.strategy */ "./apps/api/src/app/auth/local.strategy.ts");
/* harmony import */ var _auth_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.controller */ "./apps/api/src/app/auth/auth.controller.ts");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../environments/environment */ "./apps/api/src/environments/environment.ts");
/* harmony import */ var _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jwt.strategy */ "./apps/api/src/app/auth/jwt.strategy.ts");
/* harmony import */ var _ws_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ws.auth */ "./apps/api/src/app/auth/ws.auth.ts");











let AuthModule = class AuthModule {
};
AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _users_users_module__WEBPACK_IMPORTED_MODULE_3__["UsersModule"],
            _nestjs_passport__WEBPACK_IMPORTED_MODULE_4__["PassportModule"],
            _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__["JwtModule"].register({
                secret: _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].JWT_SECRET,
                signOptions: { expiresIn: '7200s' }
            })
        ],
        providers: [
            _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _local_strategy__WEBPACK_IMPORTED_MODULE_5__["LocalStrategy"],
            _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__["JwtStrategy"],
            _ws_auth__WEBPACK_IMPORTED_MODULE_10__["WsAuth"],
        ],
        controllers: [_auth_controller__WEBPACK_IMPORTED_MODULE_6__["AuthController"]],
        exports: [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _ws_auth__WEBPACK_IMPORTED_MODULE_10__["WsAuth"]]
    })
], AuthModule);



/***/ }),

/***/ "./apps/api/src/app/auth/auth.service.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/app/auth/auth.service.ts ***!
  \***********************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../users/users.service */ "./apps/api/src/app/users/users.service.ts");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ws_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ws.auth */ "./apps/api/src/app/auth/ws.auth.ts");
var _a, _b, _c;





let AuthService = class AuthService {
    constructor(usersService, jwtService, wsAuthService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.wsAuthService = wsAuthService;
    }
    validateUser(username, pass) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.usersService.findByUsername(username);
            if (user && user.password === pass) {
                delete user.password;
                return user;
            }
            return null;
        });
    }
    login(user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const payload = { username: user.username, sub: user._id };
            return {
                access_token: this.jwtService.sign(payload)
            };
        });
    }
    retrieveUser(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const payload = yield this.wsAuthService.validate(socket.handshake.query.token);
            return this.usersService.findUserById(payload.sub);
        });
    }
};
AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"]) === "function" ? _a : Object, typeof (_b = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"] !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"]) === "function" ? _b : Object, typeof (_c = typeof _ws_auth__WEBPACK_IMPORTED_MODULE_4__["WsAuth"] !== "undefined" && _ws_auth__WEBPACK_IMPORTED_MODULE_4__["WsAuth"]) === "function" ? _c : Object])
], AuthService);



/***/ }),

/***/ "./apps/api/src/app/auth/jwt.strategy.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/app/auth/jwt.strategy.ts ***!
  \***********************************************/
/*! exports provided: JwtStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtStrategy", function() { return JwtStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-jwt */ "passport-jwt");
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../environments/environment */ "./apps/api/src/environments/environment.ts");





let JwtStrategy = class JwtStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportStrategy"])(passport_jwt__WEBPACK_IMPORTED_MODULE_1__["Strategy"]) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_1__["ExtractJwt"].fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].JWT_SECRET,
        });
    }
    validate(payload) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return { _id: payload.sub, username: payload.username };
        });
    }
};
JwtStrategy = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], JwtStrategy);



/***/ }),

/***/ "./apps/api/src/app/auth/local-auth.guard.ts":
/*!***************************************************!*\
  !*** ./apps/api/src/app/auth/local-auth.guard.ts ***!
  \***************************************************/
/*! exports provided: LocalAuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalAuthGuard", function() { return LocalAuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let LocalAuthGuard = class LocalAuthGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"])('local') {
};
LocalAuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], LocalAuthGuard);



/***/ }),

/***/ "./apps/api/src/app/auth/local.strategy.ts":
/*!*************************************************!*\
  !*** ./apps/api/src/app/auth/local.strategy.ts ***!
  \*************************************************/
/*! exports provided: LocalStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStrategy", function() { return LocalStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-local */ "passport-local");
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.service */ "./apps/api/src/app/auth/auth.service.ts");
var _a;





let LocalStrategy = class LocalStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportStrategy"])(passport_local__WEBPACK_IMPORTED_MODULE_1__["Strategy"]) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(username, pass) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(username, pass);
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_3__["UnauthorizedException"]();
            }
            return user;
        });
    }
};
LocalStrategy = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]) === "function" ? _a : Object])
], LocalStrategy);



/***/ }),

/***/ "./apps/api/src/app/auth/ws.auth.ts":
/*!******************************************!*\
  !*** ./apps/api/src/app/auth/ws.auth.ts ***!
  \******************************************/
/*! exports provided: WsAuth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WsAuth", function() { return WsAuth; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../users/users.service */ "./apps/api/src/app/users/users.service.ts");
var _a, _b;




let WsAuth = class WsAuth {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    validate(token) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.jwtService.verify(token, { ignoreExpiration: true });
        });
    }
    getUser(token) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const payload = yield this.jwtService.verify(token, { ignoreExpiration: true });
            return this.usersService.userModelById(payload.sub);
        });
    }
};
WsAuth = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtService"] !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtService"]) === "function" ? _a : Object, typeof (_b = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"]) === "function" ? _b : Object])
], WsAuth);



/***/ }),

/***/ "./apps/api/src/app/auth/ws.guard.ts":
/*!*******************************************!*\
  !*** ./apps/api/src/app/auth/ws.guard.ts ***!
  \*******************************************/
/*! exports provided: WsGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WsGuard", function() { return WsGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ws_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ws.auth */ "./apps/api/src/app/auth/ws.auth.ts");
var _a;



let WsGuard = class WsGuard {
    constructor(wsAuth) {
        this.wsAuth = wsAuth;
    }
    canActivate(context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const client = context.switchToWs().getClient();
            const token = client.handshake.query.token;
            const payload = this.wsAuth.validate(token);
            if (payload) {
                return true;
            }
            return false;
        });
    }
};
WsGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _ws_auth__WEBPACK_IMPORTED_MODULE_2__["WsAuth"] !== "undefined" && _ws_auth__WEBPACK_IMPORTED_MODULE_2__["WsAuth"]) === "function" ? _a : Object])
], WsGuard);



/***/ }),

/***/ "./apps/api/src/app/documents/document.schema.ts":
/*!*******************************************************!*\
  !*** ./apps/api/src/app/documents/document.schema.ts ***!
  \*******************************************************/
/*! exports provided: DocumentSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSchema", function() { return DocumentSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const CollaboratorSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    firstName: String,
    lastName: String,
    username: String,
    userId: String
});
const DocumentSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    title: String,
    owner: CollaboratorSchema,
    collaborators: [CollaboratorSchema],
    viewers: [CollaboratorSchema],
    content: {}
});


/***/ }),

/***/ "./apps/api/src/app/documents/documents.controller.ts":
/*!************************************************************!*\
  !*** ./apps/api/src/app/documents/documents.controller.ts ***!
  \************************************************************/
/*! exports provided: DocumentsController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsController", function() { return DocumentsController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let DocumentsController = class DocumentsController {
};
DocumentsController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('documents')
], DocumentsController);



/***/ }),

/***/ "./apps/api/src/app/documents/documents.gateway.ts":
/*!*********************************************************!*\
  !*** ./apps/api/src/app/documents/documents.gateway.ts ***!
  \*********************************************************/
/*! exports provided: DocumentsGateway */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsGateway", function() { return DocumentsGateway; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io */ "socket.io");
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _documents_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./documents.service */ "./apps/api/src/app/documents/documents.service.ts");
/* harmony import */ var _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @doccollab/api-interfaces */ "./libs/api-interfaces/src/index.ts");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../auth/ws.guard */ "./apps/api/src/app/auth/ws.guard.ts");
var _a, _b, _c, _d, _e, _f;







let DocumentsGateway = class DocumentsGateway {
    constructor(docService) {
        this.docService = docService;
    }
    testing(socket, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('received testing event');
        });
    }
    createDocument(socket, createDocDto) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const newDoc = yield this.docService.createDocument(socket, createDocDto);
            socket.emit('new.document', newDoc);
        });
    }
    getDocuments(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const documents = yield this.docService.getDocuments(socket);
            socket.emit('return.documents', documents);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__["WsGuard"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('testing'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _a : Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "testing", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__["WsGuard"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('create.document'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _b : Object, typeof (_c = typeof _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_4__["CreateDocDto"] !== "undefined" && _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_4__["CreateDocDto"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], DocumentsGateway.prototype, "createDocument", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__["WsGuard"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('get.documents'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _e : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "getDocuments", null);
DocumentsGateway = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WebSocketGateway"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_f = typeof _documents_service__WEBPACK_IMPORTED_MODULE_3__["DocumentsService"] !== "undefined" && _documents_service__WEBPACK_IMPORTED_MODULE_3__["DocumentsService"]) === "function" ? _f : Object])
], DocumentsGateway);



/***/ }),

/***/ "./apps/api/src/app/documents/documents.module.ts":
/*!********************************************************!*\
  !*** ./apps/api/src/app/documents/documents.module.ts ***!
  \********************************************************/
/*! exports provided: DocumentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsModule", function() { return DocumentsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _documents_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./documents.controller */ "./apps/api/src/app/documents/documents.controller.ts");
/* harmony import */ var _documents_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./documents.service */ "./apps/api/src/app/documents/documents.service.ts");
/* harmony import */ var _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sockets/sockets.module */ "./apps/api/src/app/sockets/sockets.module.ts");
/* harmony import */ var _documents_gateway__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./documents.gateway */ "./apps/api/src/app/documents/documents.gateway.ts");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _document_schema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./document.schema */ "./apps/api/src/app/documents/document.schema.ts");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../auth/auth.module */ "./apps/api/src/app/auth/auth.module.ts");
/* harmony import */ var _users_user_schema__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../users/user.schema */ "./apps/api/src/app/users/user.schema.ts");
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../users/users.module */ "./apps/api/src/app/users/users.module.ts");











let DocumentsModule = class DocumentsModule {
};
DocumentsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_4__["SocketsModule"],
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6__["MongooseModule"].forFeature([
                { name: 'AppDocument', schema: _document_schema__WEBPACK_IMPORTED_MODULE_7__["DocumentSchema"] },
                { name: 'User', schema: _users_user_schema__WEBPACK_IMPORTED_MODULE_9__["UserSchema"] }
            ]),
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__["AuthModule"],
            _users_users_module__WEBPACK_IMPORTED_MODULE_10__["UsersModule"],
        ],
        controllers: [_documents_controller__WEBPACK_IMPORTED_MODULE_2__["DocumentsController"]],
        providers: [_documents_service__WEBPACK_IMPORTED_MODULE_3__["DocumentsService"], _documents_gateway__WEBPACK_IMPORTED_MODULE_5__["DocumentsGateway"]]
    })
], DocumentsModule);



/***/ }),

/***/ "./apps/api/src/app/documents/documents.service.ts":
/*!*********************************************************!*\
  !*** ./apps/api/src/app/documents/documents.service.ts ***!
  \*********************************************************/
/*! exports provided: DocumentsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsService", function() { return DocumentsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _auth_ws_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth/ws.auth */ "./apps/api/src/app/auth/ws.auth.ts");
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../users/users.service */ "./apps/api/src/app/users/users.service.ts");
var _a, _b, _c;







let DocumentsService = class DocumentsService {
    constructor(docModel, usersService, wsAuth) {
        this.docModel = docModel;
        this.usersService = usersService;
        this.wsAuth = wsAuth;
    }
    createDocument(socket, createDocDto) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.wsAuth.getUser(socket.handshake.query.token);
            const newDoc = {
                title: createDocDto.title,
                owner: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userId: user._id,
                    username: user.username
                }
            };
            const doc = yield new this.docModel(newDoc);
            yield doc.save();
            user.ownDocs.push(doc._id);
            yield user.save();
            return doc;
        });
    }
    getDocuments(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.wsAuth.getUser(socket.handshake.query.token);
            let documents = [];
            for (const docId of user.ownDocs) {
                const document = yield this.docModel.findById(docId);
                if (!document) {
                    throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('could not locate document');
                }
                documents.push(document);
            }
            return documents;
        });
    }
};
DocumentsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__["InjectModel"])('AppDocument')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"] !== "undefined" && mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"]) === "function" ? _a : Object, typeof (_b = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"]) === "function" ? _b : Object, typeof (_c = typeof _auth_ws_auth__WEBPACK_IMPORTED_MODULE_5__["WsAuth"] !== "undefined" && _auth_ws_auth__WEBPACK_IMPORTED_MODULE_5__["WsAuth"]) === "function" ? _c : Object])
], DocumentsService);



/***/ }),

/***/ "./apps/api/src/app/sockets/socket-core.gateway.ts":
/*!*********************************************************!*\
  !*** ./apps/api/src/app/sockets/socket-core.gateway.ts ***!
  \*********************************************************/
/*! exports provided: SocketCoreGateway */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketCoreGateway", function() { return SocketCoreGateway; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io */ "socket.io");
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_3__);
var _a;




let SocketCoreGateway = class SocketCoreGateway {
    constructor() {
        this.connectedSockets = 0;
    }
    // called when a new socket connects
    handleConnection(socket) {
        this.connectedSockets++;
        console.log(`*** SOCKET CONNECTED [${this.connectedSockets}] ***`);
    }
    // called when a socket disconnects
    handleDisconnect() {
        this.connectedSockets--;
        console.log(`~~~ SOCKET DISCONNECTED [${this.connectedSockets}] ~~~`);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof socket_io__WEBPACK_IMPORTED_MODULE_3__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_3__["Socket"]) === "function" ? _a : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], SocketCoreGateway.prototype, "handleConnection", null);
SocketCoreGateway = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WebSocketGateway"])({ "pingTimeout": 30000 })
], SocketCoreGateway);



/***/ }),

/***/ "./apps/api/src/app/sockets/sockets.module.ts":
/*!****************************************************!*\
  !*** ./apps/api/src/app/sockets/sockets.module.ts ***!
  \****************************************************/
/*! exports provided: SocketsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketsModule", function() { return SocketsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket-core.gateway */ "./apps/api/src/app/sockets/socket-core.gateway.ts");



let SocketsModule = class SocketsModule {
};
SocketsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        providers: [_socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__["SocketCoreGateway"]],
        exports: [_socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__["SocketCoreGateway"]]
    })
], SocketsModule);



/***/ }),

/***/ "./apps/api/src/app/users/user.schema.ts":
/*!***********************************************!*\
  !*** ./apps/api/src/app/users/user.schema.ts ***!
  \***********************************************/
/*! exports provided: UserSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSchema", function() { return UserSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    ownDocs: [String],
    collabDocs: [String],
    viewDocs: [String]
});


/***/ }),

/***/ "./apps/api/src/app/users/users.controller.ts":
/*!****************************************************!*\
  !*** ./apps/api/src/app/users/users.controller.ts ***!
  \****************************************************/
/*! exports provided: UsersController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersController", function() { return UsersController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @doccollab/api-interfaces */ "./libs/api-interfaces/src/index.ts");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users.service */ "./apps/api/src/app/users/users.service.ts");
var _a, _b, _c, _d, _e;




let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAllUsers() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.usersService.findAllUsers();
        });
    }
    findUserById(_id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.usersService.findUserById(_id);
        });
    }
    createUser(createUserDTO) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.usersService.createUser(createUserDTO);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], UsersController.prototype, "findAllUsers", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(':_id'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])('_id')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "findUserById", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_2__["CreateUserDTO"] !== "undefined" && _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_2__["CreateUserDTO"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "createUser", null);
UsersController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('users'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof _users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"] !== "undefined" && _users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"]) === "function" ? _e : Object])
], UsersController);



/***/ }),

/***/ "./apps/api/src/app/users/users.module.ts":
/*!************************************************!*\
  !*** ./apps/api/src/app/users/users.module.ts ***!
  \************************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.controller */ "./apps/api/src/app/users/users.controller.ts");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users.service */ "./apps/api/src/app/users/users.service.ts");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _user_schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user.schema */ "./apps/api/src/app/users/user.schema.ts");






let UsersModule = class UsersModule {
};
UsersModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__["MongooseModule"].forFeature([{ name: 'User', schema: _user_schema__WEBPACK_IMPORTED_MODULE_5__["UserSchema"] }])
        ],
        controllers: [_users_controller__WEBPACK_IMPORTED_MODULE_2__["UsersController"]],
        providers: [_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"]],
        exports: [_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"]]
    })
], UsersModule);



/***/ }),

/***/ "./apps/api/src/app/users/users.service.ts":
/*!*************************************************!*\
  !*** ./apps/api/src/app/users/users.service.ts ***!
  \*************************************************/
/*! exports provided: UsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersService", function() { return UsersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__);
var _a;





let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    createUser(createUserDTO) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const createdUser = yield new this.userModel(createUserDTO);
            yield createdUser.save();
            return createdUser;
        });
    }
    findAllUsers() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.userModel.find({}).exec();
        });
    }
    findUserById(_id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(_id).exec();
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('Could not locate user', 400);
            }
            return user;
        });
    }
    userModelById(_id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(_id).exec();
            if (!user) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('could not locate');
            }
            return user;
        });
    }
    findByUsername(username) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ 'username': username }).exec();
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('Could not locate user.', 400);
            }
            return user;
        });
    }
};
UsersService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__["InjectModel"])('User')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"] !== "undefined" && mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"]) === "function" ? _a : Object])
], UsersService);



/***/ }),

/***/ "./apps/api/src/environments/environment.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/environments/environment.ts ***!
  \**************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
const environment = {
    production: false,
    dbURI: 'mongodb://localhost/doccollab',
    JWT_SECRET: 'aGoodSecret22',
    API_BASE_URL: 'http://localhost:3333/api/'
};


/***/ }),

/***/ "./apps/api/src/main.ts":
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./apps/api/src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./apps/api/src/environments/environment.ts");
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */




function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production === false) {
            app.enableCors({
                origin: 'http://localhost:4200',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
            });
        }
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            console.log('Listening at http://localhost:' + port);
        });
    });
}
bootstrap();


/***/ }),

/***/ "./libs/api-interfaces/src/index.ts":
/*!******************************************!*\
  !*** ./libs/api-interfaces/src/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/api-interfaces */ "./libs/api-interfaces/src/lib/api-interfaces.ts");
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./libs/api-interfaces/src/lib/api-interfaces.ts":
/*!*******************************************************!*\
  !*** ./libs/api-interfaces/src/lib/api-interfaces.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./apps/api/src/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/andrewgilbert/dev/doccollab/apps/api/src/main.ts */"./apps/api/src/main.ts");


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/websockets":
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map