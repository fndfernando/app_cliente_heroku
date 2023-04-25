import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './componentes/Home.vue';
import Cliente from './componentes/Cliente.vue';
import ClienteLista from './componentes/ClienteLista.vue';

Vue.use(VueRouter);

export const routes = [
    {path: '/',component: Home, titulo: 'Home'},
    {path: '/cliente', component: Cliente, titulo: 'Cliente'},
    {path: '/Cliente/:id',  component: Cliente, titulo: 'Alterar Cliente'}, 
    {path: '/clientelista', component: ClienteLista, titulo: 'Lista Clientes'},
]


const router = new VueRouter({
    routes,
    mode: 'history'
  })
  

  export default router