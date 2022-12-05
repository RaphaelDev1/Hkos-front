<template>
  <AddClientBlock
    @accept="getForm"
    v-bind:revele="revele"
    v-bind:toggleModale="toggleModale"
  />

  <div class="container">
    <div class="border-bottom d-flex justify-content-between">
      <span class="fw-normal" style="font-size: 20px">Modifier "{{$store.state.EditDevis.reference}}"</span>
      <button class="btn mb-1 btn-danger" @click="$router.go(-1)">Retour</button>
    </div>

    <div class="pb-2 mt-3"><span>Client</span></div>

    <div class="input-group pb-3 border-bottom">
      <button
        class="btn-hkos"
        v-on:click="
          $store.dispatch('toggleModal', { status: true, event: $event.target })
        "
        id="open-modal"
      >
        Nouveau client +
      </button>
      <select
        class="form-control"
        style="font-weight: 300"
        v-model="$store.state.EditDevis.clientUuid"
        type=""
      >
        <option :value="client.uuid" v-for="client in getClients" :key="client">
          {{ client.nom }} {{ client.prenoms }}
        </option>
      </select>
    </div>

    <div class="d-flex border-bottom pb-3 pt-3 row">
      <div class="w-50 col-lg">
        <div>
          <label class="form-label" for="inputDesctiption">Commentaires</label>
          <textarea
            class="form-control"
            rows="4"
            v-model="$store.state.EditDevis.commentaires"
          ></textarea>
        </div>
      </div>
      <div class="w-50 col-lg">
        <div class="pb-2">
          <label class="form-label">Date limite de réglement </label>
          <input
            class="form-control"
            v-model="$store.state.EditDevis.dateReglement"
            type="date"
          />
        </div>
      </div>
    </div>

    <div class="table">
      <div
        class="t-row row mt-2"
        id="devismainblock"
        v-for="row in $store.state.EditDevis.lines"
        :key="row"
      >
        <div class="col-xl-4" id="devismainblock">
          <label class="">Description</label>
          <input
            class="form-control"
            v-model="row.productName"
            type="text"
            placeholder="Description"
          />
        </div>
        <div class="col">
          <label class="">Date</label>
          <input class="form-control" v-model="row.date" type="date" />
        </div>

        <div class="col">
          <label class="">Quantité</label>
          <input
            id="qty"
            class="form-control calc-inp maclasse"
            placeholder="Quantité"
            v-model="row.quantity"
            @keydown="format"
            type="number"
            step="0.5"
          />
        </div>

        <div class="col">
          <label class="">Unité</label>
          <select id="unit" class="form-control" type="" v-model="row.units">
            <option value="PIECE">Piéce(s)</option>
            <option value="HEURE">Heures</option>
            <option value="KM">Km</option>
            <option value="KG">Kg</option>
            <option value="M">M</option>
            <option value="LOT_PARC">Lot Parc</option>
            <option value="AM">Am</option>
          </select>
        </div>

        <div class="col">
          <label class="">Prix(€)</label>
          <input
            id="price"
            class="form-control calc-inp"
            type="number"
            placeholder="Prix"
            v-model="row.htPrice"
          />
        </div>
        <div class="col">
          <label class="">TVA(%)</label>
          <input
            id="tax"
            class="form-control calc-inp"
            type="number"
            v-model="row.tvaPercent"
            @keydown="format"
            placeholder="TVA(%)"
            step="0.1"
          />
        </div>

        <div class="col">
          <label class="">Montant(€)</label>
          <input
            class="form-control"
            type="points"
            :value="
              (row.finalPrice =
                row.quantity *
                row.htPrice *
                (1 + row.tvaPercent / 100)).toFixed(2)
            "
            placeholder="0.00"
            step="0.1"
            readonly="readonly"
          />
        </div>
      </div>
    </div>

    <!-- Lines -->

    <div class="mx-auto d-flex justify-content-between">
      <div>
        <button
          class="btn btn-light border mt-3"
          id="addbutton"
          type="button"
          @click="addRow"
        >
          Ajouter +
        </button>
      </div>

      <div>
        <button @click="removeLast" class="btn btn-light border mt-3">
          Supprimer -
        </button>
      </div>
    </div>

    <div>
      <label class="mt-3 me-3">Total HT</label>
      <span>€ </span>
      <input
        style="border: none"
        type="number"
        placeholder="0.00"
        readonly="readonly"
        :value="getTotal().totalHT.toFixed(2)"
      />
    </div>

    <div>
      <label class="mt-3 me-2">Total TVA</label>
      <span>€ </span>
      <input
        style="border: none"
        type="number"
        placeholder="0.00"
        readonly="readonly"
        :value="getTotal().totalTVA.toFixed(2)"
      />
    </div>

    <div>
      <label class="mt-3 me-2">Total TTC</label>
      <span>€ </span>
      <input
        id="amount"
        style="border: none"
        type="number"
        placeholder="0.00"
        readonly="readonly"
        :value="getTotal().totalTTC.toFixed(2)"
      />
    </div>
  </div>

  <div id="notify" class="text-danger">{{ err }}</div>

  <div class="d-flex justify-content-center m-4">

    <button class="btn-hkos" @click="sendForm">Modifier mon devis</button>
  </div>
