<template>
  <MenuConnection/>
  <RegistrationBlock/>

</template>

<script>
import RegistrationBlock from '../registration/RegistrationBlock.vue'
import MenuConnection from '../components/headers/MenuConnection.vue'




export default {
  name: 'NewAccountView',

  data: ()=>({

  }),


  components: {
    RegistrationBlock,
    MenuConnection,

  }
}
</script>