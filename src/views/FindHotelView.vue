<template>
  <div class="map-page">
    <div class="header-input-wrap">
      <div>
        <p class="info-p">
          If you don't fit into our offers, or you don't like a place that we offer, here you can
          research and find accommodation for yourself anywhere in the world.
        </p>
        <h1>Find perfect hotel</h1>
        <input
          id="autocomplete"
          type="text"
          placeholder="Search for your favorite destination..."
        />
      </div>
      <div class="fav-btn-wrap">
        <button @click="mapSavedPlaces.isModalOpen = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
            />
          </svg>
        </button>
        <div v-show="mapSavedPlaces.savedPlaces.length > 0" class="saved-sign"></div>
      </div>
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
    <Transition name="savedPlaces" mode="out-in">
      <MapSavedPlaces v-show="mapSavedPlaces.isModalOpen" :mapPalces="mapPalces" />
    </Transition>
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
  overflow-x: hidden;
}

.header-input-wrap {
  padding-left: 2rem;
  padding-top: 6rem;
  padding-right: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin-top: 0.5rem;
  }

  .info-p {
    font-size: 1.4rem;
    margin-top: 2rem;
  }

  .fav-btn-wrap {
    position: relative;

    .saved-sign {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: orangered;
      border-radius: 100%;
      top: -8px;
      left: -6px;
    }
  }

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

    ul {
      list-style: none;
    }

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

/**Transition animation */
.savedPlaces-enter-active,
.savedPlaces-leave-active {
  transition: 300ms ease all;
  /* transform: translateX(0);*/
}

.savedPlaces-enter-from,
.savedPlaces-leave-to {
  /* transform: translateX(100%);*/
  opacity: 0;
}

/**Responsive */
@media (max-width: 1200px) {
  .flex {
    flex-direction: column;
  }

  .flex #map {
    width: 100%;
  }

  .flex .menu {
    width: 100%;
    height: 100%;
  }

  .flex .menu ul {
    display: flex;
  }

  .flex .menu ul li div {
    width: 250px;
  }

  .flex .menu ul li a {
    display: block;
    margin-bottom: 1rem;
  }
}

@media (max-width: 630px) {
  .header-input-wrap h1 {
    font-size: 2.3rem;
  }

  .header-input-wrap input {
    width: 25rem;
  }
}

@media (max-width: 420px) {
  .saved-places-wrap {
    width: 35rem;
  }
}
</style>
