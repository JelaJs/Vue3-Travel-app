<template>
  <div v-if="singleAccList">
    <ul>
      <li v-for="acc in singleAccList" :key="acc.id">
        <p @click="goToSingleAcc(acc.id)">{{ acc.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const id = ref(route.params.id)
const accomodation = ref(null)
const singleAccList = ref(null)
const name = ref(null)

const getData = async () => {
  try {
    const response = await fetch(
      `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/accomodation/${id.value}`
    )
    const data = await response.json()
    accomodation.value = data
    name.value = data.nameLink
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const getSingleAccList = async () => {
  try {
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/${name.value}`)
    const data = await response.json()
    singleAccList.value = data
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const goToSingleAcc = (number) => {
  router.push(`/accomodation/${id.value}/${number}`)
}

onMounted(async () => {
  await getData()
  await getSingleAccList()
})
</script>
