import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll) // ovako registrujemo plug-in u Vue, sa use(plugInKojiZelimo),i i koristimo je u projektu bilo gde,ovo konretno u Chat.vue ul.messages sa v-chat-scroll

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
