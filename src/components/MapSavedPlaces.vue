<template>
  <div>
    <ul v-if="savedPlaces.length > 0">
      <li v-for="place in savedPlaces" :key="place.place_id">
        <div @click="showMarker(place)">
          <div></div>
          <p class="hotel-name">{{ place.name }}</p>
        </div>
        <a v-if="place.website" :href="place.website" target="_blank">Visit website</a>
        <button @click="addToFavorites(place)">Add to favorites</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const savedPlacesStore = localStorage.getItem('savedMapPlaces') || []
const savedPlaces = ref([])

if (savedPlacesStore.length > 0) {
  savedPlaces.value = JSON.parse(savedPlacesStore)
  console.log(savedPlaces.value)
}
</script>
