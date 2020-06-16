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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
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
/***/ (function(module, exports) {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
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
    userModelByUsername(username) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ 'username': username }).exec();
            if (!user) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('cannot locate user');
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WsAuth; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
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
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtService"] !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtService"]) === "function" ? _a : Object, typeof (_b = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"]) === "function" ? _b : Object])
], WsAuth);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
const environment = {
    production: true,
    dbURI: process.env.MONGODB_URI,
    REDIS_URI: 'redis://h:peb1153eccdd4ad8a446810f87586a0404d17b052c61a0a716864ae65007871be@ec2-52-203-67-230.compute-1.amazonaws.com:21009',
    JWT_SECRET: process.env.JWT_SECRET,
    API_BASE_URL: 'https://doccollab.herokuapp.com/api/',
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ws_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
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
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"]) === "function" ? _a : Object, typeof (_b = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"] !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"]) === "function" ? _b : Object, typeof (_c = typeof _ws_auth__WEBPACK_IMPORTED_MODULE_4__[/* WsAuth */ "a"] !== "undefined" && _ws_auth__WEBPACK_IMPORTED_MODULE_4__[/* WsAuth */ "a"]) === "function" ? _c : Object])
], AuthService);



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RedisCoreService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redis__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _auth_ws_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_6__);
var _a;







let RedisCoreService = class RedisCoreService {
    constructor(wsAuth) {
        this.wsAuth = wsAuth;
        this.client = redis__WEBPACK_IMPORTED_MODULE_2__["createClient"](_environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].REDIS_URI);
        this.asyncSmembers = Object(util__WEBPACK_IMPORTED_MODULE_5__["promisify"])(this.client.smembers).bind(this.client);
        this.asyncHgetall = Object(util__WEBPACK_IMPORTED_MODULE_5__["promisify"])(this.client.hgetall).bind(this.client);
    }
    linkUserToSocket(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const userModel = yield this.wsAuth.getUser(socket.handshake.query.token);
            this.client.hmset(`socket:${socket.id}`, [
                'socketId', socket.id,
                'userId', userModel._id.toString(),
                'username', userModel.username,
                'firstName', userModel.firstName,
                'lastName', userModel.lastName
            ]);
        });
    }
    unlinkUserFromSocket(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.client.del(`socket:${socket.id}`);
        });
    }
    joinRoom(docId, socketId) {
        const docIdString = docId.toString();
        const added = this.client.sadd(`room:${docIdString}`, socketId);
        if (added) {
            console.log('was added');
        }
        else {
            console.log('was already there');
        }
    }
    leaveRoom(docId, socketId) {
        const docIdString = docId.toString();
        const removed = this.client.srem(`room:${docIdString}`, socketId);
        if (removed) {
            console.log('was removed');
        }
        else {
            console.log('was not in set');
        }
    }
    checkActiveCollabs(docId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const docIdString = docId.toString();
            const array = yield this.asyncSmembers(`room:${docIdString}`);
            console.log('array from check', array);
            return array;
        });
    }
    getActiveUsers(sockets) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let activeUsers = [];
            for (const socket of sockets) {
                const userInfo = yield this.asyncHgetall(`socket:${socket}`);
                if (userInfo) {
                    activeUsers.push(userInfo);
                }
            }
            ;
            return activeUsers;
        });
    }
    getUser(socketId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.asyncHgetall(`socket:${socketId}`);
            console.log('user from get user', user);
            if (!user) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_6__["WsException"]('missing user');
            }
            return user;
        });
    }
};
RedisCoreService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_ws_auth__WEBPACK_IMPORTED_MODULE_4__[/* WsAuth */ "a"] !== "undefined" && _auth_ws_auth__WEBPACK_IMPORTED_MODULE_4__[/* WsAuth */ "a"]) === "function" ? _a : Object])
], RedisCoreService);



