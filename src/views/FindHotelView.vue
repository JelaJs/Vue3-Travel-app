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
        <ul>
          <li><div>Hotel Info</div></li>
          <li><div>Hotel Info</div></li>
          <li><div>Hotel Info</div></li>
          <li><div>Hotel Info</div></li>
        </ul>
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { onMounted } from 'vue'
//import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'

//const address = ref('')
//const lat = ref(0)
//const lng = ref(0)

/*const getLatLng = (place) => {
  lat.value = place.geometry.location.lat()
  lng.value = place.geometry.location.lng()
  console.log(lat, lng)
}*/

const showMap = (lat, lng) => {
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(lat, lng)
    //mapTypeId: google.maps.mapTypeId.ROADMAP
  })
}

onMounted(() => {
  let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'))
  autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace()
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    showMap(lat, lng)
  })
})
</script>

<style scoped lang="scss">
.header-input-wrap {
  padding-left: 1rem;
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
    height: 100%;
  }

  #map {
    width: 80%;
    height: 100vh;
  }
}
</style>
