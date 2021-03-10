import Vue from 'vue'
import VueRouter from 'vue-router' 
import CreateContact from './components/CreateContact'
import Vuelidate from  'vuelidate'
import FlashMessage from '@smartweb/vue-flash-message'
require('@/assets/main.css')

Vue.use(Vuelidate)
Vue.use(FlashMessage)

Vue.config.productionTip = false

const routes = [
  { path: '/contact/create', component: CreateContact },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(CreateContact),
}).$mount('#app')