/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WsGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ws_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
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
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _ws_auth__WEBPACK_IMPORTED_MODULE_2__[/* WsAuth */ "a"] !== "undefined" && _ws_auth__WEBPACK_IMPORTED_MODULE_2__[/* WsAuth */ "a"]) === "function" ? _a : Object])
], WsGuard);



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _local_strategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33);
/* harmony import */ var _auth_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6);
/* harmony import */ var _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(37);
/* harmony import */ var _ws_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5);











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
            _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__[/* JwtStrategy */ "a"],
            _ws_auth__WEBPACK_IMPORTED_MODULE_10__[/* WsAuth */ "a"],
        ],
        controllers: [_auth_controller__WEBPACK_IMPORTED_MODULE_6__[/* AuthController */ "a"]],
        exports: [_auth_service__WEBPACK_IMPORTED_MODULE_2__[/* AuthService */ "a"], _ws_auth__WEBPACK_IMPORTED_MODULE_10__[/* WsAuth */ "a"]]
    })
], AuthModule);



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _user_schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);






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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RedisModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);




let RedisModule = class RedisModule {
};
RedisModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_auth_auth_module__WEBPACK_IMPORTED_MODULE_3__[/* AuthModule */ "a"]],
        providers: [_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_2__[/* RedisCoreService */ "a"]],
        exports: [_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_2__[/* RedisCoreService */ "a"]]
    })
], RedisModule);



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__, "CreateDocDto")) __webpack_require__.d(__webpack_exports__, "CreateDocDto", function() { return _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__["CreateDocDto"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__, "CreateUserDTO")) __webpack_require__.d(__webpack_exports__, "CreateUserDTO", function() { return _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__["CreateUserDTO"]; });




/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _auth_ws_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4);
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
    saveDocument(socket, dto) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('dto', dto);
            const user = yield this.wsAuth.getUser(socket.handshake.query.token);
            const doc = yield this.findDocById(dto.docId);
            if (this.verifyDocAccess(user._id, doc)) {
                console.log('saving doc');
                doc.content = dto.content;
                yield doc.save();
                return true;
            }
            throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('cannot save');
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
            ;
            let collabDocs = [];
            for (const docId of user.collabDocs) {
                const document = yield this.docModel.findById(docId);
                if (!document) {
                    throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('could not locate document');
                }
                collabDocs.push(document);
            }
            ;
            const docs = {
                ownDocs: documents,
                collabDocs: collabDocs
            };
            return docs;
        });
    }
    findDocById(_id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const doc = yield this.docModel.findById(_id);
            if (!doc) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('Could not locate document');
            }
            return doc;
        });
    }
    getDocument(socket, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.wsAuth.getUser(socket.handshake.query.token);
            const doc = yield this.findDocById(body._id);
            if (this.verifyDocAccess(user._id, doc)) {
                return doc;
            }
            throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('Unauthorized');
        });
    }
    addCollaborator(socket, dto) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.wsAuth.getUser(socket.handshake.query.token);
            const doc = yield this.findDocById(dto.docId);
            if (yield this.verifyDocOwner(user._id, doc)) {
                const collaborator = yield this.usersService.userModelByUsername(dto.username);
                const collab = {
                    userId: collaborator._id,
                    firstName: collaborator.firstName,
                    lastName: collaborator.lastName,
                    username: collaborator.username,
                    ownDocs: collaborator.ownDocs,
                    collabDocs: collaborator.collabDocs,
                    viewDocs: collaborator.viewDocs
                };
                doc.collaborators.push(collab);
                const newCollab = doc.collaborators[doc.collaborators.length - 1];
                yield doc.save();
                collaborator.collabDocs.push(doc._id);
                yield collaborator.save();
                return newCollab;
            }
            throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_4__["WsException"]('Unauthorized');
        });
    }
    verifyDocOwner(userId, doc) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(userId, doc.owner.userId);
            if (userId == doc.owner.userId) {
                return true;
            }
            return false;
        });
    }
    verifyDocAccess(userId, doc) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (userId == doc.owner.userId) {
                return true;
            }
            const isCollab = doc.collaborators.findIndex(each => each.userId === userId);
            if (isCollab === -1) {
                return false;
            }
            return true;
        });
    }
};
DocumentsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__["InjectModel"])('AppDocument')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"] !== "undefined" && mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"]) === "function" ? _a : Object, typeof (_b = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_6__[/* UsersService */ "a"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_6__[/* UsersService */ "a"]) === "function" ? _b : Object, typeof (_c = typeof _auth_ws_auth__WEBPACK_IMPORTED_MODULE_5__[/* WsAuth */ "a"] !== "undefined" && _auth_ws_auth__WEBPACK_IMPORTED_MODULE_5__[/* WsAuth */ "a"]) === "function" ? _c : Object])
], DocumentsService);



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/* harmony import */ var _redis_redis_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);




