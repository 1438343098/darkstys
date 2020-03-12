import Vue from 'vue'
import App from './App'

import store from './store'


import Icon from '@/components/common/icon.vue';
import Top from '@/components/common/top.vue';
import FooterMusic from '@/components/common/footermusic.vue';
Vue.config.productionTip = false

Vue.component("footer-music",FooterMusic)
Vue.component("Icon",Icon)
Vue.component("Top",Top)

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()