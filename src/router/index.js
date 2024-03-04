import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FindHotelView from '../views/FindHotelView.vue'
import SingleAccPage from '../views/SingleAccPageView.vue'
import SingleAccReviewPage from '../views/SingleAccReviewPage.vue'
import SeasonClimate from '../views/SeasonClimateView.vue'
import TripIdeas from '../views/TripIdeasView.vue'
import AccomodationView from '../views/AccomodationView.vue'
import SingleBlog from '../views/SingleBlogView.vue'
import SingletripIdea from '../views/SingleTripIdeaView.vue'
import SingleActivity from '../views/SingleActivityView.vue'

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
      path: '/accomodations',
      name: 'accomodations',
      component: AccomodationView
    },
    {
      path: '/explore',
      name: 'explore',
      component: FindHotelView
    },
    {
      path: '/singleacc/:id',
      name: 'singleaccpage',
      component: SingleAccPage
    },
    {
      path: '/singleacc/:id/:number',
      name: 'singleaccreview',
      component: SingleAccReviewPage
    },
    {
      path: '/seasonclimate',
      name: 'seasonclimate',
      component: SeasonClimate
    },
    {
      path: '/tripideas',
      name: 'tripideas',
      component: TripIdeas
    },
    {
      path: '/blog/:id',
      name: 'singleblog',
      component: SingleBlog
    },
    {
      path: '/tripideas/:id',
      name: 'singletripidea',
      component: SingletripIdea
    },
    {
      path: '/activity/:id',
      name: 'singleactivity',
      component: SingleActivity
    }
  ]
})

export default router
