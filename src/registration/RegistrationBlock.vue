<template>
  <div class="container">
    <div class="border-bottom">
      <h3 class="fw-normal mb-5 w-75 m-auto">Créer votre compte Hkos</h3>
    </div>

    <div class="pb-5 mt-5 row w-75 m-auto">
      <div class="col-lg">
        <!-- left -->

        <div class="pb-2">
          <label class="form-label">Quel est le nom de votre entreprise?</label>
          <input class="form-control" v-model="form.name" type="text" />
        </div>

        <div class="pb-2">
          <label class="form-label">Quelle est sa forme juridique?</label>
          <input class="form-control" v-model="form.formeJuridique" type="text" />
        </div>

        <div class="pb-2">
          <label class="form-label">Téléphone de votre entreprise?</label>
          <input
            class="form-control"
            v-model="form.telephone"
            type="number"
            placeholder="+33 XXXXXXXX"
          />
        </div>
        <div class="pb-2">
          <label class="form-label"
            >Quelle est le nom et prénom du dirigeant?</label
          >
          <input class="form-control" v-model="form.dirigeant" type="text" />
        </div>
      </div>
    </div>

    <div class="pb-5">
      <div class="">
        <h6 class="fw-normal w-75 m-auto text-center">
          Dites nous en plus sur votre entreprise<br />↓
        </h6>
      </div>

      <div class="mt-5 w-75 m-auto">
        <div class="pb-2">
          <label class="form-label">Logo de votre entreprise</label>
          <input class="form-control" type="file" />
        </div>

        <div class="pb-2">
          <label class="form-label">SIRET de votre entreprise?</label>
          <input class="form-control" v-model="form.siret" type="text" />
        </div>

        <div class="pb-2">
          <label class="form-label">E-mail de votre entreprise?</label>
          <input class="form-control" v-model="form.email" type="text" />
        </div>
        <label class="form-label">Adresse de votre entreprise?</label>
        <input
          class="form-control mb-2"
          v-model="form.adresse"
          type="text"
          placeholder="Adresse"
        />
        <input
          class="form-control mb-2"
          v-model="form.companyVille"
          type="text"
          placeholder="Ville"
        />
        <input
          class="form-control mb-2"
          v-model="form.code"
          type="text"
          placeholder="Code Postale"
        />
        <input
          class="form-control mb-2"
          v-model="form.pays"
          type="text"
          placeholder="Pays"
        />
      </div>
    </div>

    <div class="">
      <h6 class="fw-normal w-75 m-auto text-center">
        Dites nous en plus sur vous<br />↓
      </h6>
    </div>

    <div class="col-lg pb-5 border-bottom w-75 m-auto">


      <div class="mt-2">
        <label class="form-label">Votre nom</label>
        <input class="form-control" v-model="form.nom" type="text" />
      </div>
      <div class="mt-2">
        <label class="form-label">Votre Prénom</label>
        <input class="form-control" v-model="form.prenoms" type="text" />
      </div>

      <div class="mt-2">
        <label class="form-label">Type d'activité</label>
        <input class="form-control" v-model="form.typeActivite" type="text" />
      </div>

       <div class="mt-2">
        <label class="form-label">Raison Sociale</label>
        <input class="form-control" v-model="form.raisonSociale" type="text" />
      </div>
      <div class="mt-2">
        <label class="form-label">Siren</label>
        <input class="form-control" v-model="form.siren" type="text" />
      </div>

      <div class="mt-2 pb-5">
        <label class="form-label">Raison Sociale</label>
        <input class="form-control" v-model="form.raisonSociale" type="text" />
      </div>

          <div class="">
      <h6 class="fw-normal w-75 m-auto text-center">
        Sécurisez votre compte<br />↓
      </h6>
    </div>

      <div class="mt-2">
        <label class="form-label">Choisissez votre login</label>
        <input class="form-control" v-model="form.login" type="text" />
      </div>

      <div class="pb-2">
        <label class="form-label">Choisissez votre mot-de passe *</label>
        <input class="form-control" v-model="form.password" type="text" />
      </div>

      <div class="pb-2">
        <label class="form-label">Confirmez votre mot-de passe *</label>
        <input class="form-control" v-model="form.confirmPassword" type="text" />
      </div>

      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label class="form-check-label" for="flexCheckDefault">
        J'ai lu et j'accepte les conditions générales d'utilisation
      </label>
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <router-link class="btn btn-primary mt-5 mb-5" to="" @click="sendForm">
      Créer mon compte Hkos</router-link
    >
    <div id="notify"></div>
  </div>
</template>

<script>
export default {
  name: "RegistrationBlock",
  props: {
    msg: String,
  },

  data() {
    return {
      status: false,
      form: {
        name: "",
        formeJuridique: "",
        telephone: "",
        dirigeant: "",
        siret: "",
        email: "",
        adresse: "",

        // ville: "",
        code: "",
        pays: "",



        nom: "",
        prenoms:"",
        login: "",
        password: "",
      },
    };
  },

  methods: {
    async sendForm() {
      let res = await fetch("https://hkos22.herokuapp.com/users/create", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });

      let data = await res.json();

      console.log(data);
      const Notify = document.querySelector("#notify");

      if (data.status == "ok")
        this.$router.push('Connection') ;
        
      if (data.status == "already")
        Notify.innerHTML = '<p class="text-danger">Login est deja utilisé et veuillez renseigner les champs obligatoires</p>';
    },
  },
};
</script>