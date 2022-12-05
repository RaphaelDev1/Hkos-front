<template>
  <div class="container" v-for="info in getInfo" :key="info">
    <div class="border-bottom">
      <span class="fw-normal" style="font-size: 20px">Mon compte Hkos</span>
    </div>

    <div class="">
      <div class="mt-4 pb-2">
        <span class="" style="font-weight: 400">Entreprise</span>
      </div>
      <div class="pb-2">
        <span class="">{{ info.company.name }}</span>
      </div>
      <div class="pb-2">
        <span class="">{{ info.company.formeJuridique }}</span>
      </div>

      <div class="pb-2">
        <span class=""> Tél : {{ info.company.telephone }}</span>
      </div>
      <div class="pb-2">
        <span class=""> Dirigeant : {{ info.company.dirigeant }}</span>
      </div>
      <div class="pb-2">
        <span class="">{{ info.company.email }}</span>
      </div>
      <div class="pb-2">
        <span class=""
          >{{ info.company.adresse }} , {{ info.company.code }} ,
          {{ info.company.pays }}</span
        >
      </div>
      <div class="pb-2">
        <span class="">SIRET : {{ info.company.siret }}</span>
      </div>
    </div>

    <hr />

    <div class="">
      <div class="mt-4 pb-2">
        <span class="" style="font-weight: 400">Informations personnelles</span>
      </div>
      <div class="pb-2">
        <span class="">{{ info.nom }}</span>
      </div>
      <div class="pb-2">
        <span class="">{{ info.prenoms }}</span>
      </div>

      <div class="pb-2">
        <span class="">{{ info.typeActivite }}</span>
      </div>
      <div class="pb-2">
        <span class="">{{ info.raisonSociale }}</span>
      </div>
      <div class="pb-2">
        <span class="">Tél: {{ info.telephone }}</span>
      </div>
      <div class="pb-2">
        <span class="">{{ info.email }}</span>
      </div>
    </div>

    <hr />

    <div class="mt-4 pb-2">
      <span class="" style="font-weight: 400">Logo</span>
    </div>

    <div class="pb-2">
      <label class="form-label">Modifier Logo de votre entreprise</label>
      <input class="form-control" type="file" />
    </div>

    <hr />
    <div class="row">
      <div class="col">
        <div class="pb-2">
          <span class="" style="font-weight: 400">Securité</span>
        </div>

        <div class="pb-2 col-xs-4">
          <label class="form-label">Modifier votre mot-de passe</label>
          <input class="form-control" v-model="form.password" type="text" />
        </div>

        <div class="pb-2">
          <label class="form-label">Confirmez votre mot-de passe</label>
          <input
            class="form-control"
            v-model="form.confirmPassword"
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="d-flex justfy-content-center align-items-center">
      <button
        class="btn"
        style="
          background-color: rgb(50, 141, 245);
          color: white;
          padding: 6px 18px;
          margin: 8px;
        "
      >
        Changer mon mot de passe
      </button>
    </div>

    <hr />
    <div class="mt-4 pb-2">
      <span class="" style="font-weight: 400">Support</span>
    </div>

    <div class="d-flex justfy-content-center align-items-center">
      <button
        class="btn"
        style="
          background-color: rgb(50, 141, 245);
          color: white;
          padding: 6px 18px;
          margin: 8px;
        "
      >
        Contactez le Support
      </button>
    </div>
  </div>

  <div id="notify"></div>
</template>

<script>
export default {
  name: "AccountBlock",
  props: {
    msg: String,
  },

  data() {
    return {
      userInfo: [],
      form: {
        password: "",
        confirmPassword: "",
      },
    };
  },

  methods: {
    async getForm() {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/users`);
      let data = await res.json();
      this.userInfo = data;
      console.log(data);
    },
  },
  mounted() {
    this.getForm();
  },

  computed: {
    getInfo() {
      return this.userInfo;
    },
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
</style>