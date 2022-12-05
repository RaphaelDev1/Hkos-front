<template>
  <div class="container-sm">
    <form>
      <div class="d-flex justify-content-center mb-5">
        <img src="img/logo.png" class="logoinscription" />
      </div>
      <div class=" pb-2 d-flex justify-content-center">
        <span>Réinitialiser le mot de passe</span>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          v-model="form.login"
          class="form-control"
        />
        <label class="form-label" for="form2Example1">Login</label>
      </div>

      <div class="row mb-4">
        <!-- Submit button -->
        <div class="d-flex justify-content-center">
          <router-link
            class="btn btn-primary btn-block mb-4"
            @click="sendForm"
            to="/"
          >
            Réinitialiser le mot de passe</router-link
          >
        </div>

        <div id="notify"></div>

        <div class="col d-flex justify-content-center">
          <!-- Simple link -->
          <router-link to="/connection">Connection</router-link>
        </div>
      </div>

      <!-- Register buttons -->
      <div class="text-center">
        <p>
          Vous n'etes pas un membre?
          <router-link to="/new-account">Créer un compte</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ForgotPassBlock",
  props: {
    msg: String,
  },
  data() {
    return {
      form: {
        login: "",
      },
    };
  },
  methods: {
    async sendForm() {
      let res = await fetch("http://localhost:3000/restore-pass", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });

      let data = await res.json();

      console.log(data);
      console.log(res.json.msg);
    },
  },
};
</script>