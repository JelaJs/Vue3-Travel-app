<template>
  <div class="saved-places-wrap">
    <div class="close-btn-wrap">
      <button @click="mapSavedPlaces.isModalOpen = false" class="close-modal">X</button>
    </div>
    <P v-show="mapSavedPlaces.savedPlaces.length === 0">No places yet...</P>
    <ul v-show="mapSavedPlaces.savedPlaces.length > 0">
      <li v-for="place in mapSavedPlaces.savedPlaces" :key="place.place_id">
        <div>
          <p class="hotel-name">{{ place.name }}</p>
        </div>
        <a v-if="place.website" :href="place.website" target="_blank">Visit website</a>
        <button @click="removePlace(place)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMapSavedPlaces } from '@/stores/MapSavedPlaces'

const mapSavedPlaces = useMapSavedPlaces()
const props = defineProps({
  mapPalces: Array
})
//const savedPlacesStore = localStorage.getItem('savedMapPlaces') || []
//const savedPlaces = ref([])
/*
if (savedPlacesStore.length > 0) {
  savedPlaces.value = JSON.parse(savedPlacesStore)
  console.log(savedPlaces.value)
}*/

const removePlace = (place) => {
  const index = mapSavedPlaces.savedPlaces.findIndex((el) => el.place_id === place.place_id)
  mapSavedPlaces.savedPlaces.splice(index, 1)
  localStorage.setItem('savedMapPlaces', JSON.stringify(mapSavedPlaces.savedPlaces))

  checkSingleSaved(place, props.mapPalces)
}

function checkSingleSaved(obj, array2) {
  let foundInArray2 = array2.find((obj2) => obj2.name === obj.name)

  if (foundInArray2) {
    foundInArray2.isSaved = false
  } else {
    foundInArray2.isSaved = true
  }
}
</script>

<style scoped lang="scss">
.saved-places-wrap {
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 40rem;
  background-color: #fff;
  padding: 3rem;
  border-left: 2px solid #ccc;

  .close-btn-wrap {
    text-align: end;
  }

  ul {
    list-style: none;
    overflow-y: auto;
    margin-top: 4rem;

    li {
      padding: 1rem;
      border-bottom: 1px solid #ccc;
      margin-bottom: 4rem;

      .hotel-name {
        font-weight: 600;
        margin-bottom: 1rem;
      }

      a {
        margin-right: 2rem;
      }
    }
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 1.8rem;
    cursor: pointer;
  }
}
</style>
