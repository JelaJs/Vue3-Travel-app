import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMapSavedPlaces = defineStore('mapSavedPlaces', () => {
  const savedPlacesStore = localStorage.getItem('savedMapPlaces') || []
  const savedPlaces = ref([])
  const isModalOpen = ref(false)

  if (savedPlacesStore.length > 0) {
    savedPlaces.value = JSON.parse(savedPlacesStore)
  }

  return { savedPlaces, isModalOpen }
})
