<template>
  <div v-if="accomodationList">
    <ul>
      <li v-for="acc in accomodationList" :key="acc.id">
        <p @click="goToAcc(acc.id)">{{ acc.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const accomodationList = ref(null)
const router = useRouter()

const getData = async () => {
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/accomodation')
    const data = await response.json()
    accomodationList.value = data
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const goToAcc = (id) => {
  router.push(`/accomodation/${id}`)
}

onMounted(getData)
</script>
