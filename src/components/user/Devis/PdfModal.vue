
<template>
  <div
    class="overlay"
    v-if="$store.state.pdfShow"
    v-on:click="$store.dispatch('togglePdfModal', { target: $event.target })"
  >
    <div class="modale">
      <div class="container">
        <div class="pt-3 pb-3 border-bottom">
          <div class="d-flex justify-content-end">
            <button class="btn me-2 color-white" id="close-btn">X</button>
          </div>
          <h3 class="m-auto" style="font-weight: 300; text-align: center">
            Visualisation du Devis
          </h3>
        </div>

        <div class="pb-5 mt-5 row m-auto">
          <div class="col-lg">
            <!-- left -->

            <vue-pdf-embed :source="`${apiBase}/devis/download/${$store.state.item.uuid}`" />
            <div class="d-flex justify-content-center">
            </div>
            <div id="notify" class="text-danger">{{ err }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'
export default {
  name: "PdfModal",
  components:{
        VuePdfEmbed,
  },

  data() {
    return {
      err: "",
      devisUuid: this.$store.state.item.uuid,
      apiBase: process.env.VUE_APP_ROOT_API,
    };
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  z-index: 9999;
}

.modale {
  background: white;
  border: 5px solid rgb(50, 141, 245);
  width: 90%;
  margin: 100px auto;
  border-radius: 15px;
}
</style>