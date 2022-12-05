import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import ConnectionView from '../views/ConnectionView.vue'
import NewAccountView from '../views/NewAccountView.vue'
import ForgotPassView from '../views/ForgotPassView.vue'

import DashboardView from '../views/DashboardView.vue'

import DevisView from '../views/DevisView.vue'
import DevisGenerateurView from '../views/DevisGenerateurView.vue'
import EditDevisView from '../views/EditDevisView.vue'

import FactureView from '../views/FactureView.vue'
import FactureGenerateurView from '../views/FactureGenerateurView.vue'
import EditFactureView from '../views/EditFactureView.vue'

import ContratView from '../views/ContratView.vue'
import ContratGenerateurView from '../views/ContratGenerateurView.vue'



import AccountView from '../views/AccountView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/connection',
    name: 'connection',
    component: ConnectionView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView


  },
  {
    path: '/devis',
    name: 'devis',
    component: DevisView


  },
  {
    path: '/facture',
    name: 'facture',
    component: FactureView


  },

  {
    path: '/contrat',
    name: 'contrat',
    component: ContratView


  },

  {
    path: '/generateur-devis',
    name: 'generateur-devis',
    component: DevisGenerateurView


  },
  {
    path: '/edit-devis/:uuid',
    name: 'edit-devis',
    component: EditDevisView
  },

  {
    path: '/generateur-facture',
    name: 'generateur-facture',
    component: FactureGenerateurView
  },

  {
    path: '/edit-facture/:uuid',
    name: 'edit-facture',
    component: EditFactureView
  },
  

  {
    path: '/generateur-contrat',
    name: 'generateur-contrat',
    component: ContratGenerateurView


  },
  {
    path: '/new-account',
    name: 'new-account',
    component: NewAccountView


  },
  {
    path: '/forgot-pass',
    name: 'forgotpass',
    component: ForgotPassView


  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: AccountView


  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
