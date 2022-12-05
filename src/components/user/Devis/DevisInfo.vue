
<template>
  <div
    class="overlay"
    v-if="$store.state.revele"
    v-on:click="$store.dispatch('toggleModal', { target: $event.target })"
  >
    <div class="modale">
      <div class="container">
        <div class="pt-3 pb-3 border-bottom">
          <div class="d-flex justify-content-between">
           <a target="_blank"
              @click="$store.dispatch('togglePdfModal', {
                status: true,
                data: devis,
                event: $event.target,
              })"
            >
              <i class="fa-solid fa-eye btn" style="font-size:20px; color:rgb(50, 141, 245)"></i>
            </a>
            <a class="" id="close-btn"><i class="fa-solid fa-x btn" id="close-btn" style="font-size:18px; color:rgb(50, 141, 245); cursor:pointer"></i></a>
          </div>
          <h3 class="m-auto" style="font-weight: 300; text-align: center">
            Devis № {{ $store.state.item.reference }}
          </h3>
          <div class="w-25 text-center m-auto" >
            <span class="mt-3 btn rounded-pill disabled" :class="[getStatusButtonClass($store.state.item.status)]"
              >
             {{ getStatus($store.state.item.status, "text") }}
          </span>

          </div>
        </div>

        <div class="pb-5 mt-3 row m-auto">
          <div class="col-lg">
            <!-- left -->

            <div class="pb-2 d-flex justify-content-between">
              <div class="">
                <a
                  class="btn btn-success"
          
                  href="mailto:"
                >
                  Envoyer
                </a>
              </div>
              <div class="">
                <button
                  class="btn dropdown-toggle btn-outline-secondary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" :href="`https://hkos-back.herokuapp.com/devis/download/${$store.state.item.uuid}`">Télécharger</a>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      id="close-btn"
                      :to="`/edit-devis/${$store.state.item.uuid}`"
                      >Modifier</router-link
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" @click="Duplicate" href="#">Dupliquer</a>
                  </li>
                   <li>
                    <a class="dropdown-item" href="#">Transformer en Facture</a>
                  </li>
                  <li>
                     <a class="dropdown-item" @click="Delete($store.state.item.uuid)"
                          >Supprimer</a
                        >
                  </li>
                </ul>
              </div>

              <div class="dropdown">
                <button
                  class="btn dropdown-toggle btn-outline-secondary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Statut
                </button>
                <button class="dropdown-menu">
                  <a  class="dropdown-item" @click="Statut('DRAFT')"
                    >Brouillon</a
                  >
                  <a class="dropdown-item" @click="Statut('CREATED')">Créé</a>

                  <a  class="dropdown-item" @click="Statut('PAYED')"
                    >Facturé</a
                  >

                  <a class="dropdown-item" @click="Statut('CANCELLED')" >Annulé</a>
                </button>
              </div>
            </div>

            <div class="mt-3 pt-2 pb-2 bg-light">
              <div class="ps-3">
                {{ $store.state.item.clients[0].nom }}
                {{ $store.state.item.clients[0].prenoms }}
              </div>
              <div class="ps-3">{{ $store.state.item.clients[0].adresse }}</div>
              <div class="ps-3">
                {{ $store.state.item.clients[0].codePostal }}
              </div>
              <div class="ps-3">{{ $store.state.item.clients[0].pays }}</div>
            </div>

            <div class="mt-3 pb-3 border-bottom">
              <div>Commentaires :{{ $store.state.item.commentaires }}</div>
            </div>

            <div class="mt-3 d-flex justify-content-between">
              <span style="font-weight: 300">Total HT</span>
              <span style="font-weight: 300"
                >{{ $store.state.item.totalHT }} €
              </span>
            </div>

            <div class="mt-3 d-flex justify-content-between">
              <span style="font-weight: 300">TVA</span>
              <span style="font-weight: 300"
                >{{ $store.state.item.totalTVA }} €</span
              >
            </div>

            <div class="mt-3 pb-3 border-bottom d-flex justify-content-between">
              <span style="font-weight: 300">Total TTC</span>
              <span style="font-weight: 300"
                >{{ $store.state.item.totalTTC }} €</span
              >
            </div>

            <div class="mt-4 pt-2 pb-2 bg-light">
              <div class="ps-3" style="font-weight: 300">Historique</div>
              <div class="ps-3 mt-3 d-flex justify-content-between">
                <span>• Créé</span>
                <span class="pe-2" style="color: grey">{{
                  getDate($store.state.item.createdAt)
                }}</span>
              </div>

                            <div class="ps-3 mt-3 d-flex justify-content-between">
                <span>• Modifié</span>
                <span class="pe-2" style="color: grey">{{
                  getDate($store.state.item.updatedAt)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DevisInfo",
  props: [],
  data() {
    return {};
  },
  methods: {
    async Statut(status) {
      this.$store.state.item.status = status;

      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/devis/update/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.$store.state.item),
      });
      let data = await res.json();
      if(data.message){
        console.log(data.message);
        this.$router.go("Devis");
      }
    },

        async Duplicate() {
           

      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/devis/duplicate/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"uuid": this.$store.state.item.uuid}),
      });
      let data = await res.json();
      if(data.message){
        console.log(data.message);
        this.$router.go("Devis");
      }
    },

        async Delete(el) {
      let res = await fetch(
        `${process.env.VUE_APP_ROOT_API}/devis/delete/${el}`,
        {
          method: "delete",
        }
      );
      let data = await res.json();
      if (data) {
        return this.$router.go("Devis");
      }
    },

    getDate(value) {
      return new Date(Date.parse(value)).toLocaleString();
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

    getStatusButtonClass(value) {
      if (value == "DRAFT") {
        return "btn-outline-secondary";
      } else if (value == "CREATED") {
        return "btn-outline-info";
      } else if (value == "PAYED") {
        return "btn-outline-success";
      } else if (value == "CANCELLED") {
        return "btn-outline-danger";
      }
      return "btn-outline-default";
    },
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