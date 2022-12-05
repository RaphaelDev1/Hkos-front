<template>
  <div class="container-sm">
    <form>
      <div class="d-flex justify-content-center mb-5">
        <img src="img/logo.png" class="logoinscription" />
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input type="email" id="form2Example1" v-model="form.login" class="form-control" />
        <label class="form-label" for="form2Example1">Login</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="form2Example2" v-model="form.password" class="form-control" />
        <label class="form-label" for="form2Example2">Mot de passe</label>
      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <!-- Submit button -->
        <div class="d-flex justify-content-center">
          <router-link class="btn btn-primary btn-block mb-4" @click="sendForm" to="/dashboard">
            Connexion</router-link
          >
        </div>

        <div id="notify"></div>

        <div class="col d-flex justify-content-center">
          <!-- Simple link -->
          <router-link to="/forgot-pass" class="text-black"  style="">Mot de passe oublié?</router-link>
        </div>
      </div>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Vous n'etes pas un membre? <router-link class="text-black" to="/new-account">Créer un compte</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ConnectionBlock",
  props: {
    msg: String,
  },
  data() {
    return {
      form: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    async sendForm() {
      let res = await fetch("http://localhost:3000/auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });

      let data = await res.json();

      console.log(data);
      console.log(res.json.msg)
      const Notify = document.querySelector("#notify");

      if (data.status == "ok")
        Notify.innerHTML =
          this.$router.push('Dashboard') ;
      else
        Notify.innerHTML = '<p class="text-danger">Login ou mot de passe incorrecte!</p>'; 
    },
  },
};
</script>