let SocketsModule = class SocketsModule {
};
SocketsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_redis_redis_module__WEBPACK_IMPORTED_MODULE_3__[/* RedisModule */ "a"]],
        providers: [_socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__[/* SocketCoreGateway */ "a"]],
        exports: [_socket_core_gateway__WEBPACK_IMPORTED_MODULE_2__[/* SocketCoreGateway */ "a"]]
    })
], SocketsModule);



/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketCoreGateway; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _redis_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
var _a, _b, _c;





let SocketCoreGateway = class SocketCoreGateway {
    constructor(redis) {
        this.redis = redis;
        this.connectedSockets = 0;
    }
    // called when a new socket connects
    handleConnection(socket) {
        this.connectedSockets++;
        this.redis.linkUserToSocket(socket);
        console.log(`*** SOCKET CONNECTED [${socket.id}] ***`);
        socket.on('disconnecting', (reason) => this.gracefulDisconnect(socket));
    }
    // called when a socket disconnects
    handleDisconnect(socket) {
        this.connectedSockets--;
        console.log(`~~~ SOCKET DISCONNECTED [${this.connectedSockets}] ~~~`);
    }
    /**
     * HELPERS
     */
    gracefulDisconnect(socket) {
        console.log('gracefully disconnecting', socket.id);
        if (Object.keys(socket.rooms)[1]) {
            const roomId = Object.keys(socket.rooms)[1];
            this.redis.leaveRoom(roomId, socket.id);
            console.log('user gracefully disconnecting from room', socket.id);
            socket.broadcast.to(roomId).emit('remove.active.collab', { 'socketId': socket.id });
        }
        this.redis.unlinkUserFromSocket(socket);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof socket_io__WEBPACK_IMPORTED_MODULE_3__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_3__["Socket"]) === "function" ? _a : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], SocketCoreGateway.prototype, "handleConnection", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof socket_io__WEBPACK_IMPORTED_MODULE_3__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_3__["Socket"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], SocketCoreGateway.prototype, "handleDisconnect", null);
SocketCoreGateway = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WebSocketGateway"])({ "pingTimeout": 30000 }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof _redis_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_4__[/* RedisCoreService */ "a"] !== "undefined" && _redis_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_4__[/* RedisCoreService */ "a"]) === "function" ? _c : Object])
], SocketCoreGateway);



/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("socket.io-redis");

/***/ }),
/* 26 */
/***/ (function(module, exports) {



/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_serve_static__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _documents_documents_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(38);
/* harmony import */ var _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(21);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6);
/* harmony import */ var _redis_redis_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(16);













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
            _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_9__[/* SocketsModule */ "a"],
            _redis_redis_module__WEBPACK_IMPORTED_MODULE_12__[/* RedisModule */ "a"]
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_3__[/* AppController */ "a"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_4__[/* AppService */ "a"]]
    })
], AppModule);



