<template>
  <div>
    <div class="header-input-wrap">
      <h1>Find hotel page</h1>
      <!--<input id="autocomplete" type="text" placeholder="Search for your favorite palce..." />-->
      <GoogleAddressAutocomplete
        apiKey="AIzaSyCp2tWmiWmxkqnw_nkzmTI51J6X8Wwn_ug"
        v-model="address"
        @callback="getLatLng"
        class="css-class-here"
        placeholder="placeholder if you wish"
      />
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
import { ref, onMounted } from 'vue'
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'

const address = ref('')

const getLatLng = (place) => {
  const lat = place.geometry.location.lat()
  const lng = place.geometry.location.lng()
  console.log(lat, lng)
}

onMounted(() => {})
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
    width: 30%;
    height: 100%;
  }

  .map {
    width: 70%;
    height: 100%;
  }
}
</style>
