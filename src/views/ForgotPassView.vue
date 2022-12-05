<template>
  <MenuInscription/>
  <ForgotPasswordBlock/>
</template>

<script>
import ForgotPasswordBlock from '../registration/ForgotPassBlock.vue'
import MenuInscription from '../components/headers/MenuInscription.vue'





export default {
  name: 'HomeView',

  data: ()=>({

  }),


  components: {
    ForgotPasswordBlock,
    MenuInscription
  }
}
</script>