/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
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
/* 31 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
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
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('register'),
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
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
/* 34 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _local_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalAuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let LocalAuthGuard = class LocalAuthGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"])('local') {
};
LocalAuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], LocalAuthGuard);



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _documents_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _documents_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _documents_gateway__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _document_schema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _users_user_schema__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(20);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var _redis_redis_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(16);












let DocumentsModule = class DocumentsModule {
};
DocumentsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _sockets_sockets_module__WEBPACK_IMPORTED_MODULE_4__[/* SocketsModule */ "a"],
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_6__["MongooseModule"].forFeature([
                { name: 'AppDocument', schema: _document_schema__WEBPACK_IMPORTED_MODULE_7__[/* DocumentSchema */ "a"] },
                { name: 'User', schema: _users_user_schema__WEBPACK_IMPORTED_MODULE_9__[/* UserSchema */ "a"] }
            ]),
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__[/* AuthModule */ "a"],
            _users_users_module__WEBPACK_IMPORTED_MODULE_10__[/* UsersModule */ "a"],
            _redis_redis_module__WEBPACK_IMPORTED_MODULE_11__[/* RedisModule */ "a"]
        ],
        controllers: [_documents_controller__WEBPACK_IMPORTED_MODULE_2__[/* DocumentsController */ "a"]],
        providers: [_documents_service__WEBPACK_IMPORTED_MODULE_3__[/* DocumentsService */ "a"], _documents_gateway__WEBPACK_IMPORTED_MODULE_5__[/* DocumentsGateway */ "a"]]
    })
], DocumentsModule);



