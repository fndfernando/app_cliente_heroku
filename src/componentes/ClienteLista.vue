<template>
  <div>

    <section class="main-search" id="pesquisar">
      <form>
        <input type="search" placeholder="Pesquisar Cliente (Nome, telefone, CPF)" v-model="pesquisa">          
      </form>
      <button @click="ListarCliente()" class="button" >Pesquisar </button>
    </section> 

    <section id="list" class="list">
      <div class="item" v-for="item in listaCliente" :key="item.cod_cliente">
        <div class="wrapper">
          <h2>{{ item.nome_cliente }}</h2>
          <h3>{{ item.telefone }} {{ item.celular }}</h3>
          <h3>{{ item.endereco }}, {{ item.endereco_num }} - {{ item.bairro }} - {{ item.cidade }}</h3>
        </div>
        <div class="button">
          <a :href="'cliente/'+item.cod_cliente">></a>
        </div>
      </div>            
    </section>
   
  </div>
</template>

<script>
import http from "../http";




export default {

  data () {
    return {
      pesquisa:'',
      listaCliente:[]
    }
  },
  methods: {
    ListarCliente(){
        let urlPesquisa = '';
        if (this.pesquisa=='') 
          urlPesquisa = 'null';
        else
          urlPesquisa = decodeURIComponent(this.pesquisa).replaceAll('+',' ');
        let url = `/cliente/listar/${ urlPesquisa }`;
        console.log(url);
        http.get(url)
        .then(response => {              

            this.listaCliente = response.data;

            console.log(this.listaCliente);

         
        }).catch( error => {
              console.log(error);  
              alert('Não foi possivel pesquisar \n'+error.response.status+'-'+error.response.data);
        });

    },

  }
} 

</script>

<style>

.main-search .button{
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

.main-search input{
  background: url(../assets/find.png) no-repeat scroll 7px 7px;

  background-color: #dbd8d8;
  border-style: solid;
  border-color: #dbd8d8;
  height: 43px;
  border-radius: 8px;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  line-height: 13px;
  color: #999999;
  padding-left:40px; 
}

.list{
  display: flex;
  flex-direction: column;  
  margin: 5px 0;
  gap: 5px;
}
.list .item{
  display: inline-flex;
  width: 100%;
  flex-direction: row;  
  justify-content: space-between;
  background-color: #E8E6E3;
  border-radius: 10px; 
}

.list .wrapper{
  display: inline-flex;
  flex-direction: column;  
  padding: 10px 30px;  
}
.list .button{
  display: flex;
  background-color: #FB8500;
  width: 25px;
  justify-content: center;
  align-items: center;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.list .button:hover{
  background-color: #FFB703;
}

.list .button a{
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
}

.list h2{
  font-size: 16px;
  color: #000;
  font-weight: 500;
}

.list h3{
  font-size: 12px;
  color: #676161;
}

</style>