<template>
  <DevisInfo v-bind:revele="revele" v-bind:toggleModale="toggleModale" />
  <FactureInfo v-bind:revele="revele" v-bind:toggleModale="toggleModale" />
  <div class="container">
    <!-----first container---->
    <div class="row">
      <div class="col pb-5">
        <!-----left---->
        <div class="">
          <span class="fw-normal" style="font-size: 20px"
            >Votre Entreprise
          </span>
        </div>
        <div class="mt-4"><span style="font-weight:400">Derniers devis</span></div>

        <hr />

        <div
          v-for="devis in getDevis"
          :key="devis"
          v-on:click="
            $store.dispatch('toggleModal', {
              status: true,
              data: devis,
              event: $event.target,
            })
          "
          class="row hoverline"
        >
          <div class="col d-flex align-items-center pt-1 pb-1">
            <span>{{ devis.reference }}</span>
          </div>
          <div class="col d-flex align-items-center justify-content-end pt-1 pb-1 ">
            <span>{{ devis.totalTTC }} €</span>
          </div>
          <div class="col text-end pt-1 pb-1">
             <button
              :class="[getStatusButtonClass(devis.status)]"
              class=""
              style="width: 85px !important;"
            >
              {{ getStatus(devis.status, "text") }}
            </button>
          </div>
        </div>

        <div class="mt-4"><span style="font-weight:400">Derniers factures</span></div>

        <hr />

        <div
          v-for="facture in getFacture"
          :key="facture"
          v-on:click="
            $store.dispatch('toggleModal', {
              status: true,
              data: facture,
              event: $event.target,
            })
          "
          class="row hoverline"
        >




          <div class="col d-flex align-items-center pt-1 pb-1">
            <span>{{ facture.reference }}</span>
          </div>
          <div class="col d-flex align-items-center justify-content-end pt-1 pb-1 ">
            <span>{{ facture.totalTTC }} €</span>
          </div>
          <div class="col text-end pt-1 pb-1">
             <button
              :class="[getStatusButtonClass(facture.status)]"
              class=""
              style="width: 85px !important;"
            >
              {{ getStatus(facture.status, "text") }}
            </button>
          </div>
        </div>

        <div class="mt-4"><span>Derniers contrats</span></div>

        <hr />

        <div>
          <p class="text13">xxxx</p>
        </div>
      </div>

      <div class="col-lg">
        <!-----right---->

        <div class="row m-auto">
          <div class="border col me-2 text-center">
            <p class="text13">CA de Mai 2022</p>

            <div class=""><p class="text15">XXX-XX $</p></div>
          </div>

          <div class="border col text-center">
            <p class="text13">TVA collectée en Mai</p>

            <div class=""><p class="text15">XXX-XX $</p></div>
          </div>
        </div>
        <div class="row m-auto">
          <div class="border col mt-2 text-center">
            <p class="text13">Chiffres d'affaires</p>

            <div><img src="img/img11.png" class="img-fluid" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevisInfo from "../Devis/DevisInfo.vue";
import FactureInfo from "../Facture/FactureInfo.vue";

export default {
  name: "DashboardBlock",
  props: {
    msg: String,
  },
  components: {
    DevisInfo,
    FactureInfo
  },
  data() {
    return {};
  },

  methods: {
    getStatus(value) {
      if (value == "DRAFT") {
        let res = "Brouillon";
        value = res;
      } else if (value == "CREATED") {
        let res = "Créé";
        value = res;
      } else if (value == "PAYED") {
        let res = "Facturé";
        value = res;
      } else if (value == "CANCELLED") {
        let res = "Annulé";
        value = res;
      }
      return value;
    },

   getStatusButtonClass(value) {
      if (value == "DRAFT") {
        return 'btn-draft';
      } else if (value == "CREATED") {
        return 'btn-created';
      } else if (value == "PAYED") {
        return 'btn-payed';
      } else if (value == "CANCELLED") {
        return 'btn-cancelled';
      }
      return 'btn-default';
    },
  },
  mounted() {
    this.$store.dispatch("getUser");
    this.$store.dispatch("getDevis");
    this.$store.dispatch("getFacture");
  },
  updated() {},

  computed: {
    getDevis() {
      return this.$store.state.Devis.filter((el, inx) => inx < 5);
    },
        getFacture() {
      return this.$store.state.Facture.filter((el, inx) => inx < 5);
    },
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}

.hoverline:hover {
  background-color: rgb(242, 242, 242);
}
</style>