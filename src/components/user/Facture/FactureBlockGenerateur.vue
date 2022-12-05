<template>
  <AddClientBlock
    @accept="$store.dispatch('getClients')"
    v-bind:revele="revele"
    v-bind:toggleModale="toggleModale"
  />
  <div class="container">
    <div class="border-bottom d-flex justify-content-between">
      <span class="fw-normal" style="font-size: 20px"
        ><i
          class="fa-solid fa-circle"
          style="font-size: 18px; color: yellow"
        ></i>
        Facture</span
      >
      <button class="btn mb-1 btn-danger" @click="$router.go(-1)">
        Retour
      </button>
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
        v-model="form.clientUuid"
      >
        <option value="" disabled selected hidden>
          ▾ Sélectionner un client
        </option>
        <option v-for="client in getClients" :value="client.uuid" :key="client">
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
            v-model="form.commentaires"
          ></textarea>
        </div>
      </div>
      <div class="w-50 col-lg">
        <div class="pb-2">
          <label class="form-label">Date limite de réglement </label>
          <input
            class="form-control"
            v-model="form.dateReglement"
            type="date"
          />
        </div>
      </div>
    </div>

    <div class="table">
      <div
        class="t-row row mt-2"
        id="devismainblock"
        v-for="row in form.lines"
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
            v-model="row.quantity"
            @keydown="format"
            placeholder="Quantité"
            type="number"
            step="1.0"
          />
        </div>

        <div class="col">
          <label class="">Unité</label>
          <select
            id="unit"
            class="form-control"
            type=""
            style="font-weight: 300"
            v-model="row.units"
          >
            <option value="" disabled selected hidden>▾ Unité</option>
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
          <label class="">Prix</label>
          <input
            id="price"
            class="form-control calc-inp"
            type="number"
            placeholder="Prix €"
            v-model="row.htPrice"
          />
        </div>
        <div class="col">
          <label class="">TVA</label>
          <input
            id="tax"
            class="form-control calc-inp"
            type="number"
            v-model="row.tvaPercent"
            @keydown="format"
            placeholder="TVA %"
            step="1"
          />
        </div>

        <div class="col">
          <label class="">Montant</label>
          <input
            class="form-control"
            type="points"
            :value="
              (row.finalPrice =
                row.quantity *
                row.htPrice *
                (1 + row.tvaPercent / 100)).toFixed(2)
            "
            step="0.1"
            readonly="readonly"
          />
        </div>
      </div>
    </div>

    <!-- row.quantity * row.htPrice * (1 + row.tvaPercent / 100) -->
    <!-- Lines -->

    <div class="mx-auto d-flex justify-content-between border-bottom pb-3">
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
        <button
          v-if="form.lines.length > 1"
          @click="removeLast"
          class="btn btn-light border mt-3"
        >
          Supprimer -
        </button>
      </div>
    </div>

    <div class="border-bottom pb-3 pt-3">
      <div class="w-25 col-lg">
        <div class="pb-2">
          <label class="form-label pe-2" for="inputDesctiption">Remise</label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="remise"
              id="inlineRadio1"
              value="€"
              checked
              v-model="form.remiseUnits"
            />
            <label class="form-check-label" for="inlineRadio1">€</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="remise"
              id="inlineRadio2"
              value="%"
              v-model="form.remiseUnits"
            />
            <label class="form-check-label" for="inlineRadio2">%</label>
          </div>
          <input
            class="form-control"
            placeholder="Remise"
            type="number"
            step="0.01"
            @keydown="format"
            v-model="form.remise"
          />
        </div>
      </div>
      <div class="w-25 col-lg">
        <div class="pb-2">
          <label class="form-label pe-2">Acompte</label>

                    <input
            class="form-control"
            placeholder="Acompte"
            type="number"
            step="0.01"
            @keydown="format"
            v-model="form.accompte"
          />
        </div>


          
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
        :value="(form.totalHT = getHT.toFixed(2))"
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
        :value="(form.totalTVA = getTVAeuro.toFixed(2))"
      />
    </div>

    <div class="">
      <label class="mt-3 me-2">Total TTC</label>
      <span>€ </span>
      <input
        id="amount"
        style="border: none"
        type="number"
        placeholder="0.00"
        readonly="readonly"
        :value="(form.totalTTC = getTotal.toFixed(2))"
      />
    </div>
  </div>

  <div id="notify" class="text-danger">{{ err }}</div>

  <div class="d-flex justify-content-center m-4">
    <button class="btn-hkos" @click="sendForm">Générer ma facture</button>
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
  name: "FactureBlockGenerateur",
  props: {
    msg: String,
  },

  data() {
    return {
      status: false,
      revele: false,
      form: {
        clientUuid: "",
        dateReglement: "",
        commentaires: "",
        lines: [new lines()],
        totalTTC: "",
        totalHT: "",
        totalTVA: "",
        userUuid: "7dc966c7-2a68-4a2d-b79e-407579f178c3",
        remise: "",
        remiseUnits: "",
        accompte: "",
      },
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
      this.form.lines.push(new lines());
    },
    async sendForm() {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/facture/create`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });

      let data = await res.json();

      if (data.message == "Facture created") {
        this.$router.push("Facture");
      } else {
        console.log(data);
        this.err = data.error.message;
      }
    },

    removeLast() {
      this.form.lines.pop();
    },

    toggleModale: function (e) {
      if (e) {
        if (!e.target.closest(".modale") || e.target.id == "close-btn")
          this.revele = false;
      } else this.revele = false;
    },
  },
  mounted() {
    this.$store.dispatch("getClients");
  },

  computed: {
    getTotal() {
      let result = 0;

      // if (this.form.remiseUnits === "%" && this.form.remise) {
      //   this.form.lines.forEach((elem) => {
      //   result +=
      //     ((elem.htPrice * elem.quantity) * (1 - (this.form.remise / 100))) * (elem.tvaPercent / 100 + 1) 
      // });
      // return result 
      // }

      this.form.lines.forEach((elem) => {
        result +=
          (elem.htPrice * elem.quantity) *
          (elem.tvaPercent / 100 + 1);
      });
      return result

      
    },

    getHT() {

      let result = 0;

      // if (this.form.remiseUnits === "%" && this.form.remise) {
      //   this.form.lines.forEach((elem) => {
      //   result += (elem.htPrice * elem.quantity) * (1 - this.form.remise/100);
      // });

      // if (result < 0) {
      //   return 0;
      // }

      // return result 
      // }

      this.form.lines.forEach((elem) => {
        result += elem.htPrice * elem.quantity;
      });

      
      return result;
    },


    getTVAeuro() {
      let result = 0;
      this.form.lines.forEach((elem) => {
        result +=
          (elem.htPrice * elem.quantity)  * (elem.tvaPercent / 100 + 1) - (elem.htPrice * elem.quantity)
      });
      if (result < 0) {
        return 0;
      }
      return result;
    },

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
