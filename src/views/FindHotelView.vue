<template>
  <div>
    <div class="header-input-wrap">
      <h1>Find hotel page</h1>
      <input id="autocomplete" type="text" placeholder="Search for your favorite palce..." />
      <!--<GoogleAddressAutocomplete
        apiKey="AIzaSyCp2tWmiWmxkqnw_nkzmTI51J6X8Wwn_ug"
        v-model="address"
        @callback="getLatLng"
        class="css-class-here"
        placeholder="placeholder if you wish"
      />-->
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
              <p>{{ place.name }}</p>
            </div>
            <a v-if="place.website" :href="place.website" target="_blank">Visit website</a>
            <button @click="addToFavorites(place)">Add to favorites</button>
          </li>
        </ul>
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { onMounted, ref } from 'vue'

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

onMounted(() => {
  let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'))
  autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace()
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    showMap(lat, lng)
    mapPalces.value = []
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
.header-input-wrap {
  padding-left: 1rem;
  padding-top: 6rem;
  input {
    outline: none;
    padding: 0.5rem 0.5rem;
    width: 25rem;
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
