<template>
  <div>
    <h1>{{Titulo}}</h1>    
    <section id="abas" class="cliente-abas"  :class="{ hide: !Alteracao}">
      <a href="#" class="button" :class="{ active: telaDadosInicial }" @click="MudarAba('DadosInicial')" >Identifação</a>
      <a href="#" class="button" :class="{ active: telaEndereco }" @click="MudarAba('Endereco')">Endereço</a>
      <a href="#" class="button" :class="{ active: telaContatos }" @click="MudarAba('Contato')">Telefone</a>
    </section>
    <section class="cliente-form" id="dadosInicial" :class="{ hide: !telaDadosInicial }" >      
      <label for="nome_cliente">Nome Cliente</label>
      <input type="text" name="nome_cliente" id="nome_cliente" v-model="cliente.nome_cliente">
      <label for="cpf_cnpj">CPF/CNPJ</label>
      <the-mask :mask="['###.###.###-##', '##.###.###/####-##']" name="cpf_cnpj" id="cpf_cnpj" v-model="cliente.cpf_cnpj"/>   
      <label for="telefone">Telefone/Celular</label>
      <the-mask :mask="['(##) ####-####', '(##) #####-####']" name="telefone" id="telefone" v-model="cliente.telefone"/>
      <div v-html="msgClienteJaExiste"></div>
      <div class="cliente-action" :class="{ hide: Alteracao}">
          <button @click="Cancelar()" class="-second" >Cancelar </button>
          <button @click="Avancar()">Seguir > </button>                    
      </div>      
    </section>  

    <section class="cliente-form" id="endereco" :class="{ hide: !telaEndereco}" >      
      <div class="ln2campos">
        <div class="formCEP">
          <label for="cep">CEP</label>
          <the-mask :mask="['##.###-###']" name="cep" id="cep" v-model="cliente.cep" maxlength="10"/>
        </div>
        <div>              
            <button class="-small" @click="buscarCEP()"><img src="../assets/find.png"> </button>    
        </div>
      </div>
      <div class="ln2campos">
        <div class="formEndereco">
          <label for="endereco">Endereço</label>
          <input type="text" name="endereco" id="endereco" v-model="cliente.endereco">
        </div>
        <div class="formEnderecoNum">
          <label for="endereco_num">Numero</label>
          <input type="text" name="endereco_num" id="endereco_num" v-model="cliente.endereco_num">          
        </div>
      </div>
      <label for="complemento">Complemento</label>
      <input type="text" name="complemento" id="complemento" v-model="cliente.complemento">        
      <label for="bairro">Bairro</label>
      <input type="text" name="bairro" id="bairro" v-model="cliente.bairro">  
      <div class="ln2campos">
        <div class="formCidade">          
          <label for="cidade">Cidade</label>
          <input type="text" name="cidade" id="cidade" v-model="cliente.cidade">
        </div>
        <div class="formEstado">              
          <label for="estado">Estado</label>
          <input type="text" name="estado" id="estado" v-model="cliente.estado" maxlength="2" >          
        </div> 
      </div>                      

      <div class="cliente-action"  :class="{ hide: Alteracao}">
          <button @click="Cancelar()" class="-second" >Cancelar </button>
          <button @click="Avancar()">Seguir > </button>                    
      </div>      
    </section>  

    <section class="cliente-form" id="contatos" :class="{ hide: !telaContatos}" >      
      <label for="telefone">Telefone/Celular</label>
      <the-mask :mask="['(##) ####-####', '(##) #####-####']" name="telefone" id="telefone" v-model="cliente.telefone"/>
      <label for="telefone2">Telefone/Celular(2)</label>
      <the-mask :mask="['(##) ####-####', '(##) #####-####']" name="telefone2" id="telefone2" v-model="cliente.telefone2"/>      
      <label for="e_mail">E-mail</label>
      <input  type="email" name="e_mail" id="e_mail" v-model="cliente.e_mail"/>           
      <div class="cliente-action"  :class="{ hide: Alteracao}">
          <button @click="Cancelar()" class="-second" >Cancelar </button>
          <button @click="Salvar()">Salvar </button>                    
      </div>      
    </section>    
    <div class="cliente-action"  :class="{ hide: !Alteracao}">
        <button @click="Cancelar()" class="-second" >Voltar </button>
        <button @click="Excluir()" class="-attention" >Excluir </button>
        <button @click="Salvar()">Salvar </button>                    
    </div>       
  </div>
</template>

<script>
import http from "../http";
import {TheMask} from 'vue-the-mask';
import axios from "axios";

