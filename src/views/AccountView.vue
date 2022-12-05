<template>
  <MenuDashboard/>
  <AccountBlock/>
</template>

<script>
import AccountBlock from '../components/user/Application/AccountBlock.vue'
import MenuDashboard from '../components/headers/MenuDashboard.vue'





export default {
  name: 'HomeView',

  data: ()=>({

  }),


  components: {
    AccountBlock,
    MenuDashboard,
  }
}
</script>