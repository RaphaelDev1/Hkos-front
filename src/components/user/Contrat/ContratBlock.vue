<template>
  <!-- <FactureInfo v-bind:revele="revele" v-bind:toggleModal="toggleModal" />
  <PdfModal v-bind:pdfShow="pdfShow" v-bind:togglePdfModal="togglePdfModal" /> -->

  <div class="container">
    <div class="border-bottom">
      <span class="fw-normal" style="font-size: 20px"
        ><i
          class="fa-solid fa-circle"
          style="font-size: 18px; color: rgb(50, 141, 245)"
        ></i>
        Contrat</span
      >
    </div>
    <div class="row">
      <div class="col-md mt-4">
        <div class="input-group col">
          <router-link
            to="/generateur-contrat"
            class="btn-hkos"
            style="min-width: 140px"
            >+ Nouveau Contrat
          </router-link>
        </div>

        <div class="mt-4">
          <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">


            <div class="col">
              <div class="p-3 hkosblue text-center text-white">
                <div class="text-center">
                  <p class="text-white mt-2" style="font-size: 26px">23</p>
                  <p class="text-white">CDI</p>
                </div>
              </div>
            </div>


            <div class="col">
              <div class="p-3 hkosblue1 text-center text-white">
                <div class="text-center">
                  <p class="text-white mt-2" style="font-size: 26px">5</p>
                  <p class="text-white">CDD</p>
                </div>
              </div>
            </div>


            <div class="col">
              <div class="p-3 hkosblue text-center">
                <p class="text-white mt-2" style="font-size: 26px">XXX-XX €</p>
                <p class="text-white">Charges salariales</p>
              </div>
            </div>


           <div class="col">
              <div class="p-3 hkosyellow text-center">
                <p class="text-hkos mt-2" style="font-size: 26px">XXX-XX €</p>
                <p class="text-hkos">URSAFF en cours</p>
              </div>
            </div>


            <div class="col">
              <div class="p-3 hkosblue2 text-center text-white">
                <div class="text-center">
                  <p class="text-white mt-2" style="font-size: 26px">3</p>
                  <p class="text-white">Intérims</p>
                </div>
              </div>
            </div>


            <div class="col">
              <div class="p-3 hkosblue3 text-center text-white">
                <div class="text-center">
                  <p class="text-white mt-2" style="font-size: 26px">2</p>
                  <p class="text-white">Stagiaires</p>
                </div>
              </div>
            </div>


          </div>
        </div>

        


          <div class="d-flex justify-content-around align-items-center mt-5 text-hkos"> <i class="fa-solid fa-address-book d-flex flex-column align-items-center" style="font-size:100px"><span class="mt-2">Annuaire salariés</span></i>
          <i class="fa-solid fa-triangle-exclamation d-flex flex-column align-items-center" style="font-size:100px"><span class="mt-2">Contrats à régulariser</span></i>
          <i class="fa-solid fa-people-arrows d-flex flex-column align-items-center" style="font-size:100px"><span class="mt-2">Planning ressources</span></i>
          </div>

        <div class="container-auto mt-5 row">
          <a class="aSearch col" @click="setTab('')">Tous</a>
          <a class="aSearch col" @click="setTab('')">CDI</a>
          <a class="aSearch col" @click="setTab('Brouillon')">CDD</a>
          <a class="aSearch col" @click="setTab('Créé')">Intérims</a>
          <a class="aSearch col" @click="setTab('Facturé')">Stagiaires</a>
        </div>

        

        <div class="">
          <table>
            <thead>
              <tr>
                <th>Référence ▾</th>
                <th>Nom \ Prènoms ▾</th>
                <th>Entrée \ Fin ▾</th>
                <th>Salaire ▾</th>
                <th>Type ▾</th>
                <th>Dept ▾</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="contrat in getContrat"
                :key="contrat"
                v-on:click="
                  $store.dispatch('toggleModal', {
                    status: true,
                    data: contrat,
                    event: $event.target,
                  })
                "
              >
                <td>{{ contrat.reference }}</td>
                <!-- <td>
                  {{ contrat.clients[0].nom }} {{ contrat.clients[0].prenoms }}
                </td> -->


                <td>{{ contrat.salaire }} €</td>
                <td>{{ contrat.type }}</td>


                <!-- <td class="optionsLine" @click.stop>
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
                    </ul> -->
                  <!-- </div> -->
                 <!-- </td> -->
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
// import FactureInfo from "./FactureInfo.vue";
// import PdfModal from "./PdfModal.vue";

import $ from "jquery";
import DataTable from "datatables.net-dt";

let Table = null;

export default {
  name: "ContratBlock",
  props: {},
  components: {
    // FactureInfo,
    // PdfModal,
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
      return this.$store.state.Contrat;
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

th:hover {
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

.hkosblue {
  background: rgb(50, 141, 245);
}

.hkosblue1 {
  background: rgba(50, 141, 245, 0.8);
}

.hkosblue2 {
  background: rgba(50, 141, 245, 0.65);
}

.hkosblue3 {
  background: rgba(50, 141, 245, 0.5);
}

.hkosyellow {
  background: rgb(242, 255, 2);
}

.text-hkos {
  color: rgb(50, 141, 245);
}
</style>