<template>
  <MenuDashboard/>
  <ContratBlock/>
</template>

<script>
import ContratBlock from '../components/user/Contrat/ContratBlock.vue'
import MenuDashboard from '../components/headers/MenuDashboard.vue'




export default {
  name: 'DashboardView',

  data: ()=>({

  }),


  components: {
    ContratBlock,
    MenuDashboard
  }
}
</script>