</template>

<script>
import AddClientBlock from "../AddClientBlock.vue";

class lines {
  productName = "";
  date = "";
  units = "";
  quantity = "";
  htPrice = "";
  tvaPercent = "";
  finalPrice = "";
}

export default {
  name: "EditDevis",
  props: {
    msg: String,
  },

  data() {
    return {
      err: "",
    };
  },
  methods: {
    format(e) {
      var key = e.key;
      if (
        !/^\d+/g.test(key) &&
        key != "Backspace" &&
        key != "Delete" &&
        key != "ArrowLeft" &&
        key != "ArrowRight"
      ) {
        e.preventDefault();
      }
    },
    addRow() {
      this.$store.state.EditDevis.lines.push(new lines());
    },
    async sendForm() {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/devis/update/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.$store.state.EditDevis),
      });

      let data = await res.json();
      if (data.message == "Devis Updated") {
        this.$router.push("/Devis");
      } else {
        this.err = data.error.message;
      }
    },

    removeLast() {
      if (this.$store.state.EditDevis.lines.length > 1) {
        this.$store.state.EditDevis.lines.pop();
      }
    },

    toggleModale: function (e) {
      if (e) {
        if (!e.target.closest(".modale") || e.target.id == "close-btn")
          this.revele = false;
      } else this.revele = false;
    },

    getTotal() {
      const Result = {
        totalHT: 0,
        totalTTC: 0,
        totalTVA: 0,
      };
      if (this.$store.state.EditDevis.lines) {
        this.$store.state.EditDevis.lines.forEach((elem) => {
          Result.totalHT += elem.htPrice * elem.quantity;
          Result.totalTTC += elem.finalPrice;
          Result.totalTVA += elem.finalPrice - elem.htPrice * elem.quantity;
        });
      }
      this.$store.state.EditDevis.totalHT = Result.totalHT.toFixed(2);
      this.$store.state.EditDevis.totalTTC = Result.totalTTC.toFixed(2);
      this.$store.state.EditDevis.totalTVA = Result.totalTVA.toFixed(2);

      return Result;
    },

    getDate() {
      let Result = "";
      if (this.$store.state.EditDevis.dateReglement) {
        Result = this.$store.state.EditDevis.dateReglement.substring(
          0,
          this.$store.state.EditDevis.dateReglement.length - 14
        );
      }
      this.$store.state.EditDevis.totalTVA == Result;
      return Result;
    },
  },
  mounted() {
    this.$store.dispatch("getDevis", { uuid: this.$route.params.uuid });
    this.$store.dispatch("getClients");
  },
  updated() {},

  computed: {
    getClients() {
      return this.$store.state.Clients;
    },
  },
  components: {
    AddClientBlock,
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
</style>

