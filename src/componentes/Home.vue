<template>
  <div>
    <div class="main-banner">
      <div class="wrapper">
        <h1>FC|Campos</h1>
        <h3>Sistema de Vendas e Gestão</h3>
        <h3>São José dos Campos - SP</h3>
      </div>
    </div>

    <section class="main-action" id="action">
      <h1>Gerenciar Clientes</h1>
      <router-link :to="'/cliente'" class="button">Cliente</router-link>
      <router-link :to="'/clientelista'" class="button">Lista Clientes</router-link>
    </section>    
  </div>
</template>

<script>
import { routes } from '../routes'; 
export default {

  data(){
    return{
      routes
    }
  }
}
</script>

<style>

.main-banner{
    box-sizing: border-box;
    background-image: url('../assets/banner.png');;    
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    padding-top: 50px;
    height: 200px;  

}
.main-banner .wrapper{
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.main-banner h1{
  color: #fff;
  font-size: 32px;
}
.main-banner h3{
  color: #fff;
  font-size: 12px;
}
.main-action{
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.main-action h1{
  margin-bottom: 20px;
}

.main-action .button{
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;    

    width: 160px;
    padding: 12px 24px;
    cursor: pointer;
    background-color: #FFB703;
    border-radius: 10px;
    color: #FFF;
    font-size: 15px;
    margin: 10px;
    text-decoration: none;

}

</style>