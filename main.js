import Vue from 'vue'
import App from './App'

import store from './store'

import MusicGlobal from 'components/imt-audio/imt-audio.vue'

Vue.config.productionTip = false

Vue.component("MusicGlobal",MusicGlobal)

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()