<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  data: () => ({}),

  mounted() {
    console.log(this.$store);
  },
};
</script>


