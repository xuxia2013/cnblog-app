import App from './App'
import util from '@/common/util.js'
import {
	request
} from '@/common/request.js'
import '@/css/index.scss'

Vue.prototype.util = util
Vue.prototype.request = request

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
