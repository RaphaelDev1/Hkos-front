import { createStore } from "vuex";
import { formatGetAllDevisApiData } from "../helpers/api";
import { formatGetAllFactureApiData } from "../helpers/api";

const modalActions = ({ state }, payload, showVariable) => {
  if (payload.data) {
    state.item = { ...payload.data };
  }
  
  if (payload.status) return (state[showVariable] = payload.status);

  if (payload.target) {
    if (!payload.target.closest(".modale") || payload.target.id == "close-btn")
      state[showVariable] = false;
  } else state[showVariable] = false;
};

export default createStore({
  state: () => ({
    //data
    revele: false,
    pdfShow: false,
    item: {},
    Clients: [],
    User: [],
    Devis: [],
    EditDevis: {},
    Facture: [],
    EditFacture: {},
    Contrat: [],
    EditContrat: {},
    link: {},
    status_table: "",
  }),
  mutations: {},
  actions: {
    toggleModal({ state }, payload) {
      modalActions({ state }, payload, "revele");
    },
    togglePdfModal({ state }, payload) {
      modalActions({ state }, payload, "pdfShow");
    },

    async getClients({ state }) {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/clients`);
      let data = await res.json();
      state.Clients = data;
    },
    //   state.Clients = data[0].clients;

    async getUser({ state }) {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/users`);
      let data = await res.json();
      state.User = data;
    },

    async getDevis({ state }, payload) {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/devis`);
      let data = await res.json();
      state.Devis = formatGetAllDevisApiData(data).reverse();
      if (payload) {
        state.EditDevis = {
          ...state.Devis.find((el) => el.uuid == payload.uuid),
        };
      }
    },
    async getFacture({ state }, payload) {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/facture`);
      let data = await res.json();
      state.Facture = formatGetAllFactureApiData(data).reverse();
      if (payload) {
        state.EditFacture = {
          ...state.Facture.find((el) => el.uuid == payload.uuid),
        };
      }
    },

    async getContrat({ state }, payload) {
      let res = await fetch(`${process.env.VUE_APP_ROOT_API}/contrat`);
      let data = await res.json();
      state.Contrat = formatGetAllFactureApiData(data).reverse();
      if (payload) {
        state.EditContrat = {
          ...state.Contrat.find((el) => el.uuid == payload.uuid),
        };
      }
    },


  },
});
