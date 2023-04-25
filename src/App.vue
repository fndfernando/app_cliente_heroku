<template>
  <div id="app">
    <meu-menu :rotas="routes"/>

    <div class="corpo">
      <router-view></router-view>    
    </div>
  </div>
</template>

<script>
import { routes } from './routes'; 
import Menu from './componentes/shared/Menu.vue';


export default {
  name: 'app',
    components:{
    'meu-menu' : Menu
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      routes
    }
  }
}
</script>

<style>
/* reset css erick meyer */
body{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #FBF3E7;
    margin: 20px;    
    padding: 0;    
}
h1, h2, h3, figure, input{
    margin: 0;
    padding: 0;
}

h1{
  font-weight: 400;
  font-size: 24px;
}

h2, h3{
  font-weight: 400;
  font-size: 18px;
}

h3{
  color: #FB8500;
}

button{
    border: none;
    font-family: inherit;
}

</style>
