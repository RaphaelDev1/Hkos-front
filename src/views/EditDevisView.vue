<template>
  <MenuDashboard/>
  <EditDevis/>
</template>

<script>
import EditDevis from '../components/user/Devis/EditDevis.vue'
import MenuDashboard from '../components/headers/MenuDashboard.vue'




export default {
  name: 'DevisGenerateurView',

  data: ()=>({
 


  }),


  components: {
    EditDevis,
    MenuDashboard
  }
}
</script>