export default {
  components: {
    TheMask
  },
  data () {
    return {
      Alteracao: false,
      telaDadosInicial:true,
      telaEndereco:false,
      telaContatos:false,
      Titulo:'Cadastrar Novo Cliente',
      ClienteJaexiste:-1,
      validacoes: [],
      cliente:{
        cod_cliente:0,
        nome_cliente:'',
        cpf_cnpj:'',
        telefone:'',
        telefone2:'',
        e_mail:'',
        cep:'',
        endereco:'',
        endereco_num:'',
        complemento:'',
        bairro:'',
        cidade:'',
        estado:'',
      }
    }
  },
  methods: {
    Cancelar(){
      this.$router.push('/'); 
    },
    VerificarClienteJaExiste(){
      this.ClienteJaexiste = 0;
      //Verifica se cliente já existe
      let url = '/cliente/jaexiste';
      if (this.cliente.telefone!='')
        url = url+`/${ this.cliente.telefone }`
      else
        url = url+`/000`;
      if (this.cliente.cpf_cnpj!='')
        url = url+`/${ this.cliente.cpf_cnpj }`
      else
        url = url+`/000`;    


      http.get(url)
      .then(response => {                           
          console.log(response);
          
          if (response.status==200){
            this.telaDadosInicial = false;
            this.telaEndereco = true;
          }  
          else                    
          if (response.status==203){
             
            if (this.cliente.cod_cliente==0)
              this.ClienteJaexiste = response.data;
            else
            if ((this.cliente.cod_cliente>0)&&(this.cliente.cod_cliente!=response.data))
              this.ClienteJaexiste = response.data
            else{
                this.telaDadosInicial = false;
                this.telaEndereco = true;
            }
            
          }
          else
            alert(response.message);                  
        
        }).catch( error => {
              console.log(error);  
              alert(error.response.status+'-'+error.response.data);
        }); 

        return 0;
    },    
    buscarCEP(){
        if (this.cliente.cep.length !=8){
          alert('Informe CEP com 8 digitos');
        }
        else{
          axios.get(`https://viacep.com.br/ws/${ this.cliente.cep }/json/`)
          .then(response => {            
                      if (!response.data.erro){
                          this.cliente.endereco =  response.data.logradouro;
                          this.cliente.bairro =  response.data.bairro;
                          this.cliente.cidade =  response.data.localidade;
                          this.cliente.estado =  response.data.uf;                 

    
      

                      }else{
                          alert('CEP não encontrado')
                      }
                      //response => this.data = response.data 
                  })
          .catch( error => console.error(error))
        }
    },    
    validarDadosInicial(){ 

        if (this.cliente.nome_cliente==''){            
            this.validacoes.push("Informe o Nome");
        }    
        if (this.cliente.telefone==''){            
            this.validacoes.push("Informe o Telefone");
        }   
    },    
    validarEndereco(){

        if (this.cliente.endereco==''){            
            this.validacoes.push("Informe o Endereço");
        }    
        if (this.cliente.endereco_num==''){            
            this.validacoes.push("Informe o Número do Endereço");
        }   
        if (this.cliente.bairro==''){            
            this.validacoes.push("Informe o Bairro");
        }        
        if (this.cliente.cidade==''){            
            this.validacoes.push("Informe a Cidade");
        }              
        if (this.cliente.estado==''){            
            this.validacoes.push("Informe o Estado");
        }            
    },
    Avancar(){
        this.validacoes = [];
        if (this.telaDadosInicial){
            this.validarDadosInicial();  
        }
        else
        if (this.telaEndereco){
            this.validarEndereco();  
        }        

        if (this.validacoes.length>0) {
            alert("Verifique os dados informados \n"+this.validacoes.join("\n"));
            
        }
        else
        {
           if (this.telaDadosInicial){
              this.VerificarClienteJaExiste();
    
           }
           else
           if (this.telaEndereco){
              this.telaEndereco = false;
              this.telaContatos = true; 
           } 
        }

    },
    Salvar(){
        this.validacoes = [];
        this.validarDadosInicial();
        this.validarEndereco();

        if (this.validacoes.length>0) {
            alert("Verifique os dados informados \n"+validacoes.join("\n"));
            
        }
        else{      
          
          if (this.cliente.cod_cliente==0){
            http.post('/cliente',this.cliente)
            .then(response => {                 
                if (!response.data.erro) {
                    if (response.status==201){
                        if (response.data.cod_cliente>0){
                          alert('Cliente Salvo');
                          this.$router.push('/');    
                        }
                        else
                          alert('Não foi possivel salvar\n'+response.data.message);
                        
                    }
                    else
                      alert('Não foi possivel salvar\n'+response.message);                  
                    
                }
                  else
                    alert('Não foi possivel salvar\n'+response.status+'-'+response.message);             
            }).catch( error => {
                  console.log(error);  
                  alert('Não foi possivel salvar\n'+error.response.status+'-'+error.response.data);
            });
          }else
          if (this.cliente.cod_cliente>0){
            http.put('/cliente',this.cliente)
            .then(response => {  
                console.log(response);
                if (!response.data.erro) {
                    if (response.status==200){   
                      alert('Cliente Salvo');
                      this.$router.push('/');                            
                    }
                    else
                      alert('Não foi possivel salvar\n'+response.message);                 
                    
                }
                  else
                    alert('Não foi possivel salvar\n'+response.status+'-'+response.message);             
            }).catch( error => {
                  console.log(error);  
                  alert('Não foi possivel salvar\n'+error.response.status+'-'+error.response.data);
            });
          }          
        }
    },
    Excluir(){
        if(confirm('Deseja excluir este cliente?')){
            let url = `/cliente/${ this.cliente.cod_cliente }`;
            http.delete(url)
            .then(response => {  
                console.log(response);
                if (!response.data.erro) {
                    if (response.status==200){   
                      alert('Cliente excluido');
                      this.$router.push('/');                            
                    }
                    else
                      alert('Não foi possivel salvar\n'+response.message);                 
                    
                }
                  else
                    alert('Não foi possivel salvar\n'+response.status+'-'+response.message);             
            }).catch( error => {
                  console.log(error);  
                  alert('Não foi possivel salvar\n'+error.response.status+'-'+error.response.data);
            });
        }
    },
    PreencherCliente(id){
          let url = `/cliente/${ id }`;
          this.Alteracao = true;
          console.log(url);
          http.get(url)
          .then(response => {                           
              console.log(response);
              this.Titulo = 'Consultar Cliente'
              this.cliente = response.data;

            }).catch( error => {
                  console.log(error);  
                  alert(error.response.status+'-'+error.response.data);
            });
    },
    MudarAba(aba){
      if (aba=='DadosInicial'){
        this.telaDadosInicial=true;
        this.telaEndereco=false;
        this.telaContatos=false;
      }
      else
      if (aba=='Endereco'){
        this.telaDadosInicial=false;
        this.telaEndereco=true;
        this.telaContatos=false;
      }
      else
      if (aba=='Contato'){
        this.telaDadosInicial=false;
        this.telaEndereco=false;
        this.telaContatos=true;
      }            
    }
  },
  computed: {
    msgClienteJaExiste(){
      if (this.ClienteJaexiste>0)
        return '<p class="error">Telefone ou CPF/CNPJ já cadastro neste cliente <a href="cliente/'+this.ClienteJaexiste+'">Consultar</a></p>';
    }
  },
  mounted() {
     if (this.$route.params.id>0)
        this.PreencherCliente(this.$route.params.id);
  }
}


