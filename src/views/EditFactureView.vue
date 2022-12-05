<template>
  <MenuDashboard/>
  <EditFacture/>
</template>

<script>
import EditFacture from '../components/user/Facture/EditFacture.vue'
import MenuDashboard from '../components/headers/MenuDashboard.vue'




export default {
  name: 'FactureGenerateurView',

  data: ()=>({
 


  }),


  components: {
    EditFacture,
    MenuDashboard
  }
}
</script>