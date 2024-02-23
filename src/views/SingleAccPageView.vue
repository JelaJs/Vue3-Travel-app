<template>
  <div class="singleAcc-page-hero">
    <div class="container">{{ id }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchAccData } from '../globalFunc/singleAccfunc'

const route = useRoute()
const id = ref(route.params.id)
const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:GC_IgfR7/accomodation/${id.value}`
const accData = ref(null)
const errorData = ref(null)
const nameLink = ref(null)

onMounted(async () => {
  await fetchAccData(apiUrl, accData, nameLink, errorData)
})
</script>

<style scoped lang="scss">
.singleAcc-page-hero {
  padding-top: 8rem;
}
</style>