</script>

<style>
.hide {
    display:none !important;
}

body{
    background-color: rgb(247, 247, 247);
}
h1{
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 5px;
    border-bottom: 1px solid #FB8500;
    margin: 0 30px 20px 30px;
}
.error{  
  font-weight: 600;
}

.error a{
  color: #FB8500;
}

.cliente-abas{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.cliente-abas .button{
  border: 1px solid #000;
  border-radius: 10px;
  padding: 5px 25px;
  color: #000;
  text-decoration: none;
}

.cliente-abas .button:hover{
  background-color: #FB8500;
  border-color: #FB8500;
  color: #fff;
}

.cliente-abas .active{
  
  background-color: #FB8500;
  border-color: #FB8500;
  color: #fff;
}



.cliente-form{
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
}
.cliente-form .ln2campos{
    display: inline-flex;
    gap: 10px;
}
.cliente-form .formCEP{
    display: flex;
    flex-direction: column;
    width: 30%;
}
.cliente-form .formEndereco{
    display: flex;
    flex-direction: column;
    width: 80%;
}
.cliente-form .formEnderecoNum{
    display: flex;
    flex-direction: column;
    width: 20%;
}
.cliente-form .formCidade{
    display: flex;
    flex-direction: column;
    width: 90%;
}
.cliente-form .formEstado{
    display: flex;
    flex-direction: column;
    width: 10%;
}
 

label{
    font-size: 12px;
    font-weight: 500;
    color: #000;
}
input{
    border: 0;
    background-color: rgb(247, 247, 247);
    border-bottom: 1px solid #8A8A8A;
    font-size: 16px;
    height: 25px;
    margin-bottom: 40px;    
}

input:focus {
    box-shadow: 0 0 0 0;
    border-bottom: 2px solid #8A8A8A;
    outline: 0;
} 

.cliente-action{  
    display: flex;      
    flex-direction: row;  
    justify-content: center;
}

button{    
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
button.-second{
    background-color: #fff;
    color: #FFB703;
    border: 1px solid #FFB703;
}

button.-attention{
    background-color: #fadbdd;
    color: #E4626C;
    border: 1px solid #E4626C;
}

button.-small{
    width: 50px;
    padding: 4px 10px;
}


</style>