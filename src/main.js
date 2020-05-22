import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import firebase from 'firebase/app'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

firebase.initializeApp({
  apiKey: "AIzaSyBm3XdvXpK0GV4bGcDbTxdWj4SKA-IUIq8",
  authDomain: "vue-crm2-ce9ed.firebaseapp.com",
  databaseURL: "https://vue-crm2-ce9ed.firebaseio.com",
  projectId: "vue--crm2",
  storageBucket: "vue--crm2.appspot.com",
  messagingSenderId: "429754997669",
  appId: "1:429754997669:web:9b8788942e4f0566db264c",
  measurementId: "G-11C0V2WS6W"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
