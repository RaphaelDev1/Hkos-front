<template>
  <FactureInfo v-bind:revele="revele" v-bind:toggleModal="toggleModal" />
  <PdfModal v-bind:pdfShow="pdfShow" v-bind:togglePdfModal="togglePdfModal" />

  <div class="container">
    <div class="border-bottom">
      <span class="fw-normal" style="font-size: 20px"
        ><i class="fa-solid fa-circle" style="font-size:18px; color:yellow"></i> Facture</span
      >
    </div>
    <div class="row">
      <div class="col-md mt-4">
        <div class="input-group col">
          <router-link
            to="/generateur-facture"
            class="btn-hkos"
            style="min-width: 140px"
            >+ Nouvelle Facture
          </router-link>
        </div>

        <div class="container-auto mt-5 row">
          <a class="aSearch col" @click="setTab('')">Tous</a>
          <a class="aSearch col" @click="setTab('Brouillon')">Brouillons</a>
          <a class="aSearch col" @click="setTab('Créé')">Créés</a>
          <a class="aSearch col" @click="setTab('Facturé')">Facturés</a>
          <a class="aSearch col" @click="setTab('Annulé')">Annulés</a>
        </div>

        <div class="">
          <table>
            <thead>
              <tr>
                <th>Numéro ▾</th>
                <th>Date ▾</th>
                <th>Client ▾</th>
                <th>Montant ▾</th>
                <th>Statut ▾</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="facture in getFacture"
                :key="facture"
                v-on:click="
                  $store.dispatch('toggleModal', {
                    status: true,
                    data: facture,
                    event: $event.target,
                  })
                "
              >
                <td>{{ facture.reference }}</td>
                <td>{{ getDate(facture.createdAt) }}</td>
                <td>
                  {{ facture.clients[0].nom }} {{ facture.clients[0].prenoms }}
                </td>
                <td>{{ facture.totalTTC }} €</td>
                <td class="optionsLine" @click.stop>
                  <div class="dropdown">
                    <button
                      :class="[getStatusButtonClass(facture.status)]"
                      class="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {{ getStatus(facture.status) }}
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          class="dropdown-item"
                          @click="
                            $store.dispatch('togglePdfModal', {
                              status: true,
                              data: facture,
                              event: $event.target,
                            })
                          "
                          >Visualiser le PDF</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          :href="`${apiBase}/facture/download/${facture.uuid}`"
                          >Télécharger</a
                        >
                      </li>
                      <li>
                        <router-link
                          class="dropdown-item"
                          :to="`/edit-facture/${facture.uuid}`"
                          >Modifier</router-link
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" @click="Delete(facture.uuid)"
                          >Supprimer</a
                        >
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>

              <!-- {getClient(facture.clientUuid)} -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="head-block2"></div>
  </div>
</template>

<script>
import FactureInfo from "./FactureInfo.vue";

import PdfModal from "./PdfModal.vue";
import $ from "jquery";
import DataTable from "datatables.net-dt";

let Table = null;

export default {
  name: "FactureBlock",
  props: {},
  components: {
    FactureInfo,
    PdfModal,
  },
  data() {
    return {
      revele: false,
      pdfShow: false,
      Clients: [],
      apiBase: process.env.VUE_APP_ROOT_API,
    };
  },

  methods: {
    setTab(value) {
      Table.search(value).draw();
    },

    async showPdfModal() {
      this.$store.dispatch("togglePdfModal", { status: true });
    },

    getDate(value) {
      return new Date(Date.parse(value)).toLocaleDateString();
    },

    getStatusButtonClass(value) {
      if (value == "DRAFT") {
        return "btn-draft";
      } else if (value == "CREATED") {
        return "btn-created";
      } else if (value == "PAYED") {
        return "btn-payed";
      } else if (value == "CANCELLED") {
        return "btn-cancelled";
      }
      return "btn-default";
    },

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

    async Delete(el) {
      let res = await fetch(
        `${process.env.VUE_APP_ROOT_API}/facture/delete/${el}`,
        {
          method: "delete",
        }
      );
      let data = await res.json();
      if (data) {
        return this.$router.go("Facture");
      }
    },
  },

  updated() {
    $("table").dataTable().fnDestroy();
    Table = $("table").DataTable({
      language: {
        search: "",
        info: " _PAGE_ sur _PAGES_ page(s)",
        infoFiltered: " - filtré à partir de _MAX_ éléments",
        infoEmpty: "Aucun élément à afficher",
        zeroRecords: "Aucun élément correspondant trouvé",
        lengthMenu: "_MENU_ éléments",
        paginate: {
          first: "First",
          last: "Last",
          next: "Suivant",
          previous: "Précédent",
        },
      },
      aaSorting: [],
      scrollX: true,
    });

    $('[type="search"]').attr(
      "placeholder",
      " Recherche par numéro, client..."
    );
  },

  mounted() {
    console.log(DataTable);
    this.$store.dispatch("getFacture");
  },
  computed: {
    getFacture() {
      return this.$store.state.Facture;
    },
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
.info:hover {
  background: lightgrey;
}

.optionsLine {
  width: 10%;
}
</style>

<style>
.dataTables_length {
  display: flex;
  justify-content: flex-end;
}
.dataTables_length label {
  font-size: 14px;
  margin-top: 20px;
  color: rgb(149, 146, 146);
}
.dataTables_length label select {
  border: 1px solid rgb(149, 146, 146);
  color: grey;
  border-radius: 3px;
}
table {
  width: 100%;
  cursor: pointer;
}

th {
  min-width: 150px;
  width: 20%;
  border-bottom: 2px solid lightgray;
  padding: 10px 15px;
  color: rgb(50, 141, 245);
}

th:hover{
 color: rgb(2, 65, 137);
    transition: 0.3s;
}

td {
  min-width: 150px;
  width: 20%;
  padding: 10px 15px;
  cursor: pointer;
}

tbody tr:hover {
  background-color: rgb(242, 242, 242);
}
.dataTables_filter {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
}
.dataTables_filter label {
  width: 100%;
}

.dataTables_filter input {
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 10px;
  width: 100%;
}

.dataTables_info {
  margin-top: 20px;
  font-size: 14px;
}

/* INFO buttons pagination */

.dataTables_paginate {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  align-items: center;
}

.dataTables_paginate a {
  text-decoration: none;
  color: black;
  font-size: 14px;
}

.dataTables_paginate span a {
  border: 1px solid transparent;
  color: black;
  padding: 6px;
  box-sizing: content-box;
}

.paginate_button {
  padding: 4px;
  box-sizing: content-box;
}

.paginate_button:hover {
  color: rgb(50, 141, 245);
}

span .paginate_button:hover {
  color: rgb(50, 141, 245);
}
.previous {
  box-sizing: border-box;
}

.current {
  background: rgb(50, 141, 245);
  color: white !important;
  height: inherit !important;
}

input[type="search"]::placeholder {
  color: rgb(149, 146, 146);
  font-size: 1em;
}

.vue-pdf-embed > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}
</style>