/***/ }),
/* 39 */
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
/* 40 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsGateway; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _documents_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _redis_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;








let DocumentsGateway = class DocumentsGateway {
    constructor(docService, redis) {
        this.docService = docService;
        this.redis = redis;
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
    saveDocument(socket, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const success = this.docService.saveDocument(socket, body);
            if (success) {
                return 'it saved';
            }
            throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WsException"]('it did not save');
        });
    }
    sendActiveDocument(socket, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            socket.to(body.toSocketId).emit('send.document.active', body);
        });
    }
    getDocument(socket, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const document = yield this.docService.getDocument(socket, body);
            let docOut;
            if (document.collaborators.length > 0) { // if doc has collaborators
                const sockets = yield this.redis.checkActiveCollabs(body._id);
                if (sockets.length > 0) { // collab and active sockets
                    const users = yield this.redis.getActiveUsers(sockets);
                    docOut = {
                        document: document,
                        collab: true,
                        activeSockets: true,
                        activeUsers: users
                    };
                    socket.emit('res.document', docOut);
                    this.server.to(document._id).emit('get.document.active', { 'socketId': socket.id }); // ask active sockets for copy of doc
                }
                else { // collaborative but NO active sockets
                    docOut = {
                        document: document,
                        collab: true,
                        activeSockets: false,
                        activeUsers: []
                    };
                    socket.emit('res.document', docOut);
                }
                this.joinDocRoom(socket, document._id);
            }
            else { // if doc has NO collaborators
                docOut = {
                    document: document,
                    collab: false,
                    activeSockets: false,
                    activeUsers: []
                };
                socket.emit('res.document', docOut);
                this.joinDocRoom(socket, document._id);
            }
        });
    }
    emitEdits(socket, body) {
        console.log('received a delta', body);
        socket.to(Object.keys(socket.rooms)[1]).emit('in.edit.doc', body);
    }
    addCollaborator(socket, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const collaborator = yield this.docService.addCollaborator(socket, body);
            if (collaborator) {
                socket.emit('add.collaborator.res', collaborator);
            }
            else {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WsException"]('Something went wrong');
            }
        });
    }
    leaveRoom(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('leaving the room');
            if (Object.keys(socket.rooms)[1]) {
                const roomId = Object.keys(socket.rooms)[1];
                this.redis.leaveRoom(roomId, socket.id);
                socket.broadcast.to(roomId).emit('remove.active.collab', { 'socketId': socket.id });
                socket.leave(Object.keys(socket.rooms)[1]);
            }
        });
    }
    joinDocRoom(socket, docId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (Object.keys(socket.rooms)[1]) {
                socket.leave(Object.keys(socket.rooms)[1]);
            }
            socket.join(docId);
            console.log('join room id: ', docId);
            const user = yield this.redis.getUser(socket.id);
            socket.broadcast.to(docId).emit('new.active.collab', user);
            this.redis.joinRoom(docId, socket.id);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WebSocketServer"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Server"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Server"]) === "function" ? _a : Object)
], DocumentsGateway.prototype, "server", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__[/* WsGuard */ "a"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('create.document'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _b : Object, typeof (_c = typeof _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_4__["CreateDocDto"] !== "undefined" && _doccollab_api_interfaces__WEBPACK_IMPORTED_MODULE_4__["CreateDocDto"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], DocumentsGateway.prototype, "createDocument", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__[/* WsGuard */ "a"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('get.documents'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _e : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "getDocuments", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__[/* WsGuard */ "a"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('save.document.req'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_f = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _f : Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "saveDocument", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__[/* WsGuard */ "a"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('send.document.active'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_g = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _g : Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "sendActiveDocument", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__[/* WsGuard */ "a"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('req.document'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_h = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _h : Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "getDocument", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('out.edit.doc'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_j = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _j : Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], DocumentsGateway.prototype, "emitEdits", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__[/* WsGuard */ "a"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('add.collaborator.req'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_k = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _k : Object, Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "addCollaborator", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_5__["UseGuards"])(_auth_ws_guard__WEBPACK_IMPORTED_MODULE_6__[/* WsGuard */ "a"]),
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('leave.room'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_l = typeof socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"]) === "function" ? _l : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], DocumentsGateway.prototype, "leaveRoom", null);
DocumentsGateway = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WebSocketGateway"])({ "pingTimeout": 30000 }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_m = typeof _documents_service__WEBPACK_IMPORTED_MODULE_3__[/* DocumentsService */ "a"] !== "undefined" && _documents_service__WEBPACK_IMPORTED_MODULE_3__[/* DocumentsService */ "a"]) === "function" ? _m : Object, typeof (_o = typeof _redis_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_7__[/* RedisCoreService */ "a"] !== "undefined" && _redis_redis_core_redis_core_service__WEBPACK_IMPORTED_MODULE_7__[/* RedisCoreService */ "a"]) === "function" ? _o : Object])
], DocumentsGateway);



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RedisIoAdapter; });
/* harmony import */ var _nestjs_platform_socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
/* harmony import */ var _nestjs_platform_socket_io__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_platform_socket_io__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_redis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var socket_io_redis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_redis__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



class RedisIoAdapter extends _nestjs_platform_socket_io__WEBPACK_IMPORTED_MODULE_0__["IoAdapter"] {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        let redisAdapter;
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__[/* environment */ "a"].production === true) {
            redisAdapter = socket_io_redis__WEBPACK_IMPORTED_MODULE_1__(_environments_environment__WEBPACK_IMPORTED_MODULE_2__[/* environment */ "a"].REDIS_URI);
        }
        else {
            redisAdapter = socket_io_redis__WEBPACK_IMPORTED_MODULE_1__({ host: 'localhost', port: 6379 });
        }
        server.adapter(redisAdapter);
        return server;
    }
}


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/platform-socket.io");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(46);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _app_adapter_redis_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */





function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_2__[/* AppModule */ "a"]);
        app.useWebSocketAdapter(new _app_adapter_redis_adapter__WEBPACK_IMPORTED_MODULE_4__[/* RedisIoAdapter */ "a"](app));
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].production === false) {
            app.enableCors({
                origin: ['http://localhost:4200', 'http://172.16.101.30:4200'],
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


/***/ })
/******/ ])));
//# sourceMappingURL=main.js.map