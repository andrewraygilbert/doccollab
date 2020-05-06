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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__);
var _a, _b;




let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
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
};
AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"]) === "function" ? _a : Object, typeof (_b = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"] !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"]) === "function" ? _b : Object])
], AuthService);



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
const environment = {
    production: true,
    dbURI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppService = class AppService {
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AppService);



/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _user_schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);






let UsersModule = class UsersModule {
};
UsersModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__["MongooseModule"].forFeature([{ name: 'User', schema: _user_schema__WEBPACK_IMPORTED_MODULE_5__[/* UserSchema */ "a"] }])
        ],
        controllers: [_users_controller__WEBPACK_IMPORTED_MODULE_2__[/* UsersController */ "a"]],
        providers: [_users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"]],
        exports: [_users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"]]
    })
], UsersModule);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__, "CreateUserDTO")) __webpack_require__.d(__webpack_exports__, "CreateUserDTO", function() { return _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__["CreateUserDTO"]; });




/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketCoreGateway; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_3__);
var _a;




let SocketCoreGateway = class SocketCoreGateway {
    // called when a new socket connects
    handleConnection(socket) {
        console.log('a socket connected');
    }
    // called when a socket disconnects
    handleDisconnect() {
        console.log('a socket disconnected');
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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 16 */
/***/ (function(module, exports) {



/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _documents_documents_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(30);
/* harmony import */ var _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6);












let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__["ServeStaticModule"].forRoot({
                rootPath: Object(path__WEBPACK_IMPORTED_MODULE_5__["join"])(__dirname, '..', 'doc-collab'),
                exclude: ['/api*']
            }),
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__["MongooseModule"].forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_11__[/* environment */ "a"].dbURI, { useNewUrlParser: true, useUnifiedTopology: true }),
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__[/* AuthModule */ "a"],
            _users_users_module__WEBPACK_IMPORTED_MODULE_7__[/* UsersModule */ "a"],
            _documents_documents_module__WEBPACK_IMPORTED_MODULE_8__[/* DocumentsModule */ "a"],
            _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_9__[/* SocketsModule */ "a"]
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_3__[/* AppController */ "a"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_4__[/* AppService */ "a"]]
    })
], AppModule);



/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
var _a;



let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
};
AppController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _app_service__WEBPACK_IMPORTED_MODULE_2__[/* AppService */ "a"] !== "undefined" && _app_service__WEBPACK_IMPORTED_MODULE_2__[/* AppService */ "a"]) === "function" ? _a : Object])
], AppController);



/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _local_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var _auth_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6);
/* harmony import */ var _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(29);










let AuthModule = class AuthModule {
};
AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _users_users_module__WEBPACK_IMPORTED_MODULE_3__[/* UsersModule */ "a"],
            _nestjs_passport__WEBPACK_IMPORTED_MODULE_4__["PassportModule"],
            _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__["JwtModule"].register({
                secret: _environments_environment__WEBPACK_IMPORTED_MODULE_8__[/* environment */ "a"].JWT_SECRET,
                signOptions: { expiresIn: '7200s' }
            })
        ],
        providers: [
            _auth_service__WEBPACK_IMPORTED_MODULE_2__[/* AuthService */ "a"],
            _local_strategy__WEBPACK_IMPORTED_MODULE_5__[/* LocalStrategy */ "a"],
            _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__[/* JwtStrategy */ "a"]
        ],
        controllers: [_auth_controller__WEBPACK_IMPORTED_MODULE_6__[/* AuthController */ "a"]],
        exports: [_auth_service__WEBPACK_IMPORTED_MODULE_2__[/* AuthService */ "a"]]
    })
], AuthModule);



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
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
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof _users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"] !== "undefined" && _users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"]) === "function" ? _e : Object])
], UsersController);



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
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
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_4__[/* AuthService */ "a"] !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_4__[/* AuthService */ "a"]) === "function" ? _a : Object])
], LocalStrategy);



/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _local_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
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
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_local_auth_guard__WEBPACK_IMPORTED_MODULE_2__[/* LocalAuthGuard */ "a"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('login'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Request"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('auth'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_3__[/* AuthService */ "a"] !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_3__[/* AuthService */ "a"]) === "function" ? _a : Object])
], AuthController);



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalAuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let LocalAuthGuard = class LocalAuthGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"])('local') {
};
LocalAuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], LocalAuthGuard);



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);





let JwtStrategy = class JwtStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportStrategy"])(passport_jwt__WEBPACK_IMPORTED_MODULE_1__["Strategy"]) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_1__["ExtractJwt"].fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: _environments_environment__WEBPACK_IMPORTED_MODULE_4__[/* environment */ "a"].JWT_SECRET,
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _documents_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
/* harmony import */ var _documents_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32);




let DocumentsModule = class DocumentsModule {
};
DocumentsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        controllers: [_documents_controller__WEBPACK_IMPORTED_MODULE_2__[/* DocumentsController */ "a"]],
        providers: [_documents_service__WEBPACK_IMPORTED_MODULE_3__[/* DocumentsService */ "a"]]
    })
], DocumentsModule);



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let DocumentsController = class DocumentsController {
};
DocumentsController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('documents')
], DocumentsController);



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let DocumentsService = class DocumentsService {
};
DocumentsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], DocumentsService);



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);



let SocketsModule = class SocketsModule {
};
SocketsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        providers: [_socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__[/* SocketCoreGateway */ "a"]],
        exports: [_socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__[/* SocketCoreGateway */ "a"]]
    })
], SocketsModule);



/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(35);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */



function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_2__[/* AppModule */ "a"]);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            console.log('Listening at http://localhost:' + port);
        });
    });
}
bootstrap();


/***/ })
/******/ ])));
//# sourceMappingURL=main.js.map