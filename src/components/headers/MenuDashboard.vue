<template>
  <nav class="navbar navbar-expand-lg navbar-light menumain2 sticky-top">
    <router-link class="navbar-brand" to="/"
      ><img src="/img/logo2.png"  class="menulogo"
    /></router-link>
    <button
      class="navbar-toggler me-2"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse justify-content-between menumain2"
      id="navbarNav"
    >
      <ul class="navbar-nav menuul">
        <li class="nav-item active">
          <router-link class="menulink2" to="/dashboard">Tableau de bord</router-link>
        </li>
        <li class="nav-item">
          <router-link class="menulink2" to="/devis">Devis</router-link>
        </li>
        <li class="nav-item">
          <router-link class="menulink2" to="/facture">Facture</router-link>
        </li>
        <li class="nav-item">
          <router-link class="menulink2" to="/contrat">Contrat de travail</router-link>
        </li>
      </ul>

      <ul class="menuul navbar-nav" style="box-sizing: content-box;">
        <div class="box-sizing: content-box;"><router-link
          class="btn-hkos"
          to="/"
          style="
            background-color: rgb(255, 255, 255);
            color: rgb(50, 141, 245);
            border:1px solid white;
          "
        >
          Déconnexion
        </router-link>
        </div>

        <div style="box-sizing: content-box;">
        <router-link
          class="btn-hkos"
          to="my-account"
          style="border: 1px solid white; margin: 8px;"

        >
          Mon compte
        </router-link>
        </div>
      </ul>
    </div>
  </nav>

  <div
    style="
      z-index: 100;
      display: none;
      position: fixed;
      background: white;
      width: 100%;
    "
    id="999"
  >
    <div class="d-flex flex-column sticky-top dropMenu">
      
        <router-link to="/dashboard" class="menulink2b p-2 text-center"
          >Tableau de bord</router-link
        >
      

       <router-link to="/devis" class="menulink2b p-2 text-center"
          >Devis</router-link
        >

       <router-link to="/facture" class="menulink2b  p-2 text-center"
          >Facture</router-link
        >


        <router-link to="/contrat" class="menulink2b p-2 text-center"
          >Contrat de travail</router-link
        >
  

      <div class="p-2 d-flex justify-content-center border-bottom">
        <router-link
          class="btn btn2"
          style="
            background-color: rgb(50, 141, 245);
            color: white;
            padding: 4px 14px;
            margin: 8px;
          "
          to="my-account"
        >
          Mon compte
        </router-link>
        <router-link
          class="btn btn2"
          style="
            background-color: white;
            color: rgb(50, 141, 245);
            padding: 4px 16px;
            margin: 8px;
            border: 1px solid rgb(50, 141, 245);
          "
          to="/"
        >
          Déconnexion</router-link
        >
      </div>
    </div>
  </div>

  <!--Head Block (Space)--->
  <div class="head-block2"></div>
</template>

<script>
import $ from "jquery";

export default {
  name: "MenuDashboard",
  mounted() {
    $(".navbar-toggler").on("click", () => {
      $("#999").toggle('slow');
    });

    // $(".menulink").on("click", () => {
    //   $("#999").slideToggle();
    // });
  },
  props: {
    msg: String,
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}


.menumain2 {
    background-color: rgb(50, 141, 245);
}

.menulink2 {
    color: white;
    background-color: rgb(50, 141, 245);
    text-decoration: none;
    padding: 6px 10px;
     border-radius: 0.375em;

    }

.menulink2:hover {
    color: rgb(50, 141, 245);
    background-color: rgb(241, 239, 239);
    text-decoration: none;
    transition: 0.5s ease-in-out;
    padding: 6px 10px;
    border-radius: 0.375em;
}

.menulink2b {
    color: rgb(50, 141, 245);
    text-decoration: none;
    display: block;
}

.menulink2b:hover {
    background-color: rgb(242, 242, 242);
    color: rgb(1, 120, 255);

}



</style>