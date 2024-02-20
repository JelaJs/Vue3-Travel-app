import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FindHotelView from '../views/FindHotelView.vue'
import Accomodation from '../views/AccomodationView.vue'
import SingleAcc from '../views/SingleAccomodationView.vue'
import SinglePlace from '../views/SinglePlaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/explore',
      name: 'explore',
      component: FindHotelView
    },
    {
      path: '/accomodation',
      name: 'accomodation',
      component: Accomodation
    },
    {
      path: '/accomodation/:id',
      name: 'singleaccomodation',
      component: SingleAcc
    },
    {
      path: '/accomodation/:id/:number',
      name: 'singleplace',
      component: SinglePlace
    }
  ]
})

export default router
