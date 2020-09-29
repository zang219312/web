module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _barHeight = wx.getSystemInfoSync().statusBarHeight;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //  决定navback是否有效
    enable: {
      type: Boolean,
      value: 'true'
    },
    //  可传入改变navbar样式
    bgStyle: {
      type: String,
      value: 'background-color:#000;'
    },
    //  可传入改变navbar title样式
    titleStyle: {
      type: String,
      value: 'color: white;'
    },
    title: {
      type: String,
      value: '微信',
      observer: '_changeTitle'
    },
    //  可传入改变nav back页面数
    delta: {
      type: Number,
      value: 1
    },
    //  决定是否显示loading
    showLoading: {
      type: Boolean,
      value: false
    },
    textStyle: {
      type: String,
      value: 'white',
      observer: '_changeTextStyle'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    barHeight: _barHeight,
    navIconUrl: './images/nav_icon_white.png',
    navTitleStyle: 'color: white;',
    navBgStyle: 'background-color:#000;'
  },

  /**
   * 组件的方法列表
   */
  attach: function attach() {
    // eslint-disable-next-line no-console
    console.log(wx.getCurrent);
  },

  methods: {
    //  title监听函数
    _changeTitle: function _changeTitle() {
      if (this.data.title === '') {
        this.setData({
          title: '微信'
        });
      }
    },
    _changeTextStyle: function _changeTextStyle() {
      if (this.data.textStyle === 'black') {
        wx.setNavigationBarColor({
          frontColor: '#000000'
        });
        this.setData({
          navIconUrl: './images/nav_icon_black.png',
          navTitleStyle: 'color: black;',
          navBgStyle: 'background-color:#fff;'
        });
      } else {
        wx.setNavigationBarColor({
          frontColor: '#ffffff'
        });
        this.setData({
          navIconUrl: './images/nav_icon_white.png',
          navTitleStyle: 'color: white;',
          navBgStyle: 'background-color:#000;'
        });
      }
    },

    //  navback监听函数
    _onTap: function _onTap() {
      this.triggerEvent('back', {});
      if (this.data.enable) {
        wx.navigateBack({
          delta: this.data.delta
        });
      }
    }
  }
});

/***/ })
/******/ ]);