<template>
  <div class="trip-idea">
    <div v-show="pageLoaded">
      <SingleTripHero />
      <SingleTripDays />
      <Footer />
    </div>
    <PagePreloader v-show="!pageLoaded" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SingleTripHero from '../components/SingleTripIdeaHero.vue'
import SingleTripDays from '../components/SingleTripIdeasDays.vue'
import Footer from '../components/FooterComp.vue'
import PagePreloader from '@/components/PagePreloader.vue'

const pageLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    pageLoaded.value = true
  }, 1500)
})
</script>

<style scoped lang="scss"></style>
