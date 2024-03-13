import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FindHotelView from '../views/FindHotelView.vue'
import SingleAccPage from '../views/SingleAccPageView.vue'
import SingleAccReviewPage from '../views/SingleAccReviewPage.vue'
import SeasonClimate from '../views/SeasonClimateView.vue'
import TripIdeas from '../views/TripIdeasView.vue'
import AccomodationView from '../views/AccomodationView.vue'
import SingleBlog from '../views/SingleBlogView.vue'
import SingletripIdea from '../views/SingleTripIdeaView.vue'
import SingleActivity from '../views/SingleActivityView.vue'
import YourTripView from '../views/YourTripView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import CustomTripMaker from '../views/CustomTripMakerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    },
    {
      path: '/yourtrip',
      name: 'yourtrip',
      component: YourTripView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/Signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/makeCustomtrip',
      name: 'makecustomtrip',
      component: CustomTripMaker
    }
  ]
})

export default router
