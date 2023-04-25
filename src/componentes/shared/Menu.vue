<template>
  <header class="main-header">      
      <div class="avatar">
         <img src="../../assets/perfil.png" alt="foto perfil">
         <span>
           <h2>Seja bem vindo</h2>
           <h3>Usuário</h3>
         </span>
      </div>
      <nav id="#menu" class="menu">
        <img src="../../assets/icon_menu.png" alt="Menu hamburguer">
      </nav>
  </header>
</template>

<script>
export default {

    props: {
        rotas: {
            type: Array, 
            required: true
        }
    }

}

</script>

<style>
.main-header{
    display: flex;
    justify-content: space-between;
}
.avatar{
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>