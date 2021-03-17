import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import soure from "components/source/index.vue";
Vue.component('soure', soure)

import request from '@/util/cloud/request.js'
Vue.prototype.$request = request;

import file from '@/util/cloud/file.js'
Vue.prototype.$file = file;

import util from '@/util/util.js'
Vue.prototype.$util = util;


const app = new Vue({
	...App
})
app.$mount()
