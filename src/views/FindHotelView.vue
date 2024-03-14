<template>
  <div class="map-page">
    <div class="header-input-wrap">
      <div>
        <h1>Find perfect hotel</h1>
        <input id="autocomplete" type="text" placeholder="Search for your favorite palce..." />
      </div>
      <button @click="mapSavedPlaces.isModalOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </button>
    </div>
    <div class="flex">
      <div class="menu">
        <ul v-if="mapPalces">
          <li v-for="place in mapPalces" :key="place.place_id">
            <div @click="showMarker(place)">
              <div>
                <img
                  class="place-img"
                  :src="
                    place.photos && place.photos.length > 0
                      ? place.photos[0].getUrl()
                      : 'https://fastly.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs'
                  "
                  alt="Place image"
                />
              </div>
              <p class="hotel-name">{{ place.name }}</p>
            </div>
            <a v-if="place.website" :href="place.website" target="_blank">Visit website</a>
            <button v-if="!place.isSaved" @click.stop="addToFavorites(place)">
              Add to favorites
            </button>
            <button v-if="place.isSaved" @click="removePlace(place)">Remove</button>
          </li>
        </ul>
      </div>
      <div id="map"></div>
    </div>
    <MapSavedPlaces v-if="mapSavedPlaces.isModalOpen" :mapPalces="mapPalces" />
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { onMounted, ref } from 'vue'
import MapSavedPlaces from '../components/MapSavedPlaces.vue'
import { useMapSavedPlaces } from '@/stores/MapSavedPlaces'

const mapSavedPlaces = useMapSavedPlaces()
let service = null
const mapPalces = ref([])

const showMap = (lat, lng) => {
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(lat, lng),
    draggable: true
    //mapTypeId: google.maps.mapTypeId.ROADMAP
  })

  let request = {
    location: new google.maps.LatLng(lat, lng),
    radius: '500',
    type: 'lodging'
  }

  console.log('Lat long iz showMap', lat, lng)

  service = new google.maps.places.PlacesService(map)
  service.nearbySearch(request, callback)

  setEventListener(map)
}

const setEventListener = (map) => {
  google.maps.event.addListener(map, 'dragend', () => {
    console.log('Drag radi')
    let center = map.getCenter()
    let lat = center.lat()
    let lng = center.lng()

    let request = {
      location: new google.maps.LatLng(lat, lng),
      radius: '500',
      type: 'lodging'
    }

    mapPalces.value = []
    //mapSavedPlaces.mapPlaces = []
    service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback)
    //showMap(lat, lng)
  })
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 1; i < results.length; i++) {
      let request = {
        placeId: results[i].place_id
      }

      service.getDetails(request, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          //console.log(place)
          mapPalces.value.push(place)
          //mapSavedPlaces.mapPlaces.push(place)
          checkIfSaved(mapPalces.value, mapSavedPlaces.savedPlaces)
        } else {
          console.error('Something went wrong:', status)
        }
      })
    }
    console.log(mapPalces.value)
  }
}

function showMarker(place) {
  // Ova funkcija postavlja marker na karti za odabrano mjesto

  // Provjerite da li postoji mapa
  if (!google || !google.maps) {
    console.error('Google Maps API is not awailable')
    return
  }

  // Uzmite koordinate mjesta
  const { geometry } = place
  const location = geometry.location
  let lat = location.lat()
  let lng = location.lng()

  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(lat, lng),
    draggable: true
    //mapTypeId: google.maps.mapTypeId.ROADMAP
  })

  setEventListener(map)

  // Kreirajte marker
  const marker = new google.maps.Marker({
    position: location,
    map: map // Ovdje "map" treba biti referenca na vašu Google Maps kartu
  })

  // Centrirajte mapu na markeru
  map.setCenter(location)
}

const addToFavorites = (place) => {
  // Filter out deprecated properties
  const filteredPlace = { ...place }
  delete filteredPlace.open_now
  delete filteredPlace.utc_offset
  delete filteredPlace.utc_offset_minutes

  // Add filtered place to favorites
  mapSavedPlaces.savedPlaces.push(filteredPlace)

  // Update localStorage
  localStorage.setItem('savedMapPlaces', JSON.stringify(mapSavedPlaces.savedPlaces))
  checkSingleSaved(place, mapSavedPlaces.savedPlaces)

  //console.log(filteredPlace)
}

const checkIfSaved = (array1, array2) => {
  array1.forEach((obj1) => {
    // Provera da li se ime objekta nalazi u array2
    let foundInArray2 = array2.some((obj2) => obj2.name === obj1.name)

    if (foundInArray2) {
      // Dodavanje ili ažuriranje ključa isSaved u zavisnosti od uslova
      obj1.isSaved = true
      //console.log('sadrzi')
    } else {
      obj1.isSaved = false
      //console.log('Ne sadrzi')
    }
  })
}

function checkSingleSaved(obj, array2) {
  let foundInArray2 = array2.some((obj2) => obj2.name === obj.name)

  if (foundInArray2) {
    obj.isSaved = true
  } else {
    obj.isSaved = false
  }
}

const removePlace = (place) => {
  const index = mapSavedPlaces.savedPlaces.findIndex((el) => el.place_id === place.place_id)
  mapSavedPlaces.savedPlaces.splice(index, 1)
  localStorage.setItem('savedMapPlaces', JSON.stringify(mapSavedPlaces.savedPlaces))

  checkSingleSaved(place, mapSavedPlaces.savedPlaces)
}

onMounted(() => {
  let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'))
  autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace()
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    showMap(lat, lng)
    mapPalces.value = []
    //mapSavedPlaces.mapPlaces = []
  })

  let mapElement = document.getElementById('map')
  let map = new google.maps.Map(mapElement, {
    center: { lat: 44.8125449, lng: 20.46123 },
    zoom: 15,
    draggable: true
  })

  setEventListener(map)
})
</script>

<style scoped lang="scss">
.map-page {
  background-color: #f2eee9;
}

.header-input-wrap {
  padding-left: 2rem;
  padding-top: 6rem;
  padding-right: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  input {
    outline: none;
    padding: 1rem 1rem;
    width: 30rem;
    border: none;
    margin-top: 2rem;
    border-radius: 10px;
  }
}
.flex {
  display: flex;
  margin-top: 3rem;

  .menu {
    padding-left: 1rem;
    width: 20%;
    height: 100vh;
    overflow-y: scroll;

    li {
      cursor: pointer;
      margin-bottom: 4rem;
      border-bottom: 1px solid #0000002f;
      padding-bottom: 2rem;
    }

    a {
      margin-right: 2rem;
    }

    a:hover {
      color: rgb(87, 87, 194);
    }

    button {
      border: none;
      cursor: pointer;
      outline: none;
      background-color: #fff;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-weight: 500;
      transition: all 0.3s;
    }

    button:hover {
      background-color: #000;
      color: #fff;
    }

    p {
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .place-img {
      width: 80%;
      height: 200px;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  #map {
    width: 80%;
    height: 100vh;
  }
}
</style>
