
<template>
  <div
    class="overlay"
    v-if="$store.state.revele"
    v-on:click="$store.dispatch('toggleModal', { target: $event.target })"
  >
    <div class="modale">
      <div class="container">
        <div class="pt-3 pb-3 border-bottom">
          <div class="d-flex justify-content-end">
             <a class="" id="close-btn"><i class="fa-solid fa-x btn" id="close-btn" style="font-size:18px; color:rgb(50, 141, 245); cursor:pointer"></i></a>
          </div>
          <h3 class="m-auto" style="font-weight: 300; text-align: center">
            Nouveau client
          </h3>
        </div>

        <div class="pb-5 mt-5 row m-auto">
          <div class="col-lg">
            <!-- left -->

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Type de client</label>
              <select
                class="form-select w-50"
                style="font-weight: 300"
                v-model="form.type"
              >
                <option value="" disabled selected hidden>
                  ▾ Sélectionner type de client
                </option>
                <option value="particulier" selected>Client particulier</option>
                <option value="professionnel">Client professionnel</option>
              </select>
            </div>

            <div class="pb-2 mt-3 mb-3 d-flex justify-content-between">
              <div></div>
              <span class="w-50" style="font-weight: 400">Coordonnées</span>
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Prénom *</label>
              <input class="form-control w-50" v-model="form.prenoms" placeholder="Prénom" />
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Nom de famille *</label>
              <input class="form-control w-50" v-model="form.nom" placeholder="Nom de famille" />
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">E-mail</label>
              <input class="form-control w-50" v-model="form.email" placeholder="E-mail" type="email"/>
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Téléphone</label>
              <input class="form-control w-50" v-model="form.telephone" placeholder="Téléphone" />
            </div>

            <div class="pb-2 mt-3 mb-3 d-flex justify-content-between">
              <div></div>
              <span class="w-50" style="font-weight: 400"
                >Adresse de facturation</span
              >
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Adresse</label>
              <input class="form-control w-50" v-model="form.adresse" placeholder="Adresse" />
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Code Postale</label>
              <input class="form-control w-50" v-model="form.codePostal" placeholder="Code Postale" />
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Ville</label>
              <input class="form-control w-50" v-model="form.ville" placeholder="Ville" />
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Pays</label>
              <input class="form-control w-50" v-model="form.pays" placeholder="Pays" />
            </div>

            <div class="pb-2 mt-3 mb-3 d-flex justify-content-between">
              <div></div>
              <span class="w-50" style="font-weight: 400"
                >Adresse E-facture</span
              >
            </div>

            <div class="pb-2 d-flex justify-content-between">
              <label class="form-label">Siret</label>
              <input class="form-control w-50" v-model="form.siret" placeholder="XXX-XXX-XXX-XXXXX" />
            </div>

            <div class="d-flex justify-content-center mt-5">
              <button class="btn btn-primary me-3" to="" @click="sendForm">
                Enregistrer
              </button>
              <button
                class="btn btn-light border pe-4 ps-4"
                to=""
                id="close-btn"
              >
                Annuler
              </button>
            </div>
            <div id="notify" class="text-danger">{{ err }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddClientBlock",

  data() {
    return {
      form: {
        type: "",
        prenoms: "",
        nom: "",

        email: "",
        telephone: "",
        adresse: "",

        codePostal: "",
        ville: "",
        pays: "",
        siret: "",
        reference: "refClient-7",
        userUuid: "7dc966c7-2a68-4a2d-b79e-407579f178c3",
      },
      err: "",
    };
  },
  methods: {
    async sendForm() {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/clients/create`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });


      let data = await res.json();
      if (data.message) {
        this.$store.dispatch("toggleModal", { status: false });
        this.$emit("accept");
      } else {
        this.err = data.error.message;
      }

      //this.clients.push(data)

      //this.clients = data

      //fetch(ur).then(()).then();
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