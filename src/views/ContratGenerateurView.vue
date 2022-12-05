<template>
  <MenuDashboard/>
  <ContratBlockGenerateur/>
</template>

<script>
import ContratBlockGenerateur from '../components/user/Contrat/ContratBlockGenerateur.vue'
import MenuDashboard from '../components/headers/MenuDashboard.vue'




export default {
  name: 'ContratGenerateurView',

  data: ()=>({


  }),


  components: {
    ContratBlockGenerateur,
    MenuDashboard
  }
}
</script>