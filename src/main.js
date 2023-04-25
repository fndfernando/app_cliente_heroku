import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import  router  from './routes';
import VueTheMask from 'vue-the-mask';
import vueDebounce from 'vue-debounce';


Vue.use(VueResource);
Vue.use(VueTheMask);
Vue.use(vueDebounce);


new Vue({
  el: '#app',
  router,  
  render: h => h(App)
})
