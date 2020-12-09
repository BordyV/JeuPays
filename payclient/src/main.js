import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'


import JeuDrapeau from './components/JeuDrapeau/JeuDrapeau'
import Accueil from './components/Accueil'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  routes:  [
    { path: '*', name: 'catchAll', component: Accueil },
    { path: '/', component: Accueil },
    { path: '/jeuDrapeau/',name:'detail', component: JeuDrapeau, props:true },
  ],
  mode: 'history'
})

new Vue({
  VueMaterial,
  router,
  render: h => h(App),
}).$mount('#app')
