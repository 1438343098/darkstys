import Vue from 'vue'
import App from './App'

import store from './store'

import MusicGlobal from 'components/imt-audio/imt-audio.vue'

import Icon from 'components/common/Icon.vue';
import Top from 'components/common/Top.vue';

Vue.config.productionTip = false

Vue.component("MusicGlobal",MusicGlobal)
Vue.component("Icon",Icon)
Vue.component("Top",Top)

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()