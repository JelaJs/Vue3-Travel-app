<template>
  <div>Test</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const ids = ref(route.params.id)
const number = ref(route.params.number)
const nameLink = ref(null)

const getData = async () => {
  try {
    const response = await fetch(
      `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/accomodation/${ids.value}`
    )
    const data = await response.json()
    //accomodation.value = data
    nameLink.value = data.nameLink
    //console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const getPlaceData = async () => {
  try {
    const response = await fetch(
      `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/${nameLink.value}/${number.value}`
    )
    const data = await response.json()
    //accomodationList.value = data
    console.log('Place data', data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getData()
  await getPlaceData()
})